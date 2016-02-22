(ns atomio.workspace)

(defn get-active-text-editor []
  (.getActiveTextEditor atom.workspace))
