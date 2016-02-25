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
var vec__45566 = ranges;
var range = cljs.core.nth.call(null,vec__45566,(0),null);
var rest = cljs.core.nthnext.call(null,vec__45566,(1));
var start = lisp_paredit.utils.convert_point_to_index.call(null,(range["start"]),editor);
var end = lisp_paredit.utils.convert_point_to_index.call(null,(range["end"]),editor);
var new_src = [cljs.core.str(src.slice((0),start)),cljs.core.str(text),cljs.core.str(src.slice(end))].join('');
if(cljs.core.empty_QMARK_.call(null,rest)){
return new_src;
} else {
var G__45567 = new_src;
var G__45568 = text;
var G__45569 = rest;
var G__45570 = editor;
src = G__45567;
text = G__45568;
ranges = G__45569;
editor = G__45570;
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
return lisp_paredit.utils.add_commands.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["core:backspace",lisp_paredit.utils.editor_command_event_wrapper.call(null,lisp_paredit.commands.edit.delete_backwards)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["core:delete",lisp_paredit.utils.editor_command_event_wrapper.call(null,lisp_paredit.commands.edit.delete_forwards)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["core:paste",lisp_paredit.utils.editor_command_event_wrapper.call(null,lisp_paredit.commands.edit.paste)], null)], null),subs);
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

var seq__45575 = cljs.core.seq.call(null,atom.workspace.getTextEditors());
var chunk__45576 = null;
var count__45577 = (0);
var i__45578 = (0);
while(true){
if((i__45578 < count__45577)){
var editor = cljs.core._nth.call(null,chunk__45576,i__45578);
lisp_paredit.utils.remove_class.call(null,atomio.views.get_view.call(null,editor),"lisp-paredit-strict");

var G__45579 = seq__45575;
var G__45580 = chunk__45576;
var G__45581 = count__45577;
var G__45582 = (i__45578 + (1));
seq__45575 = G__45579;
chunk__45576 = G__45580;
count__45577 = G__45581;
i__45578 = G__45582;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__45575);
if(temp__4425__auto__){
var seq__45575__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45575__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__45575__$1);
var G__45583 = cljs.core.chunk_rest.call(null,seq__45575__$1);
var G__45584 = c__6945__auto__;
var G__45585 = cljs.core.count.call(null,c__6945__auto__);
var G__45586 = (0);
seq__45575 = G__45583;
chunk__45576 = G__45584;
count__45577 = G__45585;
i__45578 = G__45586;
continue;
} else {
var editor = cljs.core.first.call(null,seq__45575__$1);
lisp_paredit.utils.remove_class.call(null,atomio.views.get_view.call(null,editor),"lisp-paredit-strict");

var G__45587 = cljs.core.next.call(null,seq__45575__$1);
var G__45588 = null;
var G__45589 = (0);
var G__45590 = (0);
seq__45575 = G__45587;
chunk__45576 = G__45588;
count__45577 = G__45589;
i__45578 = G__45590;
continue;
}
} else {
return null;
}
}
break;
}
});
