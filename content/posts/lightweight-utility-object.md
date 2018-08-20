---
title: "Lightweight Utility Object"
date: 2015-07-26T00:00:00+01:00
draft: false
categories: 
- JavaScript
---
<p>I&#8217;m working on a little project, and it&#8217;s fairly lightweight. I ended up creating a JavaScript object with a few functions to help with the most common tasks, e.g. add class, toggle class, select element&#8230;</p>
<p>It&#8217;s just a collection assembled from <a href="http://youmightnotneedjquery.com/">You Might Not Need jQuery</a>.</p>
<p>Example usage:</p>

{{< highlight javascript >}}
U.ready(function() {
  console.log('Ready to go!');
});
{{< / highlight >}}

<p>I&#8217;d usually have this exported as a separate module using Browserify or ES2015.</p>

{{< highlight javascript >}}
/**
 * Utilities 
 * see http://youmightnotneedjquery.com/
 * @type {Object}
 */
var U = {
  /**
   * Call a function when DOM is ready
   * @param  {Function} fn Function to call when DOM is ready
   */
  ready: function(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  },

  /**
   * Select a DOM element
   * @param  {String} selector 
   * @return {DOM Element}
   */
  qsa: function(selector) {
    return document.querySelectorAll(selector);
  },

  /**
   * Add class
   * @param {String} el        DOM Selector
   * @param {String} className Class to add to el
   */
  addClass: function(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  },

  /**
   * Check if an element has a given class
   * @param  {String}  el        Selector string to check
   * @param  {String}  className Class to check against
   * @return {Boolean}
   */
  hasClass: function(el, className) {
    if (el.classList) {
      el.classList.contains(className);
    } else {
      new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  },

  /**
   * Remove class
   * @param {String}  el        DOM Selector
   * @param {String}  className Class to remove from el
   */
  removeClass: function(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  },

  /**
   * Toggle class
   * @param {String}  el        DOM Selector
   * @param {String}  className Class to toggle on el
   */
  toggleClass: function(el, className) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex &gt;= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push(className);
      }

      el.className = classes.join(' ');
    }
  }
};
{{< / highlight >}}

<p><a href="https://gist.github.com/tjFogarty/04a797998fc1df10e5fe/">View the Gist</a></p>