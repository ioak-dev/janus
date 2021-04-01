const state = {
  data: []
};

const getters = {
  getColumnByTable: (state: any) => (tableId: string) => {
    return state.data.filter((item: any) => item.tableId === tableId);
  }
};

const actions = {
  refreshColumn({ commit }: any, payload: any) {
    commit('REFRESH_COLUMN', payload);
  }
};

const mutations = {
  REFRESH_COLUMN: (state: any, payload: any) => {
    state.data = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
