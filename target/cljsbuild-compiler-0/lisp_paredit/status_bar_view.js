// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.status_bar_view');
goog.require('cljs.core');
goog.require('atomio.config');
goog.require('atomio.commands');
lisp_paredit.status_bar_view.create_web_component = (function lisp_paredit$status_bar_view$create_web_component(classname,tag,callbacks,attrs,inner_html){
var proto = Object.create(HTMLDivElement.prototype);
(proto["createdCallback"] = ((function (proto){
return (function (){
var this$ = this;
(this$["innerHTML"] = inner_html);

if(cljs.core.truth_(new cljs.core.Keyword(null,"created","created",-704993748).cljs$core$IFn$_invoke$arity$1(callbacks))){
return new cljs.core.Keyword(null,"created","created",-704993748).cljs$core$IFn$_invoke$arity$1(callbacks).call(null,this$);
} else {
return null;
}
});})(proto))
);

var seq__43485_43491 = cljs.core.seq.call(null,attrs);
var chunk__43486_43492 = null;
var count__43487_43493 = (0);
var i__43488_43494 = (0);
while(true){
if((i__43488_43494 < count__43487_43493)){
var vec__43489_43495 = cljs.core._nth.call(null,chunk__43486_43492,i__43488_43494);
var attr_43496 = cljs.core.nth.call(null,vec__43489_43495,(0),null);
var val_43497 = cljs.core.nth.call(null,vec__43489_43495,(1),null);
(proto[cljs.core.name.call(null,attr_43496)] = cljs.core.clj__GT_js.call(null,val_43497));

var G__43498 = seq__43485_43491;
var G__43499 = chunk__43486_43492;
var G__43500 = count__43487_43493;
var G__43501 = (i__43488_43494 + (1));
seq__43485_43491 = G__43498;
chunk__43486_43492 = G__43499;
count__43487_43493 = G__43500;
i__43488_43494 = G__43501;
continue;
} else {
var temp__4425__auto___43502 = cljs.core.seq.call(null,seq__43485_43491);
if(temp__4425__auto___43502){
var seq__43485_43503__$1 = temp__4425__auto___43502;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__43485_43503__$1)){
var c__6945__auto___43504 = cljs.core.chunk_first.call(null,seq__43485_43503__$1);
var G__43505 = cljs.core.chunk_rest.call(null,seq__43485_43503__$1);
var G__43506 = c__6945__auto___43504;
var G__43507 = cljs.core.count.call(null,c__6945__auto___43504);
var G__43508 = (0);
seq__43485_43491 = G__43505;
chunk__43486_43492 = G__43506;
count__43487_43493 = G__43507;
i__43488_43494 = G__43508;
continue;
} else {
var vec__43490_43509 = cljs.core.first.call(null,seq__43485_43503__$1);
var attr_43510 = cljs.core.nth.call(null,vec__43490_43509,(0),null);
var val_43511 = cljs.core.nth.call(null,vec__43490_43509,(1),null);
(proto[cljs.core.name.call(null,attr_43510)] = cljs.core.clj__GT_js.call(null,val_43511));

var G__43512 = cljs.core.next.call(null,seq__43485_43503__$1);
var G__43513 = null;
var G__43514 = (0);
var G__43515 = (0);
seq__43485_43491 = G__43512;
chunk__43486_43492 = G__43513;
count__43487_43493 = G__43514;
i__43488_43494 = G__43515;
continue;
}
} else {
}
}
break;
}

return (window[classname] = document.registerElement(cljs.core.name.call(null,tag),cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"prototype","prototype",-1121365005),proto], null))));
});
lisp_paredit.status_bar_view.create_web_component.call(null,"LispPareditStatus",new cljs.core.Keyword(null,"lisp-paredit-status","lisp-paredit-status",1533502599),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"created","created",-704993748),(function (node){
var enabled_el = node.querySelector(".enabled-status");
var strict_el = node.querySelector(".strict-status");
(node["classList"]).add("inline-block");

if(cljs.core.truth_(atomio.config.get.call(null,"lisp-paredit.enabled"))){
node.setAttribute("enabled","");
} else {
}

if(cljs.core.truth_(atomio.config.get.call(null,"lisp-paredit.strict"))){
node.setAttribute("strict","");
} else {
}

enabled_el.addEventListener("click",((function (enabled_el,strict_el){
return (function (){
return atomio.commands.dispatch.call(null,"lisp-paredit:toggle");
});})(enabled_el,strict_el))
);

strict_el.addEventListener("click",((function (enabled_el,strict_el){
return (function (){
return atomio.commands.dispatch.call(null,"lisp-paredit:toggle-strict");
});})(enabled_el,strict_el))
);

atomio.config.on_did_change.call(null,"lisp-paredit.enabled",((function (enabled_el,strict_el){
return (function (event){
return node.setEnabled((event["newValue"]));
});})(enabled_el,strict_el))
);

return atomio.config.on_did_change.call(null,"lisp-paredit.strict",((function (enabled_el,strict_el){
return (function (event){
return node.setStrict((event["newValue"]));
});})(enabled_el,strict_el))
);
})], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"invalidInput","invalidInput",1493379984),(function (){
var this$ = this;
this$.setAttribute("error","");

return setTimeout(((function (this$){
return (function (){
return this$.removeAttribute("error");
});})(this$))
,(500));
}),new cljs.core.Keyword(null,"setEnabled","setEnabled",1059879019),(function (val){
var node = this;
if(cljs.core.truth_(val)){
return node.setAttribute("enabled","");
} else {
return node.removeAttribute("enabled");
}
}),new cljs.core.Keyword(null,"setStrict","setStrict",-1902812081),(function (val){
var node = this;
if(cljs.core.truth_(val)){
return node.setAttribute("strict","");
} else {
return node.removeAttribute("strict");
}
})], null),"<span class='enabled-status'>(\u03BB)</span>\n  <span class='strict-status'>strict</span>");
lisp_paredit.status_bar_view.initialize = (function lisp_paredit$status_bar_view$initialize(status_bar){
var node = document.createElement("lisp-paredit-status");
return status_bar.addRightTile(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"item","item",249373802),node,new cljs.core.Keyword(null,"priority","priority",1431093715),(10)], null)));
});
lisp_paredit.status_bar_view.find_status_bar = (function lisp_paredit$status_bar_view$find_status_bar(){
return document.querySelector("lisp-paredit-status");
});
lisp_paredit.status_bar_view.invalid_input = (function lisp_paredit$status_bar_view$invalid_input(){
var temp__4425__auto__ = lisp_paredit.status_bar_view.find_status_bar.call(null);
if(cljs.core.truth_(temp__4425__auto__)){
var status_bar = temp__4425__auto__;
return status_bar.invalidInput();
} else {
return null;
}
});
