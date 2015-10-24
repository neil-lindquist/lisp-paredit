{Range, Point} = require 'atom'

grammars = ["Clojure", "Lisp", "Scheme", "Newlisp"]

module.exports =
  indexToPoint: (index, src) ->
    substr = src.substring(0, index)
    row = (substr.match(/\n/g) || []).length
    lineStart = substr.lastIndexOf("\n") + 1

    column = index - lineStart

    {row: row, column: column}

  isSupportedGrammar: (grammar) ->
    grammars.some (g) -> g == grammar.name

  addClass: (view, clazz) ->
    view.className = view.className + " " + clazz

  removeClass: (view, clazz) ->
    regex = new RegExp("#{clazz}", "g")
    view.className = view.className.replace regex, ''

  convertPointToIndex: (point, editor) ->
    range = new Range(new Point(0, 0), point)
    editor.getTextInBufferRange(range).length

  convertIndexToPoint: (index, editor) ->
    p = @indexToPoint(index, editor.getText())
    new Point(p.row, p.column)

  addCommands: (commands, subs, views) ->
    addCommand(command, subs, views) for command in commands

  lineEnding: (editor) ->
    editor.buffer.getPreferredLineEnding() or getDefaultLineEnding()

  lineEndingForRow: (row, editor) ->
    editor.buffer.lineEndingForRow(row) or @lineEnding(editor)

getDefaultLineEnding = ->
  switch atom.config.get('line-ending-selector.defaultLineEnding')
    when 'LF' then '\n'
    when 'CRLF' then '\r\n'
    else
      if process.platform == 'win32' then '\r\n' else '\n'

addCommand = (command, subs, views) ->
  scope = if command.length == 3 then command[2] else 'atom-text-editor'
  subs.add atom.commands.add scope, "lisp-paredit:#{command[0]}", -> command[1](views)
