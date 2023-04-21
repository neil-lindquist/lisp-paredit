utils = require "./utils"
{Range} = require 'atom'
StatusBarView = require "./status-bar-view"

module.exports =
class Views
  constructor: (@toggleCallback, @toggleStrictCallback) ->
    @syntaxMarkers = {}

  setStatusBar: (statusBar) ->
    @statusBarView = new StatusBarView(statusBar, @toggleCallback, @toggleStrictCallback)

  showErrors: (editor, errors) ->
    @clearErrors(editor)
    src = editor.getText()
    for error in errors
      range = new Range(utils.indexToPoint(error.start, src), utils.indexToPoint(error.end, src))
      marker = editor.markBufferRange(range, invalidate: 'touch')
      editor.decorateMarker(marker, {type: 'highlight', class: 'lisp-syntax-error'})
      @syntaxMarkers[editor].push marker

  clearErrors: (editor) ->
    if @syntaxMarkers[editor]
      m.destroy() for m in @syntaxMarkers[editor]
    @syntaxMarkers[editor] = []

  enabled: (isEnabled) ->
    if @statusBarView
      @statusBarView.enable(isEnabled)

  strictModeEnabled: (isEnabled) ->
    if @statusBarView
      @statusBarView.enableStrict(isEnabled)

  detach: ->
    @statusBarView.detach() if @statusBarView
    marker.destroy() for key, marker in @syntaxMarkers

  invalidInput: ->
    @statusBarView.invalidInput() if @statusBarView
