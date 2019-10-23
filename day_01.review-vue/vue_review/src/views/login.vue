<template>
  <div class="about">
    <h1>登录页</h1>
    <div>
      用户名：
      <input type="text" v-model="username" />
    </div>
    <div>
      密 码：
      <input type="text" v-model="password" />
    </div>
    <div>
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
// 先把数据映射过来
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapMutations({
      vuexLogin: "login"
    }),
    login() {
      this.$http.post("/access_token").then(res => {
        console.log(res);
        if (res.data.ok !== 0) {
          sessionStorage.setItem("token", res.data.data.token);
          this.vuexLogin({username:this.username})
          this.$router.push("/");
        }
      });
    }
  }
};
</script>
