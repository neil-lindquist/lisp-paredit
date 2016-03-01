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
lisp_paredit.strict.opening_braces = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["(","{","[","<","\""], null);
lisp_paredit.strict.closing_braces = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [")","}","]",">","\""], null);
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
var vec__14241 = ranges;
var range = cljs.core.nth.call(null,vec__14241,(0),null);
var rest = cljs.core.nthnext.call(null,vec__14241,(1));
var start = lisp_paredit.utils.convert_point_to_index.call(null,(range["start"]),editor);
var end = lisp_paredit.utils.convert_point_to_index.call(null,(range["end"]),editor);
var new_src = [cljs.core.str(src.slice((0),start)),cljs.core.str(text),cljs.core.str(src.slice(end))].join('');
if(cljs.core.empty_QMARK_.call(null,rest)){
return new_src;
} else {
var G__14242 = new_src;
var G__14243 = text;
var G__14244 = rest;
var G__14245 = editor;
src = G__14242;
text = G__14243;
ranges = G__14244;
editor = G__14245;
continue;
}
break;
}
});
lisp_paredit.strict.check_insert_text = (function lisp_paredit$strict$check_insert_text(text,editor,event){
var src = editor.getText();
var selections = editor.getSelectedBufferRanges();
var new_src = lisp_paredit.strict.replace_text.call(null,src,text,selections,editor);
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

var seq__14250 = cljs.core.seq.call(null,atom.workspace.getTextEditors());
var chunk__14251 = null;
var count__14252 = (0);
var i__14253 = (0);
while(true){
if((i__14253 < count__14252)){
var editor = cljs.core._nth.call(null,chunk__14251,i__14253);
lisp_paredit.utils.remove_class.call(null,atomio.views.get_view.call(null,editor),"lisp-paredit-strict");

var G__14254 = seq__14250;
var G__14255 = chunk__14251;
var G__14256 = count__14252;
var G__14257 = (i__14253 + (1));
seq__14250 = G__14254;
chunk__14251 = G__14255;
count__14252 = G__14256;
i__14253 = G__14257;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__14250);
if(temp__4425__auto__){
var seq__14250__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14250__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__14250__$1);
var G__14258 = cljs.core.chunk_rest.call(null,seq__14250__$1);
var G__14259 = c__6945__auto__;
var G__14260 = cljs.core.count.call(null,c__6945__auto__);
var G__14261 = (0);
seq__14250 = G__14258;
chunk__14251 = G__14259;
count__14252 = G__14260;
i__14253 = G__14261;
continue;
} else {
var editor = cljs.core.first.call(null,seq__14250__$1);
lisp_paredit.utils.remove_class.call(null,atomio.views.get_view.call(null,editor),"lisp-paredit-strict");

var G__14262 = cljs.core.next.call(null,seq__14250__$1);
var G__14263 = null;
var G__14264 = (0);
var G__14265 = (0);
seq__14250 = G__14262;
chunk__14251 = G__14263;
count__14252 = G__14264;
i__14253 = G__14265;
continue;
}
} else {
return null;
}
}
break;
}
});
