import { ready } from './utils'
import { PageVisibility } from './page-visibility'
import { CodeHighlight } from './code-highlight'

ready(async () => {
  CodeHighlight.init()
  PageVisibility.init()
})
