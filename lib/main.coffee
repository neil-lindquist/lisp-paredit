{CompositeDisposable, Range, Point} = require 'atom'
paredit = require 'paredit.js'
utils = require "./utils"
Views = require "./views"


module.exports = LispParedit =
  subscriptions: null
  persistentSubscriptions: null
  strictSubscriptions: null
  views: null

  config:
    enabled:
      type: 'boolean'
      default: true
    strict:
      type: 'boolean'
      default: true

  activate: (state) ->
    @views = new Views(toggle, toggleStrict)
    @persistentSubscriptions = new CompositeDisposable

    addCommands [["toggle", toggle, 'atom-workspace']], @persistentSubscriptions

    atom.config.observe 'lisp-paredit.enabled', (shouldEnable) =>
      if shouldEnable
        @subscriptions = new CompositeDisposable
        enableParedit(@subscriptions, @views)
        if atom.config.get 'lisp-paredit.strict'
          @strictSubscriptions = new CompositeDisposable
          enableStrictMode(@strictSubscriptions, @views)
      else
        disableParedit(@subscriptions, @views)
        disableStrictMode(@strictSubscriptions, @views)

    atom.config.onDidChange 'lisp-paredit.strict', (event) =>
      if event.newValue and atom.config.get 'lisp-paredit.enabled'
        @strictSubscriptions = new CompositeDisposable
        enableStrictMode(@strictSubscriptions, @views)
      else
        disableStrictMode(@strictSubscriptions, @views)

  deactivate: ->
    @persistentSubscriptions.dispose() if @persistentSubscriptions
    @subscriptions.dispose() if @subscriptions
    @strictSubscriptions.dispose() if @strictSubscriptions

  consumeStatusBar: (statusBar) ->
    @views.setStatusBar(statusBar)
    @views.enabled(atom.config.get('lisp-paredit.enabled'))
    @views.strictModeEnabled(atom.config.get('lisp-paredit.strict'))

grammars = ["Clojure", "Lisp", "Scheme", "Newlisp"]
strictChars = [")", "}", "]"]

enableStrictMode = (strictSubs, views) ->
  views.strictModeEnabled(true)
  addCommands [
    ["delete-backwards",     deleteBackwards]
    ["delete-forwards",      deleteForwards]
  ], strictSubs

  strictSubs.add atom.workspace.observeTextEditors (editor) =>
                   if isSupportedGrammar(editor.getGrammar())
                     enableEditorStrictMode(strictSubs, editor)

enableEditorStrictMode = (strictSubs, editor) ->
  view = atom.views.getView(editor)
  addClass(view, "lisp-paredit-strict")

  strictSubs.add editor.onWillInsertText (event) ->
    closeBrace = strictChars.some (ch) -> ch == event.text
    event.cancel() if closeBrace

disableStrictMode = (strictSubs, views) ->
  views.strictModeEnabled(false)
  strictSubs.dispose()
  for editor in atom.workspace.getTextEditors()
    view = atom.views.getView(editor)
    removeClass(view, "lisp-paredit-strict")

disableParedit = (subs, views) ->
  views.enabled(false)
  subs.dispose()

enableParedit = (subs, views) ->
  views.enabled(true)
  addCommands [
    ["slurp-backwards",      slurpBackwards]
    ["slurp-forwards",       slurpForwards]
    ["barf-backwards",       barfBackwards]
    ["barf-forwards",        barfForwards]
    ["kill-sexp-forwards",   killSexpForwards]
    ["kill-sexp-backwards",  killSexpBackwards]
    ["forward-sexp",         forwardSexp]
    ["backward-sexp",        backwardSexp]
    ["up-sexp",              upSexp]
    ["down-sexp",            downSexp]
    ["expand-selection",     expandSelection]
    ["indent",               indent]
    ["newline",              newline]
    ["toggle-strict",        toggleStrict, 'atom-workspace']
  ], subs

  subs.add atom.workspace.observeTextEditors (editor) =>
             if isSupportedGrammar(editor.getGrammar())
               observeEditor(editor, subs, views)
             else
               editor.onDidChangeGrammar (grammar) =>
                 if isSupportedGrammar(grammar)
                   observeEditor(editor, subs, views)

isSupportedGrammar = (grammar) ->
  grammars.some (g) -> g == grammar.name

observeEditor = (editor, subs, views) ->
  checkSyntax(editor, views)
  subs.add editor.onDidStopChanging ->
    checkSyntax(editor, views)

addClass = (view, clazz) ->
  view.className = view.className + " " + clazz

removeClass = (view, clazz) ->
  regex = new RegExp("#{clazz}", "g")
  view.className = view.className.replace regex, ''

checkSyntax = (editor, views) ->
  path = editor.getPath()
  ast = paredit.parse(editor.getText())
  if ast.errors
    views.showErrors(editor, ast.errors)
  else
    views.clearErrors(editor)

addCommands = (commands, subs) ->
  for command in commands
    scope = if command.length == 3 then command[2] else 'atom-text-editor'
    subs.add atom.commands.add scope, "lisp-paredit:#{command[0]}", command[1]

parse = (src) ->
  paredit.parse(src)

slurpBackwards = ->
  edit(paredit.editor.slurpSexp, backward: true)

slurpForwards = ->
  edit(paredit.editor.slurpSexp, backward: false)

barfBackwards = ->
  edit(paredit.editor.barfSexp, backward: true)

barfForwards = ->
  edit(paredit.editor.barfSexp, backward: false)

killSexpForwards = ->
  edit(paredit.editor.killSexp, backward: false)

killSexpBackwards = ->
  edit(paredit.editor.killSexp, backward: true)

edit = (fn, args) ->
  editor = atom.workspace.getActiveTextEditor()
  cursors = editor.getCursorsOrderedByBufferPosition()
  indexes = []

  selections = editor.getSelections().filter (s) -> !s.isEmpty()
  newIndexes = []

  editor.transact ->
    if selections.length > 0
      for selection in selections
        src = editor.getText()
        ast = parse(src)
        startIndex = selection.getBufferRange().start
        endIndex = selection.getBufferRange().end
        index = convertPointToIndex(startIndex, editor)
        args.endIdx = convertPointToIndex(endIndex, editor)
        args.freeEdits = true
        result = fn(ast, src, index, args)

        newIndexes.push result.newIndex if result?.newIndex

        if result?.changes
          applyChanges
            changes: result.changes,
            editor
    else
      for cursor in cursors
        index = convertPointToIndex(cursor.getBufferPosition(), editor)

        src = editor.getText()
        ast = parse(src)
        result = null
        try
          result = fn(ast, src, index, args)
        catch err
          console.error "[Lisp Paredit] Error calling paredit.js", err

        newIndexes.push result.newIndex if result?.newIndex
        if result?.changes
          applyChanges
            changes: result.changes,
            editor

    if newIndexes.length > 0
      applyChanges
        newIndexes: newIndexes,
        editor

navigate = (fn) ->
  editor = atom.workspace.getActiveTextEditor()
  ast = parse(editor.getText())
  cursor = editor.getCursorBufferPosition()
  index = convertPointToIndex(cursor, editor)
  result = fn(ast, index)
  point = convertIndexToPoint(result, editor)
  editor.setCursorBufferPosition(point)

forwardSexp = ->
  navigate(paredit.navigator.forwardSexp)
backwardSexp = ->
  navigate(paredit.navigator.backwardSexp)
upSexp = ->
  navigate(paredit.navigator.backwardUpSexp)
downSexp = ->
  navigate(paredit.navigator.forwardDownSexp)

expandSelection = ->
  editor = atom.workspace.getActiveTextEditor()
  ast = parse(editor.getText())
  range = editor.getSelectedBufferRange()
  startIndex = convertPointToIndex(range.start, editor)
  endIndex = convertPointToIndex(range.end, editor)

  res = paredit.navigator.sexpRangeExpansion(ast, startIndex, endIndex)
  if res and res.length == 2
    [start, end] = res
    newSelection = new Range(convertIndexToPoint(start, editor), convertIndexToPoint(end, editor))
    editor.setSelectedBufferRange(newSelection)

indent = ->
  editor = atom.workspace.getActiveTextEditor()
  range = editor.getSelectedBufferRange()
  indentRange(range, editor)

indentRange = (range, editor) ->
  ast = parse(editor.getText())
  src = editor.getText()

  if range.isEmpty()
    expanded = paredit.navigator.sexpRangeExpansion(ast,
      convertPointToIndex(range.start, editor),
      convertPointToIndex(range.end, editor))
    if expanded and expanded.length == 2
      [start, end] = expanded
  else
    start = convertPointToIndex(range.start, editor)
    end = convertPointToIndex(range.end, editor)

  if start and end
    result = paredit.editor.indentRange(ast, src, start, end)
    editor.transact ->
      applyChanges({changes:result.changes}, editor)

applyChanges = (result, editor) ->
  if result
    if result.changes
      for change in result.changes
        pareditChangeFns[change[0]](editor, change.slice(1))

    if result.newIndex or result.newIndexes
      indexes = result.newIndexes or []
      indexes.push result.newIndex if result.newIndex

      first = indexes.slice(0,1)
      rest = indexes.slice(1)

      point = convertIndexToPoint(first, editor)
      editor.setCursorBufferPosition(point)

      for newIndex in rest
        point = convertIndexToPoint(newIndex, editor)
        editor.addCursorAtBufferPosition(point)

pareditChangeFns =
  insert: (editor, [index, text]) ->
    point = convertIndexToPoint(index, editor)
    range = new Range(point, point)
    editor.setTextInBufferRange(range, text)

  remove: (editor, [index, length]) ->
    start = convertIndexToPoint(index, editor)
    end = convertIndexToPoint(index + length, editor)
    range = new Range(start, end)
    editor.setTextInBufferRange(range, "")

convertPointToIndex = (point, editor) ->
  range = new Range(new Point(0, 0), point)
  editor.getTextInBufferRange(range).length

convertIndexToPoint = (index, editor) ->
  p = utils.indexToPoint(index, editor.getText())
  new Point(p.row, p.column)

deleteBackwards = () ->
  edit(paredit.editor.delete, {backward: true})

deleteForwards = () ->
  edit(paredit.editor.delete, {backward: false})

newline = () ->
  editor = atom.workspace.getActiveTextEditor()
  cursors = editor.getCursorsOrderedByBufferPosition()
  newSrc = editor.getText()
  indices = []

  for cursor in cursors
    index = convertPointToIndex(cursor.getBufferPosition(), editor)
    indices.push index
    newSrc = newSrc.slice(0, index) + "\n" + newSrc.slice(index)

  ast = paredit.parse(newSrc, {})

  changes = []
  newIndexes = []

  for index in indices
    res = paredit.editor.indentRange(ast, newSrc, index+1, index+1)
    changes.push ['insert', index, "\n"]
    changes = changes.concat res.changes
    newIndexes.push res.newIndex

  editor.transact ->
    applyChanges
      changes: changes
      newIndexes: newIndexes,
      editor

toggle = () ->
  atom.config.set 'lisp-paredit.enabled', !atom.config.get('lisp-paredit.enabled')

toggleStrict = () ->
  atom.config.set 'lisp-paredit.strict', !atom.config.get('lisp-paredit.strict')
