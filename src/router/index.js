import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'StudentForm',
    component: () => import('@/components/StudentForm.vue'),
  },
  {
    path: '/assign-marks',
    name: 'AssignMarks',
    component: () => import('@/components/AssignMarks.vue'),
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
