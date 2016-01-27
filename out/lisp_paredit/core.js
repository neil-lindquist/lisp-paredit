// Compiled by ClojureScript 1.7.170 {:target :nodejs}
goog.provide('lisp_paredit.core');
goog.require('cljs.core');
goog.require('cljs.nodejs');
cljs.nodejs.enable_util_print_BANG_.call(null);
lisp_paredit.core.paredit = cljs.nodejs.require.call(null,"paredit.js");
lisp_paredit.core.atomio = cljs.nodejs.require.call(null,"atom");

/**
* @constructor
 * @implements {lisp_paredit.core.Object}
*/
lisp_paredit.core.LispParedit = (function (){
})
lisp_paredit.core.LispParedit.prototype.activate = (function (state){
var self__ = this;
var this$ = this;
return cljs.core.println.call(null,"Activated with state",state);
});

lisp_paredit.core.LispParedit.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

lisp_paredit.core.LispParedit.cljs$lang$type = true;

lisp_paredit.core.LispParedit.cljs$lang$ctorStr = "lisp-paredit.core/LispParedit";

lisp_paredit.core.LispParedit.cljs$lang$ctorPrWriter = (function (this__3044__auto__,writer__3045__auto__,opt__3046__auto__){
return cljs.core._write.call(null,writer__3045__auto__,"lisp-paredit.core/LispParedit");
});

lisp_paredit.core.__GT_LispParedit = (function lisp_paredit$core$__GT_LispParedit(){
return (new lisp_paredit.core.LispParedit());
});

module.exports = lisp_paredit.core.LispParedit;

//# sourceMappingURL=core.js.map