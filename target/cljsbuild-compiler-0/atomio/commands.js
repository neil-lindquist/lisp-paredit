// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('atomio.commands');
goog.require('cljs.core');
goog.require('atomio.views');
atomio.commands.workspace_view = (function atomio$commands$workspace_view(){
return atomio.views.get_view.call(null,atom.workspace);
});
atomio.commands.dispatch = (function atomio$commands$dispatch(var_args){
var args11167 = [];
var len__7200__auto___11170 = arguments.length;
var i__7201__auto___11171 = (0);
while(true){
if((i__7201__auto___11171 < len__7200__auto___11170)){
args11167.push((arguments[i__7201__auto___11171]));

var G__11172 = (i__7201__auto___11171 + (1));
i__7201__auto___11171 = G__11172;
continue;
} else {
}
break;
}

var G__11169 = args11167.length;
switch (G__11169) {
case 1:
return atomio.commands.dispatch.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return atomio.commands.dispatch.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11167.length)].join('')));

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
var args11174 = [];
var len__7200__auto___11177 = arguments.length;
var i__7201__auto___11178 = (0);
while(true){
if((i__7201__auto___11178 < len__7200__auto___11177)){
args11174.push((arguments[i__7201__auto___11178]));

var G__11179 = (i__7201__auto___11178 + (1));
i__7201__auto___11178 = G__11179;
continue;
} else {
}
break;
}

var G__11176 = args11174.length;
switch (G__11176) {
case 2:
return atomio.commands.add.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return atomio.commands.add.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11174.length)].join('')));

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
