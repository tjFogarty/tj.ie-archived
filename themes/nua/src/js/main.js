import LazyLoad from "vanilla-lazyload";
import { ready, env } from './utils'
import { TableOfContents } from './toc'

ready(async () => {
  TableOfContents.init()

  new LazyLoad({
    elements_selector: '.lazy'
  });
})
