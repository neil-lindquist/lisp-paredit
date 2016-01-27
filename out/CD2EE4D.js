goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__30__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__30 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__31__i = 0, G__31__a = new Array(arguments.length -  0);
while (G__31__i < G__31__a.length) {G__31__a[G__31__i] = arguments[G__31__i + 0]; ++G__31__i;}
  args = new cljs.core.IndexedSeq(G__31__a,0);
} 
return G__30__delegate.call(this,args);};
G__30.cljs$lang$maxFixedArity = 0;
G__30.cljs$lang$applyTo = (function (arglist__32){
var args = cljs.core.seq(arglist__32);
return G__30__delegate(args);
});
G__30.cljs$core$IFn$_invoke$arity$variadic = G__30__delegate;
return G__30;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__33__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__33 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__34__i = 0, G__34__a = new Array(arguments.length -  0);
while (G__34__i < G__34__a.length) {G__34__a[G__34__i] = arguments[G__34__i + 0]; ++G__34__i;}
  args = new cljs.core.IndexedSeq(G__34__a,0);
} 
return G__33__delegate.call(this,args);};
G__33.cljs$lang$maxFixedArity = 0;
G__33.cljs$lang$applyTo = (function (arglist__35){
var args = cljs.core.seq(arglist__35);
return G__33__delegate(args);
});
G__33.cljs$core$IFn$_invoke$arity$variadic = G__33__delegate;
return G__33;
})()
;

return null;
});
