// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('paredit_js');
goog.require('cljs.core');
paredit_js._STAR_paredit_STAR_ = require("paredit.js");
paredit_js.parse = (function paredit_js$parse(text){
return cljs.core.js__GT_clj.call(null,paredit_js._STAR_paredit_STAR_.parse(text));
});
paredit_js.sexp_range_expansion = (function paredit_js$sexp_range_expansion(ast,start_index,end_index){
return paredit.navigator.sexpRangeExpansion(ast,start_index,end_index);
});
paredit_js.indent_range = (function paredit_js$indent_range(ast,new_src,start,end){
return paredit.editor.indentRange(ast,new_src,start,end);
});
paredit_js.special_forms = (function paredit_js$special_forms(){
return (paredit_js._STAR_paredit_STAR_["specialForms"]);
});
