(ns lisp-paredit.utils
  (:require [atomio.config :as atom-config]
            [atomio.core :as atom-core]
            [atomio.views :as atom-views]
            [atomio.workspace :as atom-workspace]
            [atomio.commands :as atom-commands]
            [clojure.string :refer [lower-case join]])
  (:refer-clojure :exclude [->Range]))

(def lisp-selector "atom-text-editor.paredit")

(defn grammars []
  (map lower-case (atom-config/get "lisp-paredit.grammars")))

(defn- get-default-line-ending []
  (condp = (atom-config/get "line-ending-selector.defaultLineEnding")
    "LF"    "\n"
    "CRLF"  "\r\n"
    (if (= "win32" js/process.platform)
      "\r\n"
      "\n")))

(defn- add-command [[command comm-fn comm-scope] subs]
  (let [scope (or comm-scope "atom-text-editor")]
    (.add subs (.add js/atom.commands scope command comm-fn))))

(defn index-to-point [index src]
  (let [substr      (.substring src 0 index)
        row         (count (.match substr (js/RegExp. "\n" "g")))
        line-start  (+ 1 (.lastIndexOf substr "\n"))
        column      (- index line-start)]
    {:row     row
     :column  column}))

(defn supported-grammar? [grammar]
  (boolean
   (some #{(lower-case (aget grammar "name"))} (grammars))))

(defn remove-class [view class]
  (let [regex (js/RegExp. class "g")]
    (aset view "className" (.replace (aget view "className") regex ""))))

(defn add-class [view class]
  (remove-class view class)
  (aset view "className" (str (aget view "className") " " class)))

(defn ->Point [row col]
  (atom-core/Point. row col))

(defn ->Range [start end]
  (atom-core/Range. start end))

(defn convert-point-to-index [point editor]
  (let [range (->Range (->Point 0 0)
                       point)]
    (count (.getTextInBufferRange editor range))))

(defn convert-index-to-point [index editor]
  (let [p (index-to-point index (.getText editor))]
    (->Point (:row p) (:column p))))

(defn add-commands [commands subs]
  (doseq [command commands]
    (add-command command subs)))

(defn line-ending [editor]
  (or (.getPreferredLineEnding js/editor.buffer)
      (get-default-line-ending)))

(defn line-ending-for-row [row editor]
  (or (.lineEndingForRow js/editor.buffer row)
      (line-ending editor)))

(defn editor-command-event-wrapper [wrapped-fn]
  (fn [event]
    (let [editor (atom-workspace/get-active-text-editor)
          type (aget event "type")
          target (aget event "target")
          model (aget target "model")]
      (when (and (= model editor)
                 (supported-grammar? (.getGrammar editor)))
        (.preventDefault event)
        (.stopImmediatePropagation event)
        (.stopPropagation event)
        (wrapped-fn)))))


(def braces {"(" ")"
             "{" "}"
             "[" "]"
             ;  "\"" "\""
             })
(def opening-braces (set (keys braces)))
(def closing-braces (set (vals braces)))

(defn closing-brace [opening-brace]
  (get braces opening-brace))

(defn balance-brackets [text]
  (loop [chars text
         prev-char nil
         brackets []
         new-text ""
         in-string? false]
    (if (seq chars)
      (let [[char & rest] chars]
        (cond
          (and (= char \")
               (not= prev-char \\))
          (recur rest char brackets (str new-text char) (not in-string?))

          in-string?
          (recur rest char brackets (str new-text char) true)

          (some #{char} opening-braces)
          (recur rest char (conj brackets char) (str new-text char) false)

          (some #{char} closing-braces)
          (cond
            (= char (closing-brace (last brackets)))
            (recur rest char (vec (drop-last brackets)) (str new-text char) false)

            (empty? brackets)
            (recur rest char brackets new-text false)

            :else
            (recur (apply vector char rest) char (vec (drop-last brackets)) (str new-text (closing-brace (last brackets))) false))

          :else
          (recur rest char brackets (str new-text char) false)))

      (if (seq brackets)
        (str new-text (join (map closing-brace brackets)))
        new-text))))

(defn replace-text [src text ranges editor]
  (let [[range & rest] ranges
        start (convert-point-to-index (aget range "start") editor)
        end   (convert-point-to-index (aget range "end") editor)
        new-src (str (.slice src 0 start)
                     text
                     (.slice src end))]
    (if (empty? rest)
      new-src
      (recur new-src text rest editor))))
