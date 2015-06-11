# Lisp Paredit for Atom

Lisp Paredit provides [paredit](http://danmidwood.com/content/2014/11/21/animated-paredit.html) style
functionality for the [Atom](http://atom.io) text editor. It also features basic
syntax checking, syntax error highlighting and a strict mode.
Lisp Paredit only works for lisps and won't have any effect for other syntaxes. It is
based on the excellent [paredit.js](http://robert.kra.hn/projects/paredit-js) library.

## Installing
Search package installer for `lisp paredit` or use the command line:

`apm install lisp-paredit`

## Options
Lisp Paredit can operate in strict or non-strict modes, via the setting in preferences.

You can also disable Lisp Paredit at any time which will unbind the keymap;

## Commands
Default keybinding | Action
------------------ | --------
ctrl-alt-,         | barf-forwards
ctrl-alt-.         | slurp-forwards
ctrl-alt-<         | slurp-backwards
ctrl-alt->         | barf-backwards
cmd-delete         | kill-sexp-forwards
cmd-backspace      | kill-sexp-backwards
alt-backspace      | kill-sexp-backwards
ctrl-alt-i         | indent
ctrl-right         | forward-sexp
ctrl-left          | backward-sexp
ctrl-up            | up-sexp
ctrl-down          | down-sexp
ctrl-w             | expand-selection
backspace          | delete-backwards
ctrl-h             | delete-backwards
delete             | delete-forwards
ctrl-d             | delete-forwards
enter              | newline
