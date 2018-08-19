import microlight from 'microlight'

export const CodeHighlight = {
  init() {
    if (document.querySelector('pre')) {
      let codeBlocks = document.querySelectorAll('pre')

      codeBlocks.forEach(block => block.classList.add('microlight'))

      microlight.reset()
    }
  }
}