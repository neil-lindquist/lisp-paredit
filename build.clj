(require 'cljs.build.api)

(cljs.build.api/build "src"
                      {:main 'lisp-paredit.core
                       :output-dir "out"
                       :target :nodejs})
