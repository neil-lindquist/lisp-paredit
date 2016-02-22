(ns lisp-paredit.utils
  (:require [atomio.config :as atom-config]
            [atomio.core :as atom-core])
  (:refer-clojure :exclude [->Range]))

(def grammars #{"Clojure" "Lisp" "Scheme" "Newlisp"})

(defn- get-default-line-ending []
  (condp = (atom-config/get "line-ending-selector.defaultLineEnding")
    "LF"    "\n"
    "CRLF"  "\r\n"
    (if (= "win32" js/process.platform)
      "\r\n"
      "\n")))

(defn- add-command [[command comm-fn comm-scope] subs]
  (let [scope (or comm-scope "atom-text-editor")
        command-id (str "lisp-paredit:" command)]
    (.add subs (.add js/atom.commands scope command-id comm-fn))))

(defn index-to-point [index src]
  (let [substr      (.substring src 0 index)
        row         (count (.match substr (js/RegExp. "\n" "g")))
        line-start  (+ 1 (.lastIndexOf substr "\n"))
        column      (- index line-start)]
    {:row     row
     :column  column}))

(defn supported-grammar? [grammar]
  (boolean
   (some #{(aget grammar "name")} grammars)))

(defn add-class [view class]
  (aset view "className" (str (aget view "className") " " class)))

(defn remove-class [view class]
  (let [regex (js/RegExp. class "g")]
    (aset view "className" (.replace (aget view "className") regex ""))))

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
