import { ready, env } from './utils'
import { Hero } from './hero'

ready(async () => {
  new Hero()
})

if (true || (env() === 'production' && 'serviceWorker' in navigator)) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
