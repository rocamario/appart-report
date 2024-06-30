import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
  },
  // Add other routes as needed
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  
  export default router
