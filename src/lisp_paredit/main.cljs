(ns lisp-paredit.main
  (:require [lisp-paredit.utils :refer [lisp-selector] :as utils]
            [lisp-paredit.status-bar-view :as status-bar-view]
            [lisp-paredit.markers :as markers]
            [lisp-paredit.commands.edit :as edit]
            [lisp-paredit.commands.navigate :as nav]
            [lisp-paredit.ast :as ast]
            [cljs.nodejs :as nodejs]
            [paredit-js.core :as paredit]
            [atomio.config :as atom-config]
            [atomio.commands :as atom-commands]
            [atomio.views :as atom-views]
            [atomio.workspace :as atom-workspace]
            [atomio.core :as atom-core]))

(nodejs/enable-util-print!)
(defn -main [args])
(set! *main-cli-fn* -main)

(def subscriptions (atom nil))
(def persistent-subscriptions (atom nil))

(def config
  {:enabled {:type "boolean"
             :default true
             :description "When enabled the paredit commands are bound to editors that have Lisp grammars"
             :order 1}
   :grammars {:type "array"
              :default ["Clojure"
                        "Lisp"
                        "NewLisp"
                        "Racket"
                        "Scheme"]
              :description "A list of grammars to enable lisp-paredit for"
              :order 2
              :items {:type "string"}}
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

(defn check-syntax [editor]
  (let [path (.getPath editor)
        errors (aget (ast/get-ast editor) "errors")]
    (if (first errors)
      (do
        (markers/show-errors editor errors)
        (status-bar-view/syntax-error))
      (do
        (markers/clear-errors editor)
        (status-bar-view/clear-error)))))

(defn- check-inserted-text [text editor event]
  (.cancel event)
  (if-let [closing-brace (utils/closing-brace text)]
    (.transact
     editor
     (fn []
       (.mutateSelectedText editor
                            (fn [selection]
                              (.insertText selection (str text closing-brace " "))))
       (.moveLeft editor 2)))
    (let [src        (.getText editor)
          selections (.getSelectedBufferRanges editor)
          new-src    (utils/replace-text src text selections editor)
          ast        (paredit/parse new-src)

          new-text (if (= 0 (count (aget ast "errors")))
                     text
                     (utils/balance-brackets text))]
      (.mutateSelectedText editor (fn [selection] (.insertText selection new-text))))))

(defn- observe-editor [editor]
  (check-syntax editor)
  (.add @subscriptions (.onDidStopChanging editor
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

(defn disable-paredit []
  (when @subscriptions (.dispose @subscriptions)))

(defn enable-paredit []
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
    ["core:backspace"                   (utils/editor-command-event-wrapper edit/delete-backwards) lisp-selector]
    ["core:delete"                      (utils/editor-command-event-wrapper edit/delete-forwards)  lisp-selector]
    ["editor:newline"                   (utils/editor-command-event-wrapper edit/newline) lisp-selector]
    ["core:paste"                       (utils/editor-command-event-wrapper edit/paste)   lisp-selector]]
   @subscriptions)
  (.add @subscriptions
        (.observeTextEditors
         js/atom.workspace
         (fn [editor]
           (if (utils/supported-grammar? (.getGrammar editor))
             (do
               (observe-editor editor)
               (-> (atom-views/get-view editor)
                   (utils/add-class "paredit"))
               (.add @subscriptions
                     (.onWillInsertText
                      editor
                      (fn [event]
                        (let [text (aget event "text")]
                          (check-inserted-text text editor event))))))
             (.onDidChangeGrammar editor
                                  (fn [grammar]
                                    (when (utils/supported-grammar? (.getGrammar editor))
                                      (observe-editor editor))))))))
  (.add @persistent-subscriptions
        (.onDidChangeActivePaneItem
         js/atom.workspace
         (fn [pane]
           (when-let [view (atom-views/get-view pane)]
             (status-bar-view/set-active (utils/has-class? view "paredit")))))))

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
           (enable-paredit))
         (do
           (disable-paredit)))))

   (atom-config/on-did-change
    "lisp-paredit.indentationForms"
    (fn [event]
      (configure-paredit))))

  (deactivate [this]
    (when @persistent-subscriptions
      (.dispose @persistent-subscriptions))
    (when @subscriptions
      (.dispose @subscriptions))
    (markers/detach)
     (status-bar-view/detach))

  (consumeStatusBar [this status-bar]
    (status-bar-view/initialize status-bar)))

(set!
  (.-exports js/module)
  (LispParedit. (clj->js config)))
