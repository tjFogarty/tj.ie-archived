---
title: "Client-Side Search with Algolia"
description: "Adding client-side search with Algolia."
date: 2018-01-09T21:54:00+00:00
draft: false
categories: 
- JavaScript
---
<p>I&#8217;m going to walk through creating a search feature using <a href="https://www.algolia.com/" rel="noopener" target="_blank">Algolia</a>. I&#8217;ll be using some new features of JavaScript as well, such as async/await, but it can be accomplished just as well without it, and I&#8217;ll offer up alternatives where it applies.</p>
<p>It&#8217;s not going to be a magic bullet for everyone, but it&#8217;s interesting to see how it works, and it can be a solution to add to your toolkit.</p>
<h2 id="what-do-i-need">What Do I Need? <a class="anchor" href="#what-do-i-need" title="What Do I Need?">#</a></h2>
<ul>
<li>An Algolia account (there&#8217;s a free tier, as long as you add their logo to your search area)</li>
<li>Some content you want to be searchable</li>
<li>A way add your records to an index (you can do this manually, use the API, or if you&#8217;re using a CMS or a framework there are <a href="https://www.algolia.com/integrations" rel="noopener" target="_blank">plenty of solutions</a> readily available)</li>
</ul>
<p>&quot;Record? Index? <em>What are you on about?</em>&quot; An index is something that holds the data you want to be searchable, and a record is a piece of that data. For example, you could have an index called &quot;posts&quot; that&#8217;s made up of records of which each represents a  single post. Kinda like:</p>

{{< highlight html >}}
<ul data-index="posts"></ul>
    <li data-record="post">
        <h2>My Post Title</h2>
        <p>Oh hey lorem ipsum, dolor sit amet consectetur? Haha, good one adipisicing elit...</p>
    </li>
    <li data-record="post">
        ...
    </li>
    ...
</ul>
{{< / highlight >}}

<p>Or maybe I ruined it. Nam facilis doloribus? Essentially you can then tell Algolia which parts of your posts it can search on. This can be the title, some content, tags, categories etc&#8230; and you can weight them by importance. So a query matching one of your post titles would bump that result to the top over a match in the content of another post.</p>
<p>In the API section of the Algolia dashboard you&#8217;ll find your Application ID, your Search-Only API Key, and your Admin API Key. If you&#8217;re using a CMS or framework with an Algolia integration available, there will be spaces for you to enter these. You can also restrict HTTP referers to ensure search will only work on the domains of your choice.</p>
<h2 id="the-code">The Code <a class="anchor" href="#the-code" title="The Code">#</a></h2>
<p>I&#8217;ll be using the <a href="https://github.com/algolia/algoliasearch-client-javascript" rel="noopener" target="_blank">JavaScript search client</a>, and more specifically the lite client which limits the usage to search only, which will do the job. It&#8217;ll also save on file size.</p>
<p>Let&#8217;s install it:</p>
<pre><code class="language-bash">npm install algoliasearch --save</code></pre>
<p>Next up we&#8217;ll set up our search input:</p>

{{< highlight html >}}
<div class="c-search js-search-container"></div>
  <div class="c-search__inner">
    <label class="c-search__label" for="s">Search:</label>
    <input type="search" class="c-search__input js-search-input" id="s">
    <img src="/images/algolia.svg" class="c-search__credit">
    <div class="js-search-results c-search__results"></div>
  </div>
</div>
{{< / highlight >}}

<p>Those <code>.js-</code> prefixed classes will be our hooks. They&#8217;re not for styling, so it makes the intentions clear when you&#8217;re looking at the code that some JavaScript is at play here.</p>
<p>For the JavaScript, we&#8217;ll grab the lite client, and scaffold out some code:</p>

{{< highlight javascript >}}
import algoliasearch from 'algoliasearch/lite'

export const Search = {
  trigger: document.querySelectorAll('.js-search'),
  input: document.querySelector('.js-search-input'),
  resultsContainer: document.querySelector('.js-search-results'),
  index: null,

  init() {
      // bind to `this` so we reference this object rather than the input when it's called
    this.performSearch = this.performSearch.bind(this)

        // supply our application id and search-only api key
    let client = algoliasearch('APPLICATION_ID', 'SEARCH_ONLY_API_KEY')

        // connect to our index
    this.index = client.initIndex('INDEX_NAME')

        // perform a live search as the user types into the input field
    this.input.addEventListener('keyup', this.performSearch)
  },

  async performSearch(event) {},

  displayResults(results) {},

  emptyResultContainer() {},

    // we'll build up the HTML to inject into the container here
  getResultLink(result) {},

  displayNoResults() {}
}
{{< / highlight >}}

<p>So we&#8217;re grabbing our <code>.js-</code> prefixed elements here, and setting up the Algolia client with our credentials to prepare it for the search.</p>
<p>When they <code>keyup</code> event is triggered, it&#8217;ll call the <code>performSearch</code> method. It&#8217;s in here that the query to Algolia is made:</p>
{{< highlight javascript >}}
async performSearch(event) {
    let query = event.target.value

    try {
      let content = await this.index.search({ query })

      if (content.hits && content.hits.length) {
        this.displayResults(content.hits)
      } else {
        this.displayNoResults()
      }
    } catch (e) {
      console.log('Error performing search: ', e)
    }
}
{{< / highlight >}}

<p>I&#8217;m using async/await here, but you can use promises as well:</p>

{{< highlight javascript >}}
performSearch(event) {
    let query = event.target.value

    this.emptyResultContainer()

    this.index
      .search({ query })
      .then(content => {
        if (content.hits && content.hits.length) {
          this.displayResults(content.hits)
        } else {
          this.displayNoResults()
        }
      })
      .catch(e => {
        console.log('Error performing search: ', e)
      })
}
{{< / highlight >}}

<p>We&#8217;re getting closer to displaying the results. To start with we&#8217;ll outline how the flow works. If we have results, display them, otherwise we&#8217;ll let the user know nothing was found. After this we&#8217;ll see about constructing the search hits to inject into the results container:</p>

{{< highlight javascript >}}
displayResults(results) {
    results.forEach(result => {
      let resultLink = this.getResultLink(result)
      this.resultsContainer.appendChild(resultLink)
    })
},

emptyResultContainer() {
    while (this.resultsContainer.firstChild) {
     this.resultsContainer.removeChild(this.resultsContainer.firstChild)
    }
},

displayNoResults() {
    let title = document.createElement('h4')
    title.innerText = 'No results found'
    this.resultsContainer.appendChild(title)
}
{{< / highlight >}}

<p>In <code>displayResults</code> we&#8217;re calling <code>getResultLink</code> which we&#8217;ll use to append the the results container:</p>

{{< highlight javascript >}}
getResultLink(result) {
    let link = document.createElement('a')
    let title = document.createElement('h4')

    link.setAttribute('href', result.url)
    title.innerText = result.title

    link.appendChild(title)

    return link
}
{{< / highlight >}}

<p>And finally here&#8217;s the snippet in it&#8217;s entirety:</p>

{{< highlight javascript >}}
import algoliasearch from 'algoliasearch/lite'

export const Search = {
  trigger: document.querySelectorAll('.js-search'),
  input: document.querySelector('.js-search-input'),
  resultsContainer: document.querySelector('.js-search-results'),
  index: null,

  init() {
    this.performSearch = this.performSearch.bind(this)

    let client = algoliasearch('APPLICATION_ID', 'SEARCH_ONLY_API_KEY')

    this.index = client.initIndex('posts')

    this.input.addEventListener('keyup', this.performSearch)
  },

  performSearch(event) {
    let query = event.target.value
    this.emptyResultContainer()

    this.index
      .search({ query })
      .then(content => {
        if (content.hits && content.hits.length) {
          this.displayResults(content.hits)
        } else {
          this.displayNoResults()
        }
      })
      .catch(e => {
        console.log('Error performing search: ', e)
      })
  },

  displayResults(results) {
    results.forEach(result => {
      let resultLink = this.getResultLink(result)
      this.resultsContainer.appendChild(resultLink)
    })
  },

  emptyResultContainer() {
    while (this.resultsContainer.firstChild) {
      this.resultsContainer.removeChild(this.resultsContainer.firstChild)
    }
  },

  getResultLink(result) {
    let link = document.createElement('a')
    let title = document.createElement('h4')

    link.setAttribute('href', result.url)
    title.innerText = result.title

    link.appendChild(title)

    return link
  },

  displayNoResults() {
    let title = document.createElement('h4')
    title.innerText = 'No results found'
    this.resultsContainer.appendChild(title)
  }
}
{{< / highlight >}}

<p>With that, you can call <code>Search.init()</code> to kick it all off.</p>

<h2 id="lost-and-found">Lost and Found <a class="anchor" href="#lost-and-found" title="Lost and Found">#</a></h2>
<p>No longer do your quality posts need to be buried pages deep, never to be seen again. We&#8217;ve gone through using the lite client to save on file size, but you can use other full-fledged solutions for the framework of your choice for a more out-of-the-box experience.</p>