// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('paredit_js.editor');
goog.require('cljs.core');
paredit_js.editor._STAR_paredit_STAR_ = require("paredit.js");
paredit_js.editor.indent_range = (function paredit_js$editor$indent_range(ast,new_src,start,end){
return (paredit_js.editor._STAR_paredit_STAR_["editor"]["indentRange"]).call(null,ast,new_src,start,end);
});
paredit_js.editor.slurp_sexp = (function paredit_js$editor$slurp_sexp(ast,src,index,args){
return (paredit_js.editor._STAR_paredit_STAR_["editor"]["slurpSexp"]).call(null,ast,src,index,cljs.core.clj__GT_js.call(null,args));
});
paredit_js.editor.barf_sexp = (function paredit_js$editor$barf_sexp(ast,src,index,args){
return (paredit_js.editor._STAR_paredit_STAR_["editor"]["barfSexp"]).call(null,ast,src,index,cljs.core.clj__GT_js.call(null,args));
});
paredit_js.editor.kill_sexp = (function paredit_js$editor$kill_sexp(ast,src,index,args){
return (paredit_js.editor._STAR_paredit_STAR_["editor"]["killSexp"]).call(null,ast,src,index,cljs.core.clj__GT_js.call(null,args));
});
paredit_js.editor.splice_sexp = (function paredit_js$editor$splice_sexp(ast,src,index,args){
return (paredit_js.editor._STAR_paredit_STAR_["editor"]["spliceSexp"]).call(null,ast,src,index,cljs.core.clj__GT_js.call(null,args));
});
paredit_js.editor.splice_sexp_kill = (function paredit_js$editor$splice_sexp_kill(ast,src,index,args){
return (paredit_js.editor._STAR_paredit_STAR_["editor"]["spliceSexpKill"]).call(null,ast,src,index,cljs.core.clj__GT_js.call(null,args));
});
paredit_js.editor.split_sexp = (function paredit_js$editor$split_sexp(ast,src,index,args){
return (paredit_js.editor._STAR_paredit_STAR_["editor"]["splitSexp"]).call(null,ast,src,index,cljs.core.clj__GT_js.call(null,args));
});
paredit_js.editor.delete$ = (function paredit_js$editor$delete(ast,src,index,args){
return (paredit_js.editor._STAR_paredit_STAR_["editor"]["delete"]).call(null,ast,src,index,cljs.core.clj__GT_js.call(null,args));
});
paredit_js.editor.wrap_around = (function paredit_js$editor$wrap_around(ast,src,index,start,end,args){
return (paredit_js.editor._STAR_paredit_STAR_["editor"]["wrapAround"]).call(null,ast,src,index,start,end,cljs.core.clj__GT_js.call(null,args));
});
