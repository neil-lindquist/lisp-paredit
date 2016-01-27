(ns lisp-paredit.main
  (:require [cljs.nodejs :as node]))

(node/enable-util-print!)

(def paredit (node/require "paredit.js"))
(def atomio (node/require "atom"))

(defn -main [& args]
  (println "LispParedit main"))

(set! *main-cli-fn* -main)

(deftype LispParedit [name]
  Object
  (activate [state]
            (println "Activated with state" state)))

(def module.exports [LispParedit])
