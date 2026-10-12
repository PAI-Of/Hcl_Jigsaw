import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import DetectorPage from '../pages/DetectorPage.vue';
import AcademyPage from '../pages/AcademyPage.vue';
import CoursePage from '../pages/CoursePage.vue';
import ReportGuidePage from '../pages/ReportGuidePage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/chat',
    name: 'detector',
    component: DetectorPage
  },
  {
    path: '/learn',
    name: 'academy',
    component: AcademyPage
  },
  {
    path: '/learn/report-cybercrime',
    name: 'report-cybercrime',
    component: ReportGuidePage
  },
  {
    path: '/learn/:slug',
    name: 'course-detail',
    component: CoursePage
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

export default router;
