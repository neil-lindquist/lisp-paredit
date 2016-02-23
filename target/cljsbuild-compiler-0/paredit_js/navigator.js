// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('paredit_js.navigator');
goog.require('cljs.core');
paredit_js.navigator._STAR_paredit_STAR_ = require("paredit.js");
paredit_js.navigator.sexp_range_expansion = (function paredit_js$navigator$sexp_range_expansion(ast,start_index,end_index){
return (paredit_js.navigator._STAR_paredit_STAR_["navigator"]["sexpRangeExpansion"]).call(null,ast,start_index,end_index);
});
paredit_js.navigator.forward_sexp = (function paredit_js$navigator$forward_sexp(ast,index){
return (paredit_js.navigator._STAR_paredit_STAR_["navigator"]["forwardSexp"]).call(null,ast,index);
});
paredit_js.navigator.backward_sexp = (function paredit_js$navigator$backward_sexp(ast,index){
return (paredit_js.navigator._STAR_paredit_STAR_["navigator"]["backwardSexp"]).call(null,ast,index);
});
paredit_js.navigator.backward_up_sexp = (function paredit_js$navigator$backward_up_sexp(ast,index){
return (paredit_js.navigator._STAR_paredit_STAR_["navigator"]["backwardUpSexp"]).call(null,ast,index);
});
paredit_js.navigator.forward_down_sexp = (function paredit_js$navigator$forward_down_sexp(ast,index){
return (paredit_js.navigator._STAR_paredit_STAR_["navigator"]["forwardDownSexp"]).call(null,ast,index);
});
