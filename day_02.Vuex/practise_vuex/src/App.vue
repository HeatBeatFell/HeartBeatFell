<template>
  <div id="app">
    <div class="nav">
      <template v-if="username">
        <router-link to="/">首页</router-link>|
        <span>您好： {{ username }} 您的积分为:{{ integral }}</span>
        <button>退出</button>
      </template>
      <div id="nav" v-else>
        <router-link to="/">首页</router-link>|
        <router-link to="/login">登录</router-link>
      </div>
    </div>
    <hr />
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["username", "integral"])
  }
};
</script>

<style>
a,
ul,
li,
div,
h3,
hr {
  list-style: none;
}
#app {
  height: 700px;
  background-color: #f4f4f4;
}
.nav {
  list-style: none;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-right: 30px;
  background-color: #f4f4f4;
  text-decoration: none;
  font-size: 20px;
}
</style>
