const state = {
  data: []
};

const getters = {
  getTable: (state: any): any[] => {
    return state.data;
  },
  getTableBySchema: (state: any) => (schemaId: string) => {
    return state.data.filter((item: any) => item.schemaId === schemaId);
  },
  getTableInCurrentSchema: (state: any, rootState: any) => {
    return state.data.filter((item: any) => item.schemaId === rootState.getProfile.schema);
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
