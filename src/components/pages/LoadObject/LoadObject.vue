<template>
  <section class="page page--planes">
      <input type="range" min="0" max="0.2" value="0" step="0.001" class="slider" id="animationRange">
  </section>
</template>

<script>
import * as THREE from 'three'
import GLTFLoader from './assets/js/gltfloader'
import InitMixin from '@/mixins/InitMixin'

export default {
  name: 'load-object',
  mixins: [InitMixin],
  data () {
    return {
      cameraOptions: {
        z: 220
      }
    }
  },
  mounted () {
    this.clock = new THREE.Clock()
    this.renderer.gammaOutput = true
    this.loadObject()
  },
  methods: {
    loadObject () {
      this.loader = new GLTFLoader()

      this.loader.load(
        '/static/gltf/scene.gltf',
        (gltf) => {
          this.model = gltf.scene
          this.scene.add(this.model)

          this.mixer = new THREE.AnimationMixer(this.model)
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
      this.raf = requestAnimationFrame(this.render)

      if (this.model) this.model.rotation.y += 0.004

      let delta = this.clock.getDelta()
      if (this.mixer != null) {
        this.mixer.update(delta)
      }

      // this.controls.update()

      this.renderer.render(this.scene, this.camera)
    }
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

#animationRange {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
