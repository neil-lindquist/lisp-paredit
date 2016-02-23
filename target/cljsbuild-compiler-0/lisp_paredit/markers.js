// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.markers');
goog.require('cljs.core');
goog.require('lisp_paredit.utils');
lisp_paredit.markers.syntax_markers = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lisp_paredit.markers.clear_errors = (function lisp_paredit$markers$clear_errors(editor){
var temp__4423__auto___12686 = cljs.core.get.call(null,cljs.core.deref.call(null,lisp_paredit.markers.syntax_markers),(editor["id"]));
if(cljs.core.truth_(temp__4423__auto___12686)){
var markers_12687 = temp__4423__auto___12686;
cljs.core.doall.call(null,cljs.core.map.call(null,((function (markers_12687,temp__4423__auto___12686){
return (function (p1__12684_SHARP_){
return p1__12684_SHARP_.destroy();
});})(markers_12687,temp__4423__auto___12686))
,markers_12687));
} else {
}

return cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,(function (p1__12685_SHARP_){
return cljs.core.assoc.call(null,p1__12685_SHARP_,(editor["id"]),cljs.core.PersistentVector.EMPTY);
}));
});
lisp_paredit.markers.show_errors = (function lisp_paredit$markers$show_errors(editor,errors){
lisp_paredit.markers.clear_errors.call(null,editor);

if(cljs.core.seq.call(null,errors)){
var seq__12697 = cljs.core.seq.call(null,errors);
var chunk__12698 = null;
var count__12699 = (0);
var i__12700 = (0);
while(true){
if((i__12700 < count__12699)){
var error = cljs.core._nth.call(null,chunk__12698,i__12700);
var range_12705 = lisp_paredit.utils.__GT_Range.call(null,lisp_paredit.utils.convert_index_to_point.call(null,new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(error),editor),lisp_paredit.utils.convert_index_to_point.call(null,new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(error),editor));
var marker_12706 = editor.markBufferRange(range_12705,(function (){var obj12702 = {"inavalidate":"touch"};
return obj12702;
})());
editor.decorateMarker(marker_12706,cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"highlight",new cljs.core.Keyword(null,"class","class",-2030961996),"lisp-syntax-error"], null)));

cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,((function (seq__12697,chunk__12698,count__12699,i__12700,range_12705,marker_12706,error){
return (function (p1__12688_SHARP_){
return cljs.core.update.call(null,p1__12688_SHARP_,(editor["id"]),((function (seq__12697,chunk__12698,count__12699,i__12700,range_12705,marker_12706,error){
return (function (vec){
return cljs.core.conj.call(null,vec,marker_12706);
});})(seq__12697,chunk__12698,count__12699,i__12700,range_12705,marker_12706,error))
);
});})(seq__12697,chunk__12698,count__12699,i__12700,range_12705,marker_12706,error))
);

var G__12707 = seq__12697;
var G__12708 = chunk__12698;
var G__12709 = count__12699;
var G__12710 = (i__12700 + (1));
seq__12697 = G__12707;
chunk__12698 = G__12708;
count__12699 = G__12709;
i__12700 = G__12710;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__12697);
if(temp__4425__auto__){
var seq__12697__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12697__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__12697__$1);
var G__12711 = cljs.core.chunk_rest.call(null,seq__12697__$1);
var G__12712 = c__6945__auto__;
var G__12713 = cljs.core.count.call(null,c__6945__auto__);
var G__12714 = (0);
seq__12697 = G__12711;
chunk__12698 = G__12712;
count__12699 = G__12713;
i__12700 = G__12714;
continue;
} else {
var error = cljs.core.first.call(null,seq__12697__$1);
var range_12715 = lisp_paredit.utils.__GT_Range.call(null,lisp_paredit.utils.convert_index_to_point.call(null,new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(error),editor),lisp_paredit.utils.convert_index_to_point.call(null,new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(error),editor));
var marker_12716 = editor.markBufferRange(range_12715,(function (){var obj12704 = {"inavalidate":"touch"};
return obj12704;
})());
editor.decorateMarker(marker_12716,cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"highlight",new cljs.core.Keyword(null,"class","class",-2030961996),"lisp-syntax-error"], null)));

cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,((function (seq__12697,chunk__12698,count__12699,i__12700,range_12715,marker_12716,error,seq__12697__$1,temp__4425__auto__){
return (function (p1__12688_SHARP_){
return cljs.core.update.call(null,p1__12688_SHARP_,(editor["id"]),((function (seq__12697,chunk__12698,count__12699,i__12700,range_12715,marker_12716,error,seq__12697__$1,temp__4425__auto__){
return (function (vec){
return cljs.core.conj.call(null,vec,marker_12716);
});})(seq__12697,chunk__12698,count__12699,i__12700,range_12715,marker_12716,error,seq__12697__$1,temp__4425__auto__))
);
});})(seq__12697,chunk__12698,count__12699,i__12700,range_12715,marker_12716,error,seq__12697__$1,temp__4425__auto__))
);

var G__12717 = cljs.core.next.call(null,seq__12697__$1);
var G__12718 = null;
var G__12719 = (0);
var G__12720 = (0);
seq__12697 = G__12717;
chunk__12698 = G__12718;
count__12699 = G__12719;
i__12700 = G__12720;
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
var seq__12735 = cljs.core.seq.call(null,cljs.core.deref.call(null,lisp_paredit.markers.syntax_markers));
var chunk__12736 = null;
var count__12737 = (0);
var i__12738 = (0);
while(true){
if((i__12738 < count__12737)){
var vec__12739 = cljs.core._nth.call(null,chunk__12736,i__12738);
var _ = cljs.core.nth.call(null,vec__12739,(0),null);
var markers = cljs.core.nth.call(null,vec__12739,(1),null);
var seq__12740_12749 = cljs.core.seq.call(null,markers);
var chunk__12741_12750 = null;
var count__12742_12751 = (0);
var i__12743_12752 = (0);
while(true){
if((i__12743_12752 < count__12742_12751)){
var m_12753 = cljs.core._nth.call(null,chunk__12741_12750,i__12743_12752);
m_12753.destroy();

var G__12754 = seq__12740_12749;
var G__12755 = chunk__12741_12750;
var G__12756 = count__12742_12751;
var G__12757 = (i__12743_12752 + (1));
seq__12740_12749 = G__12754;
chunk__12741_12750 = G__12755;
count__12742_12751 = G__12756;
i__12743_12752 = G__12757;
continue;
} else {
var temp__4425__auto___12758 = cljs.core.seq.call(null,seq__12740_12749);
if(temp__4425__auto___12758){
var seq__12740_12759__$1 = temp__4425__auto___12758;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12740_12759__$1)){
var c__6945__auto___12760 = cljs.core.chunk_first.call(null,seq__12740_12759__$1);
var G__12761 = cljs.core.chunk_rest.call(null,seq__12740_12759__$1);
var G__12762 = c__6945__auto___12760;
var G__12763 = cljs.core.count.call(null,c__6945__auto___12760);
var G__12764 = (0);
seq__12740_12749 = G__12761;
chunk__12741_12750 = G__12762;
count__12742_12751 = G__12763;
i__12743_12752 = G__12764;
continue;
} else {
var m_12765 = cljs.core.first.call(null,seq__12740_12759__$1);
m_12765.destroy();

var G__12766 = cljs.core.next.call(null,seq__12740_12759__$1);
var G__12767 = null;
var G__12768 = (0);
var G__12769 = (0);
seq__12740_12749 = G__12766;
chunk__12741_12750 = G__12767;
count__12742_12751 = G__12768;
i__12743_12752 = G__12769;
continue;
}
} else {
}
}
break;
}

var G__12770 = seq__12735;
var G__12771 = chunk__12736;
var G__12772 = count__12737;
var G__12773 = (i__12738 + (1));
seq__12735 = G__12770;
chunk__12736 = G__12771;
count__12737 = G__12772;
i__12738 = G__12773;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__12735);
if(temp__4425__auto__){
var seq__12735__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12735__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__12735__$1);
var G__12774 = cljs.core.chunk_rest.call(null,seq__12735__$1);
var G__12775 = c__6945__auto__;
var G__12776 = cljs.core.count.call(null,c__6945__auto__);
var G__12777 = (0);
seq__12735 = G__12774;
chunk__12736 = G__12775;
count__12737 = G__12776;
i__12738 = G__12777;
continue;
} else {
var vec__12744 = cljs.core.first.call(null,seq__12735__$1);
var _ = cljs.core.nth.call(null,vec__12744,(0),null);
var markers = cljs.core.nth.call(null,vec__12744,(1),null);
var seq__12745_12778 = cljs.core.seq.call(null,markers);
var chunk__12746_12779 = null;
var count__12747_12780 = (0);
var i__12748_12781 = (0);
while(true){
if((i__12748_12781 < count__12747_12780)){
var m_12782 = cljs.core._nth.call(null,chunk__12746_12779,i__12748_12781);
m_12782.destroy();

var G__12783 = seq__12745_12778;
var G__12784 = chunk__12746_12779;
var G__12785 = count__12747_12780;
var G__12786 = (i__12748_12781 + (1));
seq__12745_12778 = G__12783;
chunk__12746_12779 = G__12784;
count__12747_12780 = G__12785;
i__12748_12781 = G__12786;
continue;
} else {
var temp__4425__auto___12787__$1 = cljs.core.seq.call(null,seq__12745_12778);
if(temp__4425__auto___12787__$1){
var seq__12745_12788__$1 = temp__4425__auto___12787__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12745_12788__$1)){
var c__6945__auto___12789 = cljs.core.chunk_first.call(null,seq__12745_12788__$1);
var G__12790 = cljs.core.chunk_rest.call(null,seq__12745_12788__$1);
var G__12791 = c__6945__auto___12789;
var G__12792 = cljs.core.count.call(null,c__6945__auto___12789);
var G__12793 = (0);
seq__12745_12778 = G__12790;
chunk__12746_12779 = G__12791;
count__12747_12780 = G__12792;
i__12748_12781 = G__12793;
continue;
} else {
var m_12794 = cljs.core.first.call(null,seq__12745_12788__$1);
m_12794.destroy();

var G__12795 = cljs.core.next.call(null,seq__12745_12788__$1);
var G__12796 = null;
var G__12797 = (0);
var G__12798 = (0);
seq__12745_12778 = G__12795;
chunk__12746_12779 = G__12796;
count__12747_12780 = G__12797;
i__12748_12781 = G__12798;
continue;
}
} else {
}
}
break;
}

var G__12799 = cljs.core.next.call(null,seq__12735__$1);
var G__12800 = null;
var G__12801 = (0);
var G__12802 = (0);
seq__12735 = G__12799;
chunk__12736 = G__12800;
count__12737 = G__12801;
i__12738 = G__12802;
continue;
}
} else {
return null;
}
}
break;
}
});
