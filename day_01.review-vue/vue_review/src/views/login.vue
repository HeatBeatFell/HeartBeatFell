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
    // 引入vuex中的方法
    ...mapMutations({
      vuexLogin: "login"
    }),
    login() {
      // 发起ajax请求
      this.$http.post("/access_token").then(res => {
        // 判断一下状态
        if (res.data.ok !== 0) {
          // 添加令牌
          sessionStorage.setItem("token", res.data.data.token);
          // 绑定数据
          this.vuexLogin({username:this.username})
          // 跳转到index
          this.$router.push("/");
        }
      });
    }
  }
};
</script>
