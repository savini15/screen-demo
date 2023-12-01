export default {
  namespaced: true,
  state: { test: "测试分模快2" },
  mutations: {
    getTest(state) {
      state.test = "改变分模块数据";
    },
  },
  actions: {
    changeOption({ commit }) {
      commit("getTest");
    },
  },
  getters: {},
};
