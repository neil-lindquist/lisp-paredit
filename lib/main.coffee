{CompositeDisposable} = require 'atom'
paredit = require 'paredit.js'
{Range, Point} = require 'atom'

module.exports = LispParedit =
  subscriptions: null

  activate: (state) ->
    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.commands.add "atom-text-editor", "lisp-paredit:slurp-backwards", => slurpBackwards()
    @subscriptions.add atom.commands.add "atom-text-editor", "lisp-paredit:slurp-forwards", => slurpForwards()
    @subscriptions.add atom.commands.add "atom-text-editor", "lisp-paredit:barf-backwards", => barfBackwards()
    @subscriptions.add atom.commands.add "atom-text-editor", "lisp-paredit:barf-forwards", => barfForwards()
    @subscriptions.add atom.commands.add "atom-text-editor", "lisp-paredit:kill-sexp-forwards", => killSexpForwards()
    @subscriptions.add atom.commands.add "atom-text-editor", "lisp-paredit:kill-sexp-backwards", => killSexpBackwards()
    @subscriptions.add atom.commands.add "atom-text-editor", "lisp-paredit:forward-sexp", => forwardSexp()
    @subscriptions.add atom.commands.add "atom-text-editor", "lisp-paredit:backward-sexp", => backwardSexp()
    @subscriptions.add atom.commands.add "atom-text-editor", "lisp-paredit:up-sexp", => upSexp()
    @subscriptions.add atom.commands.add "atom-text-editor", "lisp-paredit:down-sexp", => downSexp()
    @subscriptions.add atom.commands.add "atom-text-editor", "lisp-paredit:expand-selection", => expandSelection()
    @subscriptions.add atom.commands.add "atom-text-editor", "lisp-paredit:format", => format()

  deactivate: ->
    @subscriptions.dispose()

parse = (editor) ->
  paredit.parse(editor.getText())

slurpBackwards = ->
  burp(paredit.editor.slurpSexp, backward: true)

slurpForwards = ->
  burp(paredit.editor.slurpSexp, backward: false)

barfBackwards = ->
  burp(paredit.editor.barfSexp, backward: true)

barfForwards = ->
  burp(paredit.editor.barfSexp, backward: false)

killSexpForwards = ->
  burp(paredit.editor.killSexp, backward: false)

killSexpBackwards = ->
  burp(paredit.editor.killSexp, backward: true)

# barf/slurp = burp
burp = (fn, args) ->
  editor = atom.workspace.getActiveTextEditor()
  ast = parse(editor)
  cursor = editor.getCursorBufferPosition()
  index = convertPointToIndex(cursor, editor)
  result = fn(ast, editor.getText(), index, args)
  applyChanges(result, editor)

navigate = (fn) ->
  editor = atom.workspace.getActiveTextEditor()
  ast = parse(editor)
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
  ast = parse(editor)
  range = editor.getSelectedBufferRange()
  startIndex = convertPointToIndex(range.start, editor)
  endIndex = convertPointToIndex(range.end, editor)

  res = paredit.navigator.sexpRangeExpansion(ast, startIndex, endIndex)
  if res and res.length == 2
    [start, end] = res
    newSelection = new Range(convertIndexToPoint(start, editor), convertIndexToPoint(end, editor))
    editor.setSelectedBufferRange(newSelection)

format = ->
  editor = atom.workspace.getActiveTextEditor()
  ast = parse(editor)
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
    applyChanges(result, editor)

applyChanges = (result, editor) ->
  if result
    editor.transact ->
      if result.changes
        for change in result.changes
          pareditChangeFns[change[0]](editor, change.slice(1))

          if result.newIndex
            point = convertIndexToPoint(result.newIndex, editor)
            editor.setCursorBufferPosition(point)

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
  length = 0
  row = 0
  while (length < index)
    rowLength = editor.lineTextForBufferRow(row).length + 1
    if length + rowLength > index
      break
    length += rowLength
    row += 1
  column = index - length
  new Point(row, column)
