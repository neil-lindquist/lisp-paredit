// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.ast');
goog.require('cljs.core');
goog.require('paredit_js.core');
lisp_paredit.ast.asts = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lisp_paredit.ast.update_ast = (function lisp_paredit$ast$update_ast(editor){
cljs.core.println.call(null,"update-ast");

var start__7070__auto__ = cljs.core.system_time.call(null);
var ret__7071__auto__ = (function (){var ast = paredit_js.core.parse.call(null,editor.getText());
cljs.core.swap_BANG_.call(null,lisp_paredit.ast.asts,((function (ast,start__7070__auto__){
return (function (p1__34107_SHARP_){
return cljs.core.assoc.call(null,p1__34107_SHARP_,editor.getPath(),ast);
});})(ast,start__7070__auto__))
);

return ast;
})();
cljs.core.prn.call(null,[cljs.core.str("Elapsed time: "),cljs.core.str((cljs.core.system_time.call(null) - start__7070__auto__).toFixed((6))),cljs.core.str(" msecs")].join(''));

return ret__7071__auto__;
});
lisp_paredit.ast.get_ast = (function lisp_paredit$ast$get_ast(editor){
cljs.core.println.call(null,"get-ast");

var start__7070__auto__ = cljs.core.system_time.call(null);
var ret__7071__auto__ = (function (){var temp__4423__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,lisp_paredit.ast.asts),editor.getPath());
if(cljs.core.truth_(temp__4423__auto__)){
var ast = temp__4423__auto__;
return ast;
} else {
return lisp_paredit.ast.update_ast.call(null,editor);
}
})();
cljs.core.prn.call(null,[cljs.core.str("Elapsed time: "),cljs.core.str((cljs.core.system_time.call(null) - start__7070__auto__).toFixed((6))),cljs.core.str(" msecs")].join(''));

return ret__7071__auto__;
});
