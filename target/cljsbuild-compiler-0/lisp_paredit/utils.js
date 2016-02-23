// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.utils');
goog.require('cljs.core');
goog.require('atomio.config');
goog.require('atomio.core');
lisp_paredit.utils.grammars = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, ["Lisp",null,"Scheme",null,"Newlisp",null,"Clojure",null], null), null);
lisp_paredit.utils.get_default_line_ending = (function lisp_paredit$utils$get_default_line_ending(){
var pred__12593 = cljs.core._EQ_;
var expr__12594 = atomio.config.get.call(null,"line-ending-selector.defaultLineEnding");
if(cljs.core.truth_(pred__12593.call(null,"LF",expr__12594))){
return "\n";
} else {
if(cljs.core.truth_(pred__12593.call(null,"CRLF",expr__12594))){
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
lisp_paredit.utils.add_command = (function lisp_paredit$utils$add_command(p__12596,subs){
var vec__12598 = p__12596;
var command = cljs.core.nth.call(null,vec__12598,(0),null);
var comm_fn = cljs.core.nth.call(null,vec__12598,(1),null);
var comm_scope = cljs.core.nth.call(null,vec__12598,(2),null);
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
var seq__12603 = cljs.core.seq.call(null,commands);
var chunk__12604 = null;
var count__12605 = (0);
var i__12606 = (0);
while(true){
if((i__12606 < count__12605)){
var command = cljs.core._nth.call(null,chunk__12604,i__12606);
lisp_paredit.utils.add_command.call(null,command,subs);

var G__12607 = seq__12603;
var G__12608 = chunk__12604;
var G__12609 = count__12605;
var G__12610 = (i__12606 + (1));
seq__12603 = G__12607;
chunk__12604 = G__12608;
count__12605 = G__12609;
i__12606 = G__12610;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__12603);
if(temp__4425__auto__){
var seq__12603__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12603__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__12603__$1);
var G__12611 = cljs.core.chunk_rest.call(null,seq__12603__$1);
var G__12612 = c__6945__auto__;
var G__12613 = cljs.core.count.call(null,c__6945__auto__);
var G__12614 = (0);
seq__12603 = G__12611;
chunk__12604 = G__12612;
count__12605 = G__12613;
i__12606 = G__12614;
continue;
} else {
var command = cljs.core.first.call(null,seq__12603__$1);
lisp_paredit.utils.add_command.call(null,command,subs);

var G__12615 = cljs.core.next.call(null,seq__12603__$1);
var G__12616 = null;
var G__12617 = (0);
var G__12618 = (0);
seq__12603 = G__12615;
chunk__12604 = G__12616;
count__12605 = G__12617;
i__12606 = G__12618;
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
