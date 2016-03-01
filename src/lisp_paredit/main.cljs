(ns lisp-paredit.main
  (:require [lisp-paredit.utils :refer [lisp-selector] :as utils]
            [lisp-paredit.status-bar-view :as status-bar-view]
            [lisp-paredit.markers :as markers]
            [lisp-paredit.strict :as strict]
            [lisp-paredit.commands.edit :as edit]
            [lisp-paredit.commands.navigate :as nav]
            [lisp-paredit.ast :as ast]
            [cljs.nodejs :as nodejs]
            [paredit-js.core :as paredit]
            [atomio.config :as atom-config]
            [atomio.commands :as atom-commands]
            [atomio.workspace :as atom-workspace]
            [atomio.core :as atom-core]))

(nodejs/enable-util-print!)
(defn -main [args])
(set! *main-cli-fn* -main)

(def subscriptions (atom nil))
(def persistent-subscriptions (atom nil))
(def strict-subscriptions (atom nil))

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
  (atom-config/set "lisp-paredit.enabled", (not (atom-config/get "lisp-paredit.enabled"))))

(defn toggle-strict []
  (atom-config/set "lisp-paredit.strict", (not (atom-config/get "lisp-paredit.strict"))))

(defn check-syntax [editor]
  (let [errors (aget (ast/get-ast editor) "errors")]
    (if (first errors)
      (do
        (markers/show-errors editor errors)
        (status-bar-view/syntax-error))
      (do
        (markers/clear-errors editor)
        (status-bar-view/clear-error)))))

(defn- observe-editor [editor subs]
  (check-syntax editor)
  (.add subs (.onDidStopChanging editor
                                 (fn []
                                   (check-syntax editor)))))

(defn configure-paredit []
  (let [paredit-special-forms (paredit/special-forms)]
    ;; empty paredits default special forms by popping them off the array
    (doall (map #(.pop paredit-special-forms) paredit-special-forms))
    (let [special-forms (or
                         (atom-config/get "lisp-paredit.indentationForms")
                         [])]
      (doseq [special-form special-forms]
        (if-let [match (.match special-form #"^/(.+)/")]
          (.push paredit-special-forms (js/RegExp. (nth match 1)))
          (.push paredit-special-forms special-form))))))

(defn disable-paredit [subs]
  (when subs (.dispose subs)))

(defn enable-paredit [subs]
  (utils/add-commands
   [["lisp-paredit:slurp-backwards"     edit/slurp-backwards]
    ["lisp-paredit:slurp-forwards"      edit/slurp-forwards]
    ["lisp-paredit:barf-backwards"      edit/barf-backwards]
    ["lisp-paredit:barf-forwards"       edit/barf-forwards]
    ["lisp-paredit:kill-sexp-forwards"  edit/kill-sexp-forwards]
    ["lisp-paredit:kill-sexp-backwards" edit/kill-sexp-backwards]
    ["lisp-paredit:splice"              edit/splice]
    ["lisp-paredit:splice-backwards"    edit/splice-backwards]
    ["lisp-paredit:splice-forwards"     edit/splice-forwards]
    ["lisp-paredit:split"               edit/split]
    ["lisp-paredit:forward-sexp"        nav/forward-sexp]
    ["lisp-paredit:backward-sexp"       nav/backward-sexp]
    ["lisp-paredit:up-sexp"             nav/up-sexp]
    ["lisp-paredit:down-sexp"           nav/down-sexp]
    ["lisp-paredit:expand-selection"    nav/expand-selection]
    ["lisp-paredit:indent"              edit/indent]
    ["lisp-paredit:wrap-around-parens"  edit/wrap-around-parens]
    ["lisp-paredit:wrap-around-square"  edit/wrap-around-square]
    ["lisp-paredit:wrap-around-curly"   edit/wrap-around-curly]
    ["lisp-paredit:toggle-strict"       toggle-strict "atom-workspace"]
    ["editor:newline"                   (utils/editor-command-event-wrapper edit/newline) lisp-selector]
    ["core:paste"                       (utils/editor-command-event-wrapper edit/paste)   lisp-selector]]
   subs)
  (.add subs
        (.observeTextEditors
         js/atom.workspace
         (fn [editor]
           (if (utils/supported-grammar? (.getGrammar editor))
             (observe-editor editor subs)
             (.onDidChangeGrammar editor
                                  (fn [grammar]
                                    (when (utils/supported-grammar? (.getGrammar editor))
                                      (observe-editor editor subs)))))))))

(deftype LispParedit [config]
  Object
  (activate
   [this state]
   (configure-paredit)
   (reset! persistent-subscriptions (atom-core/CompositeDisposable.))

   (utils/add-commands [["lisp-paredit:toggle" toggle "atom-workspace"]]
                       @persistent-subscriptions)
   (atom-config/observe
     "lisp-paredit.enabled"
     (fn [should-enable]
       (if should-enable
         (do
           (reset! subscriptions (atom-core/CompositeDisposable.))
           (enable-paredit @subscriptions)
           (when (atom-config/get "lisp-paredit.strict")
             (reset! strict-subscriptions (atom-core/CompositeDisposable.))
             (strict/enable @strict-subscriptions)))
         (do
           (disable-paredit @subscriptions)
           (strict/disable @strict-subscriptions)))))

   (atom-config/on-did-change
    "lisp-paredit.strict"
    (fn [event]
      (if (and (aget event "newValue")
               (atom-config/get "lisp-paredit.enabled"))
        (do
          (reset! strict-subscriptions (atom-core/CompositeDisposable.))
          (strict/enable @strict-subscriptions))
        (strict/disable @strict-subscriptions))))

   (atom-config/on-did-change
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
    (markers/detach)
     (status-bar-view/detach))

  (consumeStatusBar [this status-bar]
    (status-bar-view/initialize status-bar)))

(set!
  (.-exports js/module)
  (LispParedit. (clj->js config)))
