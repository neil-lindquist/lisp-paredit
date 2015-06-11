utils = require "./utils"
{Range} = require 'atom'

module.exports =
class Views
  syntaxMarkers: {}

  showErrors: (editor, errors) ->
    @clearErrors(editor)
    src = editor.getText()
    for error in errors
      range = new Range(utils.indexToPoint(error.start, src), utils.indexToPoint(error.end, src))
      marker = editor.markBufferRange(range, invalidate: 'touch')
      editor.decorateMarker(marker, {type: 'highlight', class: 'lisp-syntax-error'})
      @syntaxMarkers[editor].push marker
    # @gutterView.addError # crap docs

  clearErrors: (editor) ->
    if @syntaxMarkers[editor]
      m.destroy() for m in @syntaxMarkers[editor]
    @syntaxMarkers[editor] = []
