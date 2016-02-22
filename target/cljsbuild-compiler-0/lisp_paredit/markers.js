// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.markers');
goog.require('cljs.core');
goog.require('lisp_paredit.utils');
lisp_paredit.markers.syntax_markers = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lisp_paredit.markers.clear_errors = (function lisp_paredit$markers$clear_errors(editor){
var temp__4423__auto___43307 = cljs.core.get.call(null,cljs.core.deref.call(null,lisp_paredit.markers.syntax_markers),(editor["id"]));
if(cljs.core.truth_(temp__4423__auto___43307)){
var markers_43308 = temp__4423__auto___43307;
cljs.core.doall.call(null,cljs.core.map.call(null,((function (markers_43308,temp__4423__auto___43307){
return (function (p1__43305_SHARP_){
return p1__43305_SHARP_.destroy();
});})(markers_43308,temp__4423__auto___43307))
,markers_43308));
} else {
}

return cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,(function (p1__43306_SHARP_){
return cljs.core.assoc.call(null,p1__43306_SHARP_,(editor["id"]),cljs.core.PersistentVector.EMPTY);
}));
});
lisp_paredit.markers.show_errors = (function lisp_paredit$markers$show_errors(editor,errors){
lisp_paredit.markers.clear_errors.call(null,editor);

if(cljs.core.seq.call(null,errors)){
var seq__43318 = cljs.core.seq.call(null,errors);
var chunk__43319 = null;
var count__43320 = (0);
var i__43321 = (0);
while(true){
if((i__43321 < count__43320)){
var error = cljs.core._nth.call(null,chunk__43319,i__43321);
var range_43326 = lisp_paredit.utils.__GT_Range.call(null,lisp_paredit.utils.convert_index_to_point.call(null,new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(error),editor),lisp_paredit.utils.convert_index_to_point.call(null,new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(error),editor));
var marker_43327 = editor.markBufferRange(range_43326,(function (){var obj43323 = {"inavalidate":"touch"};
return obj43323;
})());
editor.decorateMarker(marker_43327,cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"highlight",new cljs.core.Keyword(null,"class","class",-2030961996),"lisp-syntax-error"], null)));

cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,((function (seq__43318,chunk__43319,count__43320,i__43321,range_43326,marker_43327,error){
return (function (p1__43309_SHARP_){
return cljs.core.update.call(null,p1__43309_SHARP_,(editor["id"]),((function (seq__43318,chunk__43319,count__43320,i__43321,range_43326,marker_43327,error){
return (function (vec){
return cljs.core.conj.call(null,vec,marker_43327);
});})(seq__43318,chunk__43319,count__43320,i__43321,range_43326,marker_43327,error))
);
});})(seq__43318,chunk__43319,count__43320,i__43321,range_43326,marker_43327,error))
);

var G__43328 = seq__43318;
var G__43329 = chunk__43319;
var G__43330 = count__43320;
var G__43331 = (i__43321 + (1));
seq__43318 = G__43328;
chunk__43319 = G__43329;
count__43320 = G__43330;
i__43321 = G__43331;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__43318);
if(temp__4425__auto__){
var seq__43318__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__43318__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__43318__$1);
var G__43332 = cljs.core.chunk_rest.call(null,seq__43318__$1);
var G__43333 = c__6945__auto__;
var G__43334 = cljs.core.count.call(null,c__6945__auto__);
var G__43335 = (0);
seq__43318 = G__43332;
chunk__43319 = G__43333;
count__43320 = G__43334;
i__43321 = G__43335;
continue;
} else {
var error = cljs.core.first.call(null,seq__43318__$1);
var range_43336 = lisp_paredit.utils.__GT_Range.call(null,lisp_paredit.utils.convert_index_to_point.call(null,new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(error),editor),lisp_paredit.utils.convert_index_to_point.call(null,new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(error),editor));
var marker_43337 = editor.markBufferRange(range_43336,(function (){var obj43325 = {"inavalidate":"touch"};
return obj43325;
})());
editor.decorateMarker(marker_43337,cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"highlight",new cljs.core.Keyword(null,"class","class",-2030961996),"lisp-syntax-error"], null)));

cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,((function (seq__43318,chunk__43319,count__43320,i__43321,range_43336,marker_43337,error,seq__43318__$1,temp__4425__auto__){
return (function (p1__43309_SHARP_){
return cljs.core.update.call(null,p1__43309_SHARP_,(editor["id"]),((function (seq__43318,chunk__43319,count__43320,i__43321,range_43336,marker_43337,error,seq__43318__$1,temp__4425__auto__){
return (function (vec){
return cljs.core.conj.call(null,vec,marker_43337);
});})(seq__43318,chunk__43319,count__43320,i__43321,range_43336,marker_43337,error,seq__43318__$1,temp__4425__auto__))
);
});})(seq__43318,chunk__43319,count__43320,i__43321,range_43336,marker_43337,error,seq__43318__$1,temp__4425__auto__))
);

var G__43338 = cljs.core.next.call(null,seq__43318__$1);
var G__43339 = null;
var G__43340 = (0);
var G__43341 = (0);
seq__43318 = G__43338;
chunk__43319 = G__43339;
count__43320 = G__43340;
i__43321 = G__43341;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
lisp_paredit.markers.detach = (function lisp_paredit$markers$detach(){
var seq__43356 = cljs.core.seq.call(null,cljs.core.deref.call(null,lisp_paredit.markers.syntax_markers));
var chunk__43357 = null;
var count__43358 = (0);
var i__43359 = (0);
while(true){
if((i__43359 < count__43358)){
var vec__43360 = cljs.core._nth.call(null,chunk__43357,i__43359);
var _ = cljs.core.nth.call(null,vec__43360,(0),null);
var markers = cljs.core.nth.call(null,vec__43360,(1),null);
var seq__43361_43370 = cljs.core.seq.call(null,markers);
var chunk__43362_43371 = null;
var count__43363_43372 = (0);
var i__43364_43373 = (0);
while(true){
if((i__43364_43373 < count__43363_43372)){
var m_43374 = cljs.core._nth.call(null,chunk__43362_43371,i__43364_43373);
m_43374.destroy();

var G__43375 = seq__43361_43370;
var G__43376 = chunk__43362_43371;
var G__43377 = count__43363_43372;
var G__43378 = (i__43364_43373 + (1));
seq__43361_43370 = G__43375;
chunk__43362_43371 = G__43376;
count__43363_43372 = G__43377;
i__43364_43373 = G__43378;
continue;
} else {
var temp__4425__auto___43379 = cljs.core.seq.call(null,seq__43361_43370);
if(temp__4425__auto___43379){
var seq__43361_43380__$1 = temp__4425__auto___43379;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__43361_43380__$1)){
var c__6945__auto___43381 = cljs.core.chunk_first.call(null,seq__43361_43380__$1);
var G__43382 = cljs.core.chunk_rest.call(null,seq__43361_43380__$1);
var G__43383 = c__6945__auto___43381;
var G__43384 = cljs.core.count.call(null,c__6945__auto___43381);
var G__43385 = (0);
seq__43361_43370 = G__43382;
chunk__43362_43371 = G__43383;
count__43363_43372 = G__43384;
i__43364_43373 = G__43385;
continue;
} else {
var m_43386 = cljs.core.first.call(null,seq__43361_43380__$1);
m_43386.destroy();

var G__43387 = cljs.core.next.call(null,seq__43361_43380__$1);
var G__43388 = null;
var G__43389 = (0);
var G__43390 = (0);
seq__43361_43370 = G__43387;
chunk__43362_43371 = G__43388;
count__43363_43372 = G__43389;
i__43364_43373 = G__43390;
continue;
}
} else {
}
}
break;
}

var G__43391 = seq__43356;
var G__43392 = chunk__43357;
var G__43393 = count__43358;
var G__43394 = (i__43359 + (1));
seq__43356 = G__43391;
chunk__43357 = G__43392;
count__43358 = G__43393;
i__43359 = G__43394;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__43356);
if(temp__4425__auto__){
var seq__43356__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__43356__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__43356__$1);
var G__43395 = cljs.core.chunk_rest.call(null,seq__43356__$1);
var G__43396 = c__6945__auto__;
var G__43397 = cljs.core.count.call(null,c__6945__auto__);
var G__43398 = (0);
seq__43356 = G__43395;
chunk__43357 = G__43396;
count__43358 = G__43397;
i__43359 = G__43398;
continue;
} else {
var vec__43365 = cljs.core.first.call(null,seq__43356__$1);
var _ = cljs.core.nth.call(null,vec__43365,(0),null);
var markers = cljs.core.nth.call(null,vec__43365,(1),null);
var seq__43366_43399 = cljs.core.seq.call(null,markers);
var chunk__43367_43400 = null;
var count__43368_43401 = (0);
var i__43369_43402 = (0);
while(true){
if((i__43369_43402 < count__43368_43401)){
var m_43403 = cljs.core._nth.call(null,chunk__43367_43400,i__43369_43402);
m_43403.destroy();

var G__43404 = seq__43366_43399;
var G__43405 = chunk__43367_43400;
var G__43406 = count__43368_43401;
var G__43407 = (i__43369_43402 + (1));
seq__43366_43399 = G__43404;
chunk__43367_43400 = G__43405;
count__43368_43401 = G__43406;
i__43369_43402 = G__43407;
continue;
} else {
var temp__4425__auto___43408__$1 = cljs.core.seq.call(null,seq__43366_43399);
if(temp__4425__auto___43408__$1){
var seq__43366_43409__$1 = temp__4425__auto___43408__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__43366_43409__$1)){
var c__6945__auto___43410 = cljs.core.chunk_first.call(null,seq__43366_43409__$1);
var G__43411 = cljs.core.chunk_rest.call(null,seq__43366_43409__$1);
var G__43412 = c__6945__auto___43410;
var G__43413 = cljs.core.count.call(null,c__6945__auto___43410);
var G__43414 = (0);
seq__43366_43399 = G__43411;
chunk__43367_43400 = G__43412;
count__43368_43401 = G__43413;
i__43369_43402 = G__43414;
continue;
} else {
var m_43415 = cljs.core.first.call(null,seq__43366_43409__$1);
m_43415.destroy();

var G__43416 = cljs.core.next.call(null,seq__43366_43409__$1);
var G__43417 = null;
var G__43418 = (0);
var G__43419 = (0);
seq__43366_43399 = G__43416;
chunk__43367_43400 = G__43417;
count__43368_43401 = G__43418;
i__43369_43402 = G__43419;
continue;
}
} else {
}
}
break;
}

var G__43420 = cljs.core.next.call(null,seq__43356__$1);
var G__43421 = null;
var G__43422 = (0);
var G__43423 = (0);
seq__43356 = G__43420;
chunk__43357 = G__43421;
count__43358 = G__43422;
i__43359 = G__43423;
continue;
}
} else {
return null;
}
}
break;
}
});
