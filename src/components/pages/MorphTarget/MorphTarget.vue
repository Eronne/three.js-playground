<template>
  <section class="page page__morph-target"></section>
</template>

<script>
import * as THREE from 'three'
import InitMixin from '@/mixins/InitMixin'

export default {
  name: 'morph-target',
  mixins: [InitMixin],
  data () {
    return {
      enableControls: false
    }
  },
  mounted () {
    this.initGeometry()
    this.initAnimation()
  },
  methods: {
    initGeometry () {
      const geometry = new THREE.BufferGeometry()

      const positions = new Float32Array([
        -1, 1, 0,
        1, 1, 0,
        1, -1, 0,
        -1, -1, 0
      ])
      const morphPositions = new Float32Array([
        -1, 3, 0,
        .5, .5, 0,
        3, -1, 0,
        -1, -1, 0
      ])
      const indices = new Uint16Array([
        0, 3, 1,
        1, 3, 2
      ])

      geometry.setIndex(new THREE.BufferAttribute(indices, 1))
      geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))

      geometry.morphAttributes.position = []
      geometry.morphAttributes.position[0] = new THREE.BufferAttribute(morphPositions, 3)

      // Hack required to get Mesh to have morphTargetInfluences attribute
      geometry.morphTargets = []
      geometry.morphTargets.push(0)

      const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        morphTargets: true
      })

      this.mesh = new THREE.Mesh(geometry, material)
      this.scene.add(this.mesh)
    },
    initAnimation () {
      const keyFrame = new THREE.NumberKeyframeTrack('geometry.morphTargetInfluences', [0, 1], [0, 1], THREE.InterpolateSmooth)
      const clip = new THREE.AnimationClip('wavelineMorphTargetsClip', 1, [keyFrame])

      this.mixer = new THREE.AnimationMixer(this.mesh)

      const animationAction = this.mixer.clipAction(clip)
      animationAction.loop = THREE.LoopPingPong
      animationAction.play()
    },
    render () {
      this.raf = requestAnimationFrame(this.render)

      this.mixer.update(0.01)

      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style scoped>
</style>
