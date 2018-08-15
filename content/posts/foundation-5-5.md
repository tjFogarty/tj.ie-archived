---
title: "Foundation 5.5"
date: 2014-12-14T11:00:00+00:00
draft: false
categories: 
- JavaScript
---
<p>Foundation 5.5&#160;<a href="http://zurb.com/article/1364/a-growing-foundation-family-foundation-fo">has arrived</a>, and It&#8217;s lovely to see that great work has continued even with all the efforts going into the recent release of <a href="http://foundation.zurb.com/apps/">Foundation for Apps</a>.</p>
<p>This release also contains a contribution of my own (woo!) which allows you to execute code based on the current media query. It means you can check things like <code>Foundation.utils.is_large_up()</code> or <code>Foundation.utils.is_small_only()</code> which I&#8217;ve found to be pretty useful.</p>
<p>You can see the pull request <a href="https://github.com/zurb/foundation/pull/6035">here</a>.</p>
<p>Full list of what you can do:</p>
<pre><code class="language-javascript">// Small queries
Foundation.utils.is_small_only();
Foundation.utils.is_small_up();

// Medium queries
Foundation.utils.is_medium_only();
Foundation.utils.is_medium_up();

// Large queries
Foundation.utils.is_large_only();
Foundation.utils.is_large_up();

// XLarge queries
Foundation.utils.is_xlarge_only();
Foundation.utils.is_xlarge_up();

// XXLarge queries
Foundation.utils.is_xxlarge_only();
Foundation.utils.is_xxlarge_up();</code></pre>