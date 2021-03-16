import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../components/Auth/Login.vue';
import AppView from '../views/AppView.vue';
import CreateAppView from '../views/CreateAppView.vue';

import {
  middlewarePipeline,
  authenticate,
  readSpace,
  readProject,
  readTeam,
  readTask,
  projectAdministrator,
  teamAdministrator
} from './middleware';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:space/app',
    name: 'AppView',
    component: AppView,
    meta: {
      context: 'app',
      middleware: [readSpace, authenticate]
    }
  },
  {
    path: '/:space/app/create',
    name: 'CreateAppView',
    component: CreateAppView,
    meta: {
      context: 'app',
      middleware: [readSpace, authenticate]
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to: any, from: any, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware: any[] = [...to.meta.middleware];
  const context = {
    to,
    from,
    next
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
    nextVue: context.next
  });
});

export default router;
