// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__11402__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__11402 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__11403__i = 0, G__11403__a = new Array(arguments.length -  0);
while (G__11403__i < G__11403__a.length) {G__11403__a[G__11403__i] = arguments[G__11403__i + 0]; ++G__11403__i;}
  args = new cljs.core.IndexedSeq(G__11403__a,0);
} 
return G__11402__delegate.call(this,args);};
G__11402.cljs$lang$maxFixedArity = 0;
G__11402.cljs$lang$applyTo = (function (arglist__11404){
var args = cljs.core.seq(arglist__11404);
return G__11402__delegate(args);
});
G__11402.cljs$core$IFn$_invoke$arity$variadic = G__11402__delegate;
return G__11402;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__11405__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__11405 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__11406__i = 0, G__11406__a = new Array(arguments.length -  0);
while (G__11406__i < G__11406__a.length) {G__11406__a[G__11406__i] = arguments[G__11406__i + 0]; ++G__11406__i;}
  args = new cljs.core.IndexedSeq(G__11406__a,0);
} 
return G__11405__delegate.call(this,args);};
G__11405.cljs$lang$maxFixedArity = 0;
G__11405.cljs$lang$applyTo = (function (arglist__11407){
var args = cljs.core.seq(arglist__11407);
return G__11405__delegate(args);
});
G__11405.cljs$core$IFn$_invoke$arity$variadic = G__11405__delegate;
return G__11405;
})()
;

return null;
});
