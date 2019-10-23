<template>
  <div id="app">
    <router-link to="/">首页</router-link>

    <template v-if="isLogin">
      <router-link to="/">首页</router-link>
      <span>{{username}}</span>
      <button @click="logout">退出</button>
    </template>
    <router-link v-else to="/login">登录页</router-link>

    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["isLogin", "username"])
  },
  methods: {
    ...mapMutations(["logout"])
    
  }
};
</script>
