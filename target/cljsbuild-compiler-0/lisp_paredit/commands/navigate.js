// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.commands.navigate');
goog.require('cljs.core');
goog.require('paredit_js.core');
goog.require('atomio.workspace');
goog.require('paredit_js.navigator');
goog.require('lisp_paredit.utils');
goog.require('atomio.core');
lisp_paredit.commands.navigate.navigate = (function lisp_paredit$commands$navigate$navigate(f){
var editor = atomio.workspace.get_active_text_editor.call(null);
var ast = paredit_js.core.parse.call(null,editor.getText());
var cursor = editor.getCursorBufferPosition();
var index = lisp_paredit.utils.convert_point_to_index.call(null,cursor,editor);
var result = f.call(null,ast,index);
var point = lisp_paredit.utils.convert_index_to_point.call(null,result,editor);
return editor.setCursorBufferPosition(point);
});
lisp_paredit.commands.navigate.forward_sexp = (function lisp_paredit$commands$navigate$forward_sexp(){
return lisp_paredit.commands.navigate.navigate.call(null,paredit_js.navigator.forward_sexp);
});
lisp_paredit.commands.navigate.backward_sexp = (function lisp_paredit$commands$navigate$backward_sexp(){
return lisp_paredit.commands.navigate.navigate.call(null,paredit_js.navigator.backward_sexp);
});
lisp_paredit.commands.navigate.up_sexp = (function lisp_paredit$commands$navigate$up_sexp(){
return lisp_paredit.commands.navigate.navigate.call(null,paredit_js.navigator.backward_up_sexp);
});
lisp_paredit.commands.navigate.down_sexp = (function lisp_paredit$commands$navigate$down_sexp(){
return lisp_paredit.commands.navigate.navigate.call(null,paredit_js.navigator.forward_down_sexp);
});
lisp_paredit.commands.navigate.expand_selection = (function lisp_paredit$commands$navigate$expand_selection(){
var editor = atomio.workspace.get_active_text_editor.call(null);
var ast = paredit_js.core.parse.call(null,editor.getText());
var range = editor.getSelectedBufferRange();
var start_index = lisp_paredit.utils.convert_point_to_index.call(null,(range["start"]),editor);
var end_index = lisp_paredit.utils.convert_point_to_index.call(null,(range["end"]),editor);
var res = paredit_js.navigator.sexp_range_expansion.call(null,ast,start_index,end_index);
var temp__4425__auto__ = res;
if(cljs.core.truth_(temp__4425__auto__)){
var vec__32093 = temp__4425__auto__;
var start = cljs.core.nth.call(null,vec__32093,(0),null);
var end = cljs.core.nth.call(null,vec__32093,(1),null);
return editor.setSelectedBufferRange((new atomio.core.Range(lisp_paredit.utils.convert_index_to_point.call(null,start,editor),lisp_paredit.utils.convert_index_to_point.call(null,end,editor))));
} else {
return null;
}
});
