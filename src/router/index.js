import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/pages/HomePage/HomePage'
import PlanesFullScreen from '@/components/pages/PlanesFullScreen/PlanesFullScreen'
import LoadObject from '@/components/pages/LoadObject/LoadObject'

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
    }
  ]
})
