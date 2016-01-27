(ns lisp-paredit.core
  (:require [cljs.nodejs :as node]))

(node/enable-util-print!)

(def paredit (node/require "paredit.js"))
(def atomio (node/require "atom"))

(deftype LispParedit []
  Object
  (activate [this state]
            (println "Activated with state" state)))

(def module.exports LispParedit)
