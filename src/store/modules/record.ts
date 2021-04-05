import { uniqBy } from 'lodash';

const state = {
  data: []
};

const getters = {
  getRecord: (state: any) => {
    return state.data;
  }
};

const actions = {
  refreshRecord({ commit }: any, payload: any) {
    commit('REFRESH_RECORD', payload);
  },
  appendRecord({ commit }: any, payload: any) {
    commit('APPEND_RECORD', payload);
  },
  editRecord({ commit }: any, payload: any) {
    commit('EDIT_RECORD', payload);
  },
  deleteRecord({ commit }: any, idList: string[]) {
    commit('DELETE_RECORD', idList);
  }
};

const mutations = {
  REFRESH_RECORD: (state: any, payload: any) => {
    state.data = payload;
  },
  APPEND_RECORD: (state: any, payload: any) => {
    state.data = uniqBy([...state.data, ...payload], 'id');
  },
  EDIT_RECORD: (state: any, payload: any) => {
    const _data = [...state.data];
    let matchingIndex = -1;
    _data.forEach((item, index) => {
      if (item.id === payload.id) {
        matchingIndex = index;
      }
    });
    if (matchingIndex >= 0) {
      _data[matchingIndex] = payload;
    } else {
      _data.push(payload);
    }
    state.data = _data;
  },
  DELETE_RECORD: (state: any, idList: string[]) => {
    state.data = state.data.filter((item: any) => !idList.includes(item.id));
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
