import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/",
    component: () => import("../views/index.vue")
  },
  // 购物车
  {
    path: "/cart",
    component: () => import("../views/cart.vue")
  },
  // 登录
  {
    path: "/login",
    component: () => import("../views/Login.vue")
  },
  // 注册
  {
    path: "/register",
    component: () => import("../views/Register.vue")
  },
  // 个人中心
  {
    path: "/me",
    component: () => import("../views/Me.vue"),
    //  给需要登陆的网页添加mate
    meta: {
      mustLogin: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 判断这个页面是不是必须等陆是的话进入 不是的话就放行
  if (
    to.meta !== undefined &&
    to.meta.mustLogin !== undefined &&
    to.meta.mustLogin
  ) {
    // 进来以后看他有妹妹token  如果没有就让他去登陆  如果有就放行
    let token = localStorage.getItem("token");
    if (token == null) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
