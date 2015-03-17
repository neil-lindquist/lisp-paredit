LispParedit = require '../lib/main'

describe "LispParedit", ->
  [textEditorElement, activationPromise, editor] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('lisp-paredit')

    waitsForPromise ->
      atom.workspace.open('test.clj').then (e) =>
        editor = e
        textEditorElement = atom.views.getView(editor)

  describe "when commands are triggered", ->
    parseText = (text) ->
      cursor = text.indexOf("\|")
      if cursor >= 0
        return [text.replace(/\|/, ""), cursor, -1, -1, null]

      selectionStart = text.indexOf("<")
      selectionEnd = text.indexOf(">")
      if selectionStart >= 0 and selectionEnd >= 0
        selectedText = text.match(/\<(.+)\>/)[1]
        return [text.replace(/[\<\>]/g, ""), -1, selectionStart, selectionEnd - 1, selectedText]

      return [text, -1, -1, -1, null]


    testCommand = (command, text, expected) ->
      it "should #{command}", ->
        [text, cursor, selectionStart, selectionEnd, selectedText] = parseText(text)
        [expectedText, expectedCursor, expectedStart, expectedEnd, expectedSelection] = parseText(expected)

        editor.setText(text)
        if cursor >= 0
          editor.setCursorBufferPosition([0, cursor])
        else if selectedText
          editor.setSelectedBufferRange(([[0, selectionStart], [0, selectionEnd]]))

        atom.commands.dispatch textEditorElement, "lisp-paredit:#{command}"

        waitsForPromise ->
          activationPromise

        actualText = editor.getText()
        actualCursor = editor.getCursorBufferPosition().column
        actualSelection = editor.getSelectedBufferRange()

        if expectedCursor >= 0
          expect(actualCursor).toEqual(expectedCursor)
          expect(actualText).toEqual(expectedText)
        else if expectedSelection
          start = actualSelection.start.column
          end = actualSelection.end.column
          expect(start).toEqual(expectedStart)
          expect(end).toEqual(expectedEnd)
          expect(editor.getSelectedText()).toEqual(expectedSelection)
          expect(actualText).toEqual(expectedText)

    testCommand "forward-sexp",         "|(a b) (c d)",         "(a b)| (c d)"
    testCommand "backward-sexp",        "(a b)| (c d)",         "|(a b) (c d)"
    testCommand "slurp-backwards",      "(a (|b) c)",           "((a |b) c)"
    testCommand "slurp-forwards",       "(a (|b) c)",           "(a (|b c))"
    testCommand "barf-backwards",       "((a |b) c)",           "(a (|b) c)"
    testCommand "barf-forwards",        "((|a b) c)",           "((|a) b c)"
    testCommand "kill-sexp-forwards",   "((a| b) c)",           "((a|) c)"
    testCommand "kill-sexp-backwards",  "((a |b) c)",           "((|b) c)"
    testCommand "up-sexp",              "((a| b) c)",           "(|(a b) c)"
    testCommand "down-sexp",            "(|(a b) c)",           "((|a b) c)"
    testCommand "expand-selection",     "(a (b| c) d)",         "(a (<b> c) d)"
    testCommand "expand-selection",     "(a (<b> c) d)",        "(a (<b c>) d)"

    it "should format text", ->
      editor.setText("""

      (defn foo
      [bar]
      {:baz boo
              :plop poo})

      """)

      editor.setCursorBufferPosition([1, 0])

      atom.commands.dispatch textEditorElement, "lisp-paredit:format"

      waitsForPromise ->
        activationPromise

      expect(editor.getText()).toEqual("""

      (defn foo
        [bar]
        {:baz boo
         :plop poo})

      """)
