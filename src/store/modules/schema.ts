const state = {
  data: []
};

const getters = {
  getSchema: (state: any) => {
    return state.data;
  }
};

const actions = {
  refreshSchema({ commit }: any, payload: any) {
    commit('REFRESH_SCHEMA', payload);
  }
};

const mutations = {
  REFRESH_SCHEMA: (state: any, payload: any) => {
    state.data = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
