---
title: "Page Visibility API"
date: 2018-02-23T11:07:00+00:00
draft: false
categories: 
- JavaScript
---
<p>The Page Visibility API lets you detect when a page is visible or in focus for a user. The page is deemed no longer visible if they switch to another tab or when the window is minimized.</p>
<p>So what is it good for? The <a href="https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API" target="_blank" rel="noopener">MDN Docs</a> do a great job of explaining this API and its potential uses. For example, you could use it to pause a video or a game, or hold off on any background requests you might be making.</p>
<p>My cases are far less noble and exciting. Yes, I&#8217;m using it to show an emoji in the document title. Go ahead, switch to a different tab. Do come back though. Please. The link to the MDN Docs gives an example of how to implement the API, along with affordances for older browsers that support a vendor prefixed version. I&#8217;m going to outline a barebones script for my implementation.</p>
<p>Here&#8217;s the result in case it&#8217;s removed or changed.</p>
<img src="https://tj-craft.test/uploads/page-visibility.gif" alt="Page visibility example" />
<pre><code class="language-javascript">const PageVisibility = {
  asleepEmoji: '&#x1f4a4;',
  originalTitle: document.title, // [1]

  init() {
    if (typeof document.hidden === 'undefined') return // [2]

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this) // [3]

    document.addEventListener('visibilitychange', this.handleVisibilityChange, false)
  },

  handleVisibilityChange() {
    let title = this.originalTitle

    if (document.hidden) {
      title = `${this.asleepEmoji} ${title}`
    }

    document.title = title
  }
}</code></pre>
<p>After calling <code>PageVisibility.init()</code> you&#8217;re good to go. </p>
<p>[1] We&#8217;re storing the original copy of the document title so we can revert back to it once the page is visible again.</p>
<p>[2] We do a rudimentary check for modern support for this feature. You can check out the MDN link above for the vendor prefixed version.</p>
<p>[3] Binding the lexical scope of <code>this</code>. It means when I call <code>this</code> it&#8217;ll refer to the PageVisibility object I created rather than <code>document</code>.</p>