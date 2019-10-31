import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 路由规则
const routes = [
  {
    path: "/",
    component: () => import("../views/index.vue")
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// 路由导航守卫

router.beforeEach(function(to, from, next) {
  if (to.path == "/login") {
    return next();
  }
  if (!sessionStorage.getItem("token")) {
    return next("/login");
  }
  next();
});

export default router;
