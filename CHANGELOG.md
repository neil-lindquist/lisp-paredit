## 0.8.0
* Add a setting for which grammars to enable paredit for
* Fix strict mode preventing `)` in strings

## 0.7.0
* Add kill to end of sexp commands
* Add keymap for kill-sexp-forward to match kill-sexp-backward
* Add selecting variants of sexp navigation commands
* Update dependencies
* Improve support for multiple cursors
* Fix commands not having high enough precedence
* Improve software development tooling and information
  * Add Travis CI tests
  * Add linter
  * Add package-lock.json
  * Update package information
  * Improve some tests


## 0.4.4
* Update paredit.js to 0.2.11

## 0.4.3
* Revert to npm dependency on paredit.js to fix install problem

## 0.4.2
* Indent `doseq` properly

## 0.4.1
* Bugfix wrap around with selection

## 0.4.0
* Add wrap-around commands
* Better indentation (using patched version of paredit.js)


## 0.3.1
* Set a more sensible tile weight to align status bar view more to the right

## 0.3.0
* Disallow paste if invalid syntax in strict mode
* Indent on paste
* Add split command
* Add tests for splice commands
* Add splice command


## 0.2.5
* Flash strict status message if input is being disallowed

## 0.2.4
* Move cursor to inside brackets when we add a closing brace
* Add closing brace when single opening brace is inserted

## 0.2.3
* Detach view when package deactivated

## 0.2.2
* Add descriptions to config options

## 0.2.1
* Allow deletion of structural chars when strict mode disabled

## 0.2.0
* Status bar indicator of enabled/strict status
* Toggle paredit or strict mode by clicking on status bar indicator


## 0.1.4 - First Release
* Initial release with main paredit actions
