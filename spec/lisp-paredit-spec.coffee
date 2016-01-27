LispParedit = require '../lib/main'
utils = require '../lib/utils'

describe "LispParedit", ->
  [textEditorElement, editor] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)

    waitsForPromise ->
      atom.packages.activatePackage('language-clojure')

    waitsForPromise ->
      atom.workspace.open('test.clj').then (e) ->
        editor = e
        textEditorElement = atom.views.getView(editor)

    waitsForPromise ->
      atom.packages.activatePackage('lisp-paredit')

  it 'should be active', ->
    expect(atom.packages.isPackageActive('lisp-paredit')).toBe true

  describe "when commands are triggered", ->
    testCommand = (command, text, expected) ->
      it "should #{command}", ->
        [text, cursors, selections] = parseText(text)
        [expectedText, expectedCursors, expectedSelections] = parseText(expected)

        editor.setText(text)
        editor.setCursorBufferPosition(cursors[0]) if cursors.length > 0
        if cursors.length > 1
          for cursor in cursors[1..-1]
            editor.addCursorAtBufferPosition(cursor)

        if selections.length > 0
          [selectionStart, selectionEnd, selectedText] = selections[0]
          editor.setSelectedBufferRange([selectionStart, selectionEnd])

        if selections.length > 1
          for [selectionStart, selectionEnd, selectedText] in selections[1..-1]
            editor.addSelectionForBufferRange([selectionStart, selectionEnd])

        atom.commands.dispatch textEditorElement, "lisp-paredit:#{command}"

        actualText = editor.getText()
        expect(actualText).toEqual(expectedText)

        actualCursors = editor.getCursorBufferPositions()
        assertCursors(actualCursors, expectedCursors)

        actualSelections = editor.getSelections().filter (s) -> !s.isEmpty()
        assertSelections(actualSelections, expectedSelections)

    testCommand "forward-sexp",         "|(a b) (c d)",         "(a b)| (c d)"
    testCommand "forward-sexp",         "|(a\n b) (c d)",       "(a\n b)| (c d)"
    testCommand "backward-sexp",        "(a b)| (c d)",         "|(a b) (c d)"
    testCommand "backward-sexp",        "(a\n b)| (c d)",       "|(a\n b) (c d)"

    testCommand "slurp-backwards",      "(a (|b) c)",           "((a |b) c)"
    testCommand "slurp-backwards",      "(a (|b) c (|d))",      "((a |b) (c |d))"
    testCommand "slurp-backwards",      "|(a (b) c (d))",       "|(a (b) c (d))"
    testCommand "slurp-backwards",      "(a b) |(c d)",         "(a b) |(c d)"

    testCommand "slurp-forwards",       "(a (|b) c)",           "(a (|b c))"
    testCommand "slurp-forwards",       "|(a (b) c)",           "|(a (b) c)"

    testCommand "barf-backwards",       "((a |b) c)",           "(a (|b) c)"
    testCommand "barf-backwards",       "|((a b) c)",           "((a b) c)"
    testCommand "barf-backwards",       "(a b) |(c d)",         "(a b) |(c d)"

    testCommand "barf-forwards",        "((|a b) c)",           "((|a) b c)"
    testCommand "barf-forwards",        "|((a b) c)",           "|((a b) c)"

    testCommand "kill-sexp-forwards",   "((a| b) c)",           "((a|) c)"
    testCommand "kill-sexp-backwards",  "((a |b) c)",           "((|b) c)"

    testCommand "up-sexp",              "((a| b) c)",           "(|(a b) c)"
    testCommand "down-sexp",            "(|(a b) c)",           "((|a b) c)"

    testCommand "splice",               "(a |b c)",             "a |b c"
    testCommand "splice-backwards",     "(a |b c)",             "|b c"
    testCommand "splice-forwards",      "(a |b c)",             "a |"

    testCommand "split",                "(a |b c)",             "(a )| (b c)"

    testCommand "expand-selection",     "(a (b| c) d)",         "(a (<b> c) d)"
    testCommand "expand-selection",     "(a (<b> c) d)",        "(a (<b c>) d)"
    testCommand "expand-selection",     "(a (<b>\n c) d)",      "(a (<b\n c>) d)"

    testCommand "delete-backwards",     "(a b c|)",             "(a b |)"
    testCommand "delete-backwards",     "(a| b| c|)",           "(| | |)"
    testCommand "delete-backwards",     "(|)",                  "|"
    testCommand "delete-backwards",     "(<{:a 1 :b 2}>)",      "(|)"
    testCommand "delete-backwards",     "(<{:a 1\n :b 2}>)",    "(|)"

    testCommand "delete-forwards",      "(<{:a 1 :b 2}>)",      "(|)"
    testCommand "delete-forwards",      "(<{:a 1\n :b 2}>)",    "(|)"
    testCommand "delete-forwards",      "(a b |c)",             "(a b |)"
    testCommand "delete-forwards",      "(|a |b |c)",           "(| | |)"
    testCommand "delete-forwards",      "(|)",                  "|"

    testCommand "newline",              "(abc def|)",           "(abc def\n     )"

    testCommand "wrap-around-parens",   "|a b",                 "(|a) b"
    testCommand "wrap-around-square",   "|a b",                 "[|a] b"
    testCommand "wrap-around-curly",    "|a b",                 "{|a} b"

    it "should indent text", ->
      editor.setText("""

      (defn foo
      [bar]
      {:baz boo
              :plop poo})

      """)

      editor.setCursorBufferPosition([1, 0])

      atom.commands.dispatch textEditorElement, "lisp-paredit:indent"

      expect(editor.getText()).toEqual("""

      (defn foo
        [bar]
        {:baz boo
         :plop poo})

      """)

      expect(editor.getCursorBufferPosition()).toEqual([1, 0])

    it "should indent after barf", ->
      editor.setText("""

      (foo
        (bar))
      """)

      editor.setCursorBufferPosition([1, 4])

      atom.commands.dispatch textEditorElement, "lisp-paredit:barf-forwards"

      expect(editor.getText()).toEqual("""

      (foo)
      (bar)
      """)

    it "should indent after slurp", ->
      editor.setText("""

      (foo)
      (bar)
      """)

      editor.setCursorBufferPosition([1, 4])

      atom.commands.dispatch textEditorElement, "lisp-paredit:slurp-forwards"

      expect(editor.getText()).toEqual("""

      (foo
       (bar))
      """)

    describe "strict mode", ->
      it "should not allow close brackets to be inserted when strict mode enabled", ->
        atom.config.set('lisp-paredit.strict', true)
        editor.setText("")
        editor.insertText(")")
        expect(editor.getText()).toEqual("")

      it "should allow close brackets to be inserted when strict mode disabled", ->
        atom.config.set('lisp-paredit.strict', false)
        editor.setText("")
        editor.insertText(")")
        expect(editor.getText()).toEqual(")")

      it "should ensure close brackets are inserted when strict mode enabled", ->
        atom.config.set('lisp-paredit.strict', true)
        editor.setText("foo")
        editor.setCursorBufferPosition([0, 0])
        editor.insertText("(")
        expect(editor.getText()).toEqual("()foo")
        expect(editor.getCursorBufferPosition()).toEqual([0, 1])

      it "should not add close brackets when strict mode disabled", ->
        atom.config.set('lisp-paredit.strict', false)
        editor.setText("foo")
        editor.setCursorBufferPosition([0, 0])
        editor.insertText("(")
        expect(editor.getText()).toEqual("(foo")
        expect(editor.getCursorBufferPosition()).toEqual([0, 1])

      it "should allow matching brackets to be inserted", ->
        atom.config.set('lisp-paredit.strict', true)
        editor.setText("")
        editor.insertText("()")
        expect(editor.getText()).toEqual("()")

      it "should disallow invalid paste input", ->
        atom.config.set('lisp-paredit.strict', true)
        editor.setText("")
        editor.setCursorBufferPosition([0, 0])

        atom.clipboard.write("(")
        atom.commands.dispatch textEditorElement, "lisp-paredit:paste"
        expect(editor.getText()).toEqual("")

      it "should allow valid paste input", ->
        atom.config.set('lisp-paredit.strict', true)
        editor.setText("")
        editor.setCursorBufferPosition([0, 0])

        atom.clipboard.write("(foo bar)")
        atom.commands.dispatch textEditorElement, "lisp-paredit:paste"
        expect(editor.getText()).toEqual("(foo bar)")

      it "should move cursor if close brace is entered", ->
        atom.config.set('lisp-paredit.strict', true)
        editor.setText("()")
        editor.setCursorBufferPosition([0, 1])

        editor.insertText(")")
        expect(editor.getText()).toEqual("()")
        expect(editor.getCursorBufferPosition()).toEqual({row: 0, column: 2})


      # TODO: work out how to send keypresses
      # it "should not allow close brackets to be deleted when strict mode enabled", ->
      #   atom.config.set('lisp-paredit.strict', true)
      #   editor.setText("(foo)")
      #   editor.setCursorBufferPosition([0, 5])
      #   atom.commands.dispatch textEditorElement, "lisp-paredit:backspace"
      #   expect(editor.getText()).toEqual("(foo)")
      #
      # it "should allow close brackets to be deleted when strict mode disabled", ->
      #   atom.config.set('lisp-paredit.strict', false)
      #   editor.setText("(foo)")
      #   editor.setCursorBufferPosition([0, 5])
      #   atom.commands.dispatch textEditorElement, "lisp-paredit:backspace"
      #   expect(editor.getText()).toEqual("(foo")

assertCursors = (actualCursors, expectedCursors) ->
  if expectedCursors.length > 0
    expect(actualCursors.length).toEqual(expectedCursors.length)

  for i in [0..expectedCursors.length-1] by 1
    expect(actualCursors[i]).toEqual(expectedCursors[i])

assertSelections = (actualSelections, expectedSelections) ->
  expect(actualSelections.length).toEqual(expectedSelections.length)

  for i in [0..expectedSelections.length-1] by 1
    start = actualSelections[i].getBufferRange().start
    end = actualSelections[i].getBufferRange().end
    text = actualSelections[i].getText()
    [expectedStart, expectedEnd, expectedSelection] = expectedSelections[i]
    expect(start).toEqual(expectedStart)
    expect(end).toEqual(expectedEnd)
    expect(text).toEqual(expectedSelection)

parseText = (text) ->
  cursors = []
  while (cursor = text.indexOf("\|")) > -1
    cursors.push utils.indexToPoint(cursor, text)
    text = text.replace(/\|/, "")

  return [text, cursors, []] if cursors.length > 0

  selections = []
  while (selectionStart = text.indexOf("<")) > -1
    selectionEnd = text.indexOf(">") - 1
    if selectionStart >= 0 and selectionEnd >= 0
      text = text.replace(/</, "").replace(/>/, "")
      selectedText = text.substring(selectionStart, selectionEnd)
      selections.push [utils.indexToPoint(selectionStart, text), utils.indexToPoint(selectionEnd, text), selectedText]

  return [text, [], selections] if selections.length > 0

  [text, [], []]
