import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/index.vue")
  },
  {
    path: "/cart",
    component: () => import("../views/cart.vue")
  },
  {
    path: "/cartshop",
    component: () => import("../views/cartshop.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
