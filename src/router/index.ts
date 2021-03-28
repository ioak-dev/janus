import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../components/Auth/Login.vue';
import ListSchemaView from '../views/ListSchemaView.vue';
import ListTableView from '../views/ListTableView.vue';
import CreateTableView from '../views/CreateTableView.vue';
import ListTableDataView from '../views/ListTableDataView.vue';
import CreateTableDataView from '../views/CreateTableDataView.vue';
import ViewTableDataView from '../views/ViewTableDataView.vue';
import ManageTableView from '../views/ManageTableView.vue';

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
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:space/schema',
    name: 'ListSchemaView',
    component: ListSchemaView,
    meta: {
      context: 'schema',
      middleware: [readSpace, authenticate]
    }
  },
  {
    path: '/:space/table-management',
    name: 'ListTableView',
    component: ListTableView,
    meta: {
      context: 'table',
      middleware: [readSpace, authenticate]
    }
  },
  {
    path: '/:space/table-management/create',
    name: 'CreateTableView',
    component: CreateTableView,
    meta: {
      context: 'table',
      middleware: [readSpace, authenticate]
    }
  },
  {
    path: '/:space/schema/:schemaId/table/:tableId',
    name: 'ListTableDataView',
    component: ListTableDataView,
    meta: {
      context: 'table',
      middleware: [readSpace, readSchema, readTable, authenticate]
    }
  },
  {
    path: '/:space/schema/:schemaId/table/:tableId/manage',
    name: 'ManageTableView',
    component: ManageTableView,
    meta: {
      context: 'table',
      middleware: [readSpace, readSchema, readTable, authenticate]
    }
  },
  {
    path: '/:space/schema/:schemaId/table/:tableId/create',
    name: 'CreateTableDataView',
    component: CreateTableDataView,
    meta: {
      context: 'table',
      middleware: [readSpace, readSchema, readTable, authenticate]
    }
  },
  {
    path: '/:space/schema/:schemaId/table/:tableId/record/:recordId',
    name: 'ViewTableDataView',
    component: ViewTableDataView,
    meta: {
      context: 'table',
      middleware: [readSpace, readSchema, readTable, authenticate]
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
