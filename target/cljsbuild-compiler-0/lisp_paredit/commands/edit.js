// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.commands.edit');
goog.require('cljs.core');
goog.require('lisp_paredit.status_bar_view');
goog.require('paredit_js.core');
goog.require('atomio.workspace');
goog.require('paredit_js.navigator');
goog.require('lisp_paredit.utils');
goog.require('paredit_js.editor');
goog.require('atomio.core');
goog.require('atomio.commands');
lisp_paredit.commands.edit.paredit_change_fns = new cljs.core.PersistentArrayMap(null, 2, ["insert",(function (editor,p__8286){
var vec__8287 = p__8286;
var index = cljs.core.nth.call(null,vec__8287,(0),null);
var text = cljs.core.nth.call(null,vec__8287,(1),null);
var point = lisp_paredit.utils.convert_index_to_point.call(null,index,editor);
var range = (new atomio.core.Range(point,point));
return editor.setTextInBufferRange(range,text);
}),"remove",(function (editor,p__8288){
var vec__8289 = p__8288;
var index = cljs.core.nth.call(null,vec__8289,(0),null);
var length = cljs.core.nth.call(null,vec__8289,(1),null);
var start = lisp_paredit.utils.convert_index_to_point.call(null,index,editor);
var end = lisp_paredit.utils.convert_index_to_point.call(null,(index + length),editor);
var range = (new atomio.core.Range(start,end));
return editor.setTextInBufferRange(range,"");
})], null);
lisp_paredit.commands.edit.apply_change = (function lisp_paredit$commands$edit$apply_change(editor,p__8290){
var vec__8292 = p__8290;
var action = cljs.core.nth.call(null,vec__8292,(0),null);
var args = cljs.core.nthnext.call(null,vec__8292,(1));
return cljs.core.get.call(null,lisp_paredit.commands.edit.paredit_change_fns,action).call(null,editor,args);
});
lisp_paredit.commands.edit.apply_changes = (function lisp_paredit$commands$edit$apply_changes(result,editor){
if(cljs.core.truth_(result)){
cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__8293_SHARP_){
return lisp_paredit.commands.edit.apply_change.call(null,editor,p1__8293_SHARP_);
}),new cljs.core.Keyword(null,"changes","changes",1492088).cljs$core$IFn$_invoke$arity$1(result)));

var vec__8295 = cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core.conj.call(null,new cljs.core.Keyword(null,"new-indexes","new-indexes",-2025952085).cljs$core$IFn$_invoke$arity$1(result),new cljs.core.Keyword(null,"new-index","new-index",518435631).cljs$core$IFn$_invoke$arity$1(result)));
var first = cljs.core.nth.call(null,vec__8295,(0),null);
var rest = cljs.core.nthnext.call(null,vec__8295,(1));
var point = (cljs.core.truth_(first)?lisp_paredit.utils.convert_index_to_point.call(null,first,editor):null);
if(cljs.core.truth_(point)){
editor.setCursorBufferPosition(point);
} else {
}

return cljs.core.doall.call(null,cljs.core.map.call(null,((function (vec__8295,first,rest,point){
return (function (new_index){
return editor.addCursorAtBufferPosition(lisp_paredit.utils.convert_index_to_point.call(null,new_index,editor));
});})(vec__8295,first,rest,point))
,rest));
} else {
return null;
}
});
lisp_paredit.commands.edit.indent_range = (function lisp_paredit$commands$edit$indent_range(range,editor){
var src = editor.getText();
var ast = paredit_js.core.parse.call(null,src);
var start_index = lisp_paredit.utils.convert_point_to_index.call(null,(range["start"]),editor);
var end_index = lisp_paredit.utils.convert_point_to_index.call(null,(range["end"]),editor);
var vec__8297 = (cljs.core.truth_(range.isEmpty())?paredit_js.navigator.sexp_range_expansion.call(null,ast,start_index,end_index):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start_index,end_index], null));
var start = cljs.core.nth.call(null,vec__8297,(0),null);
var end = cljs.core.nth.call(null,vec__8297,(1),null);
if(cljs.core.truth_((function (){var and__6130__auto__ = start;
if(cljs.core.truth_(and__6130__auto__)){
return end;
} else {
return and__6130__auto__;
}
})())){
var result = paredit_js.editor.indent_range.call(null,ast,src,start,end);
return editor.transact(((function (result,src,ast,start_index,end_index,vec__8297,start,end){
return (function (){
return lisp_paredit.commands.edit.apply_changes.call(null,result,editor);
});})(result,src,ast,start_index,end_index,vec__8297,start,end))
);
} else {
return null;
}
});
lisp_paredit.commands.edit.apply_indent = (function lisp_paredit$commands$edit$apply_indent(changes,editor){
var rows_changed = cljs.core.map.call(null,(function (p__8300){
var vec__8301 = p__8300;
var _ = cljs.core.nth.call(null,vec__8301,(0),null);
var index = cljs.core.nth.call(null,vec__8301,(1),null);
var ___$1 = cljs.core.nth.call(null,vec__8301,(2),null);
return (lisp_paredit.utils.convert_index_to_point.call(null,index,editor)["row"]);
}),changes);
var start = lisp_paredit.utils.__GT_Point.call(null,cljs.core.apply.call(null,cljs.core.min,rows_changed),(0));
var end = lisp_paredit.utils.__GT_Point.call(null,cljs.core.apply.call(null,cljs.core.max,rows_changed),(0));
return lisp_paredit.commands.edit.indent_range.call(null,(new atomio.core.Range(start,end)),editor);
});
lisp_paredit.commands.edit.wrap_around_fn = (function lisp_paredit$commands$edit$wrap_around_fn(start,end){
return (function (ast,src,index,args){
return paredit_js.editor.wrap_around.call(null,ast,src,index,start,end,args);
});
});
lisp_paredit.commands.edit.edit_selections = (function lisp_paredit$commands$edit$edit_selections(editor,selections,f,args){
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (selection){
var src = editor.getText();
var ast = paredit_js.core.parse.call(null,src);
var start_index = (selection.getBufferRange()["start"]);
var end_index = (selection.getBufferRange()["end"]);
var index = lisp_paredit.utils.convert_point_to_index.call(null,start_index,editor);
var args__$1 = cljs.core.assoc.call(null,args,"endIdx",lisp_paredit.utils.convert_point_to_index.call(null,end_index,editor));
var result = f.call(null,ast,src,index,args__$1);
var temp__4425__auto___8302 = (function (){var and__6130__auto__ = result;
if(cljs.core.truth_(and__6130__auto__)){
return new cljs.core.Keyword(null,"changes","changes",1492088).cljs$core$IFn$_invoke$arity$1(result);
} else {
return and__6130__auto__;
}
})();
if(cljs.core.truth_(temp__4425__auto___8302)){
var changes_8303 = temp__4425__auto___8302;
lisp_paredit.commands.edit.apply_changes.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"changes","changes",1492088),changes_8303], null),editor);

if(cljs.core.truth_(new cljs.core.Keyword(null,"indent","indent",-148200125).cljs$core$IFn$_invoke$arity$1(args__$1))){
lisp_paredit.commands.edit.apply_indent.call(null,changes_8303,editor);
} else {
}
} else {
}

if(cljs.core.truth_(result)){
return new cljs.core.Keyword(null,"newIndex","newIndex",186923963).cljs$core$IFn$_invoke$arity$1(result);
} else {
return null;
}
}),selections));
});
lisp_paredit.commands.edit.edit_cursors = (function lisp_paredit$commands$edit$edit_cursors(editor,cursors,f,args){
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (cursor){
var point = cursor.getBufferPosition();
var index = lisp_paredit.utils.convert_point_to_index.call(null,point,editor);
var src = editor.getText();
var ast = paredit_js.core.parse.call(null,src);
var row = (cljs.core.truth_((function (){var and__6130__auto__ = new cljs.core.Keyword(null,"backward","backward",554036364).cljs$core$IFn$_invoke$arity$1(args);
if(cljs.core.truth_(and__6130__auto__)){
return cljs.core._EQ_.call(null,(0),(point["column"]));
} else {
return and__6130__auto__;
}
})())?((point["row"]) - (1)):(((cljs.core.not.call(null,new cljs.core.Keyword(null,"backward","backward",554036364).cljs$core$IFn$_invoke$arity$1(args))) && (cljs.core._EQ_.call(null,(point["column"]),editor.buffer.lineLengthForRow((point["row"])))))?(point["row"]):null));
var args__$1 = cljs.core.assoc.call(null,args,"count",(cljs.core.truth_(row)?cljs.core.count.call(null,lisp_paredit.utils.line_ending_for_row.call(null,row,editor)):(1)));
var result = f.call(null,ast,src,index,args__$1);
var temp__4425__auto___8304 = (function (){var and__6130__auto__ = result;
if(cljs.core.truth_(and__6130__auto__)){
return new cljs.core.Keyword(null,"changes","changes",1492088).cljs$core$IFn$_invoke$arity$1(result);
} else {
return and__6130__auto__;
}
})();
if(cljs.core.truth_(temp__4425__auto___8304)){
var changes_8305 = temp__4425__auto___8304;
lisp_paredit.commands.edit.apply_changes.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"changes","changes",1492088),changes_8305], null),editor);

if(cljs.core.truth_(new cljs.core.Keyword(null,"indent","indent",-148200125).cljs$core$IFn$_invoke$arity$1(args__$1))){
lisp_paredit.commands.edit.apply_indent.call(null,changes_8305,editor);
} else {
}
} else {
}

if(cljs.core.truth_(result)){
return new cljs.core.Keyword(null,"newIndex","newIndex",186923963).cljs$core$IFn$_invoke$arity$1(result);
} else {
return null;
}
}),cursors));
});
lisp_paredit.commands.edit.edit = (function lisp_paredit$commands$edit$edit(var_args){
var args8307 = [];
var len__7200__auto___8310 = arguments.length;
var i__7201__auto___8311 = (0);
while(true){
if((i__7201__auto___8311 < len__7200__auto___8310)){
args8307.push((arguments[i__7201__auto___8311]));

var G__8312 = (i__7201__auto___8311 + (1));
i__7201__auto___8311 = G__8312;
continue;
} else {
}
break;
}

var G__8309 = args8307.length;
switch (G__8309) {
case 1:
return lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8307.length)].join('')));

}
});

lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$1 = (function (f){
return lisp_paredit.commands.edit.edit.call(null,f,cljs.core.PersistentArrayMap.EMPTY);
});

lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$2 = (function (f,argv){
var editor = atomio.workspace.get_active_text_editor.call(null);
var cursors = editor.getCursorsOrderedByBufferPosition();
var selections = cljs.core.remove.call(null,((function (editor,cursors){
return (function (p1__8306_SHARP_){
return p1__8306_SHARP_.isEmpty();
});})(editor,cursors))
,editor.getSelections());
var args = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"indent","indent",-148200125),true], null),argv);
return editor.transact(((function (editor,cursors,selections,args){
return (function (){
var new_indexes = cljs.core.remove.call(null,cljs.core.nil_QMARK_,(((cljs.core.count.call(null,selections) > (0)))?lisp_paredit.commands.edit.edit_selections.call(null,editor,selections,f,args):lisp_paredit.commands.edit.edit_cursors.call(null,editor,cursors,f,args)));
if(cljs.core.seq.call(null,new_indexes)){
return lisp_paredit.commands.edit.apply_changes.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"new-indexes","new-indexes",-2025952085),new_indexes], null),editor);
} else {
return null;
}
});})(editor,cursors,selections,args))
);
});

lisp_paredit.commands.edit.edit.cljs$lang$maxFixedArity = 2;
lisp_paredit.commands.edit.slurp_backwards = (function lisp_paredit$commands$edit$slurp_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.slurp_sexp,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backward","backward",554036364),true], null));
});
lisp_paredit.commands.edit.slurp_forwards = (function lisp_paredit$commands$edit$slurp_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.slurp_sexp,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backward","backward",554036364),false], null));
});
lisp_paredit.commands.edit.barf_backwards = (function lisp_paredit$commands$edit$barf_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.barf_sexp,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backward","backward",554036364),true], null));
});
lisp_paredit.commands.edit.barf_forwards = (function lisp_paredit$commands$edit$barf_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.barf_sexp,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backward","backward",554036364),false], null));
});
lisp_paredit.commands.edit.kill_sexp_forwards = (function lisp_paredit$commands$edit$kill_sexp_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.kill_sexp,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backward","backward",554036364),false], null));
});
lisp_paredit.commands.edit.kill_sexp_backwards = (function lisp_paredit$commands$edit$kill_sexp_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.kill_sexp,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backward","backward",554036364),true], null));
});
lisp_paredit.commands.edit.splice = (function lisp_paredit$commands$edit$splice(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp);
});
lisp_paredit.commands.edit.splice_backwards = (function lisp_paredit$commands$edit$splice_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp_kill,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backward","backward",554036364),true], null));
});
lisp_paredit.commands.edit.splice_forwards = (function lisp_paredit$commands$edit$splice_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp_kill,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backward","backward",554036364),false], null));
});
lisp_paredit.commands.edit.split = (function lisp_paredit$commands$edit$split(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.split_sexp);
});
lisp_paredit.commands.edit.indent = (function lisp_paredit$commands$edit$indent(){
var editor = atomio.workspace.get_active_text_editor.call(null);
var ranges = editor.getSelectedBufferRanges();
return cljs.core.doall.call(null,cljs.core.map.call(null,((function (editor,ranges){
return (function (p1__8314_SHARP_){
return lisp_paredit.commands.edit.indent_range.call(null,p1__8314_SHARP_,editor);
});})(editor,ranges))
,ranges));
});
lisp_paredit.commands.edit.delete_backwards = (function lisp_paredit$commands$edit$delete_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.delete$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"backward","backward",554036364),true,new cljs.core.Keyword(null,"indent","indent",-148200125),false], null));
});
lisp_paredit.commands.edit.delete_forwards = (function lisp_paredit$commands$edit$delete_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.delete$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"backward","backward",554036364),false,new cljs.core.Keyword(null,"indent","indent",-148200125),false], null));
});
lisp_paredit.commands.edit.wrap_around_parens = (function lisp_paredit$commands$edit$wrap_around_parens(){
return lisp_paredit.commands.edit.edit.call(null,lisp_paredit.commands.edit.wrap_around_fn.call(null,"(",")"));
});
lisp_paredit.commands.edit.wrap_around_square = (function lisp_paredit$commands$edit$wrap_around_square(){
return lisp_paredit.commands.edit.edit.call(null,lisp_paredit.commands.edit.wrap_around_fn.call(null,"[","]"));
});
lisp_paredit.commands.edit.wrap_around_curly = (function lisp_paredit$commands$edit$wrap_around_curly(){
return lisp_paredit.commands.edit.edit.call(null,lisp_paredit.commands.edit.wrap_around_fn.call(null,"{","}"));
});
