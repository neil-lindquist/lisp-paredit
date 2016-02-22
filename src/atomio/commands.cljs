(ns atomio.commands
  (:require [atomio.views :as atom-views]))

(defn- workspace-view []
  (atom-views/get-view js/atom.workspace))

(defn dispatch
  ([command]
   (dispatch (workspace-view) command))
  ([view command]
   (.dispatch js/atom.commands view command)))

(defn add
  ([command command-fn]
   (add "atom-text-editor" command command-fn))
  ([scope command command-fn]
   (.add js/atom.commands scope command command-fn)))

(defn on-did-dispatch [callback]
  (.onDidDispatch js/atom.commands callback))

(defn on-will-dispatch [callback]
  (.onWillDispatch js/atom.commands callback))
