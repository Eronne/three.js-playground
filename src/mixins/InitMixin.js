import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'
import ListenersMixin from './ListenersMixin'

export default {
  mixins: [ListenersMixin],
  mounted () {
    this.createScene()
  },
  methods: {
    createScene () {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.position.z = 10

      this.initRenderer()
      this.initControls()
      this.initLights()

      this.render()
    },
    initRenderer () {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false
      })
      this.renderer.gammaOutput = true
      this.setRendererSize()
      this.$el.appendChild(this.renderer.domElement)
    },
    initControls () {
      this.controls = new OrbitControls(this.camera)
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.3
      this.controls.minDistance = 70
      this.controls.maxDistance = 300
    },
    initLights () {
      this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3)
      this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      this.scene.add(this.ambientLight, this.directionalLight)
    },
    render () {
      requestAnimationFrame(this.render)

      this.controls.update()

      this.renderer.render(this.scene, this.camera)
    },
    setRendererSize () {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.renderer.setSize(this.width, this.height)
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
    }
  }
}
