import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/pages/HomePage/HomePage'
import PlanesFullScreen from '@/components/pages/PlanesFullScreen/PlanesFullScreen'
import LoadObject from '@/components/pages/LoadObject/LoadObject'
import MorphTargetAnimation from '@/components/pages/MorphTargetAnimation/MorphTargetAnimation'
import MorphShader from '@/components/pages/MorphShader/MorphShader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/planes-full-screen',
      name: 'PlanesFullScreen',
      component: PlanesFullScreen
    },
    {
      path: '/load-object',
      name: 'LoadObject',
      component: LoadObject
    },
    {
      path: '/morph-target-animation',
      name: 'MorphTargetAnimation',
      component: MorphTargetAnimation
    },
    {
      path: '/morph-shader',
      name: 'MorphShader',
      component: MorphShader
    }
  ]
})
