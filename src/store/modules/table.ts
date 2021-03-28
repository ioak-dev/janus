const state = {
  data: []
};

const getters = {
  getTable: (state: any) => {
    return state.data;
  }
};

const actions = {
  refreshTable({ commit }: any, payload: any) {
    commit('REFRESH_TABLE', payload);
  }
};

const mutations = {
  REFRESH_TABLE: (state: any, payload: any) => {
    state.data = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
