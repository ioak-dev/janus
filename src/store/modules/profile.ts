import { userAuthorizedSubject } from '@/events/UserAuthorizedEvent';

const state = {
  theme: 'theme_dark',
  space: '',
  schema: '',
  table: '',
  auth: {},
  sidebar: true
};

const getters = {
  getProfile: (state: any) => {
    return state;
  }
};

const actions = {
  setTheme({ commit }: any, theme: string) {
    commit('UPDATE_PROFILE', { ...state, theme });
  },
  setSpace({ commit }: any, space: any) {
    commit('UPDATE_PROFILE', { ...state, space });
  },
  setSchema({ commit }: any, schema: any) {
    commit('UPDATE_PROFILE', { ...state, schema });
  },
  setTable({ commit }: any, table: any) {
    commit('UPDATE_PROFILE', { ...state, table });
  },
  addAuth({ commit, dispatch }: any, { auth }: any) {
    commit('UPDATE_PROFILE', { ...state, auth });
    userAuthorizedSubject.next({ isAuth: true });
    // dispatch('fetchUsers');
    // dispatch('fetchRoles');
  },
  removeAuth({ commit }: any, cookies: any) {
    userAuthorizedSubject.next({ isAuth: false });
    cookies.remove(`janus_${state.space}-access_token`);
    cookies.remove(`janus_${state.space}-refresh_token`);
    commit('UPDATE_PROFILE', { ...state, auth: {} });
  },
  toggleSidebar({ commit }: any) {
    commit('UPDATE_PROFILE', { ...state, sidebar: !state.sidebar });
  }
};

const mutations = {
  UPDATE_PROFILE: (state: any, profile: any) => {
    state.theme = profile.theme;
    state.schema = profile.schema;
    state.table = profile.table;
    state.space = profile.space;
    state.auth = profile.auth;
    state.sidebar = profile.sidebar;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
