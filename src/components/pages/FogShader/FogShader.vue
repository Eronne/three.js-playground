<template>
  <section class="page page__morph-shader">
    <canvas ref="canvas"></canvas>
  </section>
</template>

<script>
// Inspired from "yoichi kobayashi - WebGL Fog" from codepen : https://codepen.io/ykob/pen/YewoRz

import * as THREE from 'three'

import Fog from './Fog'
import Utils from '@/helpers/Utils.js'

export default {
  name: 'fog-shader',
  mounted () {
    this.initScene()
  },
  methods: {
    initScene () {
      const canvas = this.$refs.canvas

      this.scene = new THREE.Scene()

      this.camera = new THREE.PerspectiveCamera()
      this.camera.far = 50000;
      this.camera.setFocalLength(24)

      this.resolution = new THREE.Vector2()
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: canvas,
      })

      this.clock = new THREE.Clock()

      this.texsSrc = {
        fog: 'https://ykob.github.io/sketch-threejs/img/sketch/fog/fog.png'
      };

      this.initFog()
    },
    initFog () {
      this.fog = new Fog()

      this.loadTexs(this.texsSrc, (loadedTexs) => {
        this.fog.createObj(this.loadedTexs.fog)

        this.scene.add(this.fog.obj)

        this.renderer.setClearColor(0x111111, 1.0)
        this.camera.position.set(0, 0, 1000)
        this.camera.lookAt(new THREE.Vector3())
        this.clock.start()

        this.on()
        this.resizeWindow()
        this.renderLoop()
      })
    },
    loadTexs (imgs, callback) {
      const texLoader = new THREE.TextureLoader()
      const length = Object.keys(imgs).length;
      this.loadedTexs = {};
      let count = 0;

      texLoader.crossOrigin = 'anonymous';

      for (var key in imgs) {
        const k = key;
        if (imgs.hasOwnProperty(k)) {
          texLoader.load(imgs[k], (tex) => {
            tex.repeat = THREE.RepeatWrapping;
            this.loadedTexs[k] = tex;
            count++;
            if (count >= length) callback(this.loadedTexs)
          })
        }
      }
    },
    render () {
      const time = this.clock.getDelta()
      this.fog.render(time)
      this.renderer.render(this.scene, this.camera)
    },
    renderLoop () {
      this.render()
      this.raf = requestAnimationFrame(this.renderLoop)
    },
    resizeWindow () {
      this.resolution.set(window.innerWidth, window.innerHeight)
      this.$refs.canvas.width = this.resolution.x;
      this.$refs.canvas.height = this.resolution.y;
      this.resizeCamera()
      this.renderer.setSize(this.resolution.x, this.resolution.y)
    },
    resizeCamera () {
      this.camera.aspect = this.resolution.x / this.resolution.y;
      this.camera.updateProjectionMatrix()
    },
    on () {
      window.addEventListener('resize', Utils.debounce(this.resizeWindow()), 1000)
    }
  }
}
</script>

<style scoped>
  canvas {
    width: 100vw;
    height: 100vh;
  }
</style>
