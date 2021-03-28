import axios from 'axios';
import store from '@/store/index';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { getCookie, redirectToLogin } from './library';
import { defaultClient } from '../apollo';
import { sessionQuery } from '../graphql/session.query';

export function middlewarePipeline(context: any, middleware: any, index: any) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);
    nextMiddleware({ ...context, next: nextPipeline, nextVue: context.next });
  };
}

function unauthorizedPage(next: any, params: any) {
  next({ name: 'Unauthorized' });
}

export function authenticate({ to, from, next, nextVue }: any) {
  if (store.getters.getProfile.auth.isAuth) {
    next();
  } else {
    const fromCookies = getCookie(`janus_${to.params.space}`);
    if (fromCookies) {
      defaultClient
        .query({
          query: sessionQuery,
          variables: {
            id: fromCookies,
            space: to.params.space
          }
        })
        .then((sessionResponse) => {
          if (sessionResponse?.data?.session) {
            store.dispatch('addAuth', {
              auth: { ...sessionResponse.data.session, isAuth: true }
            });
            next();
          } else {
            redirectToLogin(to.params.space);
          }
        })
        .catch((error) => {
          redirectToLogin(to.params.space);
        });
    } else {
      redirectToLogin(to.params.space);
    }
  }
}

export function readSpace({ to, from, next, nextVue }: any) {
  store.dispatch('setSpace', to.params.space);
  next();
}

export function readSchema({ to, from, next, nextVue }: any) {
  store.dispatch('setSchema', to.params.schemaId);
  next();
}

export function readTable({ to, from, next, nextVue }: any) {
  store.dispatch('setTable', to.params.tableId);
  next();
}

export function readProject({ to, from, next, nextVue }: any) {
  store.dispatch('chooseProject', to.params.projectId);
  store.dispatch('chooseTeam', null);
  next();
}

export function readTask({ to, from, next, nextVue }: any) {
  store.dispatch('addTaskToView', to.params.taskId);
  next();
}

export function readTeam({ to, from, next, nextVue }: any) {
  store.dispatch('chooseTeam', to.params.teamId);
  store.dispatch('chooseProject', null);
  next();
}

function projectAdministratorCheck(next: any, params: any) {
  if (
    store.getters
      .getRolesByProjectId(params.projectId)
      .find((item: any) => item.userId === store.getters.getProfile.auth._id)
  ) {
    next();
  } else {
    unauthorizedPage(next, params);
  }
}

function teamAdministratorCheck(next: any, params: any) {
  if (
    store.getters
      .getRolesByTeamId(params.teamId)
      .find((item: any) => item.userId === store.getters.getProfile.auth._id)
  ) {
    next();
  } else {
    unauthorizedPage(next, params);
  }
}
export function projectAdministrator({ to, from, next, nextVue }: any) {
  if (store.getters.getRoleInitializeStatus()) {
    projectAdministratorCheck(next, to.params);
  } else {
    store.watch(store.getters.getRoleInitializeStatus, function () {
      if (store.getters.getRoleInitializeStatus) {
        projectAdministratorCheck(next, to.params);
      }
    });
  }
}
export function teamAdministrator({ to, from, next, nextVue }: any) {
  if (store.getters.getRoleInitializeStatus()) {
    teamAdministratorCheck(next, to.params);
  } else {
    store.watch(store.getters.getRoleInitializeStatus, function () {
      if (store.getters.getRoleInitializeStatus) {
        teamAdministratorCheck(next, to.params);
      }
    });
  }
}
