---
title: "DIY RSS Feed Reader"
description: "Building your own Feed Reader with Vue.js and Node"
date: 2018-02-12T15:44:00+00:00
draft: false
categories: 
- JavaScript
- Vue
---
<p>There’s a whole heap of services and apps out there for collating your own personalised list of RSS feeds, and discovering new ones. They all work pretty well, and I’d happily recommend a good few of them.</p>
<p>However, I’m a simple guy with simple needs. So simple in fact, that I figured I’d build my own. I know how that comes across, and the more I re-type and re-read that line the more I hate myself, but I don’t need a lot of features; I want to have a list of feeds, a list of articles for a feed, and a view for a single article. I don’t need a ‘save for later’ feature; I can use Instapaper for that. I don’t need a way to share them; I can use something like Buffer. I want to read a thing, that’s all.</p>
<h2 id="feed-me">Feed Me <a class="anchor" href="#feed-me" title="Feed Me">#</a></h2>
<p>I like JavaScript, and having a JSON object with data in it that I can iterate over is ideal. How do I get that JSON, though? After a couple of keystrokes on NPM I found <a href="https://www.npmjs.com/package/rss-parser" target="_blank" rel="noopener">rss-parser</a>. It does exactly what I was looking for; you pass a URL to a feed, and get JSON back.</p>
<p>This is too straight-forward, though. How do I overcomplicate this?</p>
<p>I created a little project that uses <a href="https://expressjs.com/" target="_blank" rel="noopener">Express</a> to respond to a GET request which returns my feed data.</p>

{{< highlight javascript >}}
const express = require('express');
const Parser = require('rss-parser');
const PORT = process.env.PORT || 5000;

const FEED_LIST = [
  'https://css-tricks.com/feed/',
  'https://codepen.io/posts/feed',
  'https://blog.safia.rocks/rss',
  'https://hnrss.org/frontpage',
  'https://tj.ie/feed.rss',
  'http://github-trends.ryotarai.info/rss/github_trends_javascript_daily.rss'
];

let app = express();

app
  .get('/', (req, res) => {
    let parser = new Parser();

    const feedRequests = FEED_LIST.map(feed => {
      return parser.parseURL(feed);
    })

    Promise.all(feedRequests).then(response => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Origin', 'some-domain-to-allow.com');
      res.header('Access-Control-Allow-Methods', 'GET');
      res.json(response);
    })
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
{{< / highlight >}}

<p>Running <code>node index.js</code> and visiting <code>http://localhost:5000</code> in your browser then should return a bounty of data.</p>
<p>You could do this with any language you fancy. You might already have a hosting plan where you can fire up a PHP script to do the same thing. For me, I chose <a href="https://ww.heroku.com">Heroku</a> because of their free plan and integration with GitHub. It suits me to add a feed to the list by updating an array letting Heroku deploy it.</p>
<h2 id="heroku">Heroku <a class="anchor" href="#heroku" title="Heroku">#</a></h2>
<p>To get going with Heroku I needed to do a few things:</p>
<ul>
<li>Sign up for the free plan</li>
<li>Create a new Node.js app from their dashboard</li>
<li>Finally, from their dashboard, enable GitHub integration and select the repo and branch I wanted and enable automatic deploys</li>
</ul>
<p>Next was some configuration — I needed to tell Heroku how to run the app.</p>
<p>To specify what command to run (in this case <code>node index.js</code>), I created a new file called <code>Procfile</code> in the root of my project. This file contains some process types, and there’s a few, but in this case we only need the <code>web</code> process type to fire up our little Express app. So with that, our <code>Procfile</code> looks exactly like this:</p>
<pre><code>web: node index.js</code></pre>
<p>The final piece was to create an <code>app.json</code> file. This acts as a sort of description of our app. In this case, it’s a name, description and what docker image to use. The docker image will contain the environment of our app, in this case it’s Node.js.</p>

{{< highlight json >}}
{
  "name": "Feeds App",
  "description": "Returns RSS feeds in JSON",
  "image": "heroku/nodejs"
}
{{< / highlight >}}

<p>After pushing your changes, you should see from the dashboard that your app is deploying, and when it’s ready clicking on <code>Open App</code> in the top-right corner of your dashboard opens it up in a new tab. </p>
<p>On the free plan, the app will softly fall asleep if there’s been no traffic to it for 30 minutes. It’ll wake up again on the next visit, but it’ll just take a few moments before you get a response while it fumbles for the alarm clock to turn it off, or maybe burst it off a wall.</p>
<h2 id="front-end">Front-end <a class="anchor" href="#front-end" title="Front-end">#</a></h2>
<p>So this is where it gets far less specific. The means are there to get the data, now it’s a matter of how to display it. For me, I used Vue and hosted it using <a href="https://codepen.io/pro/projects" target="_blank" rel="noopener">CodePen Projects</a>. You can have a look at <a href="https://github.com/tjFogarty/feeds-app-fe" target="_blank" rel="noopener">the source</a> and <a href="https://codepen.io/tjFogarty/project/full/ZPqnVe/" target="_blank">the demo</a> if you’re interested. I mostly work with React, so any chance I get to use Vue I usually take it.</p>
<p>—</p>
<p>It was a pretty fun weekend project and it gave me the chance to play with some technologies that I otherwise wouldn’t get to use. I treat these projects like a playground for some interesting tech I want to learn while also solving a problem for myself. I wanted an RSS reader that I could tinker with, so now it’s there. I’ll probably keep iterating on it, but it raised an interesting thought for me: I spend my life building things for clients to solve their problems. Why not build something for myself, and sort my own stuff out?</p>