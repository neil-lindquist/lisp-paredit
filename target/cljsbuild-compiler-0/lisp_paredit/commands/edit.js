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
lisp_paredit.commands.edit.paredit_change_fns = new cljs.core.PersistentArrayMap(null, 2, ["insert",(function (editor,p__30868){
var vec__30869 = p__30868;
var index = cljs.core.nth.call(null,vec__30869,(0),null);
var text = cljs.core.nth.call(null,vec__30869,(1),null);
var point = lisp_paredit.utils.convert_index_to_point.call(null,index,editor);
var range = (new atomio.core.Range(point,point));
return editor.setTextInBufferRange(range,text);
}),"remove",(function (editor,p__30870){
var vec__30871 = p__30870;
var index = cljs.core.nth.call(null,vec__30871,(0),null);
var length = cljs.core.nth.call(null,vec__30871,(1),null);
var start = lisp_paredit.utils.convert_index_to_point.call(null,index,editor);
var end = lisp_paredit.utils.convert_index_to_point.call(null,(index + length),editor);
var range = (new atomio.core.Range(start,end));
return editor.setTextInBufferRange(range,"");
})], null);
lisp_paredit.commands.edit.apply_change = (function lisp_paredit$commands$edit$apply_change(editor,p__30872){
var vec__30874 = p__30872;
var action = cljs.core.nth.call(null,vec__30874,(0),null);
var args = cljs.core.nthnext.call(null,vec__30874,(1));
return cljs.core.get.call(null,lisp_paredit.commands.edit.paredit_change_fns,action).call(null,editor,args);
});
lisp_paredit.commands.edit.apply_changes = (function lisp_paredit$commands$edit$apply_changes(result,editor){
if(cljs.core.truth_(result)){
cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__30875_SHARP_){
return lisp_paredit.commands.edit.apply_change.call(null,editor,p1__30875_SHARP_);
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
var vec__30879 = (cljs.core.truth_((function (){var and__6130__auto__ = range.isEmpty();
if(cljs.core.truth_(and__6130__auto__)){
return expand_if_empty_QMARK_;
} else {
return and__6130__auto__;
}
})())?paredit_js.navigator.sexp_range_expansion.call(null,ast,start_index,end_index):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start_index,end_index], null));
var start = cljs.core.nth.call(null,vec__30879,(0),null);
var end = cljs.core.nth.call(null,vec__30879,(1),null);
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
return editor.transact(((function (result,changes,src,ast,start_index,end_index,vec__30879,start,end){
return (function (){
return lisp_paredit.commands.edit.apply_changes.call(null,(function (){var obj30881 = {"changes":changes};
return obj30881;
})(),editor);
});})(result,changes,src,ast,start_index,end_index,vec__30879,start,end))
);
} else {
return null;
}
} else {
return null;
}
});
lisp_paredit.commands.edit.apply_indent = (function lisp_paredit$commands$edit$apply_indent(changes,editor){
var rows_changed = cljs.core.map.call(null,(function (p__30884){
var vec__30885 = p__30884;
var _ = cljs.core.nth.call(null,vec__30885,(0),null);
var index = cljs.core.nth.call(null,vec__30885,(1),null);
var ___$1 = cljs.core.nth.call(null,vec__30885,(2),null);
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
var args30886 = [];
var len__7200__auto___30897 = arguments.length;
var i__7201__auto___30898 = (0);
while(true){
if((i__7201__auto___30898 < len__7200__auto___30897)){
args30886.push((arguments[i__7201__auto___30898]));

var G__30899 = (i__7201__auto___30898 + (1));
i__7201__auto___30898 = G__30899;
continue;
} else {
}
break;
}

var G__30888 = args30886.length;
switch (G__30888) {
case 1:
return lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30886.length)].join('')));

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
var args = (cljs.core.truth_(selection.isEmpty())?(function (){var obj30890 = {"indent":true,"count":(1)};
return obj30890;
})():(function (){var obj30892 = {"indent":true,"endIdx":end_index};
return obj30892;
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

lisp_paredit.commands.edit.apply_changes.call(null,(function (){var obj30894 = {"changes":changes};
return obj30894;
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
lisp_paredit.commands.edit.apply_changes.call(null,(function (){var obj30896 = {"newIndexes":cljs.core.clj__GT_js.call(null,cljs.core.deref.call(null,new_indexes))};
return obj30896;
})(),editor);
} else {
}

return cljs.core.deref.call(null,changed_QMARK_);
});

lisp_paredit.commands.edit.edit.cljs$lang$maxFixedArity = 2;
lisp_paredit.commands.edit.slurp_backwards = (function lisp_paredit$commands$edit$slurp_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.slurp_sexp,(function (){var obj30904 = {"backward":true};
return obj30904;
})());
});
lisp_paredit.commands.edit.slurp_forwards = (function lisp_paredit$commands$edit$slurp_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.slurp_sexp,(function (){var obj30908 = {"backward":false};
return obj30908;
})());
});
lisp_paredit.commands.edit.barf_backwards = (function lisp_paredit$commands$edit$barf_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.barf_sexp,(function (){var obj30912 = {"backward":true};
return obj30912;
})());
});
lisp_paredit.commands.edit.barf_forwards = (function lisp_paredit$commands$edit$barf_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.barf_sexp,(function (){var obj30916 = {"backward":false};
return obj30916;
})());
});
lisp_paredit.commands.edit.kill_sexp_forwards = (function lisp_paredit$commands$edit$kill_sexp_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.kill_sexp,(function (){var obj30920 = {"backward":false};
return obj30920;
})());
});
lisp_paredit.commands.edit.kill_sexp_backwards = (function lisp_paredit$commands$edit$kill_sexp_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.kill_sexp,(function (){var obj30924 = {"backward":true};
return obj30924;
})());
});
lisp_paredit.commands.edit.splice = (function lisp_paredit$commands$edit$splice(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp);
});
lisp_paredit.commands.edit.splice_backwards = (function lisp_paredit$commands$edit$splice_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp_kill,(function (){var obj30928 = {"backward":true};
return obj30928;
})());
});
lisp_paredit.commands.edit.splice_forwards = (function lisp_paredit$commands$edit$splice_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp_kill,(function (){var obj30932 = {"backward":false};
return obj30932;
})());
});
lisp_paredit.commands.edit.split = (function lisp_paredit$commands$edit$split(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.split_sexp);
});
lisp_paredit.commands.edit.indent = (function lisp_paredit$commands$edit$indent(){
var editor = atomio.workspace.get_active_text_editor.call(null);
var ranges = editor.getSelectedBufferRanges();
return cljs.core.doall.call(null,cljs.core.map.call(null,((function (editor,ranges){
return (function (p1__30933_SHARP_){
return lisp_paredit.commands.edit.indent_range.call(null,p1__30933_SHARP_,editor,true);
});})(editor,ranges))
,ranges));
});
lisp_paredit.commands.edit.delete_backwards = (function lisp_paredit$commands$edit$delete_backwards(){
cljs.core.println.call(null,"delete-backwards");

var res = lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.delete$,(function (){var obj30937 = {"backward":true,"indent":false};
return obj30937;
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
if(cljs.core.truth_(lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.delete$,(function (){var obj30941 = {"backward":false,"indent":false};
return obj30941;
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
editor.pasteText((function (){var obj30945 = {"autoIndent":false,"autoIndentNewline":false,"autoDecreaseIndent":false};
return obj30945;
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
