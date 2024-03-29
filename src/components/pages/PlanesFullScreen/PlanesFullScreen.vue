<template>
  <section class="page page--planes">
  </section>
</template>

<script>
import * as THREE from 'three'
import { TweenMax } from 'gsap'
import ListenersMixin from '@/mixins/ListenersMixin'

import vertexSource from './shaders/vert.vs'
import fragmentSource from './shaders/frag.fs'
import texturePath from './assets/planes-bg.jpg'

export default {
  name: 'planes-full-screen',
  mixins: [ListenersMixin],
  mounted () {
    this.createScene()
  },
  methods: {
    createScene () {
      this.scene = new THREE.Scene()

      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.position.z = 5

      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      })
      this.setRendererSize()
      this.$el.appendChild(this.renderer.domElement)

      this.createPlanes(6, 7.5, 3)

      this.raycaster = new THREE.Raycaster()
      this.center = new THREE.Vector2()
      this.mousePositions = {x: 0, y: 0}

      this.render()
    },
    createPlanes (iterations, width, height) {
      this.group = new THREE.Group()
      this.textureLoader = new THREE.TextureLoader()

      for (let i = 0; i < iterations; i++) {
        this.offset = -i * (height + 1)

        this.geometry = new THREE.PlaneBufferGeometry(width, height, 1, 1)
        this.bindImageToPlane(this.plane)

        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.plane.name = `plane${i}`
        this.plane.position.y = this.offset

        this.group.add(this.plane)
      }

      this.groupHeight = (height + 1) * iterations

      this.scene.add(this.group)
    },
    bindImageToPlane (plane) {
      this.texture = this.textureLoader.load(texturePath)

      let uniforms = {
        texture: {type: 't', value: this.texture}
      }

      this.material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexSource,
        fragmentShader: fragmentSource
      })
    },
    render () {
      this.raf = requestAnimationFrame(this.render)
      this.raycaster.setFromCamera(this.center, this.camera)

      this.mousePositionRatio = this.mousePositions.y / window.innerHeight
      TweenMax.to(this.group.position, 1, { y: this.mousePositionRatio * this.groupHeight })

      this.renderer.render(this.scene, this.camera)
    },
    setRendererSize () {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.renderer.setSize(this.width, this.height)
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
    },
    getMousePosition (e) {
      this.mousePositions.x = e.clientX
      this.mousePositions.y = e.clientY
    },
    scalePlaneWhenIntersect (e) {
      let intersects = this.raycaster.intersectObjects(this.group.children)

      if (this.currentPlane) this.currentPlane.material.color.set(0x1A1A1A)

      intersects.forEach(intersect => {
        if (intersect.object.name.match(/plane.+?/)) {
          console.log(intersect.object.name)
          // intersect.object.material.color.set(0x7c7c7c)
          // this.currentPlane = intersect.object
        }
      })
    }
  },
  beforeDestroy () {
    cancelAnimationFrame(this.raf)
  }
}
</script>

<style scoped>
.page--planes {
  position: relative;
}
</style>
