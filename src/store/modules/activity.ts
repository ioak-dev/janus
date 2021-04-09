const state = {
  data: []
};

const getters = {
  getActivity: (state: any) => (domain: string[], parentReference: string[]) => {
    return state.data;
  }
};

const actions = {
  refreshActivity({ commit }: any, payload: any) {
    commit('REFRESH_ACTIVITY', payload);
  }
};

const mutations = {
  REFRESH_ACTIVITY: (state: any, payload: any) => {
    state.data = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
