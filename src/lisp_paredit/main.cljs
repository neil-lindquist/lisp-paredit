(ns lisp-paredit.main
  (:require [lisp-paredit.cljs-utils :refer [export]]
            [cljs.nodejs :as nodejs]))

(nodejs/enable-util-print!)
(defn -main [args])
(set! *main-cli-fn* -main)

(def *atom* (js/require "atom"))
(def paredit (js/require "paredit.js"))
(def utils (js/require "./utils"))
(def Views (js/require "./views"))
(def strict (js/require "./strict-mode"))
(def nav (js/require "./navigation-commands"))
(def edit (js/require "./edit-commands"))

(def subscriptions (atom nil))
(def persistent-subscriptions (atom nil))
(def strict-subscriptions (atom nil))
(def views (atom nil))

(def config
  {:enabled {:type "boolean"
             :default true
             :description "When enabled the paredit commands are bound to editors that have Lisp grammars"
             :order 1}
   :strict {:type "boolean"
            :default true
            :description "Strict mode disallows the removal of single brackets, instead encouraging the user to use the paredit commands to modify s-expressions"
            :order 2}
   :indentationForms {:type "array"
                      :default ["&", "monitor-exit", "/^case/", "try", "/^reify/", "finally", "/^(.*-)?loop/",
                                "/^let/", "/^import/", "new", "/^deftype/", "/^let/", "fn", "recur", "/^set.*!$/",
                                ".", "var", "quote", "catch", "throw", "monitor-enter",
                                "ns", "in-ns", "/^([^/]+/)?def/","/^if/","/^when/","/^unless/", "while", "for",
                                "/(^|/)with/", "testing", "while", "cond", "condp", "apply",
                                "binding", "locking", "proxy", "reify", "/^extend/", "facts",
                                "do", "doseq", "dorun", "doall", "dosync", "start", "stop"]
                      :description "A list of forms (strings or regexes) that affect the indentation level"
                      :order 3
                      :items {:type "string"}}})

(defn toggle []
  (js/atom.config.set "lisp-paredit.enabled", (not (js/atom.config.get "lisp-paredit.enabled"))))

(defn toggle-strict []
  (js/atom.config.set "lisp-paredit.strict", (not (js/atom.config.get "lisp-paredit.strict"))))

(defn check-syntax [editor views]
  (let [path (.getPath editor)
        ast (.parse paredit (.getText editor))
        errors (aget ast "errors")]
    (if errors
      (.showErrors views editor errors)
      (.clearErrors views editor))))

(defn observe-editor [editor subs views]
  (check-syntax editor views)
  (.add subs (.onDidStopChanging editor
    (fn [] (check-syntax editor views)))))

(defn configure-paredit []
  (let [paredit-special-forms (aget paredit "specialForms")]
    (doall (map #(.pop paredit-special-forms) paredit-special-forms))
    (let [special-forms (or
                         (.get js/atom.config "lisp-paredit.indentationForms")
                         [])]
      (doseq [special-form special-forms]
        (if-let [match (.match special-form #"^/(.+)/")]
          (.push paredit-special-forms (js/RegExp. (nth match 1)))
          (.push paredit-special-forms special-form))))))

(defn disable-paredit [subs, views]
  (.enabled views false)
  (when subs (.dispose subs)))

(defn enable-paredit [subs, views]
  (.enabled views false)
  (.addCommands utils
                (clj->js [["slurp-backwards"     (aget edit "slurpBackwards")]
                          ["slurp-forwards"      (aget edit "slurpForwards")]
                          ["barf-backwards"      (aget edit "barfBackwards")]
                          ["barf-forwards"       (aget edit "barfForwards")]
                          ["kill-sexp-forwards"  (aget edit "killSexpForwards")]
                          ["kill-sexp-backwards" (aget edit "killSexpBackwards")]
                          ["splice"              (aget edit "splice")]
                          ["splice-backwards"    (aget edit "spliceBackwards")]
                          ["splice-forwards"     (aget edit "spliceForwards")]
                          ["split"               (aget edit "split")]
                          ["forward-sexp"        (aget nav "forwardSexp")]
                          ["backward-sexp"       (aget nav "backwardSexp")]
                          ["up-sexp"             (aget nav "upSexp")]
                          ["down-sexp"           (aget nav "downSexp")]
                          ["expand-selection"    (aget nav "expandSelection")]
                          ["indent"              (aget edit "indent")]
                          ["newline"             (aget edit "newline")]
                          ["wrap-around-parens"  (aget edit "wrapAroundParens")]
                          ["wrap-around-square"  (aget edit "wrapAroundSquare")]
                          ["wrap-around-curly"   (aget edit "wrapAroundCurly")]
                          ["toggle-strict"       toggle-strict "atom-workspace"]])
                subs
                views)
  (.add subs (.observeTextEditors js/atom.workspace
              (fn [editor]
                (if (.isSupportedGrammar utils (.getGrammar editor))
                  (observe-editor editor subs views)
                  (.onDidChangeGrammar editor
                                       (fn [grammar]
                                         (when (.isSupportedGrammar utils (.getGrammar editor))
                                           (observe-editor editor subs views)))))))))

(deftype LispParedit [config]
  Object
  (activate
   [this state]
   (configure-paredit)
   (reset! views (Views. toggle toggle-strict))
   (reset! persistent-subscriptions (*atom*.CompositeDisposable.))

   (.addCommands utils (clj->js [["toggle" toggle "atom-workspace"]])
                          @persistent-subscriptions
                          @views)
   (.observe js/atom.config
     "lisp-paredit.enabled"
     (fn [should-enable]
       (if should-enable
         (do
           (reset! subscriptions (*atom*.CompositeDisposable.))
           (enable-paredit @subscriptions @views)
           (when (.get js/atom.config "lisp-paredit.strict")
             (reset! strict-subscriptions (*atom*.CompositeDisposable.))
             (.enableStrictMode strict @strict-subscriptions @views)))
         (do
           (disable-paredit @subscriptions @views)
           (.disableStrictMode strict @strict-subscriptions @views)))))

   (.onDidChange js/atom.config
    "lisp-paredit:strict"
    (fn [event]
      (if (and (aget event "newValue")
               (.get js/atom.config "lisp-paredit.enabled"))
        (do
          (reset! strict-subscriptions (*atom*.CompositeDisposable.))
          (.enableStrictMode strict @strict-subscriptions @views))
        (.disableStrictMode strict @strict-subscriptions @views))))

   (.onDidChange js/atom.config
    "lisp-paredit.indentationForms"
    (fn [event]
      (configure-paredit))))

  (deactivate [this]
    (when @persistent-subscriptions
      (.dispose @persistent-subscriptions))
    (when @subscriptions
      (.dispose @subscriptions))
    (when @strict-subscriptions
      (.dispose @strict-subscriptions))
    (when @views
      (.detach @views)))

  (consumeStatusBar [this status-bar]
    (.setStatusBar @views status-bar)
    (.enabled @views (.get js/atom.config "lisp-paredit.enabled"))
    (.strictModeEnabled @views (.get js/atom.config "lisp-paredit.strict"))))

(export (LispParedit. (clj->js config)))
