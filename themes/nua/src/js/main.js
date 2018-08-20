import { ready, env } from './utils'
import { PageVisibility } from './page-visibility'

ready(async () => {
  PageVisibility.init()
})

if (true || (env() === 'production' && 'serviceWorker' in navigator)) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
