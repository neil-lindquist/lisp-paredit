(ns paredit-js.core)

(def *paredit* (js/require "paredit.js"))

(defn parse [text]
  (.parse *paredit* text))

(defn special-forms []
  (aget *paredit* "specialForms"))
