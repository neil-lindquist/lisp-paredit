(ns lisp-paredit.main
  (:require [lisp-paredit.node :refer [export]]
            [lisp-paredit.utils :as utils]
            [lisp-paredit.status-bar-view :as status-bar-view]
            [lisp-paredit.markers :as markers]
            [lisp-paredit.strict :as strict]
            [lisp-paredit.commands.edit :as edit]
            [lisp-paredit.commands.navigate :as nav]
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
  (if-let [errors (-> (.getText editor)
                      paredit/parse
                      :errors)]
    (markers/show-errors editor errors)
    (markers/clear-errors editor)))

(defn- indent-inserted-text [event]
  (let [text (aget event "text")
        editor (atom-workspace/get-active-text-editor)]
    (when (= "\n" text)
      (.cancel event)
      (.mutateSelectedText editor
                           (fn [selection]
                             (.insertText selection text)
                             (edit/indent-range (.getBufferRange selection) editor))))))

(defn- observe-editor [editor subs]
  (check-syntax editor)
  (.add subs (.onDidStopChanging editor
                                 (fn [] (check-syntax editor))))

  (.add subs (.onWillInsertText editor
                                indent-inserted-text)))

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
   [["slurp-backwards"     edit/slurp-backwards]
    ["slurp-forwards"      edit/slurp-forwards]
    ["barf-backwards"      edit/barf-backwards]
    ["barf-forwards"       edit/barf-forwards]
    ["kill-sexp-forwards"  edit/kill-sexp-forwards]
    ["kill-sexp-backwards" edit/kill-sexp-backwards]
    ["splice"              edit/splice]
    ["splice-backwards"    edit/splice-backwards]
    ["splice-forwards"     edit/splice-forwards]
    ["split"               edit/split]
    ["forward-sexp"        nav/forward-sexp]
    ["backward-sexp"       nav/backward-sexp]
    ["up-sexp"             nav/up-sexp]
    ["down-sexp"           nav/down-sexp]
    ["expand-selection"    nav/expand-selection]
    ["indent"              edit/indent]
    ;  ["newline"             edit/newline]
    ["wrap-around-parens"  edit/wrap-around-parens]
    ["wrap-around-square"  edit/wrap-around-square]
    ["wrap-around-curly"   edit/wrap-around-curly]
    ["toggle-strict"       toggle-strict "atom-workspace"]]
   subs)
  (.add subs (.observeTextEditors js/atom.workspace
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

   (utils/add-commands [["toggle" toggle "atom-workspace"]]
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
    (markers/detach))

  (consumeStatusBar [this status-bar]
    (status-bar-view/initialize status-bar)))

(export (LispParedit. (clj->js config)))
