const PointColours = ['#d42897', '#EF3E4A', '#D5E9E2']

export class Hero {
  constructor() {
    this.container = document.querySelector('.js-hero')
    if (!this.container) return

    this.buildWorld = this.buildWorld.bind(this)

    try {
      import(/* webpackChunkName: "pts" */ 'pts').then(this.buildWorld)
    } catch (e) {
      console.error('Error loading pts', e)
    }
  }

  buildWorld({ CanvasSpace, Create, Group, Line }) {
    let space = new CanvasSpace(this.container),
      form = space.getForm(),
      pts = new Group()

    // space.background = '#142232'
    space.background = '#fff'

    space.add({
      start: () => {
        let pointCount = 200
        
        if (window.innerWidth < 500) {
          pointCount = 30
        }
        
        pts = Create.distributeRandom(space.innerBound, pointCount)

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

          form.stroke(`rgba(240,240,240,${ratio}`, ratio * 2).line([p, lp])
          form.fillOnly(PointColours[i % 3]).point(p, 2)
        })
      }
    })

    space.play()
  }
}
