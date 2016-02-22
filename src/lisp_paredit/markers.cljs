(ns lisp-paredit.markers
  (:require [lisp-paredit.utils :as utils :refer [->Range]]))

(def syntax-markers (atom {}))

(defn clear-errors [editor]
  (if-let [markers (get @syntax-markers (aget editor "id"))]
    (doall (map #(.destroy %) markers)))
  (swap! syntax-markers #(assoc % (aget editor "id") [])))

(defn show-errors [editor errors]
  (clear-errors editor)
  (when (seq errors)
    (doseq [error errors]
      (let [range (->Range (utils/convert-index-to-point (:start error) editor)
                           (utils/convert-index-to-point (:end error) editor))
            marker (.markBufferRange editor range (js-obj "inavalidate" "touch"))]
        (.decorateMarker editor marker (clj->js {:type "highlight"
                                                 :class "lisp-syntax-error"}))
        (swap! syntax-markers #(update %
                                       (aget editor "id")
                                       (fn [vec] (conj vec marker))))))))
                                       
(defn detach []
  (doseq [[_ markers] @syntax-markers]
    (doseq [m markers]
      (.destroy m))))
