import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'
import ListenersMixin from './ListenersMixin'

export default {
  mixins: [ListenersMixin],
  data () {
    return {
      cameraOptions: {
        fov: 75,
        near: 0.1,
        far: 1000,
        x: 0,
        y: 0,
        z: 5
      },
      rendererOptions: {
        alpha: true
      }
    }
  },
  mounted () {
    this.createScene()
  },
  methods: {
    createScene () {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(this.cameraOptions.fov, window.innerWidth / window.innerHeight, this.cameraOptions.near, this.cameraOptions.far)
      this.camera.position.set(this.cameraOptions.x, this.cameraOptions.y, this.cameraOptions.z)

      this.initRenderer()
      this.initControls()
      this.initLights()

      this.render()
    },
    initRenderer () {
      this.renderer = new THREE.WebGLRenderer(this.rendererOptions)
      this.setRendererSize()
      this.$el.appendChild(this.renderer.domElement)
    },
    initControls () {
      this.controls = new OrbitControls(this.camera)
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.3
      this.controls.minDistance = this.cameraOptions.z / 2
      this.controls.maxDistance = this.cameraOptions.z * 2
    },
    initLights () {
      this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3)
      this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      this.scene.add(this.ambientLight, this.directionalLight)
    },
    render () {
      this.raf = requestAnimationFrame(this.render)

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
  },
  beforeDestroy () {
    cancelAnimationFrame(this.raf)
  }
}
