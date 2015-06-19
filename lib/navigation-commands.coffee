{Range} = require 'atom'
utils = require "./utils"
paredit = require "paredit.js"

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

    res = paredit.navigator.sexpRangeExpansion(ast, startIndex, endIndex)
    if res and res.length == 2
      [start, end] = res
      newSelection = new Range(utils.convertIndexToPoint(start, editor), utils.convertIndexToPoint(end, editor))
      editor.setSelectedBufferRange(newSelection)

navigate = (fn) ->
  editor = atom.workspace.getActiveTextEditor()
  ast = paredit.parse(editor.getText())
  cursor = editor.getCursorBufferPosition()
  index = utils.convertPointToIndex(cursor, editor)
  result = fn(ast, index)
  point = utils.convertIndexToPoint(result, editor)
  editor.setCursorBufferPosition(point)
