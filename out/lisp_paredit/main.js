// Compiled by ClojureScript 1.7.170 {:target :nodejs}
goog.provide('lisp_paredit.main');
goog.require('cljs.core');
goog.require('cljs.nodejs');
cljs.nodejs.enable_util_print_BANG_.call(null);
lisp_paredit.main.paredit = cljs.nodejs.require.call(null,"paredit.js");
lisp_paredit.main.atomio = cljs.nodejs.require.call(null,"atom");
lisp_paredit.main._main = (function lisp_paredit$main$_main(var_args){
var args__3343__auto__ = [];
var len__3340__auto___37 = arguments.length;
var i__3341__auto___38 = (0);
while(true){
if((i__3341__auto___38 < len__3340__auto___37)){
args__3343__auto__.push((arguments[i__3341__auto___38]));

var G__39 = (i__3341__auto___38 + (1));
i__3341__auto___38 = G__39;
continue;
} else {
}
break;
}

var argseq__3344__auto__ = ((((0) < args__3343__auto__.length))?(new cljs.core.IndexedSeq(args__3343__auto__.slice((0)),(0))):null);
return lisp_paredit.main._main.cljs$core$IFn$_invoke$arity$variadic(argseq__3344__auto__);
});

lisp_paredit.main._main.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.println.call(null,"LispParedit main");
});

lisp_paredit.main._main.cljs$lang$maxFixedArity = (0);

lisp_paredit.main._main.cljs$lang$applyTo = (function (seq36){
return lisp_paredit.main._main.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq36));
});
cljs.core._STAR_main_cli_fn_STAR_ = lisp_paredit.main._main;

/**
* @constructor
 * @implements {lisp_paredit.main.Object}
*/
lisp_paredit.main.LispParedit = (function (name){
this.name = name;
})
lisp_paredit.main.LispParedit.prototype.activate = (function (){
var self__ = this;
var state = this;
return cljs.core.println.call(null,"Activated with state",state);
});

lisp_paredit.main.LispParedit.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"name","name",-810760592,null)], null);
});

lisp_paredit.main.LispParedit.cljs$lang$type = true;

lisp_paredit.main.LispParedit.cljs$lang$ctorStr = "lisp-paredit.main/LispParedit";

lisp_paredit.main.LispParedit.cljs$lang$ctorPrWriter = (function (this__3044__auto__,writer__3045__auto__,opt__3046__auto__){
return cljs.core._write.call(null,writer__3045__auto__,"lisp-paredit.main/LispParedit");
});

lisp_paredit.main.__GT_LispParedit = (function lisp_paredit$main$__GT_LispParedit(name){
return (new lisp_paredit.main.LispParedit(name));
});

module.exports = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lisp_paredit.main.LispParedit], null);

//# sourceMappingURL=main.js.map