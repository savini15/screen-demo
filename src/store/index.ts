//store.ts:
import { createStore } from "vuex";
import home from "./MyModule/home";
const store = createStore({
  state() {
    return {
      count: "6667777",
      selectArea: null,
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
    selectAreaChange(state, b) {
      console.log("21----", b);
      state.selectArea = b;
    },
  },
  actions: {},

  modules: {
    //  vuex分模块
    home,
  },
});

export default store;
