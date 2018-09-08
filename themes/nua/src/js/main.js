import { ready, env } from './utils'
import { TableOfContents } from './toc'

ready(async () => {
  TableOfContents.init()
})

if (env() === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}
