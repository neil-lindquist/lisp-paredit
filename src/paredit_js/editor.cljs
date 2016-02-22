(ns paredit-js.editor)

(def *paredit* (js/require "paredit.js"))

(defn indent-range [ast new-src start end]
  (js->clj ((aget *paredit* "editor" "indentRange") (clj->js ast) new-src start end) :keywordize-keys true))

(defn slurp-sexp  [ast src index args]
  (js->clj ((aget *paredit* "editor" "slurpSexp") (clj->js ast) src index (clj->js args)) :keywordize-keys true))

(defn barf-sexp [ast src index args]
  (js->clj ((aget *paredit* "editor" "barfSexp") (clj->js ast) src index (clj->js args)) :keywordize-keys true))

(defn kill-sexp [ast src index args]
  (js->clj ((aget *paredit* "editor" "killSexp") (clj->js ast) src index (clj->js args)) :keywordize-keys true))

(defn splice-sexp [ast src index args]
  (js->clj ((aget *paredit* "editor" "spliceSexp") (clj->js ast) src index (clj->js args)) :keywordize-keys true))

(defn splice-sexp-kill [ast src index args]
  (js->clj ((aget *paredit* "editor" "spliceSexpKill") (clj->js ast) src index (clj->js args)) :keywordize-keys true))

(defn split-sexp [ast src index args]
  (js->clj ((aget *paredit* "editor" "splitSexp") (clj->js ast) src index (clj->js args)) :keywordize-keys true))

(defn delete [ast src index args]
  (js->clj ((aget *paredit* "editor" "delete") (clj->js ast) src index (clj->js args)) :keywordize-keys true))

(defn wrap-around [ast src index start end args]
  (js->clj ((aget *paredit* "editor" "wrapAround") (clj->js ast) src index start end (clj->js args)) :keywordize-keys true))
