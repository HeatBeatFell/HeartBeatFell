import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入axios
import axios from "axios";
// 为axios设计基础路径
axios.defaults.baseURL = "http://localhost:9999/api/v1";
// 把vant注册到vue原型上
Vue.prototype.$http = axios;
//引入vant
import Vant from "vant";
import "vant/lib/index.css";
// 把vant挂载到vue上
Vue.use(Vant);
// 引入 mock
import "./mock";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
