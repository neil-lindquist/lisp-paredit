// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.commands.edit');
goog.require('cljs.core');
goog.require('lisp_paredit.status_bar_view');
goog.require('paredit_js.core');
goog.require('lisp_paredit.ast');
goog.require('atomio.workspace');
goog.require('goog.object');
goog.require('paredit_js.navigator');
goog.require('lisp_paredit.utils');
goog.require('paredit_js.editor');
goog.require('atomio.core');
goog.require('atomio.commands');
lisp_paredit.commands.edit.paredit_change_fns = new cljs.core.PersistentArrayMap(null, 2, ["insert",(function (editor,p__21267){
var vec__21268 = p__21267;
var index = cljs.core.nth.call(null,vec__21268,(0),null);
var text = cljs.core.nth.call(null,vec__21268,(1),null);
var point = lisp_paredit.utils.convert_index_to_point.call(null,index,editor);
var range = (new atomio.core.Range(point,point));
return editor.setTextInBufferRange(range,text);
}),"remove",(function (editor,p__21269){
var vec__21270 = p__21269;
var index = cljs.core.nth.call(null,vec__21270,(0),null);
var length = cljs.core.nth.call(null,vec__21270,(1),null);
var start = lisp_paredit.utils.convert_index_to_point.call(null,index,editor);
var end = lisp_paredit.utils.convert_index_to_point.call(null,(index + length),editor);
var range = (new atomio.core.Range(start,end));
return editor.setTextInBufferRange(range,"");
})], null);
lisp_paredit.commands.edit.apply_change = (function lisp_paredit$commands$edit$apply_change(editor,p__21271){
var vec__21273 = p__21271;
var action = cljs.core.nth.call(null,vec__21273,(0),null);
var args = cljs.core.nthnext.call(null,vec__21273,(1));
return cljs.core.get.call(null,lisp_paredit.commands.edit.paredit_change_fns,action).call(null,editor,args);
});
lisp_paredit.commands.edit.apply_changes = (function lisp_paredit$commands$edit$apply_changes(result,editor){
if(cljs.core.truth_(result)){
cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__21274_SHARP_){
return lisp_paredit.commands.edit.apply_change.call(null,editor,p1__21274_SHARP_);
}),(result["changes"])));

var newIndexes = (function (){var or__6142__auto__ = (result["newIndexes"]);
if(cljs.core.truth_(or__6142__auto__)){
return or__6142__auto__;
} else {
return (new Array());
}
})();
var _ = (cljs.core.truth_((result["newIndex"]))?newIndexes.push((result["newIndex"])):null);
var first = newIndexes.slice((0),(1));
var rest = newIndexes.slice((1));
var point = (cljs.core.truth_(first)?lisp_paredit.utils.convert_index_to_point.call(null,first,editor):null);
if(cljs.core.truth_(point)){
editor.setCursorBufferPosition(point);
} else {
}

return cljs.core.doall.call(null,cljs.core.map.call(null,((function (newIndexes,_,first,rest,point){
return (function (new_index){
return editor.addCursorAtBufferPosition(lisp_paredit.utils.convert_index_to_point.call(null,new_index,editor));
});})(newIndexes,_,first,rest,point))
,rest));
} else {
return null;
}
});
lisp_paredit.commands.edit.indent_range = (function lisp_paredit$commands$edit$indent_range(range,editor,expand_if_empty_QMARK_){
cljs.core.println.call(null,"indent-range",range,editor);

var src = editor.getText();
var ast = lisp_paredit.ast.get_ast.call(null,editor);
var start_index = lisp_paredit.utils.convert_point_to_index.call(null,(range["start"]),editor);
var end_index = lisp_paredit.utils.convert_point_to_index.call(null,(range["end"]),editor);
var vec__21276 = (cljs.core.truth_((function (){var and__6130__auto__ = range.isEmpty();
if(cljs.core.truth_(and__6130__auto__)){
return expand_if_empty_QMARK_;
} else {
return and__6130__auto__;
}
})())?paredit_js.navigator.sexp_range_expansion.call(null,ast,start_index,end_index):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start_index,end_index], null));
var start = cljs.core.nth.call(null,vec__21276,(0),null);
var end = cljs.core.nth.call(null,vec__21276,(1),null);
if(cljs.core.truth_((function (){var and__6130__auto__ = start;
if(cljs.core.truth_(and__6130__auto__)){
return end;
} else {
return and__6130__auto__;
}
})())){
cljs.core.println.call(null,ast,src,start,end);

var result = paredit_js.editor.indent_range.call(null,ast,src,start,end);
cljs.core.println.call(null,"changes",(result["changes"]));

cljs.core.println.call(null,"newIndex",(result["newIndex"]));

cljs.core.println.call(null,"newIndex",lisp_paredit.utils.convert_index_to_point.call(null,(result["newIndex"]),editor));

return editor.transact(((function (result,src,ast,start_index,end_index,vec__21276,start,end){
return (function (){
return lisp_paredit.commands.edit.apply_changes.call(null,result,editor);
});})(result,src,ast,start_index,end_index,vec__21276,start,end))
);
} else {
return null;
}
});
lisp_paredit.commands.edit.apply_indent = (function lisp_paredit$commands$edit$apply_indent(changes,editor){
var rows_changed = cljs.core.map.call(null,(function (p__21279){
var vec__21280 = p__21279;
var _ = cljs.core.nth.call(null,vec__21280,(0),null);
var index = cljs.core.nth.call(null,vec__21280,(1),null);
var ___$1 = cljs.core.nth.call(null,vec__21280,(2),null);
return (lisp_paredit.utils.convert_index_to_point.call(null,index,editor)["row"]);
}),changes);
var start = lisp_paredit.utils.__GT_Point.call(null,cljs.core.apply.call(null,cljs.core.min,rows_changed),(0));
var end = lisp_paredit.utils.__GT_Point.call(null,cljs.core.apply.call(null,cljs.core.max,rows_changed),(0));
return lisp_paredit.commands.edit.indent_range.call(null,(new atomio.core.Range(start,end)),editor,false);
});
lisp_paredit.commands.edit.wrap_around_fn = (function lisp_paredit$commands$edit$wrap_around_fn(start,end){
return (function (ast,src,index,args){
return paredit_js.editor.wrap_around.call(null,ast,src,index,start,end,args);
});
});
lisp_paredit.commands.edit.edit_selections = (function lisp_paredit$commands$edit$edit_selections(editor,selections,f,args){
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (selection){
var src = editor.getText();
var ast = lisp_paredit.ast.get_ast.call(null,editor);
var start_index = (selection.getBufferRange()["start"]);
var end_index = (selection.getBufferRange()["end"]);
var index = lisp_paredit.utils.convert_point_to_index.call(null,start_index,editor);
var _ = goog.object.extend(args,(function (){var obj21286 = {"endIdx":lisp_paredit.utils.convert_point_to_index.call(null,end_index,editor)};
return obj21286;
})());
var result = f.call(null,ast,src,index,args);
var temp__4425__auto___21289 = (function (){var and__6130__auto__ = result;
if(cljs.core.truth_(and__6130__auto__)){
return (result["changes"]);
} else {
return and__6130__auto__;
}
})();
if(cljs.core.truth_(temp__4425__auto___21289)){
var changes_21290 = temp__4425__auto___21289;
lisp_paredit.commands.edit.apply_changes.call(null,(function (){var obj21288 = {"changes":changes_21290};
return obj21288;
})(),editor);

if(cljs.core.truth_((args["indent"]))){
lisp_paredit.commands.edit.apply_indent.call(null,changes_21290,editor);
} else {
}
} else {
}

if(cljs.core.truth_(result)){
return (result["newIndex"]);
} else {
return null;
}
}),selections));
});
lisp_paredit.commands.edit.edit_cursors = (function lisp_paredit$commands$edit$edit_cursors(editor,cursors,f,args){
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (cursor){
var args__$1 = (function (){var or__6142__auto__ = args;
if(cljs.core.truth_(or__6142__auto__)){
return or__6142__auto__;
} else {
return {};
}
})();
var point = cursor.getBufferPosition();
var index = lisp_paredit.utils.convert_point_to_index.call(null,point,editor);
var src = editor.getText();
var ast = lisp_paredit.ast.get_ast.call(null,editor);
var row = (cljs.core.truth_((function (){var and__6130__auto__ = (args__$1["backward"]);
if(cljs.core.truth_(and__6130__auto__)){
return cljs.core._EQ_.call(null,(0),(point["column"]));
} else {
return and__6130__auto__;
}
})())?((point["row"]) - (1)):(((cljs.core.not.call(null,(args__$1["backward"]))) && (cljs.core._EQ_.call(null,(point["column"]),editor.buffer.lineLengthForRow((point["row"])))))?(point["row"]):null));
var _ = goog.object.extend(args__$1,(function (){var obj21296 = {"count":(cljs.core.truth_(row)?cljs.core.count.call(null,lisp_paredit.utils.line_ending_for_row.call(null,row,editor)):(1))};
return obj21296;
})());
var result = f.call(null,ast,src,index,args__$1);
var temp__4425__auto___21299 = (function (){var and__6130__auto__ = result;
if(cljs.core.truth_(and__6130__auto__)){
return (result["changes"]);
} else {
return and__6130__auto__;
}
})();
if(cljs.core.truth_(temp__4425__auto___21299)){
var changes_21300 = temp__4425__auto___21299;
lisp_paredit.commands.edit.apply_changes.call(null,(function (){var obj21298 = {"changes":changes_21300};
return obj21298;
})(),editor);

if(cljs.core.truth_((args__$1["indent"]))){
lisp_paredit.commands.edit.apply_indent.call(null,changes_21300,editor);
} else {
}
} else {
}

if(cljs.core.truth_(result)){
return (result["newIndex"]);
} else {
return null;
}
}),cursors));
});
lisp_paredit.commands.edit.edit = (function lisp_paredit$commands$edit$edit(var_args){
var args21302 = [];
var len__7200__auto___21309 = arguments.length;
var i__7201__auto___21310 = (0);
while(true){
if((i__7201__auto___21310 < len__7200__auto___21309)){
args21302.push((arguments[i__7201__auto___21310]));

var G__21311 = (i__7201__auto___21310 + (1));
i__7201__auto___21310 = G__21311;
continue;
} else {
}
break;
}

var G__21304 = args21302.length;
switch (G__21304) {
case 1:
return lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args21302.length)].join('')));

}
});

lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$1 = (function (f){
return lisp_paredit.commands.edit.edit.call(null,f,cljs.core.PersistentArrayMap.EMPTY);
});

lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$2 = (function (f,argv){
var editor = atomio.workspace.get_active_text_editor.call(null);
var cursors = editor.getCursorsOrderedByBufferPosition();
var selections = cljs.core.remove.call(null,((function (editor,cursors){
return (function (p1__21301_SHARP_){
return p1__21301_SHARP_.isEmpty();
});})(editor,cursors))
,editor.getSelections());
var args = (function (){var obj21306 = {"indent":true};
return obj21306;
})();
var _ = goog.object.extend(args,argv);
return editor.transact(((function (editor,cursors,selections,args,_){
return (function (){
var new_indexes = cljs.core.remove.call(null,cljs.core.nil_QMARK_,(((cljs.core.count.call(null,selections) > (0)))?lisp_paredit.commands.edit.edit_selections.call(null,editor,selections,f,args):lisp_paredit.commands.edit.edit_cursors.call(null,editor,cursors,f,args)));
if(cljs.core.seq.call(null,new_indexes)){
return lisp_paredit.commands.edit.apply_changes.call(null,(function (){var obj21308 = {"newIndexes":cljs.core.clj__GT_js.call(null,new_indexes)};
return obj21308;
})(),editor);
} else {
return null;
}
});})(editor,cursors,selections,args,_))
);
});

lisp_paredit.commands.edit.edit.cljs$lang$maxFixedArity = 2;
lisp_paredit.commands.edit.slurp_backwards = (function lisp_paredit$commands$edit$slurp_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.slurp_sexp,(function (){var obj21316 = {"backward":true};
return obj21316;
})());
});
lisp_paredit.commands.edit.slurp_forwards = (function lisp_paredit$commands$edit$slurp_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.slurp_sexp,(function (){var obj21320 = {"backward":false};
return obj21320;
})());
});
lisp_paredit.commands.edit.barf_backwards = (function lisp_paredit$commands$edit$barf_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.barf_sexp,(function (){var obj21324 = {"backward":true};
return obj21324;
})());
});
lisp_paredit.commands.edit.barf_forwards = (function lisp_paredit$commands$edit$barf_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.barf_sexp,(function (){var obj21328 = {"backward":false};
return obj21328;
})());
});
lisp_paredit.commands.edit.kill_sexp_forwards = (function lisp_paredit$commands$edit$kill_sexp_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.kill_sexp,(function (){var obj21332 = {"backward":false};
return obj21332;
})());
});
lisp_paredit.commands.edit.kill_sexp_backwards = (function lisp_paredit$commands$edit$kill_sexp_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.kill_sexp,(function (){var obj21336 = {"backward":true};
return obj21336;
})());
});
lisp_paredit.commands.edit.splice = (function lisp_paredit$commands$edit$splice(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp);
});
lisp_paredit.commands.edit.splice_backwards = (function lisp_paredit$commands$edit$splice_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp_kill,(function (){var obj21340 = {"backward":true};
return obj21340;
})());
});
lisp_paredit.commands.edit.splice_forwards = (function lisp_paredit$commands$edit$splice_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp_kill,(function (){var obj21344 = {"backward":false};
return obj21344;
})());
});
lisp_paredit.commands.edit.split = (function lisp_paredit$commands$edit$split(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.split_sexp);
});
lisp_paredit.commands.edit.indent = (function lisp_paredit$commands$edit$indent(){
var editor = atomio.workspace.get_active_text_editor.call(null);
var ranges = editor.getSelectedBufferRanges();
return cljs.core.doall.call(null,cljs.core.map.call(null,((function (editor,ranges){
return (function (p1__21345_SHARP_){
return lisp_paredit.commands.edit.indent_range.call(null,p1__21345_SHARP_,editor,false);
});})(editor,ranges))
,ranges));
});
lisp_paredit.commands.edit.delete_backwards = (function lisp_paredit$commands$edit$delete_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.delete$,(function (){var obj21349 = {"backward":true,"indent":false};
return obj21349;
})());
});
lisp_paredit.commands.edit.delete_forwards = (function lisp_paredit$commands$edit$delete_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.delete$,(function (){var obj21353 = {"backward":false,"indent":false};
return obj21353;
})());
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
lisp_paredit.commands.edit.paste = (function lisp_paredit$commands$edit$paste(){
return null;
});
lisp_paredit.commands.edit.newline = (function lisp_paredit$commands$edit$newline(){
var editor = atomio.workspace.get_active_text_editor.call(null);
return editor.transact(((function (editor){
return (function (){
editor.insertNewline();

return lisp_paredit.commands.edit.indent.call(null);
});})(editor))
);
});
