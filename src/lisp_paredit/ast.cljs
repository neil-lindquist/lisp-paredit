(ns lisp-paredit.ast
  (:require [paredit-js.core :as paredit]))

; Caching proved slower than calculating ast each time

(def ^:private asts (atom {}))
(def ^:private hashcodes (atom {}))

(defn- hashcode [str]
  (if (= 0 (count str))
    0
    (loop [h 0
           i 0]
      (let [c (.charCodeAt str i)
            hash (bit-or (+ (- (bit-shift-left h 5)
                               h)
                            c)
                         0)]
        (if (= i (dec (count str)))
          hash
          (recur hash (inc i)))))))

(defn get-ast-cached
  "Get the ast for the editor. Store in a map keyed by the file path
  to avoid parsing the same source more than once. Store the hashcodes to determine
  if the file content has changed."
  [editor]
  (let [start (.now js/Date)
         src               (.getText editor)
         path              (.getPath editor)
         hashcode          (hashcode src)
         existing-hashcode (get @hashcodes path)
         existing-ast      (get @asts path)]
    (println "get-ast" start)
    (if (and existing-ast
             (= existing-hashcode hashcode))
      existing-ast
      (let [ast (paredit/parse src)]
        (swap! asts #(assoc % path ast))
        (swap! hashcodes #(assoc % path hashcode))
        (println "get-ast fin" (- (.now js/Date) start))
        ast))))

(defn get-ast
  [editor]
  (let [src (.getText editor)]
    (paredit/parse src)))
