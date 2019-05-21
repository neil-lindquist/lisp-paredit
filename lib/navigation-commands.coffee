{Range} = require 'atom'
utils = require "./utils"
paredit = require "paredit.js"

expandState = {range: null, prev: null}

module.exports =
  forwardSexp: ->
    navigate(paredit.navigator.forwardSexp)
  backwardSexp: ->
    navigate(paredit.navigator.backwardSexp)
  upSexp: ->
    navigate(paredit.navigator.backwardUpSexp)
  downSexp: ->
    navigate(paredit.navigator.forwardDownSexp)

  selectForwardSexp: ->
    select(paredit.navigator.forwardSexp)
  selectBackwardSexp: ->
    select(paredit.navigator.backwardSexp)
  selectUpSexp: ->
    select(paredit.navigator.backwardUpSexp)
  selectDownSexp: ->
    select(paredit.navigator.forwardDownSexp)

  expandSelection: ->
    editor = atom.workspace.getActiveTextEditor()
    ast = paredit.parse(editor.getText())
    range = editor.getSelectedBufferRange()
    startIndex = utils.convertPointToIndex(range.start, editor)
    endIndex = utils.convertPointToIndex(range.end, editor)

    if expandState.prev is null or range.containsRange(expandState.prev.range) is false
      expandState = {range: range, prev: null}

    res = paredit.navigator.sexpRangeExpansion(ast, startIndex, endIndex)
    if res and res.length == 2
      [start, end] = res
      newSelection = new Range(utils.convertIndexToPoint(start, editor), utils.convertIndexToPoint(end, editor))
      editor.setSelectedBufferRange(newSelection)
      expandState = {range: newSelection, prev: expandState}

  contractSelection: ->
    editor = atom.workspace.getActiveTextEditor()
    range = editor.getSelectedBufferRange()

    if expandState.prev and expandState.prev.range and range.containsRange(expandState.prev.range)
      editor.setSelectedBufferRange(expandState.prev.range)
      expandState = expandState.prev

navigate = (fn) ->
  editor = atom.workspace.getActiveTextEditor()
  ast = paredit.parse(editor.getText())
  cursors = editor.getCursorBufferPositions()

  newCursors = []
  for cursor in cursors
    index = utils.convertPointToIndex(cursor, editor)
    result = fn(ast, index)
    newCursors.push(utils.convertIndexToPoint(result, editor))

  editor.setCursorBufferPosition(newCursors[0])
  if newCursors.length > 1
    for i in [1..newCursors.length-1]
      editor.addCursorAtBufferPosition(newCursors[i])


select = (fn) ->
  editor = atom.workspace.getActiveTextEditor()
  ast = paredit.parse(editor.getText())
  selections = editor.getSelections()

  for selection in selections
    index = utils.convertPointToIndex(selection.cursor.getBufferPosition(), editor)
    result = fn(ast, index)
    point = utils.convertIndexToPoint(result, editor)
    selection.selectToBufferPosition(point)
