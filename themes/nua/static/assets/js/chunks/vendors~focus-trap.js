(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~focus-trap"],{

/***/ "./node_modules/focus-trap/index.js":
/*!******************************************!*\
  !*** ./node_modules/focus-trap/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var tabbable = __webpack_require__(/*! tabbable */ \"./node_modules/tabbable/index.js\");\n\nvar listeningFocusTrap = null;\n\nfunction focusTrap(element, userOptions) {\n  var tabbableNodes = [];\n  var firstTabbableNode = null;\n  var lastTabbableNode = null;\n  var nodeFocusedBeforeActivation = null;\n  var active = false;\n  var paused = false;\n  var tabEvent = null;\n\n  var container = (typeof element === 'string')\n    ? document.querySelector(element)\n    : element;\n\n  var config = userOptions || {};\n  config.returnFocusOnDeactivate = (userOptions && userOptions.returnFocusOnDeactivate !== undefined)\n    ? userOptions.returnFocusOnDeactivate\n    : true;\n  config.escapeDeactivates = (userOptions && userOptions.escapeDeactivates !== undefined)\n    ? userOptions.escapeDeactivates\n    : true;\n\n  var trap = {\n    activate: activate,\n    deactivate: deactivate,\n    pause: pause,\n    unpause: unpause,\n  };\n\n  return trap;\n\n  function activate(activateOptions) {\n    if (active) return;\n\n    var defaultedActivateOptions = {\n      onActivate: (activateOptions && activateOptions.onActivate !== undefined)\n        ? activateOptions.onActivate\n        : config.onActivate,\n    };\n\n    active = true;\n    paused = false;\n    nodeFocusedBeforeActivation = document.activeElement;\n\n    if (defaultedActivateOptions.onActivate) {\n      defaultedActivateOptions.onActivate();\n    }\n\n    addListeners();\n    return trap;\n  }\n\n  function deactivate(deactivateOptions) {\n    if (!active) return;\n\n    var defaultedDeactivateOptions = {\n      returnFocus: (deactivateOptions && deactivateOptions.returnFocus !== undefined)\n        ? deactivateOptions.returnFocus\n        : config.returnFocusOnDeactivate,\n      onDeactivate: (deactivateOptions && deactivateOptions.onDeactivate !== undefined)\n        ? deactivateOptions.onDeactivate\n        : config.onDeactivate,\n    };\n\n    removeListeners();\n\n    if (defaultedDeactivateOptions.onDeactivate) {\n      defaultedDeactivateOptions.onDeactivate();\n    }\n\n    if (defaultedDeactivateOptions.returnFocus) {\n      setTimeout(function () {\n        tryFocus(nodeFocusedBeforeActivation);\n      }, 0);\n    }\n\n    active = false;\n    paused = false;\n    return this;\n  }\n\n  function pause() {\n    if (paused || !active) return;\n    paused = true;\n    removeListeners();\n  }\n\n  function unpause() {\n    if (!paused || !active) return;\n    paused = false;\n    addListeners();\n  }\n\n  function addListeners() {\n    if (!active) return;\n\n    // There can be only one listening focus trap at a time\n    if (listeningFocusTrap) {\n      listeningFocusTrap.pause();\n    }\n    listeningFocusTrap = trap;\n\n    updateTabbableNodes();\n    // Ensure that the focused element doesn't capture the event that caused the focus trap activation\n    setTimeout(function () {\n      tryFocus(firstFocusNode());\n    }, 0);\n    document.addEventListener('focus', checkFocus, true);\n    document.addEventListener('click', checkClick, true);\n    document.addEventListener('mousedown', checkPointerDown, true);\n    document.addEventListener('touchstart', checkPointerDown, true);\n    document.addEventListener('keydown', checkKey, true);\n\n    return trap;\n  }\n\n  function removeListeners() {\n    if (!active || listeningFocusTrap !== trap) return;\n\n    document.removeEventListener('focus', checkFocus, true);\n    document.removeEventListener('click', checkClick, true);\n    document.removeEventListener('mousedown', checkPointerDown, true);\n    document.removeEventListener('touchstart', checkPointerDown, true);\n    document.removeEventListener('keydown', checkKey, true);\n\n    listeningFocusTrap = null;\n\n    return trap;\n  }\n\n  function getNodeForOption(optionName) {\n    var optionValue = config[optionName];\n    var node = optionValue;\n    if (!optionValue) {\n      return null;\n    }\n    if (typeof optionValue === 'string') {\n      node = document.querySelector(optionValue);\n      if (!node) {\n        throw new Error('`' + optionName + '` refers to no known node');\n      }\n    }\n    if (typeof optionValue === 'function') {\n      node = optionValue();\n      if (!node) {\n        throw new Error('`' + optionName + '` did not return a node');\n      }\n    }\n    return node;\n  }\n\n  function firstFocusNode() {\n    var node;\n    if (getNodeForOption('initialFocus') !== null) {\n      node = getNodeForOption('initialFocus');\n    } else if (container.contains(document.activeElement)) {\n      node = document.activeElement;\n    } else {\n      node = tabbableNodes[0] || getNodeForOption('fallbackFocus');\n    }\n\n    if (!node) {\n      throw new Error('You can\\'t have a focus-trap without at least one focusable element');\n    }\n\n    return node;\n  }\n\n  // This needs to be done on mousedown and touchstart instead of click\n  // so that it precedes the focus event\n  function checkPointerDown(e) {\n    if (config.clickOutsideDeactivates && !container.contains(e.target)) {\n      deactivate({ returnFocus: false });\n    }\n  }\n\n  function checkClick(e) {\n    if (config.clickOutsideDeactivates) return;\n    if (container.contains(e.target)) return;\n    e.preventDefault();\n    e.stopImmediatePropagation();\n  }\n\n  function checkFocus(e) {\n    if (container.contains(e.target)) return;\n    e.preventDefault();\n    e.stopImmediatePropagation();\n    // Checking for a blur method here resolves a Firefox issue (#15)\n    if (typeof e.target.blur === 'function') e.target.blur();\n\n    if (tabEvent) {\n      readjustFocus(tabEvent);\n    }\n  }\n\n  function checkKey(e) {\n    if (e.key === 'Tab' || e.keyCode === 9) {\n      handleTab(e);\n    }\n\n    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {\n      deactivate();\n    }\n  }\n\n  function handleTab(e) {\n    updateTabbableNodes();\n\n    if (e.target.hasAttribute('tabindex') && Number(e.target.getAttribute('tabindex')) < 0) {\n      return tabEvent = e;\n    }\n\n    e.preventDefault();\n    var currentFocusIndex = tabbableNodes.indexOf(e.target);\n\n    if (e.shiftKey) {\n      if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {\n        return tryFocus(lastTabbableNode);\n      }\n      return tryFocus(tabbableNodes[currentFocusIndex - 1]);\n    }\n\n    if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);\n\n    tryFocus(tabbableNodes[currentFocusIndex + 1]);\n  }\n\n  function updateTabbableNodes() {\n    tabbableNodes = tabbable(container);\n    firstTabbableNode = tabbableNodes[0];\n    lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];\n  }\n\n  function readjustFocus(e) {\n    if (e.shiftKey) return tryFocus(lastTabbableNode);\n\n    tryFocus(firstTabbableNode);\n  }\n}\n\nfunction isEscapeEvent(e) {\n  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;\n}\n\nfunction tryFocus(node) {\n  if (!node || !node.focus) return;\n  if (node === document.activeElement)  return;\n\n  node.focus();\n  if (node.tagName.toLowerCase() === 'input') {\n    node.select();\n  }\n}\n\nmodule.exports = focusTrap;\n\n\n//# sourceURL=webpack:///./node_modules/focus-trap/index.js?");

/***/ }),

/***/ "./node_modules/tabbable/index.js":
/*!****************************************!*\
  !*** ./node_modules/tabbable/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(el, options) {\n  options = options || {};\n\n  var elementDocument = el.ownerDocument || el;\n  var basicTabbables = [];\n  var orderedTabbables = [];\n\n  // A node is \"available\" if\n  // - it's computed style\n  var isUnavailable = createIsUnavailable(elementDocument);\n\n  var candidateSelectors = [\n    'input',\n    'select',\n    'a[href]',\n    'textarea',\n    'button',\n    '[tabindex]',\n  ];\n\n  var candidates = el.querySelectorAll(candidateSelectors.join(','));\n\n  if (options.includeContainer) {\n    var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;\n\n    if (\n      candidateSelectors.some(function(candidateSelector) {\n        return matches.call(el, candidateSelector);\n      })\n    ) {\n      candidates = Array.prototype.slice.apply(candidates);\n      candidates.unshift(el);\n    }\n  }\n\n  var candidate, candidateIndexAttr, candidateIndex;\n  for (var i = 0, l = candidates.length; i < l; i++) {\n    candidate = candidates[i];\n    candidateIndexAttr = parseInt(candidate.getAttribute('tabindex'), 10)\n    candidateIndex = isNaN(candidateIndexAttr) ? candidate.tabIndex : candidateIndexAttr;\n\n    if (\n      candidateIndex < 0\n      || (candidate.tagName === 'INPUT' && candidate.type === 'hidden')\n      || candidate.disabled\n      || isUnavailable(candidate, elementDocument)\n    ) {\n      continue;\n    }\n\n    if (candidateIndex === 0) {\n      basicTabbables.push(candidate);\n    } else {\n      orderedTabbables.push({\n        index: i,\n        tabIndex: candidateIndex,\n        node: candidate,\n      });\n    }\n  }\n\n  var tabbableNodes = orderedTabbables\n    .sort(function(a, b) {\n      return a.tabIndex === b.tabIndex ? a.index - b.index : a.tabIndex - b.tabIndex;\n    })\n    .map(function(a) {\n      return a.node\n    });\n\n  Array.prototype.push.apply(tabbableNodes, basicTabbables);\n\n  return tabbableNodes;\n}\n\nfunction createIsUnavailable(elementDocument) {\n  // Node cache must be refreshed on every check, in case\n  // the content of the element has changed\n  var isOffCache = [];\n\n  // \"off\" means `display: none;`, as opposed to \"hidden\",\n  // which means `visibility: hidden;`. getComputedStyle\n  // accurately reflects visiblity in context but not\n  // \"off\" state, so we need to recursively check parents.\n\n  function isOff(node, nodeComputedStyle) {\n    if (node === elementDocument.documentElement) return false;\n\n    // Find the cached node (Array.prototype.find not available in IE9)\n    for (var i = 0, length = isOffCache.length; i < length; i++) {\n      if (isOffCache[i][0] === node) return isOffCache[i][1];\n    }\n\n    nodeComputedStyle = nodeComputedStyle || elementDocument.defaultView.getComputedStyle(node);\n\n    var result = false;\n\n    if (nodeComputedStyle.display === 'none') {\n      result = true;\n    } else if (node.parentNode) {\n      result = isOff(node.parentNode);\n    }\n\n    isOffCache.push([node, result]);\n\n    return result;\n  }\n\n  return function isUnavailable(node) {\n    if (node === elementDocument.documentElement) return false;\n\n    var computedStyle = elementDocument.defaultView.getComputedStyle(node);\n\n    if (isOff(node, computedStyle)) return true;\n\n    return computedStyle.visibility === 'hidden';\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/tabbable/index.js?");

/***/ })

}]);