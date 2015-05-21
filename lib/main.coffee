{CompositeDisposable} = require 'atom'
paredit = require 'paredit.js'
{Range, Point} = require 'atom'
utils = require "./utils"

module.exports = LispParedit =
  subscriptions: null

  activate: (state) ->
    addCommands [
      ["slurp-backwards",      slurpBackwards]
      ["slurp-forwards",       slurpForwards]
      ["barf-backwards",       barfBackwards]
      ["barf-forwards",        barfForwards]
      ["kill-sexp-forwards",   killSexpForwards]
      ["kill-sexp-backwards",  killSexpBackwards]
      ["forward-sexp",         forwardSexp]
      ["backward-sexp",        backwardSexp]
      ["up-sexp",              upSexp]
      ["down-sexp",            downSexp]
      ["expand-selection",     expandSelection]
      ["indent",               indent]
      ["delete-backwards",     deleteBackwards]
      ["delete-forwards",      deleteForwards]
      ["newline",              newline]
    ]

  deactivate: ->
    @subscriptions.dispose() if @subscriptions

addCommands = (commands) ->
  @subscriptions = new CompositeDisposable
  for command in commands
    @subscriptions.add atom.commands.add "atom-text-editor", "lisp-paredit:#{command[0]}", command[1]

parse = (src) ->
  paredit.parse(src)

slurpBackwards = ->
  edit(paredit.editor.slurpSexp, backward: true)

slurpForwards = ->
  edit(paredit.editor.slurpSexp, backward: false)

barfBackwards = ->
  edit(paredit.editor.barfSexp, backward: true)

barfForwards = ->
  edit(paredit.editor.barfSexp, backward: false)

killSexpForwards = ->
  edit(paredit.editor.killSexp, backward: false)

killSexpBackwards = ->
  edit(paredit.editor.killSexp, backward: true)

edit = (fn, args) ->
  editor = atom.workspace.getActiveTextEditor()
  cursors = editor.getCursorsOrderedByBufferPosition()
  indexes = []

  selections = editor.getSelections().filter (s) -> !s.isEmpty()
  newIndexes = []

  editor.transact ->
    if selections.length > 0
      for selection in selections
        src = editor.getText()
        ast = parse(src)
        startIndex = selection.getBufferRange().start
        endIndex = selection.getBufferRange().end
        index = convertPointToIndex(startIndex, editor)
        args.endIdx = convertPointToIndex(endIndex, editor)
        args.freeEdits = true
        result = fn(ast, src, index, args)

        newIndexes.push result.newIndex if result?.newIndex

        if result?.changes
          applyChanges
            changes: result.changes,
            editor
    else
      for cursor in cursors
        index = convertPointToIndex(cursor.getBufferPosition(), editor)

        src = editor.getText()
        ast = parse(src)
        result = null
        try
          result = fn(ast, src, index, args)
        catch err
          console.error "[Lisp Paredit] Error calling paredit.js", err

        newIndexes.push result.newIndex if result?.newIndex
        if result?.changes
          applyChanges
            changes: result.changes,
            editor

    if newIndexes.length > 0
      applyChanges
        newIndexes: newIndexes,
        editor

navigate = (fn) ->
  editor = atom.workspace.getActiveTextEditor()
  ast = parse(editor.getText())
  cursor = editor.getCursorBufferPosition()
  index = convertPointToIndex(cursor, editor)
  result = fn(ast, index)
  point = convertIndexToPoint(result, editor)
  editor.setCursorBufferPosition(point)

forwardSexp = ->
  navigate(paredit.navigator.forwardSexp)
backwardSexp = ->
  navigate(paredit.navigator.backwardSexp)
upSexp = ->
  navigate(paredit.navigator.backwardUpSexp)
downSexp = ->
  navigate(paredit.navigator.forwardDownSexp)

expandSelection = ->
  editor = atom.workspace.getActiveTextEditor()
  ast = parse(editor.getText())
  range = editor.getSelectedBufferRange()
  startIndex = convertPointToIndex(range.start, editor)
  endIndex = convertPointToIndex(range.end, editor)

  res = paredit.navigator.sexpRangeExpansion(ast, startIndex, endIndex)
  if res and res.length == 2
    [start, end] = res
    newSelection = new Range(convertIndexToPoint(start, editor), convertIndexToPoint(end, editor))
    editor.setSelectedBufferRange(newSelection)

indent = ->
  editor = atom.workspace.getActiveTextEditor()
  ast = parse(editor.getText())
  src = editor.getText()
  range = editor.getSelectedBufferRange()
  if range.isEmpty()
    expanded = paredit.navigator.sexpRangeExpansion(ast,
      convertPointToIndex(range.start, editor),
      convertPointToIndex(range.end, editor))
    if expanded and expanded.length == 2
      [start, end] = expanded
  else
    start = convertPointToIndex(range.start, editor)
    end = convertPointToIndex(range.end, editor)

  if start and end
    result = paredit.editor.indentRange(ast, src, start, end)
    editor.transact ->
      applyChanges({changes:result.changes}, editor)

applyChanges = (result, editor) ->
  if result
    if result.changes
      for change in result.changes
        pareditChangeFns[change[0]](editor, change.slice(1))

    if result.newIndex or result.newIndexes
      indexes = result.newIndexes or []
      indexes.push result.newIndex if result.newIndex

      first = indexes.slice(0,1)
      rest = indexes.slice(1)

      point = convertIndexToPoint(first, editor)
      editor.setCursorBufferPosition(point)

      for newIndex in rest
        point = convertIndexToPoint(newIndex, editor)
        editor.addCursorAtBufferPosition(point)

pareditChangeFns =
  insert: (editor, [index, text]) ->
    point = convertIndexToPoint(index, editor)
    range = new Range(point, point)
    editor.setTextInBufferRange(range, text)

  remove: (editor, [index, length]) ->
    start = convertIndexToPoint(index, editor)
    end = convertIndexToPoint(index + length, editor)
    range = new Range(start, end)
    editor.setTextInBufferRange(range, "")

convertPointToIndex = (point, editor) ->
  range = new Range(new Point(0, 0), point)
  editor.getTextInBufferRange(range).length

convertIndexToPoint = (index, editor) ->
  p = utils.indexToPoint(index, editor.getText())
  new Point(p.row, p.column)

deleteBackwards = () ->
  edit(paredit.editor.delete, {backward: true})

deleteForwards = () ->
  edit(paredit.editor.delete, {backward: false})

newline = () ->
  editor = atom.workspace.getActiveTextEditor()
  cursors = editor.getCursorsOrderedByBufferPosition()
  newSrc = editor.getText()
  indices = []

  for cursor in cursors
    index = convertPointToIndex(cursor.getBufferPosition(), editor)
    indices.push index
    newSrc = newSrc.slice(0, index) + "\n" + newSrc.slice(index)

  ast = paredit.parse(newSrc, {})

  changes = []
  newIndexes = []

  for index in indices
    res = paredit.editor.indentRange(ast, newSrc, index+1, index+1)
    changes.push ['insert', index, "\n"]
    changes = changes.concat res.changes
    newIndexes.push res.newIndex

  editor.transact ->
    applyChanges
      changes: changes
      newIndexes: newIndexes,
      editor
