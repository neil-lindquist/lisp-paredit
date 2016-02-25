// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('atomio.commands');
goog.require('cljs.core');
goog.require('atomio.views');
atomio.commands.workspace_view = (function atomio$commands$workspace_view(){
return atomio.views.get_view.call(null,atom.workspace);
});
atomio.commands.dispatch = (function atomio$commands$dispatch(var_args){
var args36188 = [];
var len__7200__auto___36191 = arguments.length;
var i__7201__auto___36192 = (0);
while(true){
if((i__7201__auto___36192 < len__7200__auto___36191)){
args36188.push((arguments[i__7201__auto___36192]));

var G__36193 = (i__7201__auto___36192 + (1));
i__7201__auto___36192 = G__36193;
continue;
} else {
}
break;
}

var G__36190 = args36188.length;
switch (G__36190) {
case 1:
return atomio.commands.dispatch.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return atomio.commands.dispatch.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36188.length)].join('')));

}
});

atomio.commands.dispatch.cljs$core$IFn$_invoke$arity$1 = (function (command){
return atomio.commands.dispatch.call(null,atomio.commands.workspace_view.call(null),command);
});

atomio.commands.dispatch.cljs$core$IFn$_invoke$arity$2 = (function (view,command){
return atom.commands.dispatch(view,command);
});

atomio.commands.dispatch.cljs$lang$maxFixedArity = 2;
atomio.commands.add = (function atomio$commands$add(var_args){
var args36195 = [];
var len__7200__auto___36198 = arguments.length;
var i__7201__auto___36199 = (0);
while(true){
if((i__7201__auto___36199 < len__7200__auto___36198)){
args36195.push((arguments[i__7201__auto___36199]));

var G__36200 = (i__7201__auto___36199 + (1));
i__7201__auto___36199 = G__36200;
continue;
} else {
}
break;
}

var G__36197 = args36195.length;
switch (G__36197) {
case 2:
return atomio.commands.add.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return atomio.commands.add.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36195.length)].join('')));

}
});

atomio.commands.add.cljs$core$IFn$_invoke$arity$2 = (function (command,command_fn){
return atomio.commands.add.call(null,"atom-text-editor",command,command_fn);
});

atomio.commands.add.cljs$core$IFn$_invoke$arity$3 = (function (scope,command,command_fn){
return atom.commands.add(scope,command,command_fn);
});

atomio.commands.add.cljs$lang$maxFixedArity = 3;
atomio.commands.on_did_dispatch = (function atomio$commands$on_did_dispatch(callback){
return atom.commands.onDidDispatch(callback);
});
atomio.commands.on_will_dispatch = (function atomio$commands$on_will_dispatch(callback){
return atom.commands.onWillDispatch(callback);
});
