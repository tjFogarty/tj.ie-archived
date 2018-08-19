import microlight from 'microlight'

export const CodeHighlight = {
  init() {
    let codeBlocks = document.querySelectorAll('pre')

    if (codeBlocks.length) {
      codeBlocks.forEach(block => block.classList.add('microlight'))
      microlight.reset()
    }
  }
}
