// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.utils');
goog.require('cljs.core');
goog.require('atomio.config');
goog.require('atomio.views');
goog.require('atomio.workspace');
goog.require('atomio.core');
goog.require('atomio.commands');
lisp_paredit.utils.grammars = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, ["Lisp",null,"Scheme",null,"Newlisp",null,"Clojure",null], null), null);
lisp_paredit.utils.lisp_selector = "atom-text-editor[data-grammar~=\"clojure\"],\n                    atom-text-editor[data-grammar~=\"lisp\"],\n                    atom-text-editor[data-grammar~=\"newlisp\"],\n                    atom-text-editor[data-grammar~=\"scheme\"]";
lisp_paredit.utils.get_default_line_ending = (function lisp_paredit$utils$get_default_line_ending(){
var pred__11235 = cljs.core._EQ_;
var expr__11236 = atomio.config.get.call(null,"line-ending-selector.defaultLineEnding");
if(cljs.core.truth_(pred__11235.call(null,"LF",expr__11236))){
return "\n";
} else {
if(cljs.core.truth_(pred__11235.call(null,"CRLF",expr__11236))){
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
lisp_paredit.utils.add_command = (function lisp_paredit$utils$add_command(p__11238,subs){
var vec__11240 = p__11238;
var command = cljs.core.nth.call(null,vec__11240,(0),null);
var comm_fn = cljs.core.nth.call(null,vec__11240,(1),null);
var comm_scope = cljs.core.nth.call(null,vec__11240,(2),null);
var scope = (function (){var or__6142__auto__ = comm_scope;
if(cljs.core.truth_(or__6142__auto__)){
return or__6142__auto__;
} else {
return "atom-text-editor";
}
})();
return subs.add(atom.commands.add(scope,command,comm_fn));
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
var seq__11245 = cljs.core.seq.call(null,commands);
var chunk__11246 = null;
var count__11247 = (0);
var i__11248 = (0);
while(true){
if((i__11248 < count__11247)){
var command = cljs.core._nth.call(null,chunk__11246,i__11248);
lisp_paredit.utils.add_command.call(null,command,subs);

var G__11249 = seq__11245;
var G__11250 = chunk__11246;
var G__11251 = count__11247;
var G__11252 = (i__11248 + (1));
seq__11245 = G__11249;
chunk__11246 = G__11250;
count__11247 = G__11251;
i__11248 = G__11252;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__11245);
if(temp__4425__auto__){
var seq__11245__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11245__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__11245__$1);
var G__11253 = cljs.core.chunk_rest.call(null,seq__11245__$1);
var G__11254 = c__6945__auto__;
var G__11255 = cljs.core.count.call(null,c__6945__auto__);
var G__11256 = (0);
seq__11245 = G__11253;
chunk__11246 = G__11254;
count__11247 = G__11255;
i__11248 = G__11256;
continue;
} else {
var command = cljs.core.first.call(null,seq__11245__$1);
lisp_paredit.utils.add_command.call(null,command,subs);

var G__11257 = cljs.core.next.call(null,seq__11245__$1);
var G__11258 = null;
var G__11259 = (0);
var G__11260 = (0);
seq__11245 = G__11257;
chunk__11246 = G__11258;
count__11247 = G__11259;
i__11248 = G__11260;
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
lisp_paredit.utils.editor_command_event_wrapper = (function lisp_paredit$utils$editor_command_event_wrapper(wrapped_fn){
return (function (event){
var editor = atomio.workspace.get_active_text_editor.call(null);
var type = (event["type"]);
var target = (event["target"]);
var model = (target["model"]);
if(cljs.core.truth_((function (){var and__6130__auto__ = cljs.core._EQ_.call(null,model,editor);
if(and__6130__auto__){
return lisp_paredit.utils.supported_grammar_QMARK_.call(null,editor.getGrammar());
} else {
return and__6130__auto__;
}
})())){
event.preventDefault();

event.stopImmediatePropagation();

event.stopPropagation();

return wrapped_fn.call(null);
} else {
return null;
}
});
});
