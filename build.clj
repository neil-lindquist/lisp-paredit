(require 'cljs.build.api)

(cljs.build.api/build "src"
                      {:output-to "lib/lisp-paredit.js"
                       :optimizations :simple
                       :target :nodejs})
