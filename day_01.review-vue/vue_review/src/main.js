import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// 拦截数据
import './mock'
axios.defaults.baseURL = 'http://127.0.0.1:8080/api/v1';
Vue.prototype.$http = axios

// 前置拦截器
axios.interceptors.request.use(function (config) {
  // 自动把token交给服务器
  let token = sessionStorage.getItem('token')

  if (token !== undefined) {
    // 为请求头添加一个Authorization保存令牌  大小写都可以
    config.headers.Authorization = 'Bearer ' + token
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
