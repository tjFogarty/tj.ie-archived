import microlight from 'microlight'

export const CodeHighlight = {
  init() {
    let codeBlocks = document.querySelectorAll('pre')
    console.log(codeBlocks);
    if (codeBlocks.length) {
      codeBlocks.forEach(block => block.classList.add('microlight'))
      microlight.reset()
    }
  }
}
