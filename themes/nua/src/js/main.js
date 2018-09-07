import { ready, env } from './utils'
import { Hero } from './hero'
import { TableOfContents } from './toc'

ready(async () => {
  new Hero()
  TableOfContents.init()
})

if (env() === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}
