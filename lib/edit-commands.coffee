{Range} = require 'atom'
utils = require "./utils"
paredit = require "paredit.js"

module.exports =
  slurpBackwards: ->
    edit(paredit.editor.slurpSexp, backward: true)

  slurpForwards: ->
    edit(paredit.editor.slurpSexp, backward: false)

  barfBackwards: ->
    edit(paredit.editor.barfSexp, backward: true)

  barfForwards: ->
    edit(paredit.editor.barfSexp, backward: false)

  killSexpForwards: ->
    edit(paredit.editor.killSexp, backward: false)

  killSexpBackwards: ->
    edit(paredit.editor.killSexp, backward: true)

  splice: ->
    edit(paredit.editor.spliceSexp)

  spliceBackwards: ->
    edit(paredit.editor.spliceSexpKill, backward: true)

  spliceForwards: ->
    edit(paredit.editor.spliceSexpKill, backward: false)

  split: ->
    edit(paredit.editor.splitSexp)

  indent: ->
    editor = atom.workspace.getActiveTextEditor()
    range = editor.getSelectedBufferRange()
    indentRange(range, editor)

  deleteBackwards: ->
    edit(paredit.editor.delete, {backward: true})

  deleteForwards: ->
    edit(paredit.editor.delete, {backward: false})

  paste: (views) ->
    text = atom.clipboard.read()
    ast = paredit.parse(text)
    editor = atom.workspace.getActiveTextEditor()
    if ast.errors.length > 0
      views.invalidInput()
    else
      editor.transact ->
        editor.pasteText()
        range = editor.getSelectedBufferRange()
        indentRange(range, editor)

  newline: ->
    editor = atom.workspace.getActiveTextEditor()
    cursors = editor.getCursorsOrderedByBufferPosition()
    newSrc = editor.getText()
    indices = []

    for cursor in cursors
      index = utils.convertPointToIndex(cursor.getBufferPosition(), editor)
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

indentRange = (range, editor) ->
  ast = paredit.parse(editor.getText())
  src = editor.getText()

  if range.isEmpty()
    expanded = paredit.navigator.sexpRangeExpansion(ast,
      utils.convertPointToIndex(range.start, editor),
      utils.convertPointToIndex(range.end, editor))
    if expanded and expanded.length == 2
      [start, end] = expanded
  else
    start = utils.convertPointToIndex(range.start, editor)
    end = utils.convertPointToIndex(range.end, editor)

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

      point = utils.convertIndexToPoint(first, editor)
      editor.setCursorBufferPosition(point)

      for newIndex in rest
        point = utils.convertIndexToPoint(newIndex, editor)
        editor.addCursorAtBufferPosition(point)

pareditChangeFns =
  insert: (editor, [index, text]) ->
    point = utils.convertIndexToPoint(index, editor)
    range = new Range(point, point)
    editor.setTextInBufferRange(range, text)

  remove: (editor, [index, length]) ->
    start = utils.convertIndexToPoint(index, editor)
    end = utils.convertIndexToPoint(index + length, editor)
    range = new Range(start, end)
    editor.setTextInBufferRange(range, "")

edit = (fn, args) ->
  editor = atom.workspace.getActiveTextEditor()
  cursors = editor.getCursorsOrderedByBufferPosition()
  indexes = []

  selections = editor.getSelections().filter (s) -> !s.isEmpty()
  newIndexes = []

  editor.transact =>
    if selections.length > 0
      for selection in selections
        src = editor.getText()
        ast = paredit.parse(src)
        startIndex = selection.getBufferRange().start
        endIndex = selection.getBufferRange().end
        index = utils.convertPointToIndex(startIndex, editor)
        args.endIdx = utils.convertPointToIndex(endIndex, editor)
        args.freeEdits = true
        result = fn(ast, src, index, args)

        newIndexes.push result.newIndex if result?.newIndex

        if result?.changes
          applyChanges
            changes: result.changes,
            editor
    else
      for cursor in cursors
        index = utils.convertPointToIndex(cursor.getBufferPosition(), editor)

        src = editor.getText()
        ast = paredit.parse(src)
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
