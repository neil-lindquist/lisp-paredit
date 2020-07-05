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

    strictSubs.add atom.workspace.observeTextEditors (editor) ->
      if utils.isSupportedGrammar(editor.getGrammar())
        enableEditorStrictMode(strictSubs, editor, views)

  disableStrictMode: (strictSubs, views) ->
    views.strictModeEnabled(false)
    strictSubs.dispose() if strictSubs
    for editor in atom.workspace.getTextEditors()
      view = atom.views.getView(editor)
      utils.removeClass(view, "lisp-paredit-strict")

not_in_string = (editor, point) ->
  index = utils.convertPointToIndex(point, editor)
  text = editor.getText()
  ast = paredit.parse(text)

  filter = ((e) -> e.type == 'string' && e.start < index && e.end > index)

  return paredit.walk.sexpsAt(ast, index, filter).length == 0

enableEditorStrictMode = (strictSubs, editor, views) ->
  view = atom.views.getView(editor)
  utils.addClass(view, "lisp-paredit-strict")

  strictSubs.add editor.onWillInsertText (event) ->
    if event.text.length == 1
      for brace, i in openingBraces
        if event.text == brace
          event.cancel()
          editor.insertText "#{brace}#{closingBraces[i]}"
          editor.moveLeft()

      closeBrace = closingBraces.some (ch) -> ch == event.text
      if closeBrace
        p = editor.getCursorBufferPosition()
        nextCharacter = editor.getTextInBufferRange [[p.row, p.column], [p.row, p.column + 1]]
        if nextCharacter == event.text
          editor.moveRight()
          event.cancel()
        else if not_in_string(editor, p)
          views.invalidInput()
          event.cancel()
    else
      stack = []
      for c in event.text
        if openingBraces.indexOf(c) > -1
          stack.push c
        else if i = closingBraces.indexOf(c) > -1
          stack.pop c if stack[-1] == openingBraces[i]
      if stack.length > 0
        event.cancel()
        views.invalidInput()
