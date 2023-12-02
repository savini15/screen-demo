//store.ts:
import { createStore } from "vuex";
import home from "./MyModule/home";
const store = createStore({
  state() {
    return {
      areaCode: null,
      selectArea: null,
    };
  },
  getters: {
    // getCount(state) {
    //   return state.count;
    // },
  },
  mutations: {
    // increment(state) {
    //   state.count++;
    // },
    selectAreaChange(state, data) {
      console.log("21----", data);
      state.selectArea = data.county;
      state.areaCode = data.code;
    },
  },
  actions: {},

  modules: {
    //  vuex分模块
    home,
  },
});

export default store;
