// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__11517__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__11517 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__11518__i = 0, G__11518__a = new Array(arguments.length -  0);
while (G__11518__i < G__11518__a.length) {G__11518__a[G__11518__i] = arguments[G__11518__i + 0]; ++G__11518__i;}
  args = new cljs.core.IndexedSeq(G__11518__a,0);
} 
return G__11517__delegate.call(this,args);};
G__11517.cljs$lang$maxFixedArity = 0;
G__11517.cljs$lang$applyTo = (function (arglist__11519){
var args = cljs.core.seq(arglist__11519);
return G__11517__delegate(args);
});
G__11517.cljs$core$IFn$_invoke$arity$variadic = G__11517__delegate;
return G__11517;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__11520__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__11520 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__11521__i = 0, G__11521__a = new Array(arguments.length -  0);
while (G__11521__i < G__11521__a.length) {G__11521__a[G__11521__i] = arguments[G__11521__i + 0]; ++G__11521__i;}
  args = new cljs.core.IndexedSeq(G__11521__a,0);
} 
return G__11520__delegate.call(this,args);};
G__11520.cljs$lang$maxFixedArity = 0;
G__11520.cljs$lang$applyTo = (function (arglist__11522){
var args = cljs.core.seq(arglist__11522);
return G__11520__delegate(args);
});
G__11520.cljs$core$IFn$_invoke$arity$variadic = G__11520__delegate;
return G__11520;
})()
;

return null;
});
