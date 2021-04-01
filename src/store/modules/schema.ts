const state = {
  data: []
};

const getters = {
  getSchema: (state: any) => {
    return state.data;
  },
  getSchemaById: (state: any) => (id: string) => {
    return state.data.find((item: any) => item.id === id);
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
