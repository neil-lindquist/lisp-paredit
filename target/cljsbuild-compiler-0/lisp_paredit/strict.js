// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.strict');
goog.require('cljs.core');
goog.require('lisp_paredit.commands.edit');
goog.require('lisp_paredit.status_bar_view');
goog.require('paredit_js.core');
goog.require('atomio.views');
goog.require('atomio.workspace');
goog.require('lisp_paredit.utils');
goog.require('atomio.commands');
lisp_paredit.strict.braces = new cljs.core.PersistentArrayMap(null, 5, ["(",")","{","}","[","]","<",">","\"","\""], null);
lisp_paredit.strict.opening_braces = cljs.core.set.call(null,cljs.core.keys.call(null,lisp_paredit.strict.braces));
lisp_paredit.strict.closing_braces = cljs.core.set.call(null,cljs.core.vals.call(null,lisp_paredit.strict.braces));
lisp_paredit.strict.closing_brace = (function lisp_paredit$strict$closing_brace(opening_brace){
return cljs.core.get.call(null,lisp_paredit.strict.braces,opening_brace);
});
lisp_paredit.strict.move_cursor = (function lisp_paredit$strict$move_cursor(char$,editor){
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,char$))){
var temp__4425__auto__ = cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([char$], true),lisp_paredit.strict.closing_braces);
if(cljs.core.truth_(temp__4425__auto__)){
var close_brace = temp__4425__auto__;
var p = editor.getCursorBufferPosition();
var range = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lisp_paredit.utils.__GT_Point.call(null,(p["row"]),(p["column"])),lisp_paredit.utils.__GT_Point.call(null,(p["row"]),((p["column"]) + (1)))], null);
var next_char = editor.getTextInBufferRange(cljs.core.clj__GT_js.call(null,range));
if(cljs.core._EQ_.call(null,next_char,char$)){
editor.moveRight();

return true;
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
});
lisp_paredit.strict.replace_text = (function lisp_paredit$strict$replace_text(src,text,ranges,editor){
while(true){
var vec__29118 = ranges;
var range = cljs.core.nth.call(null,vec__29118,(0),null);
var rest = cljs.core.nthnext.call(null,vec__29118,(1));
var start = lisp_paredit.utils.convert_point_to_index.call(null,(range["start"]),editor);
var end = lisp_paredit.utils.convert_point_to_index.call(null,(range["end"]),editor);
var new_src = [cljs.core.str(src.slice((0),start)),cljs.core.str(text),cljs.core.str(src.slice(end))].join('');
if(cljs.core.empty_QMARK_.call(null,rest)){
return new_src;
} else {
var G__29119 = new_src;
var G__29120 = text;
var G__29121 = rest;
var G__29122 = editor;
src = G__29119;
text = G__29120;
ranges = G__29121;
editor = G__29122;
continue;
}
break;
}
});
lisp_paredit.strict.check_insert_text = (function lisp_paredit$strict$check_insert_text(text,editor,event){
var new_text = (cljs.core.truth_((function (){var and__6130__auto__ = cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,text));
if(and__6130__auto__){
return cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([text], true),lisp_paredit.strict.opening_braces);
} else {
return and__6130__auto__;
}
})())?[cljs.core.str(text),cljs.core.str(lisp_paredit.strict.closing_brace.call(null,text))].join(''):text);
var src = editor.getText();
var selections = editor.getSelectedBufferRanges();
var new_src = lisp_paredit.strict.replace_text.call(null,src,new_text,selections,editor);
var ast = paredit_js.core.parse.call(null,new_src);
if(cljs.core.truth_(cljs.core.not_empty.call(null,(ast["errors"])))){
event.cancel();

if(cljs.core.truth_(lisp_paredit.strict.move_cursor.call(null,text,editor))){
return null;
} else {
return lisp_paredit.status_bar_view.invalid_input.call(null);
}
} else {
return null;
}
});
lisp_paredit.strict.invalid_input = (function lisp_paredit$strict$invalid_input(event){
event.cancel();

return lisp_paredit.status_bar_view.invalid_input.call(null);
});
lisp_paredit.strict.enable_editor_strict_mode = (function lisp_paredit$strict$enable_editor_strict_mode(strict_subs,editor){
var view = atomio.views.get_view.call(null,editor);
lisp_paredit.utils.add_class.call(null,view,"lisp-paredit-strict");

return strict_subs.add(editor.onWillInsertText(((function (view){
return (function (event){
var text = (event["text"]);
return lisp_paredit.strict.check_insert_text.call(null,text,editor,event);
});})(view))
));
});
lisp_paredit.strict.add_commands = (function lisp_paredit$strict$add_commands(subs){
return lisp_paredit.utils.add_commands.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["core:backspace",lisp_paredit.utils.editor_command_event_wrapper.call(null,lisp_paredit.commands.edit.delete_backwards),lisp_paredit.utils.lisp_selector], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["core:delete",lisp_paredit.utils.editor_command_event_wrapper.call(null,lisp_paredit.commands.edit.delete_forwards),lisp_paredit.utils.lisp_selector], null)], null),subs);
});
lisp_paredit.strict.enable = (function lisp_paredit$strict$enable(strict_subs){
strict_subs.add(atom.workspace.observeTextEditors((function (editor){
if(cljs.core.truth_(lisp_paredit.utils.supported_grammar_QMARK_.call(null,editor.getGrammar()))){
return lisp_paredit.strict.enable_editor_strict_mode.call(null,strict_subs,editor);
} else {
return null;
}
})));

return lisp_paredit.strict.add_commands.call(null,strict_subs);
});
lisp_paredit.strict.disable = (function lisp_paredit$strict$disable(strict_subs){
if(cljs.core.truth_(strict_subs)){
strict_subs.dispose();
} else {
}

var seq__29127 = cljs.core.seq.call(null,atom.workspace.getTextEditors());
var chunk__29128 = null;
var count__29129 = (0);
var i__29130 = (0);
while(true){
if((i__29130 < count__29129)){
var editor = cljs.core._nth.call(null,chunk__29128,i__29130);
lisp_paredit.utils.remove_class.call(null,atomio.views.get_view.call(null,editor),"lisp-paredit-strict");

var G__29131 = seq__29127;
var G__29132 = chunk__29128;
var G__29133 = count__29129;
var G__29134 = (i__29130 + (1));
seq__29127 = G__29131;
chunk__29128 = G__29132;
count__29129 = G__29133;
i__29130 = G__29134;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__29127);
if(temp__4425__auto__){
var seq__29127__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29127__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__29127__$1);
var G__29135 = cljs.core.chunk_rest.call(null,seq__29127__$1);
var G__29136 = c__6945__auto__;
var G__29137 = cljs.core.count.call(null,c__6945__auto__);
var G__29138 = (0);
seq__29127 = G__29135;
chunk__29128 = G__29136;
count__29129 = G__29137;
i__29130 = G__29138;
continue;
} else {
var editor = cljs.core.first.call(null,seq__29127__$1);
lisp_paredit.utils.remove_class.call(null,atomio.views.get_view.call(null,editor),"lisp-paredit-strict");

var G__29139 = cljs.core.next.call(null,seq__29127__$1);
var G__29140 = null;
var G__29141 = (0);
var G__29142 = (0);
seq__29127 = G__29139;
chunk__29128 = G__29140;
count__29129 = G__29141;
i__29130 = G__29142;
continue;
}
} else {
return null;
}
}
break;
}
});
