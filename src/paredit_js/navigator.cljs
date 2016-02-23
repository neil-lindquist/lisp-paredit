(ns paredit-js.navigator)

(def *paredit* (js/require "paredit.js"))

(defn sexp-range-expansion [ast start-index end-index]
  ((aget *paredit* "navigator" "sexpRangeExpansion") ast start-index end-index))

(defn forward-sexp [ast index]
  ((aget *paredit* "navigator" "forwardSexp") ast index))

(defn backward-sexp [ast index]
  ((aget *paredit* "navigator" "backwardSexp") ast index))

(defn backward-up-sexp [ast index]
  ((aget *paredit* "navigator" "backwardUpSexp") ast index))

(defn forward-down-sexp [ast index]
  ((aget *paredit* "navigator" "forwardDownSexp") ast index))
