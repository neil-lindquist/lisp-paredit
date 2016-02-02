(ns lisp-paredit.cljs-utils
  (:require [cljs.nodejs :as nodejs]))

(defn export [val]
  (set!
    (.-exports js/module)
    val))
