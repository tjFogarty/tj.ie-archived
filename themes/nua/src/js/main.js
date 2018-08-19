import { ready, env } from './utils'
import { PageVisibility } from './page-visibility'
import { CodeHighlight } from './code-highlight'

ready(async () => {
  CodeHighlight.init()
  PageVisibility.init()
})

if (true || (env() === 'production' && 'serviceWorker' in navigator)) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
