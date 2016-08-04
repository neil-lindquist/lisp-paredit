(defproject lisp-paredit "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.9.89"]]
  :plugins [[lein-cljsbuild "1.1.2"]]
  :cljsbuild {:builds
              [{:source-paths ["src"]
                :compiler {:output-to "lib/lisp-paredit.js"
                           :optimizations :simple
                           :target :nodejs}}]})
