import { ready } from './utils'
import { TableOfContents } from './toc'
import { CoverImage } from './cover-image'

ready(async () => {
  const selectNav = document.querySelector('.js-select-nav')

  if (selectNav) {
    selectNav.addEventListener('change', event => {
      window.location = event.target.value
    })
  }

  CoverImage.init()
  TableOfContents.init()
})
