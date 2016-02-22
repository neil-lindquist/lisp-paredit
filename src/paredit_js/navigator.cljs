(ns paredit-js.navigator)

(def *paredit* (js/require "paredit.js"))

(defn sexp-range-expansion [ast start-index end-index]
  (js->clj ((aget *paredit* "navigator" "sexpRangeExpansion") (clj->js ast) start-index end-index) :keywordize-keys true))

(defn forward-sexp [ast index]
  (js->clj ((aget *paredit* "navigator" "forwardSexp") (clj->js ast) index) :keywordize-keys true))

(defn backward-sexp [ast index]
  (js->clj ((aget *paredit* "navigator" "backwardSexp") (clj->js ast) index) :keywordize-keys true))

(defn backward-up-sexp [ast index]
  (js->clj ((aget *paredit* "navigator" "backwardUpSexp") (clj->js ast) index) :keywordize-keys true))

(defn forward-down-sexp [ast index]
  (js->clj ((aget *paredit* "navigator" "forwardDownSexp") (clj->js ast) index) :keywordize-keys true))
