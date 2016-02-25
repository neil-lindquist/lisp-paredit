// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.ast');
goog.require('cljs.core');
goog.require('paredit_js.core');
lisp_paredit.ast.asts = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lisp_paredit.ast.hashcodes = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lisp_paredit.ast.hashcode = (function lisp_paredit$ast$hashcode(str){
if(cljs.core._EQ_.call(null,(0),cljs.core.count.call(null,str))){
return (0);
} else {
var h = (0);
var i = (0);
while(true){
var c = str.charCodeAt(i);
var hash = ((((h << (5)) - h) + c) | (0));
if(cljs.core._EQ_.call(null,i,(cljs.core.count.call(null,str) - (1)))){
return hash;
} else {
var G__43879 = hash;
var G__43880 = (i + (1));
h = G__43879;
i = G__43880;
continue;
}
break;
}
}
});
/**
 * Get the ast for the editor. Store in a map keyed by the file path
 * to avoid parsing the same source more than once.
 */
lisp_paredit.ast.get_ast = (function lisp_paredit$ast$get_ast(editor){
var src = editor.getText();
var path = editor.getPath();
var hashcode = lisp_paredit.ast.hashcode.call(null,src);
var existing_hashcode = cljs.core.get.call(null,cljs.core.deref.call(null,lisp_paredit.ast.hashcodes),path);
var existing_ast = cljs.core.get.call(null,cljs.core.deref.call(null,lisp_paredit.ast.asts),path);
if(cljs.core.truth_((function (){var and__6130__auto__ = existing_ast;
if(cljs.core.truth_(and__6130__auto__)){
return cljs.core._EQ_.call(null,existing_hashcode,hashcode);
} else {
return and__6130__auto__;
}
})())){
return existing_ast;
} else {
var ast = paredit_js.core.parse.call(null,src);
cljs.core.swap_BANG_.call(null,lisp_paredit.ast.asts,((function (ast,src,path,hashcode,existing_hashcode,existing_ast){
return (function (p1__43881_SHARP_){
return cljs.core.assoc.call(null,p1__43881_SHARP_,path,ast);
});})(ast,src,path,hashcode,existing_hashcode,existing_ast))
);

cljs.core.swap_BANG_.call(null,lisp_paredit.ast.hashcodes,((function (ast,src,path,hashcode,existing_hashcode,existing_ast){
return (function (p1__43882_SHARP_){
return cljs.core.assoc.call(null,p1__43882_SHARP_,path,hashcode);
});})(ast,src,path,hashcode,existing_hashcode,existing_ast))
);

return ast;
}
});
