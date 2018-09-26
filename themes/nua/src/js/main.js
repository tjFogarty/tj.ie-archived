import { ready } from './utils'
import { TableOfContents } from './toc'

ready(async () => {
  let selectNav = document.querySelector('.js-select-nav')

  if (selectNav) {
    selectNav.addEventListener('change', event => {
      window.location = event.target.value
    })
  }

  TableOfContents.init()
})
