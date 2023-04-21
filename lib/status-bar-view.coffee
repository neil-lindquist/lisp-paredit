etch = require 'etch'
$ = etch.dom

module.exports =
class StatusBarView
  constructor: (@statusBar, @toggleCallback, @toggleStrictCallback) ->
    @enabled = false
    @strict = false
    @error = false

    etch.initialize @
    @tile = @statusBar.addRightTile(item: @element, priority: 10)

  update: (props, children) ->
    return etch.update @

  render: () ->
    div_classes = 'lisp-paredit-status inline-block'
    if @enabled
      div_classes += ' enabled'
    if @strict
      div_classes += ' strict'
    if @error
      div_classes += ' error'

    $.div {className:div_classes, style:'max-width:100vw'},
      $.span {className: 'enabled-status', on:{click:@toggleCallback}},
        '(λ)'
      $.span {className: 'strict-status', on:{click:@toggleStrictCallback}},
        ' strict'

  detach: ->
    @tile.destroy() if @tile

  enable: (enabled) ->
    @enabled = enabled
    etch.update @
  enableStrict: (enabled) ->
    @strict = enabled
    etch.update @

  invalidInput: ->
    @error = true
    etch.update @
    setTimeout =>
      @error = false
      etch.update @
    , 300
