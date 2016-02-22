// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('paredit_js.navigator');
goog.require('cljs.core');
paredit_js.navigator._STAR_paredit_STAR_ = require("paredit.js");
paredit_js.navigator.sexp_range_expansion = (function paredit_js$navigator$sexp_range_expansion(ast,start_index,end_index){
return cljs.core.js__GT_clj.call(null,(paredit_js.navigator._STAR_paredit_STAR_["navigator"]["sexpRangeExpansion"]).call(null,cljs.core.clj__GT_js.call(null,ast),start_index,end_index),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
});
paredit_js.navigator.forward_sexp = (function paredit_js$navigator$forward_sexp(ast,index){
return cljs.core.js__GT_clj.call(null,(paredit_js.navigator._STAR_paredit_STAR_["navigator"]["forwardSexp"]).call(null,cljs.core.clj__GT_js.call(null,ast),index),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
});
paredit_js.navigator.backward_sexp = (function paredit_js$navigator$backward_sexp(ast,index){
return cljs.core.js__GT_clj.call(null,(paredit_js.navigator._STAR_paredit_STAR_["navigator"]["backwardSexp"]).call(null,cljs.core.clj__GT_js.call(null,ast),index),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
});
paredit_js.navigator.backward_up_sexp = (function paredit_js$navigator$backward_up_sexp(ast,index){
return cljs.core.js__GT_clj.call(null,(paredit_js.navigator._STAR_paredit_STAR_["navigator"]["backwardUpSexp"]).call(null,cljs.core.clj__GT_js.call(null,ast),index),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
});
paredit_js.navigator.forward_down_sexp = (function paredit_js$navigator$forward_down_sexp(ast,index){
return cljs.core.js__GT_clj.call(null,(paredit_js.navigator._STAR_paredit_STAR_["navigator"]["forwardDownSexp"]).call(null,cljs.core.clj__GT_js.call(null,ast),index),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
});
