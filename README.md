# Lisp Paredit for Atom

Lisp Paredit provides [paredit](http://danmidwood.com/content/2014/11/21/animated-paredit.html) style
functionality for the [Atom](http://atom.io) text editor.
Lisp Paredit only works for lisps and won't function for other syntaxes. It is
based on the excellent [paredit.js](http://robert.kra.hn/projects/paredit-js) library.

## Installing
Search package installer for `lisp paredit` or use the command line:

`apm install lisp-paredit`

## Commands
Default keybinding | Action
------------------ | --------
ctrl-alt-,         | barf-forwards
ctrl-alt-.         | slurp-forwards
ctrl-alt-shift-,   | slurp-backwards
ctrl-alt-shift-.   | barf-backwards
ctrl-alt-k         | kill-sexp-forwards
ctrl-alt-backspace | kill-sexp-backwards
ctrl-alt-right     | forward-sexp
ctrl-alt-left      | backward-sexp
ctrl-alt-up        | up-sexp
ctrl-alt-down      | down-sexp
ctrl-alt-space     | expand-selection
ctrl-tab           | indent

## Todo
 - Split
 - Splice
 - Wrap around
 - Rewrite
 - Delete
 - Close and newline
 - Toggle on/off
 - Enforce structure - override default keys
