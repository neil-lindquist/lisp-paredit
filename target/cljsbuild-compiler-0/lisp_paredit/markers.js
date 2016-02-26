// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.markers');
goog.require('cljs.core');
goog.require('lisp_paredit.utils');
lisp_paredit.markers.syntax_markers = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lisp_paredit.markers.clear_errors = (function lisp_paredit$markers$clear_errors(editor){
var temp__4425__auto___17528 = cljs.core.get.call(null,cljs.core.deref.call(null,lisp_paredit.markers.syntax_markers),(editor["id"]));
if(cljs.core.truth_(temp__4425__auto___17528)){
var markers_17529 = temp__4425__auto___17528;
cljs.core.doall.call(null,cljs.core.map.call(null,((function (markers_17529,temp__4425__auto___17528){
return (function (p1__17526_SHARP_){
return p1__17526_SHARP_.destroy();
});})(markers_17529,temp__4425__auto___17528))
,markers_17529));
} else {
}

return cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,(function (p1__17527_SHARP_){
return cljs.core.assoc.call(null,p1__17527_SHARP_,(editor["id"]),cljs.core.PersistentVector.EMPTY);
}));
});
lisp_paredit.markers.show_errors = (function lisp_paredit$markers$show_errors(editor,errors){
lisp_paredit.markers.clear_errors.call(null,editor);

if(cljs.core.seq.call(null,errors)){
var seq__17543 = cljs.core.seq.call(null,errors);
var chunk__17544 = null;
var count__17545 = (0);
var i__17546 = (0);
while(true){
if((i__17546 < count__17545)){
var error = cljs.core._nth.call(null,chunk__17544,i__17546);
var range_17555 = lisp_paredit.utils.__GT_Range.call(null,lisp_paredit.utils.convert_index_to_point.call(null,(error["start"]),editor),lisp_paredit.utils.convert_index_to_point.call(null,(error["end"]),editor));
var marker_17556 = editor.markBufferRange(range_17555,(function (){var obj17548 = {"invalidate":"touch"};
return obj17548;
})());
editor.decorateMarker(marker_17556,(function (){var obj17550 = {"type":"highlight","class":"lisp-syntax-error"};
return obj17550;
})());

cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,((function (seq__17543,chunk__17544,count__17545,i__17546,range_17555,marker_17556,error){
return (function (p1__17530_SHARP_){
return cljs.core.update.call(null,p1__17530_SHARP_,(editor["id"]),((function (seq__17543,chunk__17544,count__17545,i__17546,range_17555,marker_17556,error){
return (function (vec){
return cljs.core.conj.call(null,vec,marker_17556);
});})(seq__17543,chunk__17544,count__17545,i__17546,range_17555,marker_17556,error))
);
});})(seq__17543,chunk__17544,count__17545,i__17546,range_17555,marker_17556,error))
);

var G__17557 = seq__17543;
var G__17558 = chunk__17544;
var G__17559 = count__17545;
var G__17560 = (i__17546 + (1));
seq__17543 = G__17557;
chunk__17544 = G__17558;
count__17545 = G__17559;
i__17546 = G__17560;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__17543);
if(temp__4425__auto__){
var seq__17543__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17543__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__17543__$1);
var G__17561 = cljs.core.chunk_rest.call(null,seq__17543__$1);
var G__17562 = c__6945__auto__;
var G__17563 = cljs.core.count.call(null,c__6945__auto__);
var G__17564 = (0);
seq__17543 = G__17561;
chunk__17544 = G__17562;
count__17545 = G__17563;
i__17546 = G__17564;
continue;
} else {
var error = cljs.core.first.call(null,seq__17543__$1);
var range_17565 = lisp_paredit.utils.__GT_Range.call(null,lisp_paredit.utils.convert_index_to_point.call(null,(error["start"]),editor),lisp_paredit.utils.convert_index_to_point.call(null,(error["end"]),editor));
var marker_17566 = editor.markBufferRange(range_17565,(function (){var obj17552 = {"invalidate":"touch"};
return obj17552;
})());
editor.decorateMarker(marker_17566,(function (){var obj17554 = {"type":"highlight","class":"lisp-syntax-error"};
return obj17554;
})());

cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,((function (seq__17543,chunk__17544,count__17545,i__17546,range_17565,marker_17566,error,seq__17543__$1,temp__4425__auto__){
return (function (p1__17530_SHARP_){
return cljs.core.update.call(null,p1__17530_SHARP_,(editor["id"]),((function (seq__17543,chunk__17544,count__17545,i__17546,range_17565,marker_17566,error,seq__17543__$1,temp__4425__auto__){
return (function (vec){
return cljs.core.conj.call(null,vec,marker_17566);
});})(seq__17543,chunk__17544,count__17545,i__17546,range_17565,marker_17566,error,seq__17543__$1,temp__4425__auto__))
);
});})(seq__17543,chunk__17544,count__17545,i__17546,range_17565,marker_17566,error,seq__17543__$1,temp__4425__auto__))
);

var G__17567 = cljs.core.next.call(null,seq__17543__$1);
var G__17568 = null;
var G__17569 = (0);
var G__17570 = (0);
seq__17543 = G__17567;
chunk__17544 = G__17568;
count__17545 = G__17569;
i__17546 = G__17570;
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
var seq__17585 = cljs.core.seq.call(null,cljs.core.deref.call(null,lisp_paredit.markers.syntax_markers));
var chunk__17586 = null;
var count__17587 = (0);
var i__17588 = (0);
while(true){
if((i__17588 < count__17587)){
var vec__17589 = cljs.core._nth.call(null,chunk__17586,i__17588);
var _ = cljs.core.nth.call(null,vec__17589,(0),null);
var markers = cljs.core.nth.call(null,vec__17589,(1),null);
var seq__17590_17599 = cljs.core.seq.call(null,markers);
var chunk__17591_17600 = null;
var count__17592_17601 = (0);
var i__17593_17602 = (0);
while(true){
if((i__17593_17602 < count__17592_17601)){
var m_17603 = cljs.core._nth.call(null,chunk__17591_17600,i__17593_17602);
m_17603.destroy();

var G__17604 = seq__17590_17599;
var G__17605 = chunk__17591_17600;
var G__17606 = count__17592_17601;
var G__17607 = (i__17593_17602 + (1));
seq__17590_17599 = G__17604;
chunk__17591_17600 = G__17605;
count__17592_17601 = G__17606;
i__17593_17602 = G__17607;
continue;
} else {
var temp__4425__auto___17608 = cljs.core.seq.call(null,seq__17590_17599);
if(temp__4425__auto___17608){
var seq__17590_17609__$1 = temp__4425__auto___17608;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17590_17609__$1)){
var c__6945__auto___17610 = cljs.core.chunk_first.call(null,seq__17590_17609__$1);
var G__17611 = cljs.core.chunk_rest.call(null,seq__17590_17609__$1);
var G__17612 = c__6945__auto___17610;
var G__17613 = cljs.core.count.call(null,c__6945__auto___17610);
var G__17614 = (0);
seq__17590_17599 = G__17611;
chunk__17591_17600 = G__17612;
count__17592_17601 = G__17613;
i__17593_17602 = G__17614;
continue;
} else {
var m_17615 = cljs.core.first.call(null,seq__17590_17609__$1);
m_17615.destroy();

var G__17616 = cljs.core.next.call(null,seq__17590_17609__$1);
var G__17617 = null;
var G__17618 = (0);
var G__17619 = (0);
seq__17590_17599 = G__17616;
chunk__17591_17600 = G__17617;
count__17592_17601 = G__17618;
i__17593_17602 = G__17619;
continue;
}
} else {
}
}
break;
}

var G__17620 = seq__17585;
var G__17621 = chunk__17586;
var G__17622 = count__17587;
var G__17623 = (i__17588 + (1));
seq__17585 = G__17620;
chunk__17586 = G__17621;
count__17587 = G__17622;
i__17588 = G__17623;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__17585);
if(temp__4425__auto__){
var seq__17585__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17585__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__17585__$1);
var G__17624 = cljs.core.chunk_rest.call(null,seq__17585__$1);
var G__17625 = c__6945__auto__;
var G__17626 = cljs.core.count.call(null,c__6945__auto__);
var G__17627 = (0);
seq__17585 = G__17624;
chunk__17586 = G__17625;
count__17587 = G__17626;
i__17588 = G__17627;
continue;
} else {
var vec__17594 = cljs.core.first.call(null,seq__17585__$1);
var _ = cljs.core.nth.call(null,vec__17594,(0),null);
var markers = cljs.core.nth.call(null,vec__17594,(1),null);
var seq__17595_17628 = cljs.core.seq.call(null,markers);
var chunk__17596_17629 = null;
var count__17597_17630 = (0);
var i__17598_17631 = (0);
while(true){
if((i__17598_17631 < count__17597_17630)){
var m_17632 = cljs.core._nth.call(null,chunk__17596_17629,i__17598_17631);
m_17632.destroy();

var G__17633 = seq__17595_17628;
var G__17634 = chunk__17596_17629;
var G__17635 = count__17597_17630;
var G__17636 = (i__17598_17631 + (1));
seq__17595_17628 = G__17633;
chunk__17596_17629 = G__17634;
count__17597_17630 = G__17635;
i__17598_17631 = G__17636;
continue;
} else {
var temp__4425__auto___17637__$1 = cljs.core.seq.call(null,seq__17595_17628);
if(temp__4425__auto___17637__$1){
var seq__17595_17638__$1 = temp__4425__auto___17637__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17595_17638__$1)){
var c__6945__auto___17639 = cljs.core.chunk_first.call(null,seq__17595_17638__$1);
var G__17640 = cljs.core.chunk_rest.call(null,seq__17595_17638__$1);
var G__17641 = c__6945__auto___17639;
var G__17642 = cljs.core.count.call(null,c__6945__auto___17639);
var G__17643 = (0);
seq__17595_17628 = G__17640;
chunk__17596_17629 = G__17641;
count__17597_17630 = G__17642;
i__17598_17631 = G__17643;
continue;
} else {
var m_17644 = cljs.core.first.call(null,seq__17595_17638__$1);
m_17644.destroy();

var G__17645 = cljs.core.next.call(null,seq__17595_17638__$1);
var G__17646 = null;
var G__17647 = (0);
var G__17648 = (0);
seq__17595_17628 = G__17645;
chunk__17596_17629 = G__17646;
count__17597_17630 = G__17647;
i__17598_17631 = G__17648;
continue;
}
} else {
}
}
break;
}

var G__17649 = cljs.core.next.call(null,seq__17585__$1);
var G__17650 = null;
var G__17651 = (0);
var G__17652 = (0);
seq__17585 = G__17649;
chunk__17586 = G__17650;
count__17587 = G__17651;
i__17588 = G__17652;
continue;
}
} else {
return null;
}
}
break;
}
});
