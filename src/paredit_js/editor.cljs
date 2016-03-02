(ns paredit-js.editor)

(def *paredit* (js/require "paredit.js"))

(defn indent-range [ast new-src start end]
  ((aget *paredit* "editor" "indentRange") ast new-src start end))

(defn slurp-sexp  [ast src index args]
  ((aget *paredit* "editor" "slurpSexp") ast src index (clj->js args)))

(defn barf-sexp [ast src index args]
  (try
    ((aget *paredit* "editor" "barfSexp") ast src index (clj->js args))
    (catch js/Error e
      (println "Error calling paredit.js"))))

(defn kill-sexp [ast src index args]
  ((aget *paredit* "editor" "killSexp") ast src index (clj->js args)))

(defn splice-sexp [ast src index args]
  ((aget *paredit* "editor" "spliceSexp") ast src index (clj->js args)))

(defn splice-sexp-kill [ast src index args]
  ((aget *paredit* "editor" "spliceSexpKill") ast src index (clj->js args)))

(defn split-sexp [ast src index args]
  ((aget *paredit* "editor" "splitSexp") ast src index (clj->js args)))

(defn delete [ast src index args]
  ((aget *paredit* "editor" "delete") ast src index (clj->js args)))

(defn wrap-around [ast src index start end args]
  ((aget *paredit* "editor" "wrapAround") ast src index start end (clj->js args)))
