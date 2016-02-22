(ns lisp-paredit.commands.edit
  (:refer-clojure :exclude [newline])
  (:require [atomio.workspace :as atom-workspace]
            [atomio.commands :as atom-commands]
            [atomio.core :as atom-core]
            [lisp-paredit.utils :as utils :refer [->Point]]
            [lisp-paredit.status-bar-view :as status-bar-view]
            [paredit-js.core :as paredit]
            [paredit-js.navigator :as paredit-nav]
            [paredit-js.editor :as paredit-editor]))

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
      (map #(apply-change editor %) (:changes result)))
    (let [[first & rest] (remove nil? (conj (:new-indexes result) (:new-index result)))
          point (when first (utils/convert-index-to-point first editor))]
      (when point (.setCursorBufferPosition editor point))
      (doall
        (map
         (fn [new-index]
           (->> (utils/convert-index-to-point new-index editor)
                (.addCursorAtBufferPosition editor)))
         rest)))))

(defn indent-range [range editor]
  (let [src (.getText editor)
        ast (paredit/parse src)
        start-index (utils/convert-point-to-index (aget range "start") editor)
        end-index (utils/convert-point-to-index (aget range "end") editor)
        [start end] (if (.isEmpty range)
                      (paredit-nav/sexp-range-expansion ast start-index end-index)
                      [start-index end-index])]
    (when (and start end)
      (let [result (paredit-editor/indent-range ast src start end)]
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
    (indent-range (atom-core/Range. start end) editor)))

(defn- wrap-around-fn [start end]
  (fn [ast src index args]
    (paredit-editor/wrap-around ast src index start end args)))

(defn- edit-selections [editor selections f args]
  (doall
    (map
     (fn [selection]
       (let [src (.getText editor)
             ast (paredit/parse src)
             start-index (aget (.getBufferRange selection) "start")
             end-index (aget (.getBufferRange selection) "end")
             index (utils/convert-point-to-index start-index editor)
             args (assoc args "endIdx" (utils/convert-point-to-index end-index editor))
             result (f ast src index args)]
         (when-let [changes (and result
                                 (:changes result))]
           (apply-changes {:changes changes} editor)
           (when (:indent args) (apply-indent changes editor)))
         (when result (:newIndex result))))
     selections)))

(defn- edit-cursors [editor cursors f args]
  (doall
    (map
     (fn [cursor]
       (let [point  (.getBufferPosition cursor)
             index  (utils/convert-point-to-index point editor)
             src    (.getText editor)
             ast    (paredit/parse src)
             row    (cond
                      (and (:backward args)
                           (= 0 (aget point "column")))
                      (dec (aget point "row"))

                      (and (not (:backward args))
                           (= (aget point "column")
                              (.lineLengthForRow js/editor.buffer (aget point "row"))))
                      (aget point "row"))

             args   (assoc args "count" (if row
                                          (count (utils/line-ending-for-row row editor))
                                          1))
             result (f ast src index args)]
         (when-let [changes (and result (:changes result))]
           (apply-changes {:changes changes} editor)
           (when (:indent args) (apply-indent changes editor)))
         (when result (:newIndex result))))
     cursors)))

(defn- edit
  ([f] (edit f {}))
  ([f argv]
   (let [editor (atom-workspace/get-active-text-editor)
         cursors (.getCursorsOrderedByBufferPosition editor)
         selections (remove #(.isEmpty %) (.getSelections editor))
         args (merge {:indent true} argv)]
     (.transact editor
                (fn []
                  (let [new-indexes (remove nil?
                                            (if (> (count selections) 0)
                                              (edit-selections editor selections f args)
                                              (edit-cursors editor cursors f args)
                                              ))]

                    (when (seq new-indexes)
                      (apply-changes {:new-indexes new-indexes} editor))))))))

(defn slurp-backwards  []
  (edit paredit-editor/slurp-sexp {:backward true}))

(defn slurp-forwards  []
  (edit paredit-editor/slurp-sexp {:backward false}))

(defn barf-backwards []
  (edit paredit-editor/barf-sexp {:backward true}))

(defn barf-forwards []
  (edit paredit-editor/barf-sexp {:backward false}))

(defn kill-sexp-forwards []
  (edit paredit-editor/kill-sexp {:backward false}))

(defn kill-sexp-backwards []
  (edit paredit-editor/kill-sexp {:backward true}))

(defn splice []
  (edit paredit-editor/splice-sexp))

(defn splice-backwards []
  (edit paredit-editor/splice-sexp-kill {:backward true}))

(defn splice-forwards []
  (edit paredit-editor/splice-sexp-kill {:backward false}))

(defn split []
  (edit paredit-editor/split-sexp))

(defn indent []
  (let [editor (atom-workspace/get-active-text-editor)
        ranges (.getSelectedBufferRanges editor)]
    (doall
      (map
       #(indent-range % editor)
       ranges))))

(defn delete-backwards []
  (edit paredit-editor/delete {:backward true :indent false}))

(defn delete-forwards []
  (edit paredit-editor/delete {:backward false :indent false}))

(defn wrap-around-parens []
  (edit (wrap-around-fn "(" ")")))

(defn wrap-around-square []
  (edit (wrap-around-fn "[" "]")))

(defn wrap-around-curly []
  (edit (wrap-around-fn "{" "}")))

; (defn paste []
;   (let [editor (atom-workspace/get-active-text-editor)
;         ast (-> (.read js/atom.clipboard)
;                 (paredit/parse))]
;     (if (pos? (count (:errors ast)))
;       (status-bar-view/invalid-input)
;       (do
;         (.transact editor
;                    (fn []
;                      (.pasteText editor)
;                      (-> (.getSelectedBufferRange editor)
;                          (indent-range editor))))))))

; (defn newline []
; (atom-commands/dispatch "atom-text-editor" "editor:newline")
; (let [editor (atom-workspace/get-active-text-editor)
;       cursors (.getCursorsOrderedByBufferPosition editor)
;       indices (map #(utils/convert-point-to-index (.getCursorBufferPosition %) editor) cursors)
;       changes []
;       new-indexes []]
;   (.transact
;     editor
;     #(apply-changes {:changes changes
;                      :new-indexes new-indexes}
;                     editor)))
; )

; (defn newline []
;   (let [editor (atom-workspace/get-active-text-editor)
;         cursors (.getCursorsOrderedByBufferPosition editor)
;         new-src (atom (.getText editor))
;         indices (atom [])]
;     (doseq [cursor cursors]
;       (let [index (utils/convert-point-to-index (.getBufferPosition cursor) editor)]
;         (swap! indices conj index)
;         (swap! new-src #(str (.slice % 0 index) (utils/line-ending editor) (.slice % index)))))
;     (let [ast (paredit/parse @new-src)
;           changes (atom [])
;           new-indexes (atom [])]
;       (doseq [index indices]
;         (let [line-ending-length (js/Math.max 1 (utils/line-ending-for-row (aget (utils/convert-index-to-point index editor) "row") editor))
;               res (paredit/indent-range ast
;                                         @new-src
;                                         (+ index line-ending-length)
;                                         (+ index line-ending-length))
;               changes.push ['insert', index, utils.lineEnding(editor)]
;               changes = changes.concat res.changes]
;           (swap! new-indexes conj res.newIndex)
;           ))))
;
;   for index in indices
;     lineEndingLength = Math.max(1, utils.lineEndingForRow(utils.convertIndexToPoint(index, editor).row, editor).length)
;     res = paredit.editor.indentRange(ast, newSrc, index + lineEndingLength, index + lineEndingLength)
;     changes.push ['insert', index, utils.lineEnding(editor)]
;     changes = changes.concat res.changes
;     newIndexes.push res.newIndex
;   editor.transact ->
;     applyChanges
;       changes: changes
;       newIndexes: newIndexes,
;       editor
; )
