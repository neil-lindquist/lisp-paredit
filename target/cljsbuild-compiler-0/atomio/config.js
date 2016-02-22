// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('atomio.config');
goog.require('cljs.core');
atomio.config.set = (function atomio$config$set(name,val){
return atom.config.set(name,val);
});
atomio.config.get = (function atomio$config$get(name){
return atom.config.get(name);
});
atomio.config.observe = (function atomio$config$observe(thing,callback){
return atom.config.observe(thing,callback);
});
atomio.config.on_did_change = (function atomio$config$on_did_change(thing,callback){
return atom.config.onDidChange(thing,callback);
});
