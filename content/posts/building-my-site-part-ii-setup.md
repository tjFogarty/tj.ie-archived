---
title: "Building My Site Part II: Setup"
date: 2018-01-07T14:53:00+00:00
draft: false
categories: 
- CMS
- Craft
- Twig
---
<p>In the <a href="/building-my-site-part-i-decisions">first part</a> of this series I talked about the decisions that led to using the likes of Craft and Laravel Mix. So now it&#8217;s time to get it all up and running.</p>
<h2 id="craft">Craft <a class="anchor" href="#craft" title="Craft">#</a></h2>
<p>At the moment, while Craft is in it&#8217;s release candidate stage, it&#8217;s only available as a <a href="https://getcomposer.org/" rel="noopener" target="_blank">Composer</a> package. This is set to change once it&#8217;s ready for a wider release.</p>
<p>I&#8217;m using <a href="https://github.com/laravel/valet" rel="noopener" target="_blank">Valet</a> for local development, but you can use whatever suits your workflow provided it meets the requirements, with the main ones being PHP &gt;= 7 and either MySQL 5.5+ or PostgreSQL 9.5+. It&#8217;s worth looking at the <a href="https://github.com/craftcms/docs/blob/master/en/requirements.md" rel="noopener" target="_blank">full list of requirements</a> to see what PHP extensions are required as well.</p>
<p>To get a starter project installed, you can run:</p>
<pre><code class="language-bash">composer create-project -s RC craftcms/craft PATH_TO_YOUR_PROJECT</code></pre>
<p>And within your new project you&#8217;ll find the file <code>.env.example</code> which you can rename to <code>.env</code>. This is where you&#8217;ll fill in your database details, along with any other secrets you want to keep from prying eyes. (If this is going in a git repo, make sure you add <code>.env</code> to your <code>.gitignore</code>.)</p>
<p>Finally, then, visiting your new site will prompt the installation wizard to begin which you can follow through to install Craft.</p>
<h3 id="plugins">Plugins <a class="anchor" href="#plugins" title="Plugins">#</a></h3>
<p>Already, Craft 3&#160;<a href="https://plugins.craftcms.com/" rel="noopener" target="_blank">has quite a collection of great plugins</a> and I wasted no time in going through them. To be honest, I only had a few ideas of the things I needed, the rest fell into my life as I figured they&#8217;d be nice to have.</p>
<ul>
<li><a href="https://github.com/craftcms/contact-form" rel="noopener" target="_blank">Contact Form</a> - &quot;Add a simple contact form to your Craft CMS site&quot;</li>
<li><a href="https://github.com/sjelfull/craft3-http2serverpush" rel="noopener" target="_blank">HTTP2 Server Push</a> - &quot;Automatically add HTTP2 Link headers for CSS, JS and image assets.&quot;</li>
<li><a href="https://github.com/nystudio107/craft3-typogrify" rel="noopener" target="_blank">Typogrify</a> - &quot;Typogrify prettifies your web typography by preventing ugly quotes and &#8216;widows&#8217; and more&quot;</li>
<li><a href="https://github.com/mister-bk/craft-plugin-mix" rel="noopener" target="_blank">Mix</a> - &quot;Helper plugin for Laravel Mix in Craft CMS templates.&quot;</li>
<li><a href="https://github.com/selvinortiz/craft-plugin-doxter" rel="noopener" target="_blank">Doxter</a> - &quot;Markdown Editor &amp; Parser for Craft 3.&quot;</li>
<li><a href="https://github.com/Dolphiq/craft3-plugin-redirect" rel="noopener" target="_blank">Redirect Manager</a> - &quot;Manage 301 and 302 redirects with an easy to use user interface.&quot;</li>
<li><a href="https://github.com/craftcms/mailgun" rel="noopener" target="_blank">Mailgun</a> - &quot;Mailgun integration for Craft CMS.&quot;</li>
<li><a href="https://github.com/jmx2inc/picpuller-for-craft3" rel="noopener" target="_blank">Pic Puller</a> - &quot;Integrate Instagram into Craft CMS.&quot;</li>
<li><a href="https://github.com/Rias500/craft3-scout" rel="noopener" target="_blank">Scout</a> - &quot;Craft Scout provides a simple solution for adding full-text search to your entries. Scout will automatically keep your search indexes in sync with your entries.&quot;</li>
</ul>
<h3 id="entries-and-templates">Entries and Templates <a class="anchor" href="#entries-and-templates" title="Entries and Templates">#</a></h3>
<p>For the most basic setup, I needed a way to create and display posts. To get started, I went to <code>Settings &gt; Sections</code> and created a new section called <code>Posts</code>. The section type was left as <code>Channel</code> and I updated the Entry URI Format to <code>{slug}</code> and the template to <code>posts/_entry</code>.</p>
<p>Next, I needed to create a field for this section to store my post content. Back we go to settings and then <code>Fields</code> to click <code>New Field</code>. I gave it the name of <code>Post Content</code> which generated the handle <code>postContent</code> which I&#8217;ll use in the templates to get the content. After this, I set the field type as <code>Doxster</code> to use Markdown.</p>
<p>Finally, I go back to <code>Settings &gt; Sections</code> and add an entry type to Posts. From here I used the drag and drop editor to assign my <code>postContent</code> field to the section.</p>
<p>After adding some posts from my old setup, it was then time to dig into the template. Remember when I added the <code>posts/_entry</code> information to the template field for the section? Craft maps this to your templates directory, so creating the folder <code>posts</code> and the template <code>_entry.twig</code> inside it will work to display a single post. At it&#8217;s most basic, it looks like this:</p>
{{< highlight twig >}}
{% extends 'layouts/default' %}

{% block content %}
  &lt;article&gt;
    &lt;h1&gt;{{ entry.title | typogrify }}&lt;/h1&gt;

    &lt;time datetime="{{ entry.postDate.date }}"&gt;{{ entry.postDate | date('d M Y') }}&lt;/time&gt;

      {{ entry.postContent | typogrify }}
  &lt;/article&gt;
{% endblock %}
{{< / highlight >}}

<p>The <code>layouts/default</code> file is essentially our <code>html</code>, <code>head</code> and <code>body</code> tags which surround our post template. Within the body, you&#8217;ll have <code>{% block content %}{% endblock %}</code> which will signal to Twig to drop the above in that spot.</p>
<p>Next up, I needed to create a listing of those posts on my homepage, so I created the file <code>index.twig</code> in the root of the templates folder and added the following:</p>

{{< highlight twig >}}
{% extends 'layouts/default' %}

{% block content %}

  {% paginate craft.entries.section('posts').limit(6) as pageInfo, pageEntries %}

  &lt;ul&gt;
  {% for entry in pageEntries %}
    &lt;li&gt;
          &lt;h2&gt;
            &lt;a href="/{{ post.slug }}"&gt;{{ post.title | typogrify }}&lt;/a&gt;
          &lt;/h2&gt;
          &lt;time datetime="{{ post.postDate.date }}"&gt;{{ post.postDate | date('d M Y') }}&lt;/time&gt;

          &lt;p&gt;
                {{ post.postContent | striptags | slice(0, 360) | raw }}&amp;hellip;
          &lt;/p&gt;
    &lt;/li&gt;
  {% endfor %}
  &lt;/ul&gt;

  {% if pageInfo.prevUrl %}
        &lt;a href="{{ pageInfo.prevUrl }}"&gt;Previous Page&lt;/a&gt;
  {% endif %}

  {% if pageInfo.nextUrl %}
        &lt;a href="{{ pageInfo.nextUrl }}"&gt;Next Page&lt;/a&gt;
  {% endif %}

{% endblock %}
{{< / highlight >}}

<p>I added in some filters like <code>striptags</code>, <code>slice</code> and <code>raw</code> for the post preview to display a little excerpt from the post content. With that, the basic site was up and running.</p>
<h3 id="laravel-mix">Laravel Mix <a class="anchor" href="#laravel-mix" title="Laravel Mix">#</a></h3>
<p>Alright, the data is flowing through the templates like the life-blood that it is. Next I needed to inject some styling into the site, peppered with some JavaScript for a few cool interactive features.</p>
<p>You could argue that for something simple, webpack just isn&#8217;t needed, and you&#8217;d be absolutely right. There&#8217;s nothing wrong with a single CSS file and a few script tags since that&#8217;s what it all boils down to anyway. I wanted to use some features of JavaScript that needed something extra for them to work across multiple browsers. I felt it would be conducive to a more scalable codebase when things get tacked-on down the line. I could be wrong, but I&#8217;m willing to give it a go.</p>
<p>Laravel Mix makes it easy to get started in any web project, as seen in the <a href="https://github.com/JeffreyWay/laravel-mix/blob/master/docs/installation.md" rel="noopener" target="_blank">installation docs</a> it&#8217;s not just for Laravel.</p>
<p>For example, if I want to have my JavaScript &amp; Less transpiled I can do the following in my <code>webpack.mix.js</code> file:</p>

{{< highlight javascript >}}
const mix = require('laravel-mix')

mix
  .setPublicPath('web/')
    .js('web/src/js/main.js', 'assets/js')
    .less('web/src/less/app.less', 'assets/css')
{{< / highlight >}}

<p>It kinda reminds me of Gulp a little bit, and you can always extend it further with plugins or other configuration options.</p>
<p>With that, I can run <code>npm run watch</code> to watch my files for changes. In my deployment script I have <code>npm run production</code> for an optimised build.</p>
<h2 id="just-keep-swimming">Just Keep Swimming <a class="anchor" href="#just-keep-swimming" title="Just Keep Swimming">#</a></h2>
<p>So with that, I had a Craft installation set up with my posts, templates were set up to display them, and I had a build process for my assets.</p>
<p>There&#8217;s still more to do, such as fine-tuning for performance, which I&#8217;ll cover in a later article. For now though, we have a pretty good start!</p>
<p><a href="/building-my-site-part-iii-fine-tuning">Read Part III: Fine Tuning</a></p>