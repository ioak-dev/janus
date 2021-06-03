import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../components/Auth/Login.vue';
import ListSchemaView from '../views/ListSchemaView.vue';
import ListTableView from '../views/ListTableView.vue';
import ListRecordView from '../views/ListRecordView.vue';
import ViewRecordView from '../views/ViewRecordView.vue';
import SpaceHomeView from '../views/SpaceHomeView.vue';
import SwatchGenerator from '../components/ColorSwatch/SwatchGenerator.vue';

import {
  middlewarePipeline,
  authenticate,
  readSpace,
  readTable,
  readTeam,
  readTask,
  projectAdministrator,
  teamAdministrator,
  readSchema
} from './middleware';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:space/swatch',
    name: 'SwatchGenerator',
    component: SwatchGenerator,
    meta: {
      context: 'schema',
      middleware: [readSpace, authenticate]
    }
  },
  {
    path: '/:space',
    name: 'SpaceHomeView',
    component: SpaceHomeView,
    meta: {
      context: 'space',
      middleware: [readSpace, authenticate]
    }
  },
  {
    path: '/:space/schema',
    name: 'ListSchemaView',
    component: ListSchemaView,
    meta: {
      context: 'space',
      middleware: [readSpace, authenticate]
    }
  },
  {
    path: '/:space/schema/:schemaRef',
    name: 'ListTableView',
    component: ListTableView,
    meta: {
      context: 'schema',
      middleware: [readSpace, readSchema, authenticate]
    }
  },
  {
    path: '/:space/schema/:schemaRef/table/:tableRef',
    name: 'ListRecordView',
    component: ListRecordView,
    meta: {
      context: 'table',
      middleware: [readSpace, readSchema, readTable, authenticate]
    }
  },
  {
    path: '/:space/schema/:schemaRef/table/:tableRef/record/:recordRef',
    name: 'ViewRecordView',
    component: ViewRecordView,
    meta: {
      context: 'table',
      middleware: [readSpace, readSchema, readTable, authenticate]
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
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
