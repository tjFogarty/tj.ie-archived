import { watchViewport } from 'tornis'

export const CoverImage = {
  async init() {
    this.coverImage = document.querySelector('.js-cover-image')

    if (!this.coverImage) return

    this.setVariables(0, 0)

    this.updateValues = this.updateValues.bind(this)

    watchViewport(this.updateValues)
  },

  setVariables(blur, ty) {
    document.body.style.setProperty('--coverImageBlur', blur)
    document.body.style.setProperty('--coverImageTranslateY', ty)
  },

  updateValues({ scroll }) {
    if (scroll.changed && scroll.top) {
      let scrollOffset = scroll.top / this.coverImage.clientHeight

      scrollOffset = scrollOffset < 0 ? 0 : scrollOffset
      scrollOffset = scrollOffset > 1 ? 1 : scrollOffset

      const blur = `${(scrollOffset * 8).toFixed(1)}px`
      const ty = `${(scrollOffset * -150).toFixed(1)}px`

      this.setVariables(blur, ty)
    }
  }
}
