// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.markers');
goog.require('cljs.core');
goog.require('lisp_paredit.utils');
lisp_paredit.markers.syntax_markers = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lisp_paredit.markers.clear_errors = (function lisp_paredit$markers$clear_errors(editor){
var temp__4425__auto___11390 = cljs.core.get.call(null,cljs.core.deref.call(null,lisp_paredit.markers.syntax_markers),(editor["id"]));
if(cljs.core.truth_(temp__4425__auto___11390)){
var markers_11391 = temp__4425__auto___11390;
cljs.core.doall.call(null,cljs.core.map.call(null,((function (markers_11391,temp__4425__auto___11390){
return (function (p1__11388_SHARP_){
return p1__11388_SHARP_.destroy();
});})(markers_11391,temp__4425__auto___11390))
,markers_11391));
} else {
}

return cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,(function (p1__11389_SHARP_){
return cljs.core.assoc.call(null,p1__11389_SHARP_,(editor["id"]),cljs.core.PersistentVector.EMPTY);
}));
});
lisp_paredit.markers.show_errors = (function lisp_paredit$markers$show_errors(editor,errors){
lisp_paredit.markers.clear_errors.call(null,editor);

if(cljs.core.seq.call(null,errors)){
var seq__11405 = cljs.core.seq.call(null,errors);
var chunk__11406 = null;
var count__11407 = (0);
var i__11408 = (0);
while(true){
if((i__11408 < count__11407)){
var error = cljs.core._nth.call(null,chunk__11406,i__11408);
var range_11417 = lisp_paredit.utils.__GT_Range.call(null,lisp_paredit.utils.convert_index_to_point.call(null,(error["start"]),editor),lisp_paredit.utils.convert_index_to_point.call(null,(error["end"]),editor));
var marker_11418 = editor.markBufferRange(range_11417,(function (){var obj11410 = {"invalidate":"touch"};
return obj11410;
})());
editor.decorateMarker(marker_11418,(function (){var obj11412 = {"type":"highlight","class":"lisp-syntax-error"};
return obj11412;
})());

cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,((function (seq__11405,chunk__11406,count__11407,i__11408,range_11417,marker_11418,error){
return (function (p1__11392_SHARP_){
return cljs.core.update.call(null,p1__11392_SHARP_,(editor["id"]),((function (seq__11405,chunk__11406,count__11407,i__11408,range_11417,marker_11418,error){
return (function (vec){
return cljs.core.conj.call(null,vec,marker_11418);
});})(seq__11405,chunk__11406,count__11407,i__11408,range_11417,marker_11418,error))
);
});})(seq__11405,chunk__11406,count__11407,i__11408,range_11417,marker_11418,error))
);

var G__11419 = seq__11405;
var G__11420 = chunk__11406;
var G__11421 = count__11407;
var G__11422 = (i__11408 + (1));
seq__11405 = G__11419;
chunk__11406 = G__11420;
count__11407 = G__11421;
i__11408 = G__11422;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__11405);
if(temp__4425__auto__){
var seq__11405__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11405__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__11405__$1);
var G__11423 = cljs.core.chunk_rest.call(null,seq__11405__$1);
var G__11424 = c__6945__auto__;
var G__11425 = cljs.core.count.call(null,c__6945__auto__);
var G__11426 = (0);
seq__11405 = G__11423;
chunk__11406 = G__11424;
count__11407 = G__11425;
i__11408 = G__11426;
continue;
} else {
var error = cljs.core.first.call(null,seq__11405__$1);
var range_11427 = lisp_paredit.utils.__GT_Range.call(null,lisp_paredit.utils.convert_index_to_point.call(null,(error["start"]),editor),lisp_paredit.utils.convert_index_to_point.call(null,(error["end"]),editor));
var marker_11428 = editor.markBufferRange(range_11427,(function (){var obj11414 = {"invalidate":"touch"};
return obj11414;
})());
editor.decorateMarker(marker_11428,(function (){var obj11416 = {"type":"highlight","class":"lisp-syntax-error"};
return obj11416;
})());

cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,((function (seq__11405,chunk__11406,count__11407,i__11408,range_11427,marker_11428,error,seq__11405__$1,temp__4425__auto__){
return (function (p1__11392_SHARP_){
return cljs.core.update.call(null,p1__11392_SHARP_,(editor["id"]),((function (seq__11405,chunk__11406,count__11407,i__11408,range_11427,marker_11428,error,seq__11405__$1,temp__4425__auto__){
return (function (vec){
return cljs.core.conj.call(null,vec,marker_11428);
});})(seq__11405,chunk__11406,count__11407,i__11408,range_11427,marker_11428,error,seq__11405__$1,temp__4425__auto__))
);
});})(seq__11405,chunk__11406,count__11407,i__11408,range_11427,marker_11428,error,seq__11405__$1,temp__4425__auto__))
);

var G__11429 = cljs.core.next.call(null,seq__11405__$1);
var G__11430 = null;
var G__11431 = (0);
var G__11432 = (0);
seq__11405 = G__11429;
chunk__11406 = G__11430;
count__11407 = G__11431;
i__11408 = G__11432;
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
var seq__11447 = cljs.core.seq.call(null,cljs.core.deref.call(null,lisp_paredit.markers.syntax_markers));
var chunk__11448 = null;
var count__11449 = (0);
var i__11450 = (0);
while(true){
if((i__11450 < count__11449)){
var vec__11451 = cljs.core._nth.call(null,chunk__11448,i__11450);
var _ = cljs.core.nth.call(null,vec__11451,(0),null);
var markers = cljs.core.nth.call(null,vec__11451,(1),null);
var seq__11452_11461 = cljs.core.seq.call(null,markers);
var chunk__11453_11462 = null;
var count__11454_11463 = (0);
var i__11455_11464 = (0);
while(true){
if((i__11455_11464 < count__11454_11463)){
var m_11465 = cljs.core._nth.call(null,chunk__11453_11462,i__11455_11464);
m_11465.destroy();

var G__11466 = seq__11452_11461;
var G__11467 = chunk__11453_11462;
var G__11468 = count__11454_11463;
var G__11469 = (i__11455_11464 + (1));
seq__11452_11461 = G__11466;
chunk__11453_11462 = G__11467;
count__11454_11463 = G__11468;
i__11455_11464 = G__11469;
continue;
} else {
var temp__4425__auto___11470 = cljs.core.seq.call(null,seq__11452_11461);
if(temp__4425__auto___11470){
var seq__11452_11471__$1 = temp__4425__auto___11470;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11452_11471__$1)){
var c__6945__auto___11472 = cljs.core.chunk_first.call(null,seq__11452_11471__$1);
var G__11473 = cljs.core.chunk_rest.call(null,seq__11452_11471__$1);
var G__11474 = c__6945__auto___11472;
var G__11475 = cljs.core.count.call(null,c__6945__auto___11472);
var G__11476 = (0);
seq__11452_11461 = G__11473;
chunk__11453_11462 = G__11474;
count__11454_11463 = G__11475;
i__11455_11464 = G__11476;
continue;
} else {
var m_11477 = cljs.core.first.call(null,seq__11452_11471__$1);
m_11477.destroy();

var G__11478 = cljs.core.next.call(null,seq__11452_11471__$1);
var G__11479 = null;
var G__11480 = (0);
var G__11481 = (0);
seq__11452_11461 = G__11478;
chunk__11453_11462 = G__11479;
count__11454_11463 = G__11480;
i__11455_11464 = G__11481;
continue;
}
} else {
}
}
break;
}

var G__11482 = seq__11447;
var G__11483 = chunk__11448;
var G__11484 = count__11449;
var G__11485 = (i__11450 + (1));
seq__11447 = G__11482;
chunk__11448 = G__11483;
count__11449 = G__11484;
i__11450 = G__11485;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__11447);
if(temp__4425__auto__){
var seq__11447__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11447__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__11447__$1);
var G__11486 = cljs.core.chunk_rest.call(null,seq__11447__$1);
var G__11487 = c__6945__auto__;
var G__11488 = cljs.core.count.call(null,c__6945__auto__);
var G__11489 = (0);
seq__11447 = G__11486;
chunk__11448 = G__11487;
count__11449 = G__11488;
i__11450 = G__11489;
continue;
} else {
var vec__11456 = cljs.core.first.call(null,seq__11447__$1);
var _ = cljs.core.nth.call(null,vec__11456,(0),null);
var markers = cljs.core.nth.call(null,vec__11456,(1),null);
var seq__11457_11490 = cljs.core.seq.call(null,markers);
var chunk__11458_11491 = null;
var count__11459_11492 = (0);
var i__11460_11493 = (0);
while(true){
if((i__11460_11493 < count__11459_11492)){
var m_11494 = cljs.core._nth.call(null,chunk__11458_11491,i__11460_11493);
m_11494.destroy();

var G__11495 = seq__11457_11490;
var G__11496 = chunk__11458_11491;
var G__11497 = count__11459_11492;
var G__11498 = (i__11460_11493 + (1));
seq__11457_11490 = G__11495;
chunk__11458_11491 = G__11496;
count__11459_11492 = G__11497;
i__11460_11493 = G__11498;
continue;
} else {
var temp__4425__auto___11499__$1 = cljs.core.seq.call(null,seq__11457_11490);
if(temp__4425__auto___11499__$1){
var seq__11457_11500__$1 = temp__4425__auto___11499__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11457_11500__$1)){
var c__6945__auto___11501 = cljs.core.chunk_first.call(null,seq__11457_11500__$1);
var G__11502 = cljs.core.chunk_rest.call(null,seq__11457_11500__$1);
var G__11503 = c__6945__auto___11501;
var G__11504 = cljs.core.count.call(null,c__6945__auto___11501);
var G__11505 = (0);
seq__11457_11490 = G__11502;
chunk__11458_11491 = G__11503;
count__11459_11492 = G__11504;
i__11460_11493 = G__11505;
continue;
} else {
var m_11506 = cljs.core.first.call(null,seq__11457_11500__$1);
m_11506.destroy();

var G__11507 = cljs.core.next.call(null,seq__11457_11500__$1);
var G__11508 = null;
var G__11509 = (0);
var G__11510 = (0);
seq__11457_11490 = G__11507;
chunk__11458_11491 = G__11508;
count__11459_11492 = G__11509;
i__11460_11493 = G__11510;
continue;
}
} else {
}
}
break;
}

var G__11511 = cljs.core.next.call(null,seq__11447__$1);
var G__11512 = null;
var G__11513 = (0);
var G__11514 = (0);
seq__11447 = G__11511;
chunk__11448 = G__11512;
count__11449 = G__11513;
i__11450 = G__11514;
continue;
}
} else {
return null;
}
}
break;
}
});
