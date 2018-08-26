import { ready, env } from './utils'
import { Hero } from './hero'

ready(async () => {
  Hero.init()
})

if (true || (env() === 'production' && 'serviceWorker' in navigator)) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
