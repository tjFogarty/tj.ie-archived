import { ready } from './utils'
import { TableOfContents } from './toc'
import Splitting from 'splitting'

ready(async () => {
  let selectNav = document.querySelector('.js-select-nav')

  if (selectNav) {
    selectNav.addEventListener('change', event => {
      window.location = event.target.value
    })
  }

  Splitting()

  TableOfContents.init()
})
