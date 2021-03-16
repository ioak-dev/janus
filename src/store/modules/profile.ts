const state = {
  theme: 'theme_dark',
  space: '',
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
  addAuth({ commit, dispatch }: any, { auth }: any) {
    commit('UPDATE_PROFILE', { ...state, auth });
    dispatch('fetchProjects');
    dispatch('fetchStages');
    dispatch('fetchProjectTeams');
    dispatch('fetchTeamMembers');
    dispatch('fetchUsers');
    dispatch('fetchRoles');
    dispatch('fetchTeams');
  },
  removeAuth({ commit }: any, cookies: any) {
    cookies.remove(`janus_${state.space}`);
    commit('UPDATE_PROFILE', { ...state, auth: {} });
  },
  toggleSidebar({ commit }: any) {
    commit('UPDATE_PROFILE', { ...state, sidebar: !state.sidebar });
  }
};

const mutations = {
  UPDATE_PROFILE: (state: any, profile: any) => {
    state.theme = profile.theme;
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
