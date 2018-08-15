---
title: "Tip for React PropTypes with Storybook"
date: 2017-07-20T00:00:00+01:00
draft: false
categories: 
- JavaScript
- React
---
<p>I&#8217;ve recently begun working with React.js, and I&#8217;m really enjoying it! There&#8217;s so much to learn, but there&#8217;s one tip I&#8217;ve picked up that&#8217;s saving me some time.</p>
<p>I was doing some research and I came across this brilliant article called <a href="https://cheesecakelabs.com/blog/css-architecture-reactjs/" target="_blank" rel="noopener">CSS Architecture with ReactJS</a>. In it was a clever way of defining our props once, and re-using across prop types and stories in <a href="https://storybook.js.org/" target="_blank" rel="noopener">Storybook</a>.</p>
<p>We&#8217;re going to be using <code>Object.values</code>. From <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values" target="_blank" rel="noopener">MDN</a>:</p>
<blockquote>
<p>The Object.values() method returns an array of a given object&#8217;s own enumerable property values, in the same order as that provided by a for&#8230;in loop (the difference being that a for-in loop enumerates properties in the prototype chain as well).</p>
</blockquote>
<hr />
<p>Let&#8217;s say we have a <code>&lt;Button /&gt;</code> component that we can apply different themes to. We can set it up like so in our <code>src/components/button/index.js</code> file:</p>
<pre><code class="language-javascript">  export const ButtonTheme = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  }</code></pre>
<p>Then, we can define our prop types:</p>
<pre><code class="language-javascript">  Button.propTypes = {
    theme: PropTypes.oneOf(Object.values(ButtonTheme))
  }</code></pre>
<p>Finally then, in <code>stories/button.js</code> we can pull this in and reference it:</p>
<pre><code class="language-javascript">  import React from 'react'
  import { storiesOf } from '@storybook/react'
  import { withKnobs, select} from '@storybook/addon-knobs'
  import Button, { ButtonTheme } from '../src/components/button'

  storiesOf('Button', module)
    .addDecorator(withKnobs)
    .add('Simple button', () =&gt; (
      &lt;Button
        theme={select(
          'Theme',
          Object.values(ButtonTheme),
          ButtonTheme.PRIMARY)
        }
      &gt;
        Click me!
      &lt;/Button&gt;
  ))</code></pre>
<p>So we only have to define the different themes once, and it&#8217;ll propogate across our prop types and &#8216;knobs&#8217; in Storybook automatically! Magic.</p>