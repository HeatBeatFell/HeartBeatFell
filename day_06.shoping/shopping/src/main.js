import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
axios.defaults.baseURL = "http://localhost:9999/api/v1";
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
import Vant from "vant";
import "vant/lib/index.css";
import "./mock";
Vue.use(Vant);
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
