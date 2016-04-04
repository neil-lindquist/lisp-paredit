{CompositeDisposable} = require 'atom'
paredit = require 'paredit.js'
utils = require "./utils"
Views = require "./views"
strict = require "./strict-mode"
nav = require "./navigation-commands"
edit = require "./edit-commands"

module.exports = LispParedit =
  subscriptions: null
  persistentSubscriptions: null
  strictSubscriptions: null
  views: null

  config:
    enabled:
      type: 'boolean'
      default: true
      description: 'When enabled the paredit commands are bound to editors that have Lisp grammars'
      order: 1
    strict:
      type: 'boolean'
      default: true
      description: 'Strict mode disallows the removal of single brackets, instead encouraging the user to use the paredit commands to modify s-expressions'
      order: 2
    indentationForms:
      type: 'array'
      default: ["&", "monitor-exit", "/^case/", "try", "/^reify/", "finally", "/^(.*-)?loop/",
        "/^let/", "/^import/", "new", "/^deftype/", "/^let/", "fn", "recur", "/^set.*!$/",
        ".", "var", "quote", "catch", "throw", "monitor-enter",
        'ns', 'in-ns', "/^([^\/]+\/)?def/","/^if/","/^when/","/^unless/", "while", "for",
        "/(^|\/)with/", "testing", "while", "cond", "condp", "apply",
        "binding", "locking", "proxy", "reify", "/^extend/", "facts",
        "do", "doseq", "dorun", "doall", "dosync", "start", "stop"]
      description: 'A list of forms (strings or regexes) that affect the indentation level'
      order: 3
      items:
        type: 'string'



  activate: (state) ->
    configureParedit()

    @views = new Views(toggle, toggleStrict)
    @persistentSubscriptions = new CompositeDisposable

    utils.addCommands [["toggle", toggle, 'atom-workspace']], @persistentSubscriptions, @views

    @persistentSubscriptions.add atom.config.observe 'lisp-paredit.enabled', (shouldEnable) =>
      if shouldEnable
        @subscriptions = new CompositeDisposable
        enableParedit(@subscriptions, @views)
        if atom.config.get 'lisp-paredit.strict'
          @strictSubscriptions = new CompositeDisposable
          strict.enableStrictMode(@strictSubscriptions, @views)
      else
        disableParedit(@subscriptions, @views)
        strict.disableStrictMode(@strictSubscriptions, @views)

    @persistentSubscriptions.add atom.config.onDidChange 'lisp-paredit.strict', (event) =>
      if event.newValue and atom.config.get 'lisp-paredit.enabled'
        @strictSubscriptions = new CompositeDisposable
        strict.enableStrictMode(@strictSubscriptions, @views)
      else
        strict.disableStrictMode(@strictSubscriptions, @views)

    @persistentSubscriptions.add atom.config.onDidChange 'lisp-paredit.indentationForms', (event) =>
      configureParedit()

  deactivate: ->
    @persistentSubscriptions.dispose() if @persistentSubscriptions
    @subscriptions.dispose() if @subscriptions
    @strictSubscriptions.dispose() if @strictSubscriptions
    @views.detach()

  consumeStatusBar: (statusBar) ->
    @views.setStatusBar(statusBar)
    @views.enabled(atom.config.get('lisp-paredit.enabled'))
    @views.strictModeEnabled(atom.config.get('lisp-paredit.strict'))

disableParedit = (subs, views) ->
  views.enabled(false)
  subs.dispose() if subs

enableParedit = (subs, views) ->
  views.enabled(true)
  utils.addCommands [
    ["slurp-backwards",      edit.slurpBackwards]
    ["slurp-forwards",       edit.slurpForwards]
    ["barf-backwards",       edit.barfBackwards]
    ["barf-forwards",        edit.barfForwards]
    ["kill-sexp-forwards",   edit.killSexpForwards]
    ["kill-sexp-backwards",  edit.killSexpBackwards]
    ["splice",               edit.splice]
    ["splice-backwards",     edit.spliceBackwards]
    ["splice-forwards",      edit.spliceForwards]
    ["split",                edit.split]
    ["forward-sexp",         nav.forwardSexp]
    ["backward-sexp",        nav.backwardSexp]
    ["up-sexp",              nav.upSexp]
    ["down-sexp",            nav.downSexp]
    ["expand-selection",     nav.expandSelection]
    ["indent",               edit.indent]
    ["newline",              edit.newline]
    ["wrap-around-parens",   edit.wrapAroundParens]
    ["wrap-around-square",   edit.wrapAroundSquare]
    ["wrap-around-curly",    edit.wrapAroundCurly]
    ["toggle-strict",        toggleStrict, 'atom-workspace']
  ], subs, views

  subs.add atom.workspace.observeTextEditors (editor) =>
             if utils.isSupportedGrammar(editor.getGrammar())
               observeEditor(editor, subs, views)
             else
               editor.onDidChangeGrammar (grammar) =>
                 if utils.isSupportedGrammar(grammar)
                   observeEditor(editor, subs, views)

observeEditor = (editor, subs, views) ->
  checkSyntax(editor, views)
  subs.add editor.onDidStopChanging ->
    checkSyntax(editor, views)

checkSyntax = (editor, views) ->
  path = editor.getPath()
  ast = paredit.parse(editor.getText())
  if ast.errors
    views.showErrors(editor, ast.errors)
  else
    views.clearErrors(editor)

toggle = () ->
  atom.config.set 'lisp-paredit.enabled', !atom.config.get('lisp-paredit.enabled')

toggleStrict = () ->
  atom.config.set 'lisp-paredit.strict', !atom.config.get('lisp-paredit.strict')

configureParedit = ->
  paredit.specialForms.pop() for [0..paredit.specialForms.length]

  specialForms = atom.config.get("lisp-paredit.indentationForms") or []

  for form in specialForms
    match = form.match /^\/(.+)\/$/
    if match
      form = new RegExp(match[1])
    paredit.specialForms.push form
