import { motionQuery } from './utils'

export const TableOfContents = {
  container: document.querySelector('.js-toc'),
  listContainer: document.querySelector('.js-toc-list'),
  links: null,
  headings: null,
  intersectionOptions: {
    rootMargin: '0px',
    threshold: 1
  },
  previousSection: null,
  observer: null,

  init() {
    if (!this.container || !('IntersectionObserver' in window)) return

    this.handleObserver = this.handleObserver.bind(this)

    this.setUpObserver()
    this.findLinksAndHeadings()
    this.observeSections()

    this.links.forEach(link => {
      link.addEventListener('click', this.handleLinkClick.bind(this))
    })
  },

  handleToggleClick() {
    this.container.classList.toggle('is-active')

    this.listContainer.addEventListener(
      'transitionend',
      () => {
        if (this.container.classList.contains('is-active')) {
          this.links[0].focus()
        }
      },
      { once: true }
    )
  },

  handleLinkClick(evt) {
    evt.preventDefault()
    let id = evt.target.getAttribute('href').replace('#', '')

    let section = this.headings.find(heading => {
      return heading.getAttribute('id') === id
    })

    section.setAttribute('tabindex', -1)
    section.focus()

    window.scroll({
      behavior: motionQuery.matches ? 'instant' : 'smooth',
      top: section.offsetTop - 15,
      block: 'start'
    })

    if (this.container.classList.contains('is-active')) {
      this.container.classList.remove('is-active')
    }
  },

  handleObserver(entries, observer) {
    entries.forEach(entry => {
      let href = `#${entry.target.getAttribute('id')}`,
        link = this.links.find(l => l.getAttribute('href') === href)

      if (entry.isIntersecting && entry.intersectionRatio === 1) {
        link.classList.add('is-visible')
        this.previousSection = entry.target.getAttribute('id')
      } else {
        link.classList.remove('is-visible')
      }

      this.highlightFirstActive()
    })
  },

  highlightFirstActive() {
    let firstVisibleLink = this.container.querySelector('.is-visible')

    this.links.forEach(link => {
      link.classList.remove('is-active')
    })

    if (firstVisibleLink) {
      firstVisibleLink.classList.add('is-active')
    }

    if (!firstVisibleLink && this.previousSection) {
      this.container.querySelector(
        `a[href="#${this.previousSection}"]`
      ).classList.add('is-active')
    }
  },

  observeSections() {
    this.headings.forEach(heading => {
      this.observer.observe(heading)
    })
  },

  setUpObserver() {
    this.observer = new IntersectionObserver(
      this.handleObserver,
      this.intersectionOptions
    )
  },

  findLinksAndHeadings() {
    this.links = [...this.container.querySelectorAll('a')]
    this.headings = this.links.map(link => {
      let id = link.getAttribute('href')
      return document.querySelector(id)
    })
  }
}
