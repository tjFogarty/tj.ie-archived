import { ready } from './utils'
import { TableOfContents } from './toc'
import { CoverImage } from './cover-image'
import Upvotes from './upvotes/Upvotes.svelte'

ready(async () => {
  const selectNav = document.querySelector('.js-select-nav')

  if (selectNav) {
    selectNav.addEventListener('change', event => {
      window.location = event.target.value
    })
  }

  CoverImage.init()
  TableOfContents.init()

  const upvotesContainer = document.querySelector('.js-upvotes')

  if (upvotesContainer) {
    new Upvotes({
      target: upvotesContainer
    })
  }
})
