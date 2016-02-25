// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('lisp_paredit.markers');
goog.require('cljs.core');
goog.require('lisp_paredit.utils');
lisp_paredit.markers.syntax_markers = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lisp_paredit.markers.clear_errors = (function lisp_paredit$markers$clear_errors(editor){
var temp__4425__auto___50965 = cljs.core.get.call(null,cljs.core.deref.call(null,lisp_paredit.markers.syntax_markers),(editor["id"]));
if(cljs.core.truth_(temp__4425__auto___50965)){
var markers_50966 = temp__4425__auto___50965;
cljs.core.doall.call(null,cljs.core.map.call(null,((function (markers_50966,temp__4425__auto___50965){
return (function (p1__50963_SHARP_){
return p1__50963_SHARP_.destroy();
});})(markers_50966,temp__4425__auto___50965))
,markers_50966));
} else {
}

return cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,(function (p1__50964_SHARP_){
return cljs.core.assoc.call(null,p1__50964_SHARP_,(editor["id"]),cljs.core.PersistentVector.EMPTY);
}));
});
lisp_paredit.markers.show_errors = (function lisp_paredit$markers$show_errors(editor,errors){
cljs.core.println.call(null,"show-errors",errors);

lisp_paredit.markers.clear_errors.call(null,editor);

if(cljs.core.seq.call(null,errors)){
cljs.core.println.call(null,"seq errors");

var seq__50980 = cljs.core.seq.call(null,errors);
var chunk__50981 = null;
var count__50982 = (0);
var i__50983 = (0);
while(true){
if((i__50983 < count__50982)){
var error = cljs.core._nth.call(null,chunk__50981,i__50983);
cljs.core.println.call(null,"error",error);

var range_50992 = lisp_paredit.utils.__GT_Range.call(null,lisp_paredit.utils.convert_index_to_point.call(null,(error["start"]),editor),lisp_paredit.utils.convert_index_to_point.call(null,(error["end"]),editor));
var marker_50993 = editor.markBufferRange(range_50992,(function (){var obj50985 = {"invalidate":"touch"};
return obj50985;
})());
cljs.core.println.call(null,"marker",marker_50993);

cljs.core.println.call(null,"range",range_50992);

editor.decorateMarker(marker_50993,(function (){var obj50987 = {"type":"highlight","class":"lisp-syntax-error"};
return obj50987;
})());

cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,((function (seq__50980,chunk__50981,count__50982,i__50983,range_50992,marker_50993,error){
return (function (p1__50967_SHARP_){
return cljs.core.update.call(null,p1__50967_SHARP_,(editor["id"]),((function (seq__50980,chunk__50981,count__50982,i__50983,range_50992,marker_50993,error){
return (function (vec){
return cljs.core.conj.call(null,vec,marker_50993);
});})(seq__50980,chunk__50981,count__50982,i__50983,range_50992,marker_50993,error))
);
});})(seq__50980,chunk__50981,count__50982,i__50983,range_50992,marker_50993,error))
);

var G__50994 = seq__50980;
var G__50995 = chunk__50981;
var G__50996 = count__50982;
var G__50997 = (i__50983 + (1));
seq__50980 = G__50994;
chunk__50981 = G__50995;
count__50982 = G__50996;
i__50983 = G__50997;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__50980);
if(temp__4425__auto__){
var seq__50980__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__50980__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__50980__$1);
var G__50998 = cljs.core.chunk_rest.call(null,seq__50980__$1);
var G__50999 = c__6945__auto__;
var G__51000 = cljs.core.count.call(null,c__6945__auto__);
var G__51001 = (0);
seq__50980 = G__50998;
chunk__50981 = G__50999;
count__50982 = G__51000;
i__50983 = G__51001;
continue;
} else {
var error = cljs.core.first.call(null,seq__50980__$1);
cljs.core.println.call(null,"error",error);

var range_51002 = lisp_paredit.utils.__GT_Range.call(null,lisp_paredit.utils.convert_index_to_point.call(null,(error["start"]),editor),lisp_paredit.utils.convert_index_to_point.call(null,(error["end"]),editor));
var marker_51003 = editor.markBufferRange(range_51002,(function (){var obj50989 = {"invalidate":"touch"};
return obj50989;
})());
cljs.core.println.call(null,"marker",marker_51003);

cljs.core.println.call(null,"range",range_51002);

editor.decorateMarker(marker_51003,(function (){var obj50991 = {"type":"highlight","class":"lisp-syntax-error"};
return obj50991;
})());

cljs.core.swap_BANG_.call(null,lisp_paredit.markers.syntax_markers,((function (seq__50980,chunk__50981,count__50982,i__50983,range_51002,marker_51003,error,seq__50980__$1,temp__4425__auto__){
return (function (p1__50967_SHARP_){
return cljs.core.update.call(null,p1__50967_SHARP_,(editor["id"]),((function (seq__50980,chunk__50981,count__50982,i__50983,range_51002,marker_51003,error,seq__50980__$1,temp__4425__auto__){
return (function (vec){
return cljs.core.conj.call(null,vec,marker_51003);
});})(seq__50980,chunk__50981,count__50982,i__50983,range_51002,marker_51003,error,seq__50980__$1,temp__4425__auto__))
);
});})(seq__50980,chunk__50981,count__50982,i__50983,range_51002,marker_51003,error,seq__50980__$1,temp__4425__auto__))
);

var G__51004 = cljs.core.next.call(null,seq__50980__$1);
var G__51005 = null;
var G__51006 = (0);
var G__51007 = (0);
seq__50980 = G__51004;
chunk__50981 = G__51005;
count__50982 = G__51006;
i__50983 = G__51007;
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
var seq__51022 = cljs.core.seq.call(null,cljs.core.deref.call(null,lisp_paredit.markers.syntax_markers));
var chunk__51023 = null;
var count__51024 = (0);
var i__51025 = (0);
while(true){
if((i__51025 < count__51024)){
var vec__51026 = cljs.core._nth.call(null,chunk__51023,i__51025);
var _ = cljs.core.nth.call(null,vec__51026,(0),null);
var markers = cljs.core.nth.call(null,vec__51026,(1),null);
var seq__51027_51036 = cljs.core.seq.call(null,markers);
var chunk__51028_51037 = null;
var count__51029_51038 = (0);
var i__51030_51039 = (0);
while(true){
if((i__51030_51039 < count__51029_51038)){
var m_51040 = cljs.core._nth.call(null,chunk__51028_51037,i__51030_51039);
m_51040.destroy();

var G__51041 = seq__51027_51036;
var G__51042 = chunk__51028_51037;
var G__51043 = count__51029_51038;
var G__51044 = (i__51030_51039 + (1));
seq__51027_51036 = G__51041;
chunk__51028_51037 = G__51042;
count__51029_51038 = G__51043;
i__51030_51039 = G__51044;
continue;
} else {
var temp__4425__auto___51045 = cljs.core.seq.call(null,seq__51027_51036);
if(temp__4425__auto___51045){
var seq__51027_51046__$1 = temp__4425__auto___51045;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__51027_51046__$1)){
var c__6945__auto___51047 = cljs.core.chunk_first.call(null,seq__51027_51046__$1);
var G__51048 = cljs.core.chunk_rest.call(null,seq__51027_51046__$1);
var G__51049 = c__6945__auto___51047;
var G__51050 = cljs.core.count.call(null,c__6945__auto___51047);
var G__51051 = (0);
seq__51027_51036 = G__51048;
chunk__51028_51037 = G__51049;
count__51029_51038 = G__51050;
i__51030_51039 = G__51051;
continue;
} else {
var m_51052 = cljs.core.first.call(null,seq__51027_51046__$1);
m_51052.destroy();

var G__51053 = cljs.core.next.call(null,seq__51027_51046__$1);
var G__51054 = null;
var G__51055 = (0);
var G__51056 = (0);
seq__51027_51036 = G__51053;
chunk__51028_51037 = G__51054;
count__51029_51038 = G__51055;
i__51030_51039 = G__51056;
continue;
}
} else {
}
}
break;
}

var G__51057 = seq__51022;
var G__51058 = chunk__51023;
var G__51059 = count__51024;
var G__51060 = (i__51025 + (1));
seq__51022 = G__51057;
chunk__51023 = G__51058;
count__51024 = G__51059;
i__51025 = G__51060;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__51022);
if(temp__4425__auto__){
var seq__51022__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__51022__$1)){
var c__6945__auto__ = cljs.core.chunk_first.call(null,seq__51022__$1);
var G__51061 = cljs.core.chunk_rest.call(null,seq__51022__$1);
var G__51062 = c__6945__auto__;
var G__51063 = cljs.core.count.call(null,c__6945__auto__);
var G__51064 = (0);
seq__51022 = G__51061;
chunk__51023 = G__51062;
count__51024 = G__51063;
i__51025 = G__51064;
continue;
} else {
var vec__51031 = cljs.core.first.call(null,seq__51022__$1);
var _ = cljs.core.nth.call(null,vec__51031,(0),null);
var markers = cljs.core.nth.call(null,vec__51031,(1),null);
var seq__51032_51065 = cljs.core.seq.call(null,markers);
var chunk__51033_51066 = null;
var count__51034_51067 = (0);
var i__51035_51068 = (0);
while(true){
if((i__51035_51068 < count__51034_51067)){
var m_51069 = cljs.core._nth.call(null,chunk__51033_51066,i__51035_51068);
m_51069.destroy();

var G__51070 = seq__51032_51065;
var G__51071 = chunk__51033_51066;
var G__51072 = count__51034_51067;
var G__51073 = (i__51035_51068 + (1));
seq__51032_51065 = G__51070;
chunk__51033_51066 = G__51071;
count__51034_51067 = G__51072;
i__51035_51068 = G__51073;
continue;
} else {
var temp__4425__auto___51074__$1 = cljs.core.seq.call(null,seq__51032_51065);
if(temp__4425__auto___51074__$1){
var seq__51032_51075__$1 = temp__4425__auto___51074__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__51032_51075__$1)){
var c__6945__auto___51076 = cljs.core.chunk_first.call(null,seq__51032_51075__$1);
var G__51077 = cljs.core.chunk_rest.call(null,seq__51032_51075__$1);
var G__51078 = c__6945__auto___51076;
var G__51079 = cljs.core.count.call(null,c__6945__auto___51076);
var G__51080 = (0);
seq__51032_51065 = G__51077;
chunk__51033_51066 = G__51078;
count__51034_51067 = G__51079;
i__51035_51068 = G__51080;
continue;
} else {
var m_51081 = cljs.core.first.call(null,seq__51032_51075__$1);
m_51081.destroy();

var G__51082 = cljs.core.next.call(null,seq__51032_51075__$1);
var G__51083 = null;
var G__51084 = (0);
var G__51085 = (0);
seq__51032_51065 = G__51082;
chunk__51033_51066 = G__51083;
count__51034_51067 = G__51084;
i__51035_51068 = G__51085;
continue;
}
} else {
}
}
break;
}

var G__51086 = cljs.core.next.call(null,seq__51022__$1);
var G__51087 = null;
var G__51088 = (0);
var G__51089 = (0);
seq__51022 = G__51086;
chunk__51023 = G__51087;
count__51024 = G__51088;
i__51025 = G__51089;
continue;
}
} else {
return null;
}
}
break;
}
});
