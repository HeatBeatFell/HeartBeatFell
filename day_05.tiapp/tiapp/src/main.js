// 引入vue
import Vue from "vue";
// 引入页面
import App from "./App.vue";
// 引入路由
import router from "./router";
import store from "./store";
// 引入axios
import axios from "axios";
// 为axios配置基础地址
axios.defaults.baseURL = "http://localhost:9999/api/v1";
// 把axios挂载到vUE原型尚
Vue.prototype.$http = axios;

// 引入vant-UI
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
// 引入mock
import "./mock";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
