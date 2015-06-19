utils = require "./utils"
{Range} = require 'atom'

module.exports =
class Views
  constructor: (@toggleCallback, @toggleStrictCallback) ->
    @syntaxMarkers = {}

  setStatusBar: (statusBar) ->
    StatusBarView = require "./status-bar-view"
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
      if isEnabled then @statusBarView.enable() else @statusBarView.disable()

  strictModeEnabled: (isEnabled) ->
    if @statusBarView
      if isEnabled then @statusBarView.enableStrict() else @statusBarView.disableStrict()

  detach: ->
    @statusBarView.detach() if @statusBarView
    marker.destroy() for key, marker in @syntaxMarkers

  invalidInput: ->
    @statusBarView.invalidInput() if @statusBarView
