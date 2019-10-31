import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:7000/api/v1";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "", //用户名
    integral: ""
  },
  mutations: {
    setusername(state, data) {
      state.username = data;
    },
    seintegral(state, data) {
      state.integral = data;
    }
  },
  actions: {
    login(context, data) {
      axios.post("/login", data).then(res => {
        if (res.data.ok === 1) {
          sessionStorage.setItem("token", res.data.data.token);
        } else {
          alert("登陆失败！：原因：" + res.data.error);
        }
      });
    }
  },
  modules: {}
});
