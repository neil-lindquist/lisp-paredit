(ns lisp-paredit.commands.edit
  (:refer-clojure :exclude [newline])
  (:require [atomio.workspace :as atom-workspace]
            [atomio.commands :as atom-commands]
            [atomio.core :as atom-core]
            [lisp-paredit.utils :as utils :refer [->Point]]
            [lisp-paredit.ast :as ast :refer [get-ast]]
            [lisp-paredit.status-bar-view :as status-bar-view]
            [paredit-js.core :as paredit]
            [paredit-js.navigator :as paredit-nav]
            [paredit-js.editor :as paredit-editor]
            [goog.object :as goog-object]))

(def paredit-change-fns {"insert" (fn [editor [index text]]
                                    (let [point (utils/convert-index-to-point index editor)
                                          range (atom-core/Range. point point)]
                                      (.setTextInBufferRange editor range text)))
                         "remove" (fn [editor [index length]]
                                    (let [start (utils/convert-index-to-point index editor)
                                           end   (utils/convert-index-to-point (+ index length) editor)
                                           range (atom-core/Range. start end)]
                                      (.setTextInBufferRange editor range "")))})

(defn- apply-change [editor [action & args]]
  ((get paredit-change-fns action) editor args))

(defn- apply-changes [result editor]
  (when result
    (doall
      (map #(apply-change editor %) (aget result "changes")))
    (let [newIndexes (or (aget result "newIndexes")
                         (js/Array.))
          _          (when (aget result "newIndex") (.push newIndexes (aget result "newIndex")))
          first      (.slice newIndexes 0 1)
          rest       (.slice newIndexes 1)
          point      (when first (utils/convert-index-to-point first editor))]
      (when point (.setCursorBufferPosition editor point))
      (doall
        (map
         (fn [new-index]
           (->> (utils/convert-index-to-point new-index editor)
                (.addCursorAtBufferPosition editor)))
         rest)))))

(defn indent-range [range editor expand-if-empty?]
  (println "indent-range" range editor)
  (let [src (.getText editor)
        ast (get-ast editor)
        start-index (utils/convert-point-to-index (aget range "start") editor)
        end-index (utils/convert-point-to-index (aget range "end") editor)
        [start end] (if (and (.isEmpty range) expand-if-empty?)
                      (paredit-nav/sexp-range-expansion ast start-index end-index)
                      [start-index end-index])]
    (when (and start end)
      (println ast src start end)
      (let [result (paredit-editor/indent-range ast src start end)]
        (println "changes" (aget result "changes"))
        (println "newIndex" (aget result "newIndex"))
        (println "newIndex" (utils/convert-index-to-point (aget result "newIndex") editor))
        (.transact editor
                   #(apply-changes result editor))))))

(defn- apply-indent [changes editor]
  (let [rows-changed (map
                      (fn [[_ index _]]
                        (aget
                         (utils/convert-index-to-point index editor)
                         "row"))
                      changes)
        start (->Point (apply min rows-changed) 0)
        end   (->Point (apply max rows-changed) 0)]
    (indent-range (atom-core/Range. start end) editor false)))

(defn- wrap-around-fn [start end]
  (fn [ast src index args]
    (paredit-editor/wrap-around ast src index start end args)))

(defn- edit-selections [editor selections f args]
  (doall
    (map
     (fn [selection]
       (let [src (.getText editor)
             ast (get-ast editor)
             start-index (aget (.getBufferRange selection) "start")
             end-index (aget (.getBufferRange selection) "end")
             index (utils/convert-point-to-index start-index editor)
             _ (goog-object/extend args (js-obj "endIdx" (utils/convert-point-to-index end-index editor)))
             result (f ast src index args)]
         (when-let [changes (and result
                                 (aget result "changes"))]
           (apply-changes (js-obj "changes" changes) editor)
           (when (aget args "indent") (apply-indent changes editor)))
         (when result (aget result "newIndex"))))
     selections)))

(defn- edit-cursors [editor cursors f args]
  (doall
    (map
     (fn [cursor]
       (let [args   (or args #js {})
                   point  (.getBufferPosition cursor)
                   index  (utils/convert-point-to-index point editor)
                   src    (.getText editor)
                   ast    (get-ast editor)
                   row    (cond
                            (and (aget args "backward")
                                 (= 0 (aget point "column")))
                            (dec (aget point "row"))

                            (and (not (aget args "backward"))
                                 (= (aget point "column")
                                    (.lineLengthForRow js/editor.buffer (aget point "row"))))
                            (aget point "row"))

                   _      (goog-object/extend args (js-obj "count" (if row
                                                                     (count (utils/line-ending-for-row row editor))
                                                                     1)))

                   result (f ast src index args)]
               (when-let [changes (and result (aget result "changes"))]
                 (apply-changes (js-obj "changes" changes) editor)
                 (when (aget args "indent") (apply-indent changes editor)))
               (when result (aget result "newIndex"))))
     cursors)))

(defn- edit
  ([f] (edit f {}))
  ([f argv]
   (let [editor (atom-workspace/get-active-text-editor)
         cursors (.getCursorsOrderedByBufferPosition editor)
         selections (remove #(.isEmpty %) (.getSelections editor))
         args (js-obj "indent" true)
         _ (goog-object/extend args argv)]
     (.transact editor
                (fn []
                  (let [new-indexes (remove nil?
                                            (if (> (count selections) 0)
                                              (edit-selections editor selections f args)
                                              (edit-cursors editor cursors f args)))]

                    (when (seq new-indexes)
                      (apply-changes (js-obj "newIndexes" (clj->js new-indexes)) editor))))))))

(defn slurp-backwards  []
  (edit paredit-editor/slurp-sexp (js-obj "backward" true)))

(defn slurp-forwards  []
  (edit paredit-editor/slurp-sexp (js-obj "backward" false)))

(defn barf-backwards []
  (edit paredit-editor/barf-sexp (js-obj "backward" true)))

(defn barf-forwards []
  (edit paredit-editor/barf-sexp (js-obj "backward" false)))

(defn kill-sexp-forwards []
  (edit paredit-editor/kill-sexp (js-obj "backward" false)))

(defn kill-sexp-backwards []
  (edit paredit-editor/kill-sexp (js-obj "backward" true)))

(defn splice []
  (edit paredit-editor/splice-sexp))

(defn splice-backwards []
  (edit paredit-editor/splice-sexp-kill (js-obj "backward" true)))

(defn splice-forwards []
  (edit paredit-editor/splice-sexp-kill (js-obj "backward" false)))

(defn split []
  (edit paredit-editor/split-sexp))

(defn indent []
  (let [editor (atom-workspace/get-active-text-editor)
        ranges (.getSelectedBufferRanges editor)]
    (doall
      (map
       #(indent-range % editor false)
       ranges))))

(defn delete-backwards []
  (edit paredit-editor/delete (js-obj "backward" true "indent" false)))

(defn delete-forwards []
  (edit paredit-editor/delete (js-obj "backward" false "indent" false)))

(defn wrap-around-parens []
  (edit (wrap-around-fn "(" ")")))

(defn wrap-around-square []
  (edit (wrap-around-fn "[" "]")))

(defn wrap-around-curly []
  (edit (wrap-around-fn "{" "}")))

(defn paste []
  )


(defn newline []
  (let [editor (atom-workspace/get-active-text-editor)]
    (.transact
     editor
     (fn []
       (.insertNewline editor)
       (indent)))))
