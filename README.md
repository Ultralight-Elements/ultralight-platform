[![Build Status](https://travis-ci.org/Ultralight-Elements/ultralight-platform.svg?branch=master)](https://travis-ci.org/Ultralight-Elements/ultralight-platform)  [![Sauce Test Status](https://saucelabs.com/buildstatus/ultralight-platform)](https://saucelabs.com/u/ultralight-platform)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/ultralight-platform.svg)](https://saucelabs.com/u/ultralight-platform)

ultralight-platform
===================
At this point, the ultralight-platform is simply the concatination of [document-register-element](https://github.com/WebReflection/document-register-element) (a Custom Elements polyfill) and [dom4](https://github.com/WebReflection/dom4), for browser normalization, both by [Andrea Giammarchi](http://webreflection.blogspot.com/), weighing in at **3.5k** minified and gzipped.  

The ultralight-platorm library utilizes [intern](http://theintern.io) to test browser support against a variety of desktop and mobile browsers, graciously hosted by [Sauce Labs](http://saucelabs.com), with continuous integration support provided by [Travis CI](http://travis-ci.org).  

The ultralight-platform, as well as all Ultralight Elements, are built using [browserify](http://browserify.org), which provides a [UMD](http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/) wrapper, allowing each to be used with CommonJS & AMD module loaders, as well as with standard &lt;script&gt; tags.

Ultralight Elements utilize only the Custom Elements specification and widely supported vanilla DOM standards for building Web Components, eshewing Shadom DOM, HTML Imports, & Templates.

## DOM Methods/Properties Whitelist
This list is largely derived from the work of ppk, including the [DOM Core](http://quirksmode.org/dom/core/) and [DOM Core Mobile](http://quirksmode.org/dom/core/mobile.html) compatibility tables.

### Creating Elements
```
document.createElement()
```
```
document.createTextNode()
```
### Getting Elements
```
getElementById()
```
```
getElementsByClassName() ^
```
```
getElementsByTagName()
```
```
querySelector() *
```
```
querySelectorAll() *
```
### Node Information
```
nodeName
```
```
nodeType
```
```
nodeValue
```
### DOM Tree
```
childNodes[] *
```
```
firstChild *
```
```
hasChildNodes()
```
```
lastChild *
```
```
nextSibliing *
```
```
parentNode
```
```
previousSibling *
```
### DOM Traversal
```
childElementCount ^
```
```
children[] *
```
```
firstElementChild ^
```
```
lastElementChild ^
```
```
nextElementSibling ^
```
```
previousElementSibling ^
```
### Node Manipulation
```
appendChild()
```
```
cloneNode()
```
```
insertBefore()
```
```
removeChild()
```
```
replaceChild()
```
### New Node Manipulation Methods
```
after() !
```
```
append() !
```
```
before() !
```
```
prepend() !
```
```
remove() !
```
```
replace() !
```
### Text Data
```
appendData()
```
```
data
```
```
deleteData()
```
```
normalize()
```
```
replaceData()
```
```
splitText() *
```
```
substringData()
```
```
wholeText ^
```
### Attributes
```
attributes[key] **
```
```
document.createAttribute()
```
```
getAttribute() **
```
```
getAttributeNode() **
```
```
hasAttribute()
```
```
name
```
```
removeAttribute()
```
```
removeAttributeNode()
```
```
setAttribute()
```
```
setAttributeName()
```
```
value
```
### Miscellaneous
```
compareDocumentPosition() ^
```
```
contains()
```
```
document.createDocumentFragment()
```
```
document.documentElement
```
```
ownerDocument
```

```
^   only available on >= IE9
*   available on IE 8, with caveats
**  available on >= IE9, with caveats
!   requires polyfill (provided by ultralight-platform)
```
***
## DOM HTML Methods/Properties Whitelist
This list is largely derived from the work of ppk, including the [DOM Compatibility - HTML](http://www.quirksmode.org/dom/html/) and [DOM Mobile Compatibilty - HTML](http://www.quirksmode.org/dom/html/mobile.html) tables.

## innerHTML And Friends
```
innerHTML **
```
```
insertAdjacentHTML()
```
```
outerHTML
```
```
textContent ^ (innerText for IE <= 8)
```
## HTML Element Properties
```
classList !
```
```
className
```
```
id
```
## Select Boxes
```
add(opt,opt)
```
```
add(opt, idx)
```
```
remove(idx)
```
## Tables
```
caption
```
```
cellIndex
```
```
cells[]
```
```
cellSpacing
```
```
createCaption()
```
```
createTFoot()
```
```
createTHead()
```
```
deleteCaption()
```
```
deleteCell()
```
```
deleteRow()
```
```
deleteTFoot()
```
```
deleteTHead()
```
```
insertCell()
```
```
insertRow()
```
```
rowIndex
```
```
rows[]
```
```
sectionRowIndex
```
```
tBodies[]
```
```
tFoot
```
```
tHead
```
## Document
```
document.body
```
```
document.compatMode
```
```
document.defaultView ^
```
```
document.doctype ^
```
```
^   only available on >= IE9
*   available on IE 8, with caveats
**  available on >= IE9, with caveats
!   requires polyfill (provided by ultralight-platform)
```
