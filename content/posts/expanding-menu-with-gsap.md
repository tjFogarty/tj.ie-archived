---
title: "Expanding menu with GSAP"
date: 2015-07-28T00:00:00+01:00
draft: false
categories: 
- JavaScript
---
<p>This is a straightforward enough bit of code that will allow you to create a re-usable expanding menu.</p>
<p>There are many, many ways you could go about this. I figured a simple Object would be enough for this example.</p>
<p data-height="268" data-theme-id="0" data-slug-hash="MwzJdN" data-default-tab="result" data-user="tjFogarty" class="codepen">See the Pen <a href="http://codepen.io/tjFogarty/pen/MwzJdN/">Expanding Navigation</a> by T.J. Fogarty (<a href="http://codepen.io/tjFogarty">@tjFogarty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
<hr />
<p>We&#8217;ll start with the mark-up. The most important bits are:</p>
<ul>
<li>Class of <code>js-nav-toggle</code> on our trigger</li>
<li><code>data-nav-id</code> also on our trigger</li>
<li>Corresponding <code>id</code> on our nav element which corresponds with <code>data-nav-id</code></li>
</ul>
<p>Our script watches <code>js-nav-toggle</code> for a click, and figures out the navigation from it&#8217;s <code>data-nav-id</code> attribute.</p>

{{< highlight html >}}
<div class="container"></div>

  <a href="#" data-nav-id="main-nav" class="c-nav--trigger js-nav-toggle">Primary Menu</a>

  <nav class="c-nav--main" role="navigation" id="main-nav">

    <ul class="c-nav__list">
      <li class="c-nav__item"><a class="c-nav__link" href="#">Home</a></li>
      <li class="c-nav__item"><a class="c-nav__link" href="#">About</a></li>
      <li class="c-nav__item"><a class="c-nav__link" href="#">Clients</a></li>
      <li class="c-nav__item"><a class="c-nav__link" href="#">Contact Us</a></li>
    </ul>

  </nav>

  <a href="#" data-nav-id="secondary-nav" class="c-nav--trigger js-nav-toggle">Secondary Menu</a>

  <nav class="c-nav--secondary" role="navigation" id="secondary-nav">

    <ul class="c-nav__list">
      <li class="c-nav__item"><a class="c-nav__link" href="#">Home</a></li>
      <li class="c-nav__item"><a class="c-nav__link" href="#">About</a></li>
      <li class="c-nav__item"><a class="c-nav__link" href="#">Clients</a></li>
      <li class="c-nav__item"><a class="c-nav__link" href="#">Contact Us</a></li>
    </ul>

  </nav>

  <h3>Title</h3>

  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo aliquid sunt rerum dignissimos voluptatem ex blanditiis nisi consequatur repudiandae quisquam quos error quam optio, dicta nesciunt neque, et reiciendis omnis.</p>

</div>
{{< / highlight >}}

<p>In terms of styles, I&#8217;ve set the navigations to <code>display: none;</code> which you can glean from the CodePen embed above. Everything else is just to make it look somewhat presentable.</p>
<p>The script has been documented, and we&#8217;re using <code>TweenLite.fromTo(el, duration, from, to);</code> to animate them back and forth depending on their active state.</p>

{{< highlight javascript >}}
/* globals $, TweenLite */

'use strict';

/**
 * Navigation controller for expanding navs
 * @type {Object}
 */
var NavController = {
  $trigger: $('.js-nav-toggle'), // these trigger open/close
  // Animation settings
  animate: {
    duration: 0.3,

    visible: {
      display: 'block',
      autoAlpha: 1,
      height: 0 // this is calculated correctly later
    },

    hidden: {
      display: 'none',
      autoAlpha: 0,
      height: 0
    }
  },
  attrs: {
    id: 'data-nav-id'
  },
  classes: {
    active: 'is-active'
  },

  /**
   * Kick things off
   */
  init: function() {
    this.bindUI();
  },

  /**
   * Watch for events
   */
  bindUI: function() {
    this.$trigger.on('click', this.handleClick);
  },

  /**
   * Show/hide nav based on click
   * @param  {Event} e
   */
  handleClick: function(e) {
    var _ = NavController,
        $trigger = $(this),
        navId = $trigger.attr(_.attrs.id),
        $nav = $('#' + navId);

    e.preventDefault();

    $nav.toggleClass(_.classes.active);

    // Fetch correct height to animate to and from
    _.animate.visible.height = $nav.outerHeight();

    if(_.isNavOpen($nav)) {
      $trigger.addClass(_.classes.active);
      TweenLite.fromTo($nav, _.animate.duration, _.animate.hidden, _.animate.visible);
    } else {
      $trigger.removeClass(_.classes.active);
      TweenLite.fromTo($nav, _.animate.duration, _.animate.visible, _.animate.hidden);
    }
  },

  /**
   * Check if given nav is open/closed
   * @param  {DOM Element}  $nav 
   * @return {Boolean}
   */
  isNavOpen: function($nav) {
    return $nav.hasClass(this.classes.active);
  }
};

NavController.init();

{{< / highlight >}}