import { createRouter, createWebHistory } from 'vue-router';
import Routes from '@/consts/Routes.js';
import AppTodo from '@/AppTodo.vue';
import AboutView from '@/views/AboutView.vue';
import TodoItemView from '@/views/TodoItemView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: Routes.HOME,
      name: 'todos',
      component: AppTodo,
    },
    {
      path: '/todo/:id',
      name: 'todo-id',
      component: TodoItemView,
    },
    {
      path: Routes.ABOUT,
      name: 'about',
      component: AboutView,
    },
    {
      path: Routes.COUNTER,
      name: 'counter',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../AppCounter.vue'),
    },
  ],
});

export default router;
