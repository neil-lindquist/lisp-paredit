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
lisp_paredit.commands.edit.paredit_change_fns = new cljs.core.PersistentArrayMap(null, 2, ["insert",(function (editor,p__28972){
var vec__28973 = p__28972;
var index = cljs.core.nth.call(null,vec__28973,(0),null);
var text = cljs.core.nth.call(null,vec__28973,(1),null);
var point = lisp_paredit.utils.convert_index_to_point.call(null,index,editor);
var range = (new atomio.core.Range(point,point));
return editor.setTextInBufferRange(range,text);
}),"remove",(function (editor,p__28974){
var vec__28975 = p__28974;
var index = cljs.core.nth.call(null,vec__28975,(0),null);
var length = cljs.core.nth.call(null,vec__28975,(1),null);
var start = lisp_paredit.utils.convert_index_to_point.call(null,index,editor);
var end = lisp_paredit.utils.convert_index_to_point.call(null,(index + length),editor);
var range = (new atomio.core.Range(start,end));
return editor.setTextInBufferRange(range,"");
})], null);
lisp_paredit.commands.edit.apply_change = (function lisp_paredit$commands$edit$apply_change(editor,p__28976){
var vec__28978 = p__28976;
var action = cljs.core.nth.call(null,vec__28978,(0),null);
var args = cljs.core.nthnext.call(null,vec__28978,(1));
return cljs.core.get.call(null,lisp_paredit.commands.edit.paredit_change_fns,action).call(null,editor,args);
});
lisp_paredit.commands.edit.apply_changes = (function lisp_paredit$commands$edit$apply_changes(result,editor){
if(cljs.core.truth_(result)){
cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__28979_SHARP_){
return lisp_paredit.commands.edit.apply_change.call(null,editor,p1__28979_SHARP_);
}),(result["changes"])));

var newIndexes = (function (){var or__6142__auto__ = (result["newIndexes"]);
if(cljs.core.truth_(or__6142__auto__)){
return or__6142__auto__;
} else {
return (new Array());
}
})();
var _ = (cljs.core.truth_((result["newIndex"]))?newIndexes.push((result["newIndex"])):null);
var first = cljs.core.first.call(null,newIndexes.slice((0),(1)));
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
var src = editor.getText();
var ast = lisp_paredit.ast.get_ast.call(null,editor);
var start_index = lisp_paredit.utils.convert_point_to_index.call(null,(range["start"]),editor);
var end_index = lisp_paredit.utils.convert_point_to_index.call(null,(range["end"]),editor);
var vec__28983 = (cljs.core.truth_((function (){var and__6130__auto__ = range.isEmpty();
if(cljs.core.truth_(and__6130__auto__)){
return expand_if_empty_QMARK_;
} else {
return and__6130__auto__;
}
})())?paredit_js.navigator.sexp_range_expansion.call(null,ast,start_index,end_index):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start_index,end_index], null));
var start = cljs.core.nth.call(null,vec__28983,(0),null);
var end = cljs.core.nth.call(null,vec__28983,(1),null);
if(cljs.core.truth_((function (){var and__6130__auto__ = start;
if(cljs.core.truth_(and__6130__auto__)){
return end;
} else {
return and__6130__auto__;
}
})())){
var result = paredit_js.editor.indent_range.call(null,ast,src,start,end);
var changes = (result["changes"]);
if(cljs.core.truth_(cljs.core.not_empty.call(null,changes))){
return editor.transact(((function (result,changes,src,ast,start_index,end_index,vec__28983,start,end){
return (function (){
return lisp_paredit.commands.edit.apply_changes.call(null,(function (){var obj28985 = {"changes":changes};
return obj28985;
})(),editor);
});})(result,changes,src,ast,start_index,end_index,vec__28983,start,end))
);
} else {
return null;
}
} else {
return null;
}
});
lisp_paredit.commands.edit.apply_indent = (function lisp_paredit$commands$edit$apply_indent(changes,editor){
var rows_changed = cljs.core.map.call(null,(function (p__28988){
var vec__28989 = p__28988;
var _ = cljs.core.nth.call(null,vec__28989,(0),null);
var index = cljs.core.nth.call(null,vec__28989,(1),null);
var ___$1 = cljs.core.nth.call(null,vec__28989,(2),null);
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
lisp_paredit.commands.edit.edit = (function lisp_paredit$commands$edit$edit(var_args){
var args28990 = [];
var len__7200__auto___29001 = arguments.length;
var i__7201__auto___29002 = (0);
while(true){
if((i__7201__auto___29002 < len__7200__auto___29001)){
args28990.push((arguments[i__7201__auto___29002]));

var G__29003 = (i__7201__auto___29002 + (1));
i__7201__auto___29002 = G__29003;
continue;
} else {
}
break;
}

var G__28992 = args28990.length;
switch (G__28992) {
case 1:
return lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args28990.length)].join('')));

}
});

lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$1 = (function (f){
return lisp_paredit.commands.edit.edit.call(null,f,cljs.core.PersistentArrayMap.EMPTY);
});

lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$2 = (function (f,argv){
var editor = atomio.workspace.get_active_text_editor.call(null);
var new_indexes = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
var changed_QMARK_ = cljs.core.atom.call(null,false);
editor.mutateSelectedText(((function (editor,new_indexes,changed_QMARK_){
return (function (selection){
var ast = lisp_paredit.ast.get_ast.call(null,editor);
var src = editor.getText();
var range = selection.getBufferRange();
var start_index = lisp_paredit.utils.convert_point_to_index.call(null,(range["start"]),editor);
var end_index = lisp_paredit.utils.convert_point_to_index.call(null,(range["end"]),editor);
var args = (cljs.core.truth_(selection.isEmpty())?(function (){var obj28994 = {"indent":true,"count":(1)};
return obj28994;
})():(function (){var obj28996 = {"indent":true,"endIdx":end_index};
return obj28996;
})());
var _ = goog.object.extend(args,argv);
var result = f.call(null,ast,src,start_index,args);
var changes = (cljs.core.truth_(result)?(result["changes"]):null);
if((cljs.core.count.call(null,changes) > (0))){
cljs.core.reset_BANG_.call(null,changed_QMARK_,true);

if(cljs.core.truth_((result["newIndex"]))){
cljs.core.swap_BANG_.call(null,new_indexes,cljs.core.conj,(result["newIndex"]));
} else {
}

lisp_paredit.commands.edit.apply_changes.call(null,(function (){var obj28998 = {"changes":changes};
return obj28998;
})(),editor);

if(cljs.core.truth_((args["indent"]))){
return lisp_paredit.commands.edit.apply_indent.call(null,changes,editor);
} else {
return null;
}
} else {
return null;
}
});})(editor,new_indexes,changed_QMARK_))
);

if(cljs.core.seq.call(null,cljs.core.deref.call(null,new_indexes))){
lisp_paredit.commands.edit.apply_changes.call(null,(function (){var obj29000 = {"newIndexes":cljs.core.clj__GT_js.call(null,cljs.core.deref.call(null,new_indexes))};
return obj29000;
})(),editor);
} else {
}

return cljs.core.deref.call(null,changed_QMARK_);
});

lisp_paredit.commands.edit.edit.cljs$lang$maxFixedArity = 2;
lisp_paredit.commands.edit.slurp_backwards = (function lisp_paredit$commands$edit$slurp_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.slurp_sexp,(function (){var obj29008 = {"backward":true};
return obj29008;
})());
});
lisp_paredit.commands.edit.slurp_forwards = (function lisp_paredit$commands$edit$slurp_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.slurp_sexp,(function (){var obj29012 = {"backward":false};
return obj29012;
})());
});
lisp_paredit.commands.edit.barf_backwards = (function lisp_paredit$commands$edit$barf_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.barf_sexp,(function (){var obj29016 = {"backward":true};
return obj29016;
})());
});
lisp_paredit.commands.edit.barf_forwards = (function lisp_paredit$commands$edit$barf_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.barf_sexp,(function (){var obj29020 = {"backward":false};
return obj29020;
})());
});
lisp_paredit.commands.edit.kill_sexp_forwards = (function lisp_paredit$commands$edit$kill_sexp_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.kill_sexp,(function (){var obj29024 = {"backward":false};
return obj29024;
})());
});
lisp_paredit.commands.edit.kill_sexp_backwards = (function lisp_paredit$commands$edit$kill_sexp_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.kill_sexp,(function (){var obj29028 = {"backward":true};
return obj29028;
})());
});
lisp_paredit.commands.edit.splice = (function lisp_paredit$commands$edit$splice(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp);
});
lisp_paredit.commands.edit.splice_backwards = (function lisp_paredit$commands$edit$splice_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp_kill,(function (){var obj29032 = {"backward":true};
return obj29032;
})());
});
lisp_paredit.commands.edit.splice_forwards = (function lisp_paredit$commands$edit$splice_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp_kill,(function (){var obj29036 = {"backward":false};
return obj29036;
})());
});
lisp_paredit.commands.edit.split = (function lisp_paredit$commands$edit$split(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.split_sexp);
});
lisp_paredit.commands.edit.indent = (function lisp_paredit$commands$edit$indent(){
var editor = atomio.workspace.get_active_text_editor.call(null);
var ranges = editor.getSelectedBufferRanges();
return cljs.core.doall.call(null,cljs.core.map.call(null,((function (editor,ranges){
return (function (p1__29037_SHARP_){
return lisp_paredit.commands.edit.indent_range.call(null,p1__29037_SHARP_,editor,true);
});})(editor,ranges))
,ranges));
});
lisp_paredit.commands.edit.delete_backwards = (function lisp_paredit$commands$edit$delete_backwards(){
cljs.core.println.call(null,"delete-backwards");

var res = lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.delete$,(function (){var obj29041 = {"backward":true,"indent":false};
return obj29041;
})());
cljs.core.println.call(null,res);

if(cljs.core.truth_(res)){
return null;
} else {
cljs.core.println.call(null,"no changes");

return lisp_paredit.status_bar_view.invalid_input.call(null);
}
});
lisp_paredit.commands.edit.delete_forwards = (function lisp_paredit$commands$edit$delete_forwards(){
if(cljs.core.truth_(lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.delete$,(function (){var obj29045 = {"backward":false,"indent":false};
return obj29045;
})()))){
return null;
} else {
return lisp_paredit.status_bar_view.invalid_input.call(null);
}
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
var editor = atomio.workspace.get_active_text_editor.call(null);
return editor.transact(((function (editor){
return (function (){
editor.pasteText((function (){var obj29049 = {"autoIndent":false,"autoIndentNewline":false,"autoDecreaseIndent":false};
return obj29049;
})());

return lisp_paredit.commands.edit.indent.call(null);
});})(editor))
);
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
