<template>
  <section class="page page__morph-shader"></section>
</template>

<script>
import * as THREE from 'three'
import InitMixin from '@/mixins/InitMixin'

import vertexShader from './shaders/vert.vs'
import fragmentShader from './shaders/frag.fs'

export default {
  name: 'morph-shader',
  mixins: [InitMixin],
  data () {
    return {
      enableControls: false
    }
  },
  mounted () {
    this.initGeometry()
  },
  methods: {
    initGeometry () {
      const geometry = new THREE.BufferGeometry()

      const positions = new Float32Array([
        -1, 1, 0,
        1, 1, 0,
        1, -1, 0
      ])
      const morphPositions = new Float32Array([
        -2, 2, 0,
        0, 0, 0,
        2, -2, 0
      ])

      geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.addAttribute('morphPositions', new THREE.BufferAttribute(morphPositions, 3))

      const material = new THREE.ShaderMaterial({
        uniforms: {
          progress: 0.4
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.DoubleSide
      })

      this.mesh = new THREE.Mesh(geometry, material)
      this.scene.add(this.mesh)
    },
    render () {
      this.raf = requestAnimationFrame(this.render)

      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style scoped>
</style>
