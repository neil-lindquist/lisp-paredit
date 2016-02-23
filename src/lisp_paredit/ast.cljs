(ns lisp-paredit.ast
  (:require [paredit-js.core :as paredit]))

(def ^:private asts (atom {}))

(defn update-ast [editor]
  (println "update-ast")
  (time 
   (let [ast (paredit/parse (.getText editor))]
     (swap! asts #(assoc % (.getPath editor) ast))
     ast)))

(defn get-ast [editor]
  (println "get-ast")
  (time
   (if-let [ast (get @asts (.getPath editor))]
     ast
     (update-ast editor))))
