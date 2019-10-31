import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
axios.defaults.baseURL = "http://localhost:7000/api/v1";
// Vue.prototype.$http = axios;
Vue.use(Vuex);

export default new Vuex.Store({
  // 数据
  state: {
    username: "", //用户名
    integral: 0 //积分
  },
  // 对数据操作的方法
  mutations: {
    setusername(state, data) {
      state.username = data;
    },
    //积分
    setintegral(state, data) {
      state.integral = data;
    }
  },
  // 对数据进心操作  调用接口
  actions: {
    // 登录
    login(context, data) {
      // 发起ajax请求
      axios.post("/access_token", data).then(res => {
        window.console.log(data);
        // 判断有没有等陆成功
        if (res.data.ok === 1) {
          sessionStorage.setItem("token", res.data.data.token);
          sessionStorage.setItem("username", data.username);
          context.commit("setusername", data.username);
          // 再js中跳转到首页
          router.push("/");
        } else {
          alert("登录失败！：原因：" + res.data.error);
        }
      });
    }
  },
  modules: {}
});
