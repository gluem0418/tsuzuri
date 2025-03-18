// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import List from '@/views/List.vue';
import Calendar from '@/views/Calendar.vue';
import Detail from '@/views/Detail.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/list', name: 'List', component: List },
  { path: '/calendar', name: 'Calendar', component: Calendar },
  { path: '/detail/:id', name: 'Detail', component: Detail },
  { path: '/create', name: 'Create', component: Detail }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router