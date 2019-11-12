import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/",
    component: () => import("../views/index.vue")
  },
  // 问题页
  {
    path: "/question",
    component: () => import("../views/question.vue")
  },
  // 登录页
  {
    path: "/login",
    component: () => import("../views/login.vue")
  },
  // 注册页
  {
    path: "/register",
    component: () => import("../views/register.vue")
  },
  // 排行页
  {
    path: "/ranking",
    component: () => import("../views/ranking.vue")
  },
  // 用户页
  {
    path: "/user",
    component: () => import("../views/user.vue")
  },
  // 密码页
  {
    path: "/password",
    component: () => import("../views/password.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
