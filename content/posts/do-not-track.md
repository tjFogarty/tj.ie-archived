---
title: "Do Not Track"
date: 2018-04-15T13:01:00+01:00
draft: false
categories: 
- JavaScript
---
<p>When I first began writing posts for my own website, I was keen to get an insight into how people were finding my blog, what pages were most popular, and generally nerding out with the real-time dashboard in Google Analytics to see visitors from different parts of the world.</p>
<p>Those things definitely still interest me, but over time I haven&#8217;t really used any of the information I get in a meaningful way. I imagine for other sites it&#8217;s more useful, especially if you need to run some ads, or it&#8217;s part of your income or a service you offer and you want to see if users are hitting any issues. That&#8217;s super important stuff, and I don&#8217;t see a problem with it. The way it looks to be going now, however, is that it&#8217;s becoming more of an opt-in experience rather than one of opt-out.</p>
<p>This is a pretty small site, and since it&#8217;s developer-focused I&#8217;m imagining a good number of visitors have some sort of ad blocker enabled. I have one myself, and sure I&#8217;ll disable it for sites I trust, but for the most part it&#8217;s left on by default. I&#8217;ve been recently toying with the idea of removing tracking altogether for my site in it&#8217;s current state, but first I wanted to see if there was any middle-ground to explore. Enter <code>navigator.doNotTrack</code>.</p>
<hr />
<p>I found <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack" target="_blank" rel="noopener">some docs on MDN</a> describing how it can be used, and there&#8217;s a difference in behaviour across browsers. It seems by default in Chrome and Safari, the value is <code>null</code>, whereas in Firefox it&#8217;s <code>"unspecified"</code>. If you call <code>navigator.doNotTrack</code> and it returns a string value of <code>"1"</code>, then it means the request prefers no tracking. I&#8217;m going to be leaning more towards an opt-in approach, however if it returns <code>null</code> then I&#8217;ll enable Google Analytics. You can find this option in your browser settings. In Safari it&#8217;s under Privacy, and in Chrome and Firefox you can search your settings for &quot;do not track&quot;.</p>
<p>Here&#8217;s how I&#8217;m checking at the moment:</p>
<pre><code class="language-javascript">function hasDoNotTrackEnabled() {
  let doNotTrack = navigator.doNotTrack

  // some browsers have this in the window object
  if ('doNotTrack' in window) {
    doNotTrack = window.doNotTrack
  }

  // if it isn't specified, let's not assume
  if (doNotTrack === 'unspecified') return true

  return doNotTrack === '1'
}</code></pre>
<p>It would be nice if it always had a value like Firefox does, but I&#8217;m gonna roll with this for now. Chances are it&#8217;ll completely disable tracking for Firefox users, and enable it for Chrome and Safari users if they don&#8217;t say otherwise which kinda circumvents the opt-in approach. Short of removing analytics altogether I think this is an OK approach for now.</p>
<p>I&#8217;m using the <a href="https://www.npmjs.com/package/ga-lite" target="_blank" rel="noopener">ga-lite package</a> to bundle everything so I have cleaner control over how tracking works.</p>
<pre><code class="language-javascript">import galite from 'ga-lite'
import { env, hasDoNotTrackEnabled } from './utils'

export const Tracking = {
  gaTrackingId: 'UA-XXXXXXX-X',
  shouldTrack: env() === 'production' &amp;&amp; !hasDoNotTrackEnabled(),

  setup() {
    if (!this.shouldTrack) return

    galite('create', this.gaTrackingId, 'auto')
  },

  sendPageView() {
    if (!this.shouldTrack) return

    galite('send', 'pageview')
  }
}</code></pre>
<p>The <code>env()</code> call is a utility function I can use so I don&#8217;t run it when developing locally.</p>
<p>So now when I call <code>Tracking.setup()</code> and <code>Tracking.sendPageView()</code>, it&#8217;ll do it based on the result of the <code>hasDoNotTrackEnabled</code> function.</p>
<p>I&#8217;ll keep this going for a while, and probably end up removing tracking altogether at some stage. Just to re-iterate though, I have no problem with sites using some form of tracking. This is more of a personal decision. It&#8217;d be nice if it got to a stage where something like Carbon Ads would be needed to help pay for hosting, and I&#8217;d reconsider then if I needed to get a rough estimation of traffic. At the end of the day it&#8217;s a tool to be used, and we shouldn&#8217;t be shamed out of taking advantage of it (provided it&#8217;s not for nefarious reasons, of course).</p>