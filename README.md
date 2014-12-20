[![Build Status](https://travis-ci.org/Ultralight-Elements/ultralight-platform.svg?branch=master)](https://travis-ci.org/Ultralight-Elements/ultralight-platform)  [![Sauce Test Status](https://saucelabs.com/buildstatus/ultralight-platform)](https://saucelabs.com/u/ultralight-platform)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/ultralight-platform.svg)](https://saucelabs.com/u/ultralight-platform)

ultralight-platform
===================
At this point, the ultralight-platform is simply the concatination of [document-register-element](https://github.com/WebReflection/document-register-element) (a Custom Elements polyfill) and [dom4](https://github.com/WebReflection/dom4), for browser normalization, both by [Andrea Giammarchi](http://webreflection.blogspot.com/), weighing in at **3.5k** minified and gzipped.  

The ultralight-platorm library utilizes [intern](http://theintern.io) to test browser support against a variety of desktop and mobile browsers, graciously hosted by [Sauce Labs](http://saucelabs.com), with continuous integration support provided by [Travis CI](http://travis-ci.org).  

The ultralight-platform, as well as all Ultralight Elements, are built using [browserify](http://browserify.org), which provides a [UMD](http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/) wrapper, allowing each to be used with CommonJS & AMD module loaders, as well as with standard &lt;script&gt; tags.

Ultralight Elements utilize only the Custom Elements specification and widely supported vanilla DOM standards for building Web Components, eshewing Shadom DOM, HTML Imports, & Templates.

## DOM Methods/Properties White List
This list is largely derived from the work of ppk, including the [DOM Core](http://quirksmode.org/dom/core/) and [DOM Core Mobile](http://quirksmode.org/dom/core/mobile.html) compatibility tables.

### Creating Elements
```js
document.createElement()
```
```js
document.createTextNode()
```
### Getting Elements
```js
getElementById()
```
```js
getElementsByClassName() ^
```
```js
getElementsByTagName()
```
```js
querySelector() *
```
```js
querySelectorAll() *
```
### Node Information
```js
nodeName
```
```js
nodeType
```
```js
nodeValue
```
### DOM Tree
```js
childNodes[] *
```
```js
firstChild *
```
```js
hasChildNodes()
```
```js
lastChild *
```
```js
nextSibliing *
```
```js
parentNode
```
```js
previousSibling *
```
### DOM Traversal
```js
childElementCount ^
```
```js
children[] *
```
```js
firstElementChild ^
```
```js
lastElementChild ^
```
```js
nextElementSibling ^
```
```js
previousElementSibling ^
```
### Node Manipulation
```js
appendChild()
```
```js
cloneNode()
```
```js
insertBefore()
```
```js
removeChild()
```
```js
replaceChild()
```
### New Node Manipulation Methods
```js
after() !
```
```js
append() !
```
```js
before() !
```
```js
prepend() !
```
```js
remove() !
```
```js
replace() !
```
### Text Data
```js
appendData()
```
```js
data
```
```js
deleteData()
```
```js
normalize()
```
```js
replaceData()
```
```js
splitText() *
```
```js
substringData()
```
```js
wholeText ^
```
### Attributes
```js
attributes[key] **
```
```js
document.createAttribute()
```
```js
getAttribute() **
```
```js
getAttributeNode() **
```
```js
hasAttribute()
```
```js
name
```
```js
removeAttribute()
```
```js
removeAttributeNode()
```
```js
setAttribute()
```
```js
setAttributeName()
```
```js
value
```
### Miscellaneous
```js
compareDocumentPosition() ^
```
```js
contains()
```
```js
document.createDocumentFragment()
```
```js
document.documentElement
```
```js
ownerDocument
```

^  only available on >= IE 9
*  caveats with <= IE 8
**  caveats with >= IE 9
!  requires polyfill 
