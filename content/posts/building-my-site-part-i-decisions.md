---
title: "Building My Site Part I: Decisions"
date: 2018-01-06T23:04:00+00:00
draft: false
categories: 

---
<p>Making decisions can be an arduous task. With the blitz of build-tools and boilerplates it can be surprisingly complex to arrive at a well-informed selection of technologies. It seems like the more you know, the less you do.</p>
<p>With that, here&#8217;s what I ended up with, and why.</p>
<h2 id="results">Results <a class="anchor" href="#results" title="Results">#</a></h2>
<ul>
<li><a href="https://craftcms.com/3" rel="noopener" target="_blank">Craft CMS</a></li>
<li><a href="https://github.com/JeffreyWay/laravel-mix/" rel="noopener" target="_blank">Laravel Mix</a></li>
<li><a href="https://www.digitalocean.com/" rel="noopener" target="_blank">Digital Ocean</a></li>
<li><a href="https://forge.laravel.com/" rel="noopener" target="_blank">Laravel Forge</a></li>
</ul>
<h2 id="cms">CMS <a class="anchor" href="#cms" title="CMS">#</a></h2>
<h3 id="some-history">Some History <a class="anchor" href="#some-history" title="Some History">#</a></h3>
<p>Before all this I had a self-hosted version of <a href="https://ghost.org/" rel="noopener" target="_blank">Ghost</a>. It&#8217;s a deadly platform and incredibly easy to get up and running with. After a while I decided to move to a hosted version with them when I had less time for maintenance. It was less for me to think about. It also meant I couldn&#8217;t break the server which happens when I start tinkering too much. I could rest easy knowing these folks had it all sorted.</p>
<p>When I had a bit more time, I moved to <a href="https://pages.github.com/" rel="noopener" target="_blank">GitHub Pages</a> to have a bit more control over the build. I really liked the idea of being able to make theme-related changes that take effect with a single <code>git push</code>.</p>
<p>Not long after, I started to long for a bit more control over the functionality not only afforded by the front-end, but by what happens behind the curtain as well.</p>
<h3 id="headless-cms">Headless CMS <a class="anchor" href="#headless-cms" title="Headless CMS">#</a></h3>
<p>This is the new cool kid on the block, and I wanted to see what it was all about. After looking through a few options, I had a go of <a href="https://www.contentful.com/" rel="noopener" target="_blank">Contentful</a>. I had a blog prototype set up pretty quickly with Vue.js as a single page application. It was pretty nifty if I do say so myself. I gave myself a pat on the back and thought &quot;yep, this is it&quot;. </p>
<p>After about 20 minutes, however, I realised I needed server-side rendering to make it more accessible. I wanted to get the ball rolling quickly, and this was something that I felt would be a bit of a time sink. I scrapped it and decided to keep moving.</p>
<h3 id="craft">Craft <a class="anchor" href="#craft" title="Craft">#</a></h3>
<p>I&#8217;ve worked a lot with PHP-based projects including WordPress, ExpressionEngine and Laravel. I wanted to use something that I was familiar with in order to extend it with any custom functionality I might need/want. The Twig templating language is also something I&#8217;m quite fond of when it <a href="https://css-tricks.com/timber-and-twig-reignited-my-love-for-wordpress/" rel="noopener" target="_blank">completely changed how I worked with WordPress.</a> Lucky for me, this is where Craft came in.</p>
<p>I&#8217;ve used it before, and really liked how straight-forward it was to get going with. I thought about using WordPress, and while I still have great time for it, I wanted to explore something different.</p>
<p>Craft is also nearing it&#8217;s release of version 3, so I figured it was a good time to get back into it and see what&#8217;s changed since I last used it. Spoiler: it&#8217;s looking pretty frickin&#8217; good. They also have <a href="https://craftcms.com/pricing" rel="noopener" target="_blank">a generous pricing plan</a> for personal use: it&#8217;s free!</p>
<p>With that I pulled down the latest version of V3 that was available and started porting my posts over.</p>
<h2 id="laravel-mix">Laravel Mix <a class="anchor" href="#laravel-mix" title="Laravel Mix">#</a></h2>
<p>Again, familiarity. Laravel Mix wraps itself around webpack like a blanket with a high thread count, and gives you a dead-simple way to get up and running quickly. If you need to dig deeper you can extend the configuration to suit your needs.</p>
<p>It was recently updated to include async/await straight out of the box, which is one less thing to hack about. I like not having to think sometimes, even if that saves me manually adding a dependency and updating a dotfile.</p>
<h2 id="hosting">Hosting <a class="anchor" href="#hosting" title="Hosting">#</a></h2>
<p>I stated earlier that I have a tendency to break things when I have the terminal open in front of me. Time progressed and since then I&#8217;ve learned enough to be dangerous. I signed back up with Digital Ocean because this time I had a secret weapon &#8212; Laravel Forge.</p>
<p>Forge is suitable for any PHP project, and provisions a server with a few clicks. It also lets me watch a branch on a repo and can deploy any time a push is detected. It&#8217;ll run a script as well, which means I can run things like <code>npm run production</code> to create a production build of my assets.</p>
<h2 id="here-we-are">Here We Are <a class="anchor" href="#here-we-are" title="Here We Are">#</a></h2>
<p>This has led to the site you&#8217;re currently on today. I can&#8217;t say it will always be this way, but for now I&#8217;m really happy with the end-result. You might notice the common theme of familiarity with these decisions. That was something that occurred after the ideas had settled. I wanted a solid base to work from, something that I had initial experience with to get something up and running quickly. Who&#8217;s to say I won&#8217;t end up with a headless CMS? Maybe when I learn more about server-side rendering I&#8217;ll pick up where I left off. Until then, I have more reasons than ever to keep tinkering and exploring what else I can do with this setup.</p>
<p><a href="/building-my-site-part-ii-setup">Read Part II: Setup</a></p>