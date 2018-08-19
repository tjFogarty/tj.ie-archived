import { ready, env } from './utils'
import { PageVisibility } from './page-visibility'
import { CodeHighlight } from './code-highlight'

ready(async () => {
  PageVisibility.init()
  CodeHighlight.init()
})

// if ('serviceWorker' in navigator && env() === 'production') {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js').catch(registrationError => {
//       console.log('SW registration failed: ', registrationError)
//     })
//   })
// }
