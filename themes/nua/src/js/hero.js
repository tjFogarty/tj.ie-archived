import { CanvasSpace, Create, Group, Line } from 'pts'

export const Hero = {
  container: document.querySelector('.js-hero'),

  init() {
    if (!this.container) return

    this.buildWorld()
  },

  buildWorld() {
    let space = new CanvasSpace(this.container),
      form = space.getForm(),
      pts = new Group()

    space.background = '#142232'

    space.add({
      start: () => {
        pts = Create.distributeRandom(space.innerBound, 200)

        this.container.classList.add('is-ready')
      },

      animate: () => {
        let perpend = new Group(space.center.$subtract(0.1), space.pointer).op(
          Line.perpendicularFromPt
        )
        
        pts.rotate2D(0.0005, space.center)

        pts.forEach((p, i) => {
          let lp = perpend(p),
            ratio = Math.min(
              1,
              1 - lp.$subtract(p).magnitude() / (space.size.x / 2)
            )

          form.stroke(`rgba(100,100,100,${ratio}`, ratio * 2).line([p, lp])
          form.fillOnly(['#FFBC00', '#EF3E4A', '#D5E9E2'][i % 3]).point(p, 1)
        })
      }
    })

    space.play()
  }
}
