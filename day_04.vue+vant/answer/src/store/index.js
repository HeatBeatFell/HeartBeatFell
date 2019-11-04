import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
axios.defaults.baseURL = "http://localhost:9999/api/v1";
import { Notify } from "vant";

Vue.use(Notify);
Vue.use(Vuex);

export default new Vuex.Store({
  // 数据
  state: {
    username: "", //用户名
    catid: "", //分类id
    catname: "", //分类名称
    face: "", //头像
    cat_list:[]//分类列表
  
  },
  // state中的数据必须用mutations中的方法进行更改 否则无法得到同步
  mutations: {
    // 同步用户名
    setusername(state, data) {
      state.username = data;
    },
    // 分类id
    setcatid(state, data) {
      state.catid = data;
    },
    // 分类名称
    setcatname(state,data){
      state.catname = data;
    },
    setcatlist(state,data){
      state.cat_list=data
    },
    // 设置头像
    setface(state, data) {
      state.face = data;
    }
  },
  // 方法
  actions: {
    // 登录
    login(context, data) {
      axios.post("/users/access_token", data).then(res => {
        console.log(res.data.ok);
        if (res.data.ok === 1) {
          // 在令牌中保存token
          sessionStorage.setItem("token", res.data.data.token);
          sessionStorage.setItem("username", data.username);
          // 把用户名保存到state中
          context.commit("setusername", data.username);
          context.commit("setface", res.data.data.face);
          Notify({ type: "success", message: "登录成功" });
          router.push("/");
        } else {
          Notify({ type: "danger", message: res.data.error });
        }
      });
    },
    // 注册
    // 第一个属性是联系上下文  为了把数据传给mutations
    // 第二个属性是调用该方法的组件  传进来的值
    register(context, data) {
      axios.post("/users/register", data).then(res => {
        if (res.data.ok === 1) {
          context.commit("setusername", data.username);
          Notify({ type: "success", message: "注册成功" });
          router.push("/login");
        } else {
          Notify({ type: "danger", message: res.data.error });
        }
      });
    },
    // 从浏览器中获取用户名
    getusername(context) {
      let username = sessionStorage.getItem("username");
      if (username !== null) {
        context.commit("setusername",username)
      }
    }
  },
  modules: {}
});
