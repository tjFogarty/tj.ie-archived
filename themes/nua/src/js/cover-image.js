export const CoverImage = {
  async init() {
    this.coverImage = document.querySelector('.c-post__cover-image')

    if (!this.coverImage) return

    this.updateValues = this.updateValues.bind(this)

    const { watchViewport } = await import(/* webpackChunkName: "tornis" */ 'tornis')
    watchViewport(this.updateValues)
  },

  updateValues({ scroll }) {
    if (scroll.changed && scroll.top) {
      let scrollOffset = scroll.top / this.coverImage.clientHeight

      scrollOffset = scrollOffset < 0 ? 0 : scrollOffset
      scrollOffset = scrollOffset > 1 ? 1 : scrollOffset
      document.body.style.setProperty('--scrollY', scrollOffset)
    }
  }
}
