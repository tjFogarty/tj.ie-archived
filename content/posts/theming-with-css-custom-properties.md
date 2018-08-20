---
title: "Theming with CSS Custom Properties"
date: 2018-03-02T16:20:00+00:00
draft: false
categories: 
- CSS
- Craft
- Twig
---
<p>I remember scoffing at the thoughts of variables in CSS. &quot;Haha. Oh internet, we have Sass!&quot; Alas, I was a fool. Now it&#8217;s getting to the stage where I might say &quot;Haha. Oh internet, we have CSS!&quot; when faced with the option of using a pre-processor. There&#8217;s still a few things I use pre-processors or post-processors for such as nesting and splitting files, but beyond that I&#8217;d be just as happy using vanilla CSS.</p>
<p>I&#8217;m going to be showing the code used on this site at the moment, one difference being the name of some of the custom properties, but beyond that it&#8217;s the same. As I&#8217;m using Craft, I&#8217;ll be explaining this with the Twig templating language. If you use WordPress you can do this with PHP or Twig (which <a href="https://css-tricks.com/timber-and-twig-reignited-my-love-for-wordpress/" target="_blank" rel="noopener">I wrote an article about</a> if you&#8217;re interested), but the idea can be applied anywhere from server-side rendering to JavaScript in the client.</p>
<h2 id="the-css">The CSS <a class="anchor" href="#the-css" title="The CSS">#</a></h2>
<p>To create a custom property, we can use the <code>:root</code> selector and pass it properties that begin with <code>--</code>. This tells the browser that they&#8217;re custom properties and the values can be whatever we want. In this case we&#8217;re using colours.</p>
<p>We&#8217;re going to delcare two colours; primary and secondary. The <code>c</code> prefix here is more of a visual cue to let us know these are colours should we need reminding:</p>

{{< highlight css >}}
:root {
  --c-primary: #7B296E;
  --c-secondary: #AFA73A;
}
{{< / highlight >}}

<p>I like to keep these at the top of a file where I make base styles such as on the <code>body</code> tag, but I might end up moving them to their own file in the future if it gets a bit unwieldly. In any case they&#8217;re set now and we can use them by calling the <code>var()</code> function and passing one of these property names:</p>

{{< highlight css >}}
a {
  color: var(--c-primary);
}

a:hover {
  color: var(--c-secondary);
}
{{< / highlight >}}

<p>By using these, the project becomes instantly themeable. I&#8217;m sure more consideration needs to be taken with bigger projects; maybe you don&#8217;t want all of them to change, or have more control over what gets updated. In this case you can create new custom properties based on existing ones:</p>

{{< highlight css >}}
:root {
  --c-primary: #7B296E;
  --c-secondary: #AFA73A;
  --c-hero-title: var(--c-primary);
}
{{< / highlight >}}

<p>This way we can re-use existing values without duplication, but also target specific ones in certain cases if we need to.</p>
<h2 id="the-templates">The Templates <a class="anchor" href="#the-templates" title="The Templates">#</a></h2>
<p>In my case, I&#8217;m selecting a random theme on every page load, so it makes more sense for me to have everything related to the theming in Twig files. Otherwise if I scoped my themes in CSS to a class I&#8217;d have to update the Twig file and the CSS when a new one gets added or removed. If you&#8217;re making a theme selector then it can be neccessary if they change based on a class getting added to an element in the DOM. To each their own really, we just want to build cool stuff.</p>
<p>In our default Twig layout file, I&#8217;ve updated the opening <code>html</code> tag to this:</p>

{{< highlight twig >}}
<html lang="en" {% include 'components/_style-switcher' %}>
{{< / highlight >}}

<p>This will inline some CSS to override the original variables. So what&#8217;s in <code>_style-switcher.twig</code>?</p>

{{< highlight twig >}}
{% set themes = [
  {
    'primary': '#ff3b3f',
    'secondary': '#fcd200'
  },
  {
    'primary': '#7B296E',
    'secondary': '#AFA73A'
  },
  {
    'primary': '#02847F',
    'secondary': '#D99104'
  },
  {
    'primary': '#75003E',
    'secondary': '#8B8F00'
  },
  {
    'primary': '#8F0000',
    'secondary': '#005656'
  }
] %}

{% set theme = random(themes) %}
style="--c-primary: {{ theme['primary'] }}; --c-secondary: {{ theme['secondary'] }};"
{{< / highlight >}}

<p>It&#8217;s an array of objects, each one containing a primary and secondary key. <code>{% set theme = random(themes) %}</code> will select a random item from the array which we can then use to set the value of the variable. In this approach it won&#8217;t set a unique one every single time, such is the nature of random I guess. So you could refresh the page a few times before a new one is chosen.</p>
<p>One approach to avoid this might be to set a cookie with the name of the chosen theme. On the next page load you could check if the new randomly chosen one is the same as the one in the cookie. If so, try again, and repeat until you have a new one, and set that in the cookie.</p>
<p>If you&#8217;re using JavaScript, you can use the following to update custom properties:</p>

{{< highlight javascript >}}
document.querySelector('html').style.setProperty('--c-primary', 'purple');
{{< / highlight >}}

<h2 id="conclusion">Conclusion <a class="anchor" href="#conclusion" title="Conclusion">#</a></h2>
<p>There&#8217;s a range of ways you can approach this, and the easiest in some cases might be to do this with JavaScript if you don&#8217;t have access to the server code side of things. Custom Properties absolutely opens up a world of dynamicism on the web, and you can do a whole lot more than theme with them. I usually pick a new feature such as this and try apply it to my own work, be it existing or new, to have a play with it. And what&#8217;s code if it&#8217;s not playful at times?</p>