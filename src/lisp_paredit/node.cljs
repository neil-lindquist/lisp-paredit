(ns lisp-paredit.node
  (:require [cljs.nodejs :as nodejs]))

(defn export [val]
  (set!
    (.-exports js/module)
    val))
