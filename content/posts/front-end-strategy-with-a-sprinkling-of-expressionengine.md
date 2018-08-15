---
title: "Front-end Strategy with a sprinkling of ExpressionEngine"
date: 2014-12-13T14:30:00+00:00
draft: false
categories: 
- JavaScript
- CSS
---
<p>My aim in the past while has been pointed towards front-end development, and exploring the different ways in which to produce a tidy result.</p>
<p>These examples point to ExpressionEngine paths, but you can customise them to any project you’re working on. I’m relatively new to the ExpressionEngine game, and some of what I’m going to outline will be eventually replaced by Niall O’Brien’s <a href="https://github.com/niallobrien/generator-ee-foundation">EE Foundation generator</a>, so that’s definitely something to keep an eye on.</p>
<p>As with many things, we start with Gulp. This will handle our assets and do some nifty things such as generating our critical CSS and automatically injecting our Bower components whenever we update them. See below for an example setup:</p>
<p>This is just the standard-fare Gulp setup. We’ve got tasks for watching and compiling our assets. It’s the structure of these assets that I want to talk about.</p>
<h2 id="styles">Styles <a class="anchor" href="#styles" title="Styles">#</a></h2>
<p>I’m using Sass (SCSS syntax), and I’m borrowing heavily from MVCSS for the structure. It’s a simplified version (i.e. I’ve left things out) to a point where I find it easier to manage.</p>
<p>A typical folder structure would be&#160;:</p>
<h3 id="core">Core <a class="anchor" href="#core" title="Core">#</a></h3>
<p>This is the foundation of the project, where we establish defaults on tag-level elements, define variables, layouts, mixins… The files in here might go as follows:</p>
<ul><li>_base.scss — our tag-level styles.</li><li>_config.scss — definition of our variables, fonts etc…</li><li>_helpers.scss — mixins, placeholders, utility classes.</li><li>_layout.scss — grid-type classes.</li><li>_reset.scss — I like to use normalize.css</li></ul>