(ns lisp-paredit.commands.navigate
  (:require [atomio.workspace :as atom-workspace]
            [atomio.core :as atom-core]
            [lisp-paredit.utils :as utils]
            [lisp-paredit.ast :as ast]
            [paredit-js.core :as paredit]
            [paredit-js.navigator :as paredit-nav]))

(defn- navigate [f]
  (let [editor (atom-workspace/get-active-text-editor)
        ast (ast/get-ast editor)
        cursor (.getCursorBufferPosition editor)
        index (utils/convert-point-to-index cursor editor)
        result (f ast index)
        point (utils/convert-index-to-point result editor)]
    (.setCursorBufferPosition editor point)))

(defn forward-sexp []
  (navigate paredit-nav/forward-sexp))

(defn backward-sexp []
  (navigate paredit-nav/backward-sexp))

(defn up-sexp []
  (navigate paredit-nav/backward-up-sexp))

(defn down-sexp []
  (navigate paredit-nav/forward-down-sexp))

(defn expand-selection []
  (let [editor (atom-workspace/get-active-text-editor)
        ast (ast/get-ast editor)
        range (.getSelectedBufferRange editor)
        start-index (utils/convert-point-to-index (aget range "start") editor)
        end-index (utils/convert-point-to-index (aget range "end") editor)
        res (paredit-nav/sexp-range-expansion ast start-index end-index)]
    (when-let [[start end] res]
      (.setSelectedBufferRange editor
        (atom-core/Range. (utils/convert-index-to-point start editor)
                          (utils/convert-index-to-point end editor))))))
