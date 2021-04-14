const state = {
  data: []
};

const getters = {
  getColumnByTable: (state: any) => (tableId: string) => {
    return state.data.filter((item: any) => item.tableId === tableId);
  },
  getColumn: (state: any) => {
    return state.data;
  }
};

const actions = {
  refreshColumn({ commit }: any, payload: any) {
    commit('REFRESH_COLUMN', payload);
  },
  replaceColumnByTableId({ commit }: any, { payload, tableId }: any) {
    commit('REPLACE_COLUMN_BY_TABLE', { payload, tableId });
  }
};

const mutations = {
  REFRESH_COLUMN: (state: any, payload: any) => {
    state.data = payload;
  },
  REPLACE_COLUMN_BY_TABLE: (state: any, { payload, tableId }: any) => {
    state.data = [...state.data.filter((item: any) => item.tableId !== tableId), ...payload];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
