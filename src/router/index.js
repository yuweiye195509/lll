/* eslint-disable standard/object-curly-even-spacing */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: 'Login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/home', component: Home, name: 'home' }

  ]
})

export default router
