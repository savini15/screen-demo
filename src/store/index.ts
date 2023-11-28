//store.ts:
import { createStore } from "vuex";
import user from "./MyModule/user";
const store = createStore({
  state() {
    return {
      count: "6667777",
    };
  },
  getters: {
    getCount(state) {
      return state.count;
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {},

  modules: {
    //  vuex分模块
    user,
  },
});

export default store;
