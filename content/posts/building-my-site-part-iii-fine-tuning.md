---
title: "Building My Site Part III: Fine Tuning"
description: "Final tweaks and performance improvements for my website."
date: 2018-01-08T15:57:00+00:00
draft: false
categories: 
- JavaScript
- CSS
---
<p>After <a href="/building-my-site-part-i-decisions">making some decisions</a> and <a href="/building-my-site-part-ii-setup">implementing them</a>, it&#8217;s now time to tidy a few things up and improve on performance. I&#8217;m going to talk about the ways in which I&#8217;ve improved the loading of fonts, CSS and JavaScript.</p>
<h2 id="fonts">Fonts <a class="anchor" href="#fonts" title="Fonts">#</a></h2>
<p>I previously read an article called <a href="https://www.zachleat.com/web/23-minutes/" rel="noopener" target="_blank">23 Minutes of Work for Better Font Loading</a> and it&#8217;s a brilliant piece of work outlining the ways in which font loading can be improved. I didn&#8217;t follow <em>every</em> step, but the two I implemented really made a difference:</p>
<p>First, preloading the web fonts by putting these tags into the <code>&lt;head&gt;</code> of my site:</p>

{{< highlight html >}}
<link rel="preload" href="/fonts/raleway.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/playfair.woff2" as="font" type="font/woff2" crossorigin>
{{< / highlight >}}

<p>Secondly, adding those fonts to my service worker using the <a href="https://github.com/goldhand/sw-precache-webpack-plugin" rel="noopener" target="_blank">SW Precache Webpack Plugin</a>.</p>
<h2 id="css">CSS <a class="anchor" href="#css" title="CSS">#</a></h2>
<p>I opted to use the <a href="https://tailwindcss.com/" rel="noopener" target="_blank">Tailwind CSS Framework</a> to style my site. I found it a great way to throw a bunch of classes on my elements to rapidly style them, and abstract them out into their own classes once I was happy with them.</p>
<p>If you have a look around, you might notice that there isn&#8217;t a whole lot of style here. That may change in the future, but it also reminded me of <a href="https://csswizardry.com/" rel="noopener" target="_blank">Harry Roberts&#8217;</a> website where he inlined his styles within the <code>&lt;head&gt;</code> of his site rather than using a <code>&lt;link&gt;</code> tag.</p>
<p>Fair enough, but there&#8217;s a lot of CSS being pulled in with Tailwind that wouldn&#8217;t make sense to include. I&#8217;d only be needlessly increasing the weight of my page. Thankfully the author of this framework <a href="https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css-with-purgecss" rel="noopener" target="_blank">has a solution!</a> <a href="https://github.com/FullHuman/purgecss" rel="noopener" target="_blank">PurgeCSS</a> to the rescue:</p>

{{< highlight javascript >}}
// webpack.mix.js file
const mix = require('laravel-mix')
const tailwindcss = require('tailwindcss')
const glob = require('glob-all')
const PurgecssPlugin = require('purgecss-webpack-plugin')

// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g)
  }
}

if (mix.inProduction()) {
  mix.webpackConfig(
      plugins: [
        new PurgecssPlugin({
          // Specify the locations of any files you want to scan for class names.
          paths: glob.sync([
            path.join(__dirname, 'templates/**/*.twig'),
            path.join(__dirname, 'web/assets/**/*.js')
          ]),
          extractors: [
            {
              extractor: TailwindExtractor,

              // Specify the file extensions to include when scanning for
              // class names.
              extensions: ['html', 'js', 'php', 'twig']
            }
          ]
        })
      ]
  )
}
{{< / highlight >}}

<p>This scans through template and JavaScript files, and strips out any classes that are not being used.</p>
<p>In <code>layouts/default.twig</code> I inline it using the Craft Mix plugin:</p>

{{< highlight twig >}}
{{ mix('/assets/css/app.css', true, true) | raw }}
{{< / highlight >}}

<h2 id="java-script">JavaScript <a class="anchor" href="#java-script" title="JavaScript">#</a></h2>
<p>There&#8217;s some JavaScript on my site that isn&#8217;t required to be loaded with every single page, those being <a href="https://highlightjs.org/" rel="noopener" target="_blank">highlight.js</a> and <a href="https://github.com/algolia/algoliasearch-client-javascript" rel="noopener" target="_blank">Algolia Search</a>. Not every page requires syntax highlighting, and not everyone will click the search icon, so I needed a way to only load them when it was necessary. I did this with <a href="https://github.com/algolia/algoliasearch-client-javascript" rel="noopener" target="_blank">Dynamic Imports</a> and some tweaking of my <code>webpack.mix.js</code> file.</p>
<p>When I was first using it, the chunks that were created were either dropped into the wrong directory, or the path they were loaded from were incorrect. Here&#8217;s what I added to my configuration to correct it:</p>

{{< highlight javascript >}}
mix.webpackConfig({
  output: {
    path: path.resolve(__dirname, 'web'),
    publicPath: '/',
    chunkFilename: 'assets/js/chunks/[name].js'
  }
})
{{< / highlight >}}

<p>Let&#8217;s look at syntax highlighting first. I wanted to check if a page had code on it, and load the library in if it did.</p>

{{< highlight javascript >}}
if (document.querySelector('pre')) {
    try {
      let hljs = await System.import(
        /* webpackChunkName: "hljs" */ 'highlight.js'
      )
      hljs.initHighlightingOnLoad()
    } catch (e) {
      console.log('Error loading highlight.js', e)
    }
}
{{< / highlight >}}

<p>Using the comment <code>/* webpackChunkName: "hljs" */</code> I could specify the name of the generated file. Otherwise you&#8217;d end up with files called <code>0.js</code>, <code>1.js</code> etc&#8230;</p>
<p>Next up is the search. I&#8217;ve stripped out most of the interaction code here, and left in the loading of the required library:</p>

{{< highlight javascript >}}
import { env } from './utils'

export const Search = {
  trigger: document.querySelectorAll('.js-search'),
  index: null,

  init() {
    this.handleTriggerClick = this.handleTriggerClick.bind(this)

    this.trigger.forEach(trigger =&gt; {
      trigger.addEventListener('click', this.handleTriggerClick)
    })
  },

  handleTriggerClick(e) {
    e.preventDefault()
    this.loadSearchClient()
  },

  async loadSearchClient() {
    try {
      let algoliasearch = await System.import(
        /* webpackChunkName: "search" */ 'algoliasearch/lite'
      )

      let client = algoliasearch(
        'applicationId',
        'apiKey'
      )
      this.index = client.initIndex(
        env() === 'development' ? 'dev_posts' : 'prod_posts'
      )
    } catch (e) {
      console.log('Error loading search client', e)
    }
  }
}
{{< / highlight >}}

<p>I have an index for my local development version, and the production version. I have a function called <code>env</code> which helps me with which environment I&#8217;m in:</p>

{{< highlight javascript >}}
export const env = () => {
  return process && process.env && process.env.NODE_ENV
    ? process.env.NODE_ENV
    : null
}
{{< / highlight >}}

<h2 id="is-it-finished">Is it finished? <a class="anchor" href="#is-it-finished" title="Is it finished?">#</a></h2>
<p>After all this, I have a deployment script that runs <code>npm run production</code> which minifies my assets, generates a service worker, and strips out unused CSS classes. Coupled with the font loading techniques I have a zippy little site.</p>
<p>There&#8217;s more I can do, however. Maybe there are smaller libraries out there that I can swap in, or some optimisations I can make to my artisanal, hand-rolled code. I could add the JavaScript to the service worker, though I have cache-invalidation trust issues that I need to work through first.</p>
<p>Until then, you can see the <a href="https://github.com/tjFogarty/personal-site" rel="noopener" target="_blank">source code for this site</a> as it stands today.</p>