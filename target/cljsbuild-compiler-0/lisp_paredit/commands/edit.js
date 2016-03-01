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
lisp_paredit.commands.edit.paredit_change_fns = new cljs.core.PersistentArrayMap(null, 2, ["insert",(function (editor,p__14078){
var vec__14079 = p__14078;
var index = cljs.core.nth.call(null,vec__14079,(0),null);
var text = cljs.core.nth.call(null,vec__14079,(1),null);
var point = lisp_paredit.utils.convert_index_to_point.call(null,index,editor);
var range = (new atomio.core.Range(point,point));
return editor.setTextInBufferRange(range,text);
}),"remove",(function (editor,p__14080){
var vec__14081 = p__14080;
var index = cljs.core.nth.call(null,vec__14081,(0),null);
var length = cljs.core.nth.call(null,vec__14081,(1),null);
var start = lisp_paredit.utils.convert_index_to_point.call(null,index,editor);
var end = lisp_paredit.utils.convert_index_to_point.call(null,(index + length),editor);
var range = (new atomio.core.Range(start,end));
return editor.setTextInBufferRange(range,"");
})], null);
lisp_paredit.commands.edit.apply_change = (function lisp_paredit$commands$edit$apply_change(editor,p__14082){
var vec__14084 = p__14082;
var action = cljs.core.nth.call(null,vec__14084,(0),null);
var args = cljs.core.nthnext.call(null,vec__14084,(1));
return cljs.core.get.call(null,lisp_paredit.commands.edit.paredit_change_fns,action).call(null,editor,args);
});
lisp_paredit.commands.edit.apply_changes = (function lisp_paredit$commands$edit$apply_changes(result,editor){
if(cljs.core.truth_(result)){
cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__14085_SHARP_){
return lisp_paredit.commands.edit.apply_change.call(null,editor,p1__14085_SHARP_);
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
cljs.core.println.call(null,newIndexes,first,point);

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
var vec__14089 = (cljs.core.truth_((function (){var and__6130__auto__ = range.isEmpty();
if(cljs.core.truth_(and__6130__auto__)){
return expand_if_empty_QMARK_;
} else {
return and__6130__auto__;
}
})())?paredit_js.navigator.sexp_range_expansion.call(null,ast,start_index,end_index):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start_index,end_index], null));
var start = cljs.core.nth.call(null,vec__14089,(0),null);
var end = cljs.core.nth.call(null,vec__14089,(1),null);
if(cljs.core.truth_((function (){var and__6130__auto__ = start;
if(cljs.core.truth_(and__6130__auto__)){
return end;
} else {
return and__6130__auto__;
}
})())){
cljs.core.println.call(null,ast,src,start,end);

var result = paredit_js.editor.indent_range.call(null,ast,src,start,end);
var changes = (result["changes"]);
if(cljs.core.truth_(cljs.core.not_empty.call(null,changes))){
return editor.transact(((function (result,changes,src,ast,start_index,end_index,vec__14089,start,end){
return (function (){
return lisp_paredit.commands.edit.apply_changes.call(null,(function (){var obj14091 = {"changes":changes};
return obj14091;
})(),editor);
});})(result,changes,src,ast,start_index,end_index,vec__14089,start,end))
);
} else {
return null;
}
} else {
return null;
}
});
lisp_paredit.commands.edit.apply_indent = (function lisp_paredit$commands$edit$apply_indent(changes,editor){
var rows_changed = cljs.core.map.call(null,(function (p__14094){
var vec__14095 = p__14094;
var _ = cljs.core.nth.call(null,vec__14095,(0),null);
var index = cljs.core.nth.call(null,vec__14095,(1),null);
var ___$1 = cljs.core.nth.call(null,vec__14095,(2),null);
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
var _ = goog.object.extend(args,(function (){var obj14101 = {"endIdx":lisp_paredit.utils.convert_point_to_index.call(null,end_index,editor)};
return obj14101;
})());
var result = f.call(null,ast,src,index,args);
var temp__4425__auto___14104 = (function (){var and__6130__auto__ = result;
if(cljs.core.truth_(and__6130__auto__)){
return (result["changes"]);
} else {
return and__6130__auto__;
}
})();
if(cljs.core.truth_(temp__4425__auto___14104)){
var changes_14105 = temp__4425__auto___14104;
lisp_paredit.commands.edit.apply_changes.call(null,(function (){var obj14103 = {"changes":changes_14105};
return obj14103;
})(),editor);

if(cljs.core.truth_((args["indent"]))){
lisp_paredit.commands.edit.apply_indent.call(null,changes_14105,editor);
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
var _ = goog.object.extend(args__$1,(function (){var obj14111 = {"count":(cljs.core.truth_(row)?cljs.core.count.call(null,lisp_paredit.utils.line_ending_for_row.call(null,row,editor)):(1))};
return obj14111;
})());
var result = f.call(null,ast,src,index,args__$1);
var temp__4425__auto___14114 = (function (){var and__6130__auto__ = result;
if(cljs.core.truth_(and__6130__auto__)){
return (result["changes"]);
} else {
return and__6130__auto__;
}
})();
if(cljs.core.truth_(temp__4425__auto___14114)){
var changes_14115 = temp__4425__auto___14114;
lisp_paredit.commands.edit.apply_changes.call(null,(function (){var obj14113 = {"changes":changes_14115};
return obj14113;
})(),editor);

if(cljs.core.truth_((args__$1["indent"]))){
lisp_paredit.commands.edit.apply_indent.call(null,changes_14115,editor);
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
var args14117 = [];
var len__7200__auto___14124 = arguments.length;
var i__7201__auto___14125 = (0);
while(true){
if((i__7201__auto___14125 < len__7200__auto___14124)){
args14117.push((arguments[i__7201__auto___14125]));

var G__14126 = (i__7201__auto___14125 + (1));
i__7201__auto___14125 = G__14126;
continue;
} else {
}
break;
}

var G__14119 = args14117.length;
switch (G__14119) {
case 1:
return lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14117.length)].join('')));

}
});

lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$1 = (function (f){
return lisp_paredit.commands.edit.edit.call(null,f,cljs.core.PersistentArrayMap.EMPTY);
});

lisp_paredit.commands.edit.edit.cljs$core$IFn$_invoke$arity$2 = (function (f,argv){
var editor = atomio.workspace.get_active_text_editor.call(null);
var cursors = editor.getCursorsOrderedByBufferPosition();
var selections = cljs.core.remove.call(null,((function (editor,cursors){
return (function (p1__14116_SHARP_){
return p1__14116_SHARP_.isEmpty();
});})(editor,cursors))
,editor.getSelections());
var args = (function (){var obj14121 = {"indent":true};
return obj14121;
})();
var _ = goog.object.extend(args,argv);
return editor.transact(((function (editor,cursors,selections,args,_){
return (function (){
var new_indexes = cljs.core.remove.call(null,cljs.core.nil_QMARK_,(((cljs.core.count.call(null,selections) > (0)))?lisp_paredit.commands.edit.edit_selections.call(null,editor,selections,f,args):lisp_paredit.commands.edit.edit_cursors.call(null,editor,cursors,f,args)));
if(cljs.core.seq.call(null,new_indexes)){
return lisp_paredit.commands.edit.apply_changes.call(null,(function (){var obj14123 = {"newIndexes":cljs.core.clj__GT_js.call(null,new_indexes)};
return obj14123;
})(),editor);
} else {
return null;
}
});})(editor,cursors,selections,args,_))
);
});

lisp_paredit.commands.edit.edit.cljs$lang$maxFixedArity = 2;
lisp_paredit.commands.edit.slurp_backwards = (function lisp_paredit$commands$edit$slurp_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.slurp_sexp,(function (){var obj14131 = {"backward":true};
return obj14131;
})());
});
lisp_paredit.commands.edit.slurp_forwards = (function lisp_paredit$commands$edit$slurp_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.slurp_sexp,(function (){var obj14135 = {"backward":false};
return obj14135;
})());
});
lisp_paredit.commands.edit.barf_backwards = (function lisp_paredit$commands$edit$barf_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.barf_sexp,(function (){var obj14139 = {"backward":true};
return obj14139;
})());
});
lisp_paredit.commands.edit.barf_forwards = (function lisp_paredit$commands$edit$barf_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.barf_sexp,(function (){var obj14143 = {"backward":false};
return obj14143;
})());
});
lisp_paredit.commands.edit.kill_sexp_forwards = (function lisp_paredit$commands$edit$kill_sexp_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.kill_sexp,(function (){var obj14147 = {"backward":false};
return obj14147;
})());
});
lisp_paredit.commands.edit.kill_sexp_backwards = (function lisp_paredit$commands$edit$kill_sexp_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.kill_sexp,(function (){var obj14151 = {"backward":true};
return obj14151;
})());
});
lisp_paredit.commands.edit.splice = (function lisp_paredit$commands$edit$splice(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp);
});
lisp_paredit.commands.edit.splice_backwards = (function lisp_paredit$commands$edit$splice_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp_kill,(function (){var obj14155 = {"backward":true};
return obj14155;
})());
});
lisp_paredit.commands.edit.splice_forwards = (function lisp_paredit$commands$edit$splice_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.splice_sexp_kill,(function (){var obj14159 = {"backward":false};
return obj14159;
})());
});
lisp_paredit.commands.edit.split = (function lisp_paredit$commands$edit$split(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.split_sexp);
});
lisp_paredit.commands.edit.indent = (function lisp_paredit$commands$edit$indent(){
var editor = atomio.workspace.get_active_text_editor.call(null);
var ranges = editor.getSelectedBufferRanges();
return cljs.core.doall.call(null,cljs.core.map.call(null,((function (editor,ranges){
return (function (p1__14160_SHARP_){
return lisp_paredit.commands.edit.indent_range.call(null,p1__14160_SHARP_,editor,true);
});})(editor,ranges))
,ranges));
});
lisp_paredit.commands.edit.delete_backwards = (function lisp_paredit$commands$edit$delete_backwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.delete$,(function (){var obj14164 = {"backward":true,"indent":false};
return obj14164;
})());
});
lisp_paredit.commands.edit.delete_forwards = (function lisp_paredit$commands$edit$delete_forwards(){
return lisp_paredit.commands.edit.edit.call(null,paredit_js.editor.delete$,(function (){var obj14168 = {"backward":false,"indent":false};
return obj14168;
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
var editor = atomio.workspace.get_active_text_editor.call(null);
return editor.transact(((function (editor){
return (function (){
editor.pasteText((function (){var obj14172 = {"autoIndent":false,"autoIndentNewline":false,"autoDecreaseIndent":false};
return obj14172;
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
