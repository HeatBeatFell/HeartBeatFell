import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // 状态
  state: {
    isLogin: false,
    username: ''

  },
  // 方法
  mutations: {
    login(state, data) {
      state.isLogin = true
      state.username = data.username
    },
    logout(state) {
      state.isLogin = false
      sessionStorage.removeItem("token")
    }
  },
  actions: {},
  modules: {}
});
