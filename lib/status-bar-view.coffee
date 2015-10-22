{View} = require 'atom-space-pen-views'

module.exports =
class StatusBarView extends View
  @content: ->
    @div class: 'lisp-paredit-status inline-block', =>
      @span class: 'enabled-status', click: 'toggle', '(λ)'
      @span class: 'strict-status', click: 'toggleStrict', ' strict'

  initialize: (@statusBar, @toggleCallback, @toggleStrictCallback) ->
    @attach()

  attach: ->
    @tile = @statusBar.addRightTile(item: this, priority: 10)

  detach: ->
    @tile.destroy() if @tile

  toggle: ->
    @toggleCallback()
  toggleStrict: ->
    @toggleStrictCallback()

  enable: ->
    @addClass("enabled")
  disable: ->
    @removeClass("enabled")
  enableStrict: ->
    @addClass("strict")
  disableStrict: ->
    @removeClass("strict")

  invalidInput: ->
    @addClass("error")
    setTimeout =>
      @removeClass("error")
    , 300
