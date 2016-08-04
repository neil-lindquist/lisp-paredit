(ns lisp-paredit.status-bar-view
  (:require [atomio.config :as atom-config]
            [atomio.commands :as atom-commands]
            [atomio.tooltips :as atom-tooltips]
            [atomio.core :as atom-core]))

(def tooltip-subscriptions (atom nil))

(defn create-web-component [classname tag callbacks attrs inner-html]
  (let [proto (.create js/Object js/HTMLDivElement.prototype)]
    (aset proto "createdCallback" (fn []
                                    (this-as
                                     this
                                     (aset this "innerHTML" inner-html)
                                     (when (:created callbacks)
                                       ((:created callbacks) this)))))
    (aset proto "detachedCallback" (fn []
                                     (this-as
                                      this
                                      (when (:detached callbacks)
                                        ((:detached callbacks) this)))))
    (doseq [[attr val] attrs]
      (aset proto (name attr) (clj->js val)))
    (aset js/window classname (.registerElement js/document
                                                (name tag)
                                                (clj->js {:prototype proto})))))

(create-web-component
 "LispPareditStatus"
 :lisp-paredit-status
 {:created (fn [node]
             (let [enabled-el (.querySelector node ".enabled-status")
                   strict-el (.querySelector node ".strict-status")]
               (.add (aget node "classList") "inline-block")
               (when (atom-config/get "lisp-paredit.enabled")
                 (.setAttribute node "enabled" ""))
               (when (atom-config/get "lisp-paredit.strict")
                 (.setAttribute node "strict" ""))
               (.addEventListener enabled-el "click" #(atom-commands/dispatch "lisp-paredit:toggle"))
               (.addEventListener strict-el "click" #(atom-commands/dispatch "lisp-paredit:toggle-strict"))
               (.add @tooltip-subscriptions
                     (atom-tooltips/add enabled-el, {:title "Toggle lisp-paredit"}))
               (.add @tooltip-subscriptions
                     (atom-tooltips/add strict-el, {:title "Toggle strict mode"}))

               (atom-config/on-did-change
                "lisp-paredit.enabled"
                (fn [event]
                  (.setEnabled node (aget event "newValue"))))

               (atom-config/on-did-change
                "lisp-paredit.strict"
                (fn [event]
                  (.setStrict node (aget event "newValue"))))))
  :detached (fn [node]
              (.dispose @tooltip-subscriptions))}
 {:invalidInput (fn []
                  (this-as
                   this
                   (.setAttribute this "error" "")
                   (js/setTimeout (fn [] (.removeAttribute this "error")) 500)))
  :setEnabled (fn [val]
                (this-as
                 node
                 (if val
                   (.setAttribute node "enabled" "")
                   (.removeAttribute node "enabled"))))
  :setStrict (fn [val]
               (this-as
                node
                (if val
                  (.setAttribute node "strict" "")
                  (.removeAttribute node "strict"))))
  :syntaxError (fn []
                 (this-as
                  node
                  (.setAttribute node "syntax-error" "")))
  :clearError  (fn []
                 (this-as
                  node
                  (.removeAttribute node "syntax-error")))}
 "<span class='enabled-status'>(λ)</span>
  <span class='strict-status'>strict</span>")

(defn initialize [status-bar]
  (reset! tooltip-subscriptions (atom-core/CompositeDisposable.))
  (let [node (.createElement js/document "lisp-paredit-status")]
    (.addRightTile status-bar (clj->js {:item node
                                        :priority 10}))))

(defn find-status-bar []
  (.querySelector js/document "lisp-paredit-status"))

(defn invalid-input []
  (when-let [status-bar (find-status-bar)]
    (.invalidInput status-bar)))

(defn detach []
  (when-let [status-bar (find-status-bar)]
    (.removeElement js/document status-bar)))

(defn syntax-error []
  (when-let [status-bar (find-status-bar)]
    (.syntaxError status-bar)))

(defn clear-error []
  (when-let [status-bar (find-status-bar)]
    (.clearError status-bar)))
