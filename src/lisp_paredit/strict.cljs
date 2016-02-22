(ns lisp-paredit.strict
  (:require [lisp-paredit.status-bar-view :as status-bar-view]
            [lisp-paredit.utils :as utils :refer [->Point ->Range]]
            [lisp-paredit.commands.edit :as edit]
            [atomio.views :as atom-views]
            [atomio.workspace :as atom-workspace]
            [atomio.commands :as atom-commands]
            [paredit-js.core :as paredit]))

(def opening-braces ["(" "{" "[" "<" "\""])
(def closing-braces [")" "}" "]" ">" "\""])

(defn- move-cursor [char editor]
  (when (= 1 (count char))
    (when-let [close-brace (some #{char} closing-braces)]
      (let [p (.getCursorBufferPosition editor)
            range [(->Point (aget p "row")
                            (aget p "column"))
                   (->Point (aget p "row")
                            (inc (aget p "column")))]
            next-char (.getTextInBufferRange editor (clj->js range))]
        (when (= next-char char)
          (.moveRight editor)
          true)))))

(defn- replace-text [src text ranges editor]
  (let [[range & rest] ranges
        start (utils/convert-point-to-index (aget range "start") editor)
        end   (utils/convert-point-to-index (aget range "end") editor)
        new-src (str (.slice src 0 start)
                     text
                     (.slice src end))]
    (if (empty? rest)
      new-src
      (recur new-src text rest editor))))

(defn- check-insert-text [text editor event]
  (let [src        (.getText editor)
        selections (.getSelectedBufferRanges editor)
        new-src    (replace-text src text selections editor)
        ast        (paredit/parse new-src)]
    (when (not-empty (:errors ast))
      (.cancel event)
      (when-not (move-cursor text editor)
        ;; only show error if we haven't moved the cursor
        (status-bar-view/invalid-input)))))

(defn- invalid-input [event]
  (.cancel event)
  (status-bar-view/invalid-input))

(defn- enable-editor-strict-mode [strict-subs editor]
  (let [view (atom-views/get-view editor)]
    (utils/add-class view "lisp-paredit-strict")
    (.add strict-subs
          (.onWillInsertText
           editor
           (fn [event]
             (let [text (aget event "text")]
               (check-insert-text text editor event)))))))

(defn- observe-commands [subs]
  (.add subs (atom-commands/on-will-dispatch
              (fn [event]
                (let [editor (atom-workspace/get-active-text-editor)
                      type (aget event "type")]
                  (when (= "core:backspace" type)
                    (.stopImmediatePropagation event)
                    (edit/delete-backwards))
                  (when (= "core:delete" type)
                    (.stopImmediatePropagation event)
                    (edit/delete-forwards)))))))

(defn enable [strict-subs]
  (.add strict-subs (.observeTextEditors
                     js/atom.workspace
                     (fn [editor]
                       (when (utils/supported-grammar? (.getGrammar editor))
                         (enable-editor-strict-mode strict-subs editor)))))
  (observe-commands strict-subs))

(defn disable [strict-subs]
  (when strict-subs (.dispose strict-subs))
  (doseq [editor (.getTextEditors js/atom.workspace)]
    (-> (atom-views/get-view editor)
        (utils/remove-class "lisp-paredit-strict"))))
