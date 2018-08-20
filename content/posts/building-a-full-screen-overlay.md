---
title: "Building a full-screen overlay"
date: 2015-04-06T00:00:00+01:00
draft: false
categories: 
- JavaScript
- CSS
---
<p>I’m currently working on a project that requires a full-screen overlay for various components - I’m going to share what I have at the moment, though I’m sure it can be refined.</p>
<p>DISCLAIMER: I’m not a mad bastard when it comes to JavaScript. I’m still learning.</p>
<p>—</p>
<p>I’m using the incredible <a href="http://greensock.com/gsap">GSAP</a> library for animating the various parts, and I’ve found that once you get into it, it’s an invaluable tool.
It also plays nicely with <code>jQuery.animate()</code> via a <a href="http://greensock.com/jquery-gsap-plugin">plugin</a> if you’re so inclined.</p>
<p><a href="http://jquery.com/">jQuery</a> is being used as well, though you can easily use something like <a href="http://zeptojs.com/">Zepto</a> or anything else you fancy.</p>
<p>—</p>
<p>The Overlay object is going to work as follows:</p>
<ul>
<li><code>var overlay = new Overlay();</code> - this instantiates the object, but doesn’t create it in the DOM.</li>
<li><code>overlay.create();</code> - we then create an empty div in the page.</li>
<li><code>overlay.show();</code> - this animates it in.</li>
<li><code>overlay.hide();</code> - does what you imagine.</li>
<li><code>overlay.destroy();</code> - removes it from the DOM.</li>
</ul>
<p>‘Mon!</p>
{{< highlight javascript >}}
  var Overlay = (function() {
  var $body = $(‘body’); // We need to put the overlay somewhere

    // We can modify this to accept an object instead of setting everything here, but this works fine for now
  function Overlay() {
    this.assignClass = ‘c-overlay’;
    this.el = false; // check if it exists
    this.animate = {
      duration: 0.3,

      visible: {
        display: ‘block’,
        autoAlpha: 0.7,
        ease: Power3.easeInOut
      },

      hidden: {
        display: ‘none’,
        autoAlpha: 0,
        ease: Power3.easeInOut
      }
    };
  }

  return Overlay;
})();
{{< / highlight >}}

<p>This is the start of our overlay. It’s basically just some configuration, and it can be modified to accept an object as an argument so we can specify what we want the properties to be. For the moment, however, this’ll work fine to get us up and running.</p>
<p>Grand job, so let’s add it to the DOM when we call <code>create()</code>.</p>
{{< highlight javascript >}}
Overlay.prototype.create = function() {
  var self = this;

  this.el = $(‘&lt;div/&gt;’, {
    ‘class’: this.assignClass
  }).appendTo($body);

  $(this.el).on(‘click’, function() {
      self.hide();
  });
};
{{< / highlight >}}

<p>We’re also binding a click event in here that hides the overlay once clicked.</p>
<p>—</p>
<p>Now we’re going to show it using <code>TweenLite</code> from GSAP. We’re going to pass in parts of the animate object we created earlier, and we’re going to pass these into a <code>fromTo()</code> method.</p>

{{< highlight javascript >}}
Overlay.prototype.show = function() {
  $body.addClass(‘prevent-overflow’);
  TweenLite.fromTo(this.el, this.animate.duration, this.animate.hidden, this.animate.visible);
};
{{< / highlight >}}

<p>That extra class is just a helper, and not necessary. It just prevents scrolling when the overlay is active.</p>
<p>You’ll notice as well that the animate object specifies that we’re animating from <code>display: block;</code> to <code>display: none;</code>. These properties will be applied once the other properties have been animated. In this case we’re animating <code>opacity</code> using <code>autoAlpha</code>.</p>
<p>The difference between <code>opacity</code> and <code>autoAlpha</code> is as follows, found on <a href="https://greensock.com/get-started-js">Getting Started with GSAP</a>:</p>
<p>the same thing as “opacity” except that when the value hits “0”, the “visibility” property will be set to “hidden” in order to improve browser rendering performance and prevent clicks/interactivity on the target. When the value is anything other than 0, “visibility” will be set to “visible”.</p>
<p>—</p>
<p>Hiding it is going to be the same idea as showing it. We’re just going to swap some of the arguments around:</p>

{{< highlight javascript >}}
Overlay.prototype.hide = function() {
  $body.removeClass(‘prevent-overflow’);
  TweenLite.fromTo(this.el, this.animate.duration, this.animate.visible, this.animate.hidden);
};
{{< / highlight >}}
<p>—</p>
<p>Finally, we need a method for destroying it. </p>

{{< highlight javascript >}}
Overlay.prototype.destroy = function() {
  $body.removeClass(‘prevent-overflow’);
  $(this.el).remove();
  this.el = false;
};
{{< / highlight >}}

<p data-height="268" data-theme-id="0" data-slug-hash="ByeQMR" data-default-tab="result" data-user="tjFogarty" class="codepen">See the Pen <a href="http://codepen.io/tjFogarty/pen/ByeQMR/">Full-screen overlay</a> by T.J. Fogarty (<a href="http://codepen.io/tjFogarty">@tjFogarty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
<p>It’s not the most incredible thing you’ve ever seen, but if you have modules that need an overlay, it’s easy to just drop this in for re-use.</p>