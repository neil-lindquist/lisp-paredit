(ns lisp-paredit.markers
  (:refer-clojure :exclude [->Range])
  (:require [lisp-paredit.utils :as utils :refer [->Range]]))

(def syntax-markers (atom {}))

(defn clear-errors [editor]
  (when-let [markers (get @syntax-markers (aget editor "id"))]
    (doall (map #(.destroy %) markers)))
  (swap! syntax-markers #(assoc % (aget editor "id") [])))

(defn show-errors [editor errors]
  (clear-errors editor)
  (when (seq errors)
    (doseq [error errors]
      (let [range (->Range (utils/convert-index-to-point (aget error "start") editor)
                           (utils/convert-index-to-point (aget error "end") editor))
            marker (.markBufferRange editor range (js-obj "invalidate" "touch"))]
        (.decorateMarker editor marker (js-obj "type"  "highlight"
                                               "class" "lisp-syntax-error"))
        (swap! syntax-markers #(update %
                                       (aget editor "id")
                                       (fn [vec] (conj vec marker))))))))

(defn detach []
  (doseq [[_ markers] @syntax-markers]
    (doseq [m markers]
      (.destroy m))))
