---
title: "Upgrading to webpack 4"
date: 2018-05-12T21:48:00+01:00
draft: false
categories: 
- JavaScript
---
<p>It&#8217;s no big secret that I love <a href="https://github.com/JeffreyWay/laravel-mix/" target="_blank" rel="noopener noreferrer">Laravel Mix</a>. It&#8217;s handy enough to throw into most projects, and I had been using it with WordPress sites for a long while as it made onboarding new devs a lot easier. Babel and Sass? Done.</p>
<pre><code class="language-javascript">mix.js('src/app.js', 'dist/').sass('src/app.scss', 'dist/');</code></pre>
<p>It abstracts away all the webpack wizardry so you can spend less time setting up. It&#8217;s an amazing tool and I have no problem recommending it to people. You can inject your own configuration if you need to extend it as well so you&#8217;re not locked out of anything.</p>
<p>On the flipside I&#8217;m a divil for tinkering, so a one-liner is not conducive to my mischief. After seeing the victories achieved by the webpack team on version 4 I was eager to explore it, plus Laravel Mix is on webpack 3 (<a href="https://github.com/JeffreyWay/laravel-mix/pull/1495" target="_blank" rel="noopener noreferrer">soon to be version 4 by the looks of it</a>). </p>
<p>Here&#8217;s the list of things I needed to do:</p>
<ul>
<li>Transpile my JS</li>
<li>Handle styles written in Less</li>
<li>Use PostCSS for Tailwind</li>
<li>Output styles to a separate file</li>
<li>Generate a service worker</li>
<li>Minify assets for production</li>
</ul>
<h2 id="setup">Setup <a class="anchor" href="#setup" title="Setup">#</a></h2>
<p>The start of my config loads the packages I need, and I capture the mode we&#8217;re in (development or production). I&#8217;ll then use this mode later to update the config with any production-specific actions. For context, <code>webpack.config.js</code> sits at the root of my project, with source files and final assets living in a <code>web</code> folder.</p>

{{< highlight javascript >}}
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')

let env = process.env.NODE_ENV
let isDev = env === 'development'
{{< / highlight >}}

<h2 id="general-configuration">General Configuration <a class="anchor" href="#general-configuration" title="General Configuration">#</a></h2>
<h3 id="java-script">JavaScript <a class="anchor" href="#java-script" title="JavaScript">#</a></h3>
<p>This part took a bit of tweaking to get my paths right for code splitting and correctly loading chunks from the correct url, but in the end I settled on:</p>

{{< highlight javascript >}}
const WEBPACK_CONFIG = {
  mode: env, // development or production
  entry: {
    main: './web/src/js/main.js'
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'web'),
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/chunks/[name].js'
  }
}
{{< / highlight >}}

<p>I needed to set the <code>publicPath</code> to <code>/</code> so the chunks would load correctly, but beyond that there&#8217;s enough there to handle everything else.</p>
<h3 id="styles">Styles <a class="anchor" href="#styles" title="Styles">#</a></h3>
<p>Styles took a bit of playing around with, turns out I&#8217;m a fool and didn&#8217;t read the instructions on where to place the <code>less-loader</code> plugin. I got there in the end though, so the updated config looks like this:</p>

{{< highlight javascript >}}
const WEBPACK_CONFIG = {
  mode: env,
  entry: {
    main: './web/src/js/main.js',
    styles: './web/src/less/app.less'
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'web'),
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/chunks/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/app.css'
    })
  ]
}
{{< / highlight >}}

<p>I updated the <code>entry</code> object for my styles, and added rules for dealing with <code>less</code> files. Finally I added the <code>MiniCssExtractPlugin</code> to point the output into my assets folder.</p>
<h4>Tailwind</h4>
<p>To get Tailwind working I added a <code>postcss.config.js</code> file to my project containing:</p>

{{< highlight javascript >}}
module.exports = {
  plugins: [require('tailwindcss')('./tailwind.js')]
}
{{< / highlight >}}

<p>The <code>tailwind.js</code> reference being my configuration file.</p>
<h3 id="miscellaneous">Miscellaneous <a class="anchor" href="#miscellaneous" title="Miscellaneous">#</a></h3>
<p>Another thing I wanted to do was clear out the assets folder on each run in case I added some extra files, like unnamed chunks so I didn&#8217;t have a folder full of <code>1..n.js</code> files.</p>
<p>For that I appended the following to the plugins array:</p>
<pre><code class="language-javascript">new CleanWebpackPlugin(['web/assets'])</code></pre>
<h2 id="production-only">Production-only <a class="anchor" href="#production-only" title="Production-only">#</a></h2>
<h3 id="minify">Minify <a class="anchor" href="#minify" title="Minify">#</a></h3>
<p>I only wanted to minify in production, so with that I added a condition to append to the webpack if it wasn&#8217;t in development mode:</p>

{{< highlight javascript >}}
// `isDev` is set up earlier to check if process.env.NODE_ENV === 'development'
if (!isDev) {
  WEBPACK_CONFIG.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}
{{< / highlight >}}

<h3 id="service-worker">Service Worker <a class="anchor" href="#service-worker" title="Service Worker">#</a></h3>
<p>I&#8217;ll be honest, this is something that I still need to work on if I want to go full on PWA. I&#8217;m using <a href="https://github.com/GoogleChrome/workbox" rel="noopener noreferrer" target="_blank">Workbox</a> to help with this.</p>
<p>So still inside the <code>if (!isDev)</code> block I added:</p>

{{< highlight javascript >}}
WEBPACK_CONFIG.plugins.push(
  new workboxPlugin.InjectManifest({
    swSrc: './web/src/js/sw.js',
    swDest: 'sw.js'
  })
)
{{< / highlight >}}

<p>This compiles the service worker from this file:</p>

{{< highlight javascript >}}
workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
)

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-resources'
  })
)

workbox.precaching.precacheAndRoute(self.__precacheManifest)
{{< / highlight >}}

<p>This caches images, JavaScript, and CSS. I really need to read up more on it.</p>
<h2 id="wha-happen">Wha&#8217; Happen? <a class="anchor" href="#wha-happen" title="Wha' Happen?">#</a></h2>
<p>In the end, running <code>npm run dev</code> went from taking 6 seconds to 2.5 seconds, and <code>npm run production</code> dropped from 14 seconds to 4. Absolutely fantastic gains there, and a testament to the fine work those smart folks do working on webpack. This was more of a learning experience to get closer to the metal as it were, and I&#8217;ll continue tweaking and breaking things because it&#8217;s my site. Better I do it here than at work. I&#8217;ll only have myself to answer to, and I&#8217;m my own harshest critic.</p>
<p>You find the final file in <a href="https://github.com/tjFogarty/personal-site/blob/d78ab16e826a36dcd8fee28bf81f33acc417e529/webpack.config.js" target="_blank" rel="noopener noreferrer">my repo for this site</a>.</p>