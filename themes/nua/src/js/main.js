import { ready, env } from './utils'
import { Hero } from './hero'
import { TableOfContents } from './toc'

ready(async () => {
  new Hero()
  TableOfContents.init()
})

if (true || (env() === 'production' && 'serviceWorker' in navigator)) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
