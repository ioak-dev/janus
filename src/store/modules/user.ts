const state = {
  data: []
};

const getters = {
  getUser: (state: any) => {
    return state.data;
  }
};

const actions = {
  refreshUser({ commit }: any, payload: any) {
    commit('REFRESH_USER', payload);
  }
};

const mutations = {
  REFRESH_USER: (state: any, payload: any) => {
    state.data = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
