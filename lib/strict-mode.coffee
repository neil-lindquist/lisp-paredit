paredit = require 'paredit.js'
utils = require "./utils"
edit = require "./edit-commands"

closingBraces = [")", "}", "]"]
openingBraces = ["(", "{", "["]

module.exports =
  enableStrictMode: (strictSubs, views) ->
    views.strictModeEnabled(true)
    utils.addCommands [
      ["delete-backwards",     edit.deleteBackwards]
      ["delete-forwards",      edit.deleteForwards]
      ["paste",                edit.paste]
    ], strictSubs, views

    strictSubs.add atom.workspace.observeTextEditors (editor) =>
                     if utils.isSupportedGrammar(editor.getGrammar())
                       enableEditorStrictMode(strictSubs, editor, views)

  disableStrictMode: (strictSubs, views) ->
    views.strictModeEnabled(false)
    strictSubs.dispose() if strictSubs
    for editor in atom.workspace.getTextEditors()
      view = atom.views.getView(editor)
      utils.removeClass(view, "lisp-paredit-strict")

enableEditorStrictMode = (strictSubs, editor, views) ->
  view = atom.views.getView(editor)
  utils.addClass(view, "lisp-paredit-strict")

  strictSubs.add editor.onWillInsertText (event) ->
    ast = paredit.parse(event.text)
    if ast.errors.length > 0
      event.cancel()
      views.invalidInput()
