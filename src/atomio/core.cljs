(ns atomio.core
  (:refer-clojure :exclude [Range]))

(def *atom* (js/require "atom"))

(def CompositeDisposable *atom*.CompositeDisposable)
(def Range *atom*.Range)
(def Point *atom*.Point)
