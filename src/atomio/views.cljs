(ns atomio.views)

(defn get-view [thing]
  (.getView js/atom.views thing))
