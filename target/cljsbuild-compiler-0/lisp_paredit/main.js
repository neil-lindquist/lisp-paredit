// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.main');
goog.require('cljs.core');
goog.require('lisp_paredit.commands.edit');
goog.require('atomio.config');
goog.require('lisp_paredit.status_bar_view');
goog.require('lisp_paredit.commands.navigate');
goog.require('paredit_js.core');
goog.require('lisp_paredit.ast');
goog.require('lisp_paredit.strict');
goog.require('atomio.workspace');
goog.require('lisp_paredit.markers');
goog.require('cljs.nodejs');
goog.require('lisp_paredit.utils');
goog.require('atomio.core');
goog.require('atomio.commands');
goog.require('lisp_paredit.node');
cljs.nodejs.enable_util_print_BANG_.call(null);
lisp_paredit.main._main = (function lisp_paredit$main$_main(args){
return null;
});
cljs.core._STAR_main_cli_fn_STAR_ = lisp_paredit.main._main;
lisp_paredit.main.subscriptions = cljs.core.atom.call(null,null);
lisp_paredit.main.persistent_subscriptions = cljs.core.atom.call(null,null);
lisp_paredit.main.strict_subscriptions = cljs.core.atom.call(null,null);
lisp_paredit.main.config = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"enabled","enabled",1195909756),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"boolean",new cljs.core.Keyword(null,"default","default",-1987822328),true,new cljs.core.Keyword(null,"description","description",-1428560544),"When enabled the paredit commands are bound to editors that have Lisp grammars",new cljs.core.Keyword(null,"order","order",-1254677256),(1)], null),new cljs.core.Keyword(null,"strict","strict",-665564191),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"boolean",new cljs.core.Keyword(null,"default","default",-1987822328),true,new cljs.core.Keyword(null,"description","description",-1428560544),"Strict mode disallows the removal of single brackets, instead encouraging the user to use the paredit commands to modify s-expressions",new cljs.core.Keyword(null,"order","order",-1254677256),(2)], null),new cljs.core.Keyword(null,"indentationForms","indentationForms",-1045565966),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"array",new cljs.core.Keyword(null,"default","default",-1987822328),cljs.core.PersistentVector.fromArray(["&","monitor-exit","/^case/","try","/^reify/","finally","/^(.*-)?loop/","/^let/","/^import/","new","/^deftype/","/^let/","fn","recur","/^set.*!$/",".","var","quote","catch","throw","monitor-enter","ns","in-ns","/^([^/]+/)?def/","/^if/","/^when/","/^unless/","while","for","/(^|/)with/","testing","while","cond","condp","apply","binding","locking","proxy","reify","/^extend/","facts","do","doseq","dorun","doall","dosync","start","stop"], true),new cljs.core.Keyword(null,"description","description",-1428560544),"A list of forms (strings or regexes) that affect the indentation level",new cljs.core.Keyword(null,"order","order",-1254677256),(3),new cljs.core.Keyword(null,"items","items",1031954938),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"string"], null)], null)], null);
lisp_paredit.main.toggle = (function lisp_paredit$main$toggle(){
return atomio.config.set.call(null,"lisp-paredit.enabled",cljs.core.not.call(null,atomio.config.get.call(null,"lisp-paredit.enabled")));
});
lisp_paredit.main.toggle_strict = (function lisp_paredit$main$toggle_strict(){
return atomio.config.set.call(null,"lisp-paredit.strict",cljs.core.not.call(null,atomio.config.get.call(null,"lisp-paredit.strict")));
});
lisp_paredit.main.check_syntax = (function lisp_paredit$main$check_syntax(editor){
var temp__4423__auto__ = (lisp_paredit.ast.get_ast.call(null,editor)["error"]);
if(cljs.core.truth_(temp__4423__auto__)){
var errors = temp__4423__auto__;
return lisp_paredit.markers.show_errors.call(null,editor,errors);
} else {
return lisp_paredit.markers.clear_errors.call(null,editor);
}
});
lisp_paredit.main.indent_inserted_text = (function lisp_paredit$main$indent_inserted_text(event){
var text = (event["text"]);
var editor = atomio.workspace.get_active_text_editor.call(null);
if(cljs.core._EQ_.call(null,"\n",text)){
event.cancel();

return editor.mutateSelectedText(((function (text,editor){
return (function (selection){
selection.insertText(text);

lisp_paredit.ast.update_ast.call(null,editor);

return lisp_paredit.commands.edit.indent_range.call(null,selection.getBufferRange(),editor,false);
});})(text,editor))
);
} else {
return null;
}
});
lisp_paredit.main.observe_editor = (function lisp_paredit$main$observe_editor(editor,subs){
lisp_paredit.main.check_syntax.call(null,editor);

subs.add(editor.onDidStopChanging((function (){
lisp_paredit.ast.update_ast.call(null,editor);

return lisp_paredit.main.check_syntax.call(null,editor);
})));

return subs.add(editor.onWillInsertText(lisp_paredit.main.indent_inserted_text));
});
lisp_paredit.main.configure_paredit = (function lisp_paredit$main$configure_paredit(){
var paredit_special_forms = paredit_js.core.special_forms.call(null);
cljs.core.doall.call(null,cljs.core.map.call(null,((function (paredit_special_forms){
return (function (){
return paredit_special_forms.pop();
});})(paredit_special_forms))
,paredit_special_forms));

var special_forms = (function (){var or__6142__auto__ = atomio.config.get.call(null,"lisp-paredit.indentationForms");
if(cljs.core.truth_(or__6142__auto__)){
return or__6142__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})();
var seq__44262 = cljs.core.seq.call(null,special_forms);
var chunk__44263 = null;
var count__44264 = (0);
var i__44265 = (0);
while(true){
if((i__44265 < count__44264)){
var special_form = cljs.core._nth.call(null,chunk__44263,i__44265);
var temp__4423__auto___44266 = special_form.match(/^\/(.+)\//);
if(cljs.core.truth_(temp__4423__auto___44266)){
var match_44267 = temp__4423__auto___44266;
paredit_special_forms.push((new RegExp(cljs.core.nth.call(null,match_44267,(1)))));
} else {
paredit_special_forms.push(special_form);
}

var G__44268 = seq__44262;
var G__44269 = chunk__44263;
var G__44270 = count__44264;
var G__44271 = (i__44265 + (1));
seq__44262 = G__44268;
chunk__44263 = G__44269;
count__44264 = G__44270;
i__44265 = G__44271;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__44262);
if(temp__4425__auto__){
var seq__44262__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__44262__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__44262__$1);
var G__44272 = cljs.core.chunk_rest.call(null,seq__44262__$1);
var G__44273 = c__6945__auto__;
var G__44274 = cljs.core.count.call(null,c__6945__auto__);
var G__44275 = (0);
seq__44262 = G__44272;
chunk__44263 = G__44273;
count__44264 = G__44274;
i__44265 = G__44275;
continue;
} else {
var special_form = cljs.core.first.call(null,seq__44262__$1);
var temp__4423__auto___44276 = special_form.match(/^\/(.+)\//);
if(cljs.core.truth_(temp__4423__auto___44276)){
var match_44277 = temp__4423__auto___44276;
paredit_special_forms.push((new RegExp(cljs.core.nth.call(null,match_44277,(1)))));
} else {
paredit_special_forms.push(special_form);
}

var G__44278 = cljs.core.next.call(null,seq__44262__$1);
var G__44279 = null;
var G__44280 = (0);
var G__44281 = (0);
seq__44262 = G__44278;
chunk__44263 = G__44279;
count__44264 = G__44280;
i__44265 = G__44281;
continue;
}
} else {
return null;
}
}
break;
}
});
lisp_paredit.main.disable_paredit = (function lisp_paredit$main$disable_paredit(subs){
if(cljs.core.truth_(subs)){
return subs.dispose();
} else {
return null;
}
});
lisp_paredit.main.enable_paredit = (function lisp_paredit$main$enable_paredit(subs){
lisp_paredit.utils.add_commands.call(null,new cljs.core.PersistentVector(null, 20, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["slurp-backwards",lisp_paredit.commands.edit.slurp_backwards], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["slurp-forwards",lisp_paredit.commands.edit.slurp_forwards], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["barf-backwards",lisp_paredit.commands.edit.barf_backwards], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["barf-forwards",lisp_paredit.commands.edit.barf_forwards], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["kill-sexp-forwards",lisp_paredit.commands.edit.kill_sexp_forwards], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["kill-sexp-backwards",lisp_paredit.commands.edit.kill_sexp_backwards], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["splice",lisp_paredit.commands.edit.splice], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["splice-backwards",lisp_paredit.commands.edit.splice_backwards], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["splice-forwards",lisp_paredit.commands.edit.splice_forwards], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["split",lisp_paredit.commands.edit.split], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["forward-sexp",lisp_paredit.commands.navigate.forward_sexp], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["backward-sexp",lisp_paredit.commands.navigate.backward_sexp], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["up-sexp",lisp_paredit.commands.navigate.up_sexp], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["down-sexp",lisp_paredit.commands.navigate.down_sexp], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["expand-selection",lisp_paredit.commands.navigate.expand_selection], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["indent",lisp_paredit.commands.edit.indent], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["wrap-around-parens",lisp_paredit.commands.edit.wrap_around_parens], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["wrap-around-square",lisp_paredit.commands.edit.wrap_around_square], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["wrap-around-curly",lisp_paredit.commands.edit.wrap_around_curly], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["toggle-strict",lisp_paredit.main.toggle_strict,"atom-workspace"], null)], null),subs);

return subs.add(atom.workspace.observeTextEditors((function (editor){
if(cljs.core.truth_(lisp_paredit.utils.supported_grammar_QMARK_.call(null,editor.getGrammar()))){
return lisp_paredit.main.observe_editor.call(null,editor,subs);
} else {
return editor.onDidChangeGrammar((function (grammar){
if(cljs.core.truth_(lisp_paredit.utils.supported_grammar_QMARK_.call(null,editor.getGrammar()))){
return lisp_paredit.main.observe_editor.call(null,editor,subs);
} else {
return null;
}
}));
}
})));
});

/**
* @constructor
 * @implements {lisp_paredit.main.Object}
*/
lisp_paredit.main.LispParedit = (function (config){
this.config = config;
})
lisp_paredit.main.LispParedit.prototype.activate = (function (state){
var self__ = this;
var this$ = this;
lisp_paredit.main.configure_paredit.call(null);

cljs.core.reset_BANG_.call(null,lisp_paredit.main.persistent_subscriptions,(new atomio.core.CompositeDisposable()));

lisp_paredit.utils.add_commands.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["toggle",lisp_paredit.main.toggle,"atom-workspace"], null)], null),cljs.core.deref.call(null,lisp_paredit.main.persistent_subscriptions));

atomio.config.observe.call(null,"lisp-paredit.enabled",((function (this$){
return (function (should_enable){
if(cljs.core.truth_(should_enable)){
cljs.core.reset_BANG_.call(null,lisp_paredit.main.subscriptions,(new atomio.core.CompositeDisposable()));

lisp_paredit.main.enable_paredit.call(null,cljs.core.deref.call(null,lisp_paredit.main.subscriptions));

if(cljs.core.truth_(atomio.config.get.call(null,"lisp-paredit.strict"))){
cljs.core.reset_BANG_.call(null,lisp_paredit.main.strict_subscriptions,(new atomio.core.CompositeDisposable()));

return lisp_paredit.strict.enable.call(null,cljs.core.deref.call(null,lisp_paredit.main.strict_subscriptions));
} else {
return null;
}
} else {
lisp_paredit.main.disable_paredit.call(null,cljs.core.deref.call(null,lisp_paredit.main.subscriptions));

return lisp_paredit.strict.disable.call(null,cljs.core.deref.call(null,lisp_paredit.main.strict_subscriptions));
}
});})(this$))
);

atomio.config.on_did_change.call(null,"lisp-paredit.strict",((function (this$){
return (function (event){
if(cljs.core.truth_((function (){var and__6130__auto__ = (event["newValue"]);
if(cljs.core.truth_(and__6130__auto__)){
return atomio.config.get.call(null,"lisp-paredit.enabled");
} else {
return and__6130__auto__;
}
})())){
cljs.core.reset_BANG_.call(null,lisp_paredit.main.strict_subscriptions,(new atomio.core.CompositeDisposable()));

return lisp_paredit.strict.enable.call(null,cljs.core.deref.call(null,lisp_paredit.main.strict_subscriptions));
} else {
return lisp_paredit.strict.disable.call(null,cljs.core.deref.call(null,lisp_paredit.main.strict_subscriptions));
}
});})(this$))
);

return atomio.config.on_did_change.call(null,"lisp-paredit.indentationForms",((function (this$){
return (function (event){
return lisp_paredit.main.configure_paredit.call(null);
});})(this$))
);
});

lisp_paredit.main.LispParedit.prototype.deactivate = (function (){
var self__ = this;
var this$ = this;
if(cljs.core.truth_(cljs.core.deref.call(null,lisp_paredit.main.persistent_subscriptions))){
cljs.core.deref.call(null,lisp_paredit.main.persistent_subscriptions).dispose();
} else {
}

if(cljs.core.truth_(cljs.core.deref.call(null,lisp_paredit.main.subscriptions))){
cljs.core.deref.call(null,lisp_paredit.main.subscriptions).dispose();
} else {
}

if(cljs.core.truth_(cljs.core.deref.call(null,lisp_paredit.main.strict_subscriptions))){
cljs.core.deref.call(null,lisp_paredit.main.strict_subscriptions).dispose();
} else {
}

return lisp_paredit.markers.detach.call(null);
});

lisp_paredit.main.LispParedit.prototype.consumeStatusBar = (function (status_bar){
var self__ = this;
var this$ = this;
return lisp_paredit.status_bar_view.initialize.call(null,status_bar);
});

lisp_paredit.main.LispParedit.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"config","config",-1659574354,null)], null);
});

lisp_paredit.main.LispParedit.cljs$lang$type = true;

lisp_paredit.main.LispParedit.cljs$lang$ctorStr = "lisp-paredit.main/LispParedit";

lisp_paredit.main.LispParedit.cljs$lang$ctorPrWriter = (function (this__6740__auto__,writer__6741__auto__,opt__6742__auto__){
return cljs.core._write.call(null,writer__6741__auto__,"lisp-paredit.main/LispParedit");
});

lisp_paredit.main.__GT_LispParedit = (function lisp_paredit$main$__GT_LispParedit(config){
return (new lisp_paredit.main.LispParedit(config));
});

lisp_paredit.node.export$.call(null,(new lisp_paredit.main.LispParedit(cljs.core.clj__GT_js.call(null,lisp_paredit.main.config))));
