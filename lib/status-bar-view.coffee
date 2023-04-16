etch = require 'etch'
$ = etch.dom

module.exports =
class StatusBarView
  constructor: (@statusBar, @toggleCallback, @toggleStrictCallback) ->
    @enabled = false
    @strict = false
    @error = false
    etch.initialize @
    @attach()

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
      $.span {className: 'enabled-status', on:{click:@toggle}},
        '(λ)'
      $.span {className: 'strict-status', on:{click:@toggleStrict}},
        ' strict'

  attach: ->
    @tile = @statusBar.addRightTile(item: @element, priority: 10)

  detach: ->
    @tile.destroy() if @tile

  toggle: ->
    @toggleCallback()
  toggleStrict: ->
    @toggleStrictCallback()

  enable: ->
    @enabled = true
    etch.update @
  disable: ->
    @enabled = false
    etch.update @
  enableStrict: ->
    @strict = true
    etch.update @
  disableStrict: ->
    @strict = false
    etch.update @

  invalidInput: ->
    @error = true
    etch.update @
    setTimeout =>
      @error = false
      etch.update @
    , 300
