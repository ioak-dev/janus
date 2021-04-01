import { createStore } from 'vuex';
import profile from './modules/profile';
import schema from './modules/schema';
import table from './modules/table';
import column from './modules/column';
import filter from './modules/filter';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { profile, schema, table, column, filter }
});
