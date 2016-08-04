(ns atomio.tooltips)

(defn add [element data]
  (.add atom.tooltips element (clj->js data)))
