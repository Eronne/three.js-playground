export default {
  mounted () {
    this.addListeners()
  },
  methods: {
    addListeners () {
      window.addEventListener('resize', this.setRendererSize)
      window.addEventListener('mousemove', this.getMousePosition)
      window.addEventListener('click', this.scalePlaneWhenIntersect)
    },
    removeListeners () {
      window.removeEventListener('resize', this.setRendererSize)
      window.removeEventListener('mousemove', this.getMousePosition)
      window.removeEventListener('click', this.scalePlaneWhenIntersect)
    }
  },
  beforeDestroy () {
    this.removeListeners()
  }
}
