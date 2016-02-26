(ns atomio.config
  (:refer-clojure :exclude [get set]))

(defn set [name val]
  (.set js/atom.config name val))

(defn get [name]
  (.get js/atom.config name))

(defn observe [thing callback]
  (.observe js/atom.config
            thing
            callback))

(defn on-did-change [thing callback]
  (.onDidChange js/atom.config
                thing
                callback))
