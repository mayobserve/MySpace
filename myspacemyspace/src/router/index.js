import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NotFound from '../views/NotFound.vue'
import RegisterView from '../views/RegisterView.vue'
import UserList from '../views/UserList.vue'
import UserProfile from '../views/UserProfile.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home/login/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home/notfound/',
    name: 'notfound',
    component: NotFound
  },
  {
    path: '/home/registerview/',
    name: 'registerview',
    component: RegisterView
  },
  {
    path: '/home/userlist/',
    name: 'userlist',
    component: UserList
  },
  {//冒号表示有参数
    path: '/home/userprofile/:userId/',
    name: 'userprofile',
    component: UserProfile
  },
  {
    path: '/:catchAll(.*)',
    redirect:'/home/notfound/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
