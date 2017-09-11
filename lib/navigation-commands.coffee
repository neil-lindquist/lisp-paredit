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

  expandSelection: ->
    editor = atom.workspace.getActiveTextEditor()
    ast = paredit.parse(editor.getText())
    range = editor.getSelectedBufferRange()
    startIndex = utils.convertPointToIndex(range.start, editor)
    endIndex = utils.convertPointToIndex(range.end, editor)

    if expandState.range is null
      expandState.range = range

    res = paredit.navigator.sexpRangeExpansion(ast, startIndex, endIndex)
    if res and res.length == 2
      [start, end] = res
      newSelection = new Range(utils.convertIndexToPoint(start, editor), utils.convertIndexToPoint(end, editor))
      editor.setSelectedBufferRange(newSelection)
      expandState = {range: newSelection, prev: expandState}

  contractSelection: ->
    if expandState.prev isnt null
      expandState = expandState.prev
      editor = atom.workspace.getActiveTextEditor()
      editor.setSelectedBufferRange(expandState.range)

navigate = (fn) ->
  editor = atom.workspace.getActiveTextEditor()
  ast = paredit.parse(editor.getText())
  cursor = editor.getCursorBufferPosition()
  index = utils.convertPointToIndex(cursor, editor)
  result = fn(ast, index)
  point = utils.convertIndexToPoint(result, editor)
  editor.setCursorBufferPosition(point)
