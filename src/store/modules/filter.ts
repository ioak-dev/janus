const state = {
  data: []
};

const getters = {
  getFilterByTable: (state: any) => (tableId: string) => {
    return state.data.filter((item: any) => item.tableId === tableId);
  }
};

const actions = {
  refreshFilter({ commit }: any, payload: any) {
    commit('REFRESH_FILTER', payload);
  }
};

const mutations = {
  REFRESH_FILTER: (state: any, payload: any) => {
    state.data = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
