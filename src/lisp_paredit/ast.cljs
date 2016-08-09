(ns lisp-paredit.ast
  (:require [paredit-js.core :as paredit]))

(defn get-ast
  [editor]
  (let [src (.getText editor)]
    (paredit/parse src)))
