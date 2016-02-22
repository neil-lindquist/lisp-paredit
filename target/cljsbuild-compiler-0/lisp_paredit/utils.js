// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.utils');
goog.require('cljs.core');
goog.require('atomio.config');
goog.require('atomio.core');
lisp_paredit.utils.grammars = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, ["Lisp",null,"Scheme",null,"Newlisp",null,"Clojure",null], null), null);
lisp_paredit.utils.get_default_line_ending = (function lisp_paredit$utils$get_default_line_ending(){
var pred__25910 = cljs.core._EQ_;
var expr__25911 = atomio.config.get.call(null,"line-ending-selector.defaultLineEnding");
if(cljs.core.truth_(pred__25910.call(null,"LF",expr__25911))){
return "\n";
} else {
if(cljs.core.truth_(pred__25910.call(null,"CRLF",expr__25911))){
return "\r\n";
} else {
if(cljs.core._EQ_.call(null,"win32",process.platform)){
return "\r\n";
} else {
return "\n";
}
}
}
});
lisp_paredit.utils.add_command = (function lisp_paredit$utils$add_command(p__25913,subs){
var vec__25915 = p__25913;
var command = cljs.core.nth.call(null,vec__25915,(0),null);
var comm_fn = cljs.core.nth.call(null,vec__25915,(1),null);
var comm_scope = cljs.core.nth.call(null,vec__25915,(2),null);
var scope = (function (){var or__6142__auto__ = comm_scope;
if(cljs.core.truth_(or__6142__auto__)){
return or__6142__auto__;
} else {
return "atom-text-editor";
}
})();
var command_id = [cljs.core.str("lisp-paredit:"),cljs.core.str(command)].join('');
return subs.add(atom.commands.add(scope,command_id,comm_fn));
});
lisp_paredit.utils.index_to_point = (function lisp_paredit$utils$index_to_point(index,src){
var substr = src.substring((0),index);
var row = cljs.core.count.call(null,substr.match((new RegExp("\n","g"))));
var line_start = ((1) + substr.lastIndexOf("\n"));
var column = (index - line_start);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"row","row",-570139521),row,new cljs.core.Keyword(null,"column","column",2078222095),column], null);
});
lisp_paredit.utils.supported_grammar_QMARK_ = (function lisp_paredit$utils$supported_grammar_QMARK_(grammar){
return cljs.core.boolean$.call(null,cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([(grammar["name"])], true),lisp_paredit.utils.grammars));
});
lisp_paredit.utils.add_class = (function lisp_paredit$utils$add_class(view,class$){
return (view["className"] = [cljs.core.str((view["className"])),cljs.core.str(" "),cljs.core.str(class$)].join(''));
});
lisp_paredit.utils.remove_class = (function lisp_paredit$utils$remove_class(view,class$){
var regex = (new RegExp(class$,"g"));
return (view["className"] = (view["className"]).replace(regex,""));
});
lisp_paredit.utils.__GT_Point = (function lisp_paredit$utils$__GT_Point(row,col){
return (new atomio.core.Point(row,col));
});
lisp_paredit.utils.__GT_Range = (function lisp_paredit$utils$__GT_Range(start,end){
return (new atomio.core.Range(start,end));
});
lisp_paredit.utils.convert_point_to_index = (function lisp_paredit$utils$convert_point_to_index(point,editor){
var range = lisp_paredit.utils.__GT_Range.call(null,lisp_paredit.utils.__GT_Point.call(null,(0),(0)),point);
return cljs.core.count.call(null,editor.getTextInBufferRange(range));
});
lisp_paredit.utils.convert_index_to_point = (function lisp_paredit$utils$convert_index_to_point(index,editor){
var p = lisp_paredit.utils.index_to_point.call(null,index,editor.getText());
return lisp_paredit.utils.__GT_Point.call(null,new cljs.core.Keyword(null,"row","row",-570139521).cljs$core$IFn$_invoke$arity$1(p),new cljs.core.Keyword(null,"column","column",2078222095).cljs$core$IFn$_invoke$arity$1(p));
});
lisp_paredit.utils.add_commands = (function lisp_paredit$utils$add_commands(commands,subs){
var seq__25920 = cljs.core.seq.call(null,commands);
var chunk__25921 = null;
var count__25922 = (0);
var i__25923 = (0);
while(true){
if((i__25923 < count__25922)){
var command = cljs.core._nth.call(null,chunk__25921,i__25923);
lisp_paredit.utils.add_command.call(null,command,subs);

var G__25924 = seq__25920;
var G__25925 = chunk__25921;
var G__25926 = count__25922;
var G__25927 = (i__25923 + (1));
seq__25920 = G__25924;
chunk__25921 = G__25925;
count__25922 = G__25926;
i__25923 = G__25927;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__25920);
if(temp__4425__auto__){
var seq__25920__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__25920__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__25920__$1);
var G__25928 = cljs.core.chunk_rest.call(null,seq__25920__$1);
var G__25929 = c__6945__auto__;
var G__25930 = cljs.core.count.call(null,c__6945__auto__);
var G__25931 = (0);
seq__25920 = G__25928;
chunk__25921 = G__25929;
count__25922 = G__25930;
i__25923 = G__25931;
continue;
} else {
var command = cljs.core.first.call(null,seq__25920__$1);
lisp_paredit.utils.add_command.call(null,command,subs);

var G__25932 = cljs.core.next.call(null,seq__25920__$1);
var G__25933 = null;
var G__25934 = (0);
var G__25935 = (0);
seq__25920 = G__25932;
chunk__25921 = G__25933;
count__25922 = G__25934;
i__25923 = G__25935;
continue;
}
} else {
return null;
}
}
break;
}
});
lisp_paredit.utils.line_ending = (function lisp_paredit$utils$line_ending(editor){
var or__6142__auto__ = editor.buffer.getPreferredLineEnding();
if(cljs.core.truth_(or__6142__auto__)){
return or__6142__auto__;
} else {
return lisp_paredit.utils.get_default_line_ending.call(null);
}
});
lisp_paredit.utils.line_ending_for_row = (function lisp_paredit$utils$line_ending_for_row(row,editor){
var or__6142__auto__ = editor.buffer.lineEndingForRow(row);
if(cljs.core.truth_(or__6142__auto__)){
return or__6142__auto__;
} else {
return lisp_paredit.utils.line_ending.call(null,editor);
}
});
