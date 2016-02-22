(ns paredit-js.core)

(def *paredit* (js/require "paredit.js"))

(defn parse [text]
  (js->clj (.parse *paredit* text) :keywordize-keys true))

(defn special-forms []
  (aget *paredit* "specialForms"))
