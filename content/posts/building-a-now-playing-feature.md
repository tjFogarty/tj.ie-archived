---
title: "Building a 'Now Playing' Feature"
description: "Show the world what you're listening to because it's important."
date: 2017-12-18T12:19:00+00:00
draft: false
categories: 
- JavaScript
- CSS
---
<p>As part of the rebuild of this site (which I&#8217;ll write more about when things have settled) I thought it would be fun to add a feature that shows what music I&#8217;m currently listening to, or what I last listened to. The people need to know.</p>
<p>I mostly use Spotify, and I thought they didn&#8217;t support grabbing the currently playing song from their API. Turns out they support fetching the <a href="https://developer.spotify.com/web-api/get-the-users-currently-playing-track/" target="_blank" rel="noopener">currently playing</a>, and <a href="https://developer.spotify.com/web-api/web-api-personalization-endpoints/get-recently-played/" target="_blank" rel="noopener">recently played</a> tracks.</p>
<p>I assumed it wasn&#8217;t available and jumped straight in with something I had implemented before by using <a href="https://www.last.fm/" target="_blank" rel="noopener">Last.fm</a>. This works from the settings in Spotify to connect it to your Last.fm account. You can <a href="https://www.last.fm/api/account/create" target="_blank" rel="noopener">sign up for an API account</a> if you want to go this route. Make sure to make a copy of the key you&#8217;re given, as there&#8217;s no facility available to see it again once you leave that page.</p>
<h2 id="putting-it-all-together">Putting it all together <a class="anchor" href="#putting-it-all-together" title="Putting it all together">#</a></h2>
<p>Here&#8217;s the plan:</p>
<ul>
<li>CSS custom properties are magic, and I&#8217;d like to use them to learn more about them</li>
<li>JavaScript async/await for the request</li>
<li>Not everyone will see this, or care about it. It should be opt-in to save on a request</li>
</ul>
<h3 id="css-more-than-style">CSS: More than style <a class="anchor" href="#css-more-than-style" title="CSS: More than style">#</a></h3>
<p>I&#8217;m using CSS custom properties to display content. As far as I&#8217;m aware it can be read by screen readers, but I&#8217;m happy to be corrected on that.</p>
<p>The idea is to have a custom property that has an initial value of <code>Loading...</code>:</p>

{{< highlight css >}}
:root {
    --current-track: 'Loading...';
}
{{< / highlight >}}

<p>Then when the user triggers the request, the property will be updated with the track information, which is displayed like this:</p>

{{< highlight css >}}
...::after {
    content: var(--current-track);
}
{{< / highlight >}}

<p>So before the request has completed, you&#8217;re seeing <code>Loading...</code>.</p>
<p>Here&#8217;s the CSS we need:</p>

{{< highlight css >}}
c-now-playing {
  position: fixed;
  z-index: 10;
  bottom: 50px;
  right: 50px;
}

.c-now-playing__trigger {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50%;
  background-color: #fff;
  width: 45px;
  height: 45px;
  transition: background ease 0.3s;
}

.c-now-playing__trigger:focus {
  outline: none;
}

.c-now-playing__trigger:after {
  content: var(--current-track);
  background-color: #ff3b3f;
  color: #f3f3f3;
  font-size: .875rem;
  padding: 0.75rem;
  position: absolute;
  right: 0;
  pointer-events: none;
  border-radius: 2px;
  line-height: 1.4;
  bottom: 100%;
  width: 230px;
  opacity: 0;
  transform: translateY(-15px);
  transition: opacity ease 0.3s, transform ease 0.3s;
}

.c-now-playing__trigger:hover,
.c-now-playing__trigger:focus {
  background-color: #ff3b3f;
}

.c-now-playing__trigger:hover:after,
.c-now-playing__trigger:focus:after {
  transform: translateY(-5px);
  opacity: 1;
}

.c-now-playing__trigger:hover .c-now-playing__icon,
.c-now-playing__trigger:focus .c-now-playing__icon {
  color: #f3f3f3;
}
{{< / highlight >}}

<p>And the corresponding HTML:</p>
{{< highlight html >}}
&lt;button type="button" class="c-now-playing__trigger js-lt-trigger"&gt;
    Now Playing
&lt;/button&gt;
{{< / highlight >}}

<h3 id="the-java-script">The JavaScript <a class="anchor" href="#the-java-script" title="The JavaScript">#</a></h3>
<p>The code required for this to work is minimal &#8212; we need a way to request the latest track, and update the custom property with the result.</p>

{{< highlight javascript >}}
const endpoint = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&amp;user=NAME&amp;api_key=API_KEY&amp;format=json&amp;limit=1'

export const ListeningTo = {
  hoverTrigger: document.querySelector('.js-lt-trigger'),

  init() {
    this.updateRecentTrackVariable('Loading...')

    this.hoverTrigger.addEventListener(
      'mouseenter',
      this.fetchLatestTrack.bind(this),
      { once: true }
    )
  },

  async fetchLatestTrack() {
    try {
      let { recenttracks } = await fetch(endpoint).then(res =&gt; res.json())
      let { artist, name } = recenttracks.track[0]

      this.updateRecentTrackVariable(`Currently listening to: ${name} by ${artist['#text']}`)
    } catch (e) {
      this.updateRecentTrackVariable(`Error loading track: ${e}`)
    }
  },

  updateRecentTrackVariable(value) {
    document.documentElement.style.setProperty(
      '--current-track',
      `'${value}'`
    )
  }
}

// when imported, you can call ListeningTo.init() to start.
{{< / highlight >}}

<p>In the <code>init</code> function, it only fires when the trigger is hovered, and it&#8217;ll only happen once per page load. There&#8217;s no need to keep making the request after that.</p>
<h2 id="sin-é-thats-it">Sin é (that&#8217;s it) <a class="anchor" href="#sin-é-thats-it" title="Sin é (that's it)">#</a></h2>
<p>You can see the result in the bottom right corner of the site, in the future I&#8217;ll probably refactor it to use the Spotify API. In the meantime, however, it works just fine.</p>