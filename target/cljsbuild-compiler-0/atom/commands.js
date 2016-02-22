// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('atom.commands');
goog.require('cljs.core');
goog.require('atom.views');
atom.commands.workspace_view = (function atom$commands$workspace_view(){
return atom.views.get_view.call(null,atom.workspace);
});
atom.commands.dispatch = (function atom$commands$dispatch(var_args){
var args10001 = [];
var len__7200__auto___10004 = arguments.length;
var i__7201__auto___10005 = (0);
while(true){
if((i__7201__auto___10005 < len__7200__auto___10004)){
args10001.push((arguments[i__7201__auto___10005]));

var G__10006 = (i__7201__auto___10005 + (1));
i__7201__auto___10005 = G__10006;
continue;
} else {
}
break;
}

var G__10003 = args10001.length;
switch (G__10003) {
case 1:
return atom.commands.dispatch.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return atom.commands.dispatch.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10001.length)].join('')));

}
});

atom.commands.dispatch.cljs$core$IFn$_invoke$arity$1 = (function (command){
return atom.commands.dispatch.call(null,atom.commands.workspace_view.call(null),command);
});

atom.commands.dispatch.cljs$core$IFn$_invoke$arity$2 = (function (view,command){
return atom.commands.dispatch(view,command);
});

atom.commands.dispatch.cljs$lang$maxFixedArity = 2;
atom.commands.add = (function atom$commands$add(var_args){
var args10008 = [];
var len__7200__auto___10011 = arguments.length;
var i__7201__auto___10012 = (0);
while(true){
if((i__7201__auto___10012 < len__7200__auto___10011)){
args10008.push((arguments[i__7201__auto___10012]));

var G__10013 = (i__7201__auto___10012 + (1));
i__7201__auto___10012 = G__10013;
continue;
} else {
}
break;
}

var G__10010 = args10008.length;
switch (G__10010) {
case 2:
return atom.commands.add.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return atom.commands.add.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10008.length)].join('')));

}
});

atom.commands.add.cljs$core$IFn$_invoke$arity$2 = (function (command,command_fn){
return atom.commands.add.call(null,"atom-text-editor",command,command_fn);
});

atom.commands.add.cljs$core$IFn$_invoke$arity$3 = (function (scope,command,command_fn){
return atom.commands.add(scope,command,command_fn);
});

atom.commands.add.cljs$lang$maxFixedArity = 3;
