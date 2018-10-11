<template>
  <section class="page page--planes">
  </section>
</template>

<script>
import * as THREE from 'three'
import GLTFLoader from './assets/js/gltfloader'
import OrbitControls from 'orbit-controls-es6';

export default {
  name: 'load-object',
  mounted () {
    this.createScene()
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
    },
    createScene () {
      this.clock = new THREE.Clock();
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.position.z = 300

      this.initRenderer()
      this.initControls()
      this.initLights()
      this.loadObject()

      this.render()
    },
    initRenderer () {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
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
      this.ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.3)
      this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      this.scene.add(this.ambientLight, this.directionalLight)
    },
    loadObject () {
      this.loader = new THREE.GLTFLoader()

      this.loader.load(
        '/static/gltf/scene.gltf',
        (gltf) => {
          let model = gltf.scene
          console.log(model);
          this.scene.add(model)

          this.mixer = new THREE.AnimationMixer(model)
          this.mixer.clipAction(gltf.animations[0]).play()
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        },
        // called when loading has errors
        function (error) {
          console.log(error)
        }
      )
    },
    render () {
      requestAnimationFrame(this.render)

      let delta = this.clock.getDelta()
      if (this.mixer != null) {
          this.mixer.update(delta);
      };

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
    this.removeListeners()
  }
}
</script>

<style scoped>
.page {
  background-image: url("/static/bg.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.page--planes {
  position: relative;
}
</style>
