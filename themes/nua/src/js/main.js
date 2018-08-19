import { ready, env } from './utils'
import { PageVisibility } from './page-visibility'

ready(async () => {
  PageVisibility.init()

  if (document.querySelector('pre')) {
    let codeBlocks = document.querySelectorAll('pre')
    // @ts-ignore
    let microlight = await import(/* webpackChunkName: "microlight" */ 'microlight')

    codeBlocks.forEach(block => block.classList.add('microlight'))

    microlight.reset()
  }
})

// if ('serviceWorker' in navigator && env() === 'production') {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js').catch(registrationError => {
//       console.log('SW registration failed: ', registrationError)
//     })
//   })
// }
