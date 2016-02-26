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

var seq__11931_11937 = cljs.core.seq.call(null,attrs);
var chunk__11932_11938 = null;
var count__11933_11939 = (0);
var i__11934_11940 = (0);
while(true){
if((i__11934_11940 < count__11933_11939)){
var vec__11935_11941 = cljs.core._nth.call(null,chunk__11932_11938,i__11934_11940);
var attr_11942 = cljs.core.nth.call(null,vec__11935_11941,(0),null);
var val_11943 = cljs.core.nth.call(null,vec__11935_11941,(1),null);
(proto[cljs.core.name.call(null,attr_11942)] = cljs.core.clj__GT_js.call(null,val_11943));

var G__11944 = seq__11931_11937;
var G__11945 = chunk__11932_11938;
var G__11946 = count__11933_11939;
var G__11947 = (i__11934_11940 + (1));
seq__11931_11937 = G__11944;
chunk__11932_11938 = G__11945;
count__11933_11939 = G__11946;
i__11934_11940 = G__11947;
continue;
} else {
var temp__4425__auto___11948 = cljs.core.seq.call(null,seq__11931_11937);
if(temp__4425__auto___11948){
var seq__11931_11949__$1 = temp__4425__auto___11948;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11931_11949__$1)){
var c__6945__auto___11950 = cljs.core.chunk_first.call(null,seq__11931_11949__$1);
var G__11951 = cljs.core.chunk_rest.call(null,seq__11931_11949__$1);
var G__11952 = c__6945__auto___11950;
var G__11953 = cljs.core.count.call(null,c__6945__auto___11950);
var G__11954 = (0);
seq__11931_11937 = G__11951;
chunk__11932_11938 = G__11952;
count__11933_11939 = G__11953;
i__11934_11940 = G__11954;
continue;
} else {
var vec__11936_11955 = cljs.core.first.call(null,seq__11931_11949__$1);
var attr_11956 = cljs.core.nth.call(null,vec__11936_11955,(0),null);
var val_11957 = cljs.core.nth.call(null,vec__11936_11955,(1),null);
(proto[cljs.core.name.call(null,attr_11956)] = cljs.core.clj__GT_js.call(null,val_11957));

var G__11958 = cljs.core.next.call(null,seq__11931_11949__$1);
var G__11959 = null;
var G__11960 = (0);
var G__11961 = (0);
seq__11931_11937 = G__11958;
chunk__11932_11938 = G__11959;
count__11933_11939 = G__11960;
i__11934_11940 = G__11961;
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
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"invalidInput","invalidInput",1493379984),(function (){
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
}),new cljs.core.Keyword(null,"syntaxError","syntaxError",656644703),(function (){
var node = this;
return node.setAttribute("syntax-error","");
}),new cljs.core.Keyword(null,"clearError","clearError",-950666556),(function (){
var node = this;
return node.removeAttribute("syntax-error");
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
lisp_paredit.status_bar_view.detach = (function lisp_paredit$status_bar_view$detach(){
var temp__4425__auto__ = lisp_paredit.status_bar_view.find_status_bar.call(null);
if(cljs.core.truth_(temp__4425__auto__)){
var status_bar = temp__4425__auto__;
return document.removeElement(status_bar);
} else {
return null;
}
});
lisp_paredit.status_bar_view.syntax_error = (function lisp_paredit$status_bar_view$syntax_error(){
var temp__4425__auto__ = lisp_paredit.status_bar_view.find_status_bar.call(null);
if(cljs.core.truth_(temp__4425__auto__)){
var status_bar = temp__4425__auto__;
return status_bar.syntaxError();
} else {
return null;
}
});
lisp_paredit.status_bar_view.clear_error = (function lisp_paredit$status_bar_view$clear_error(){
var temp__4425__auto__ = lisp_paredit.status_bar_view.find_status_bar.call(null);
if(cljs.core.truth_(temp__4425__auto__)){
var status_bar = temp__4425__auto__;
return status_bar.clearError();
} else {
return null;
}
});
