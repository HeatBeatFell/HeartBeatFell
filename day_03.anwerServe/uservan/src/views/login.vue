<template>
  <div class="about">
    <!-- 表单组件力得field输入框 -->
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <van-button type="primary"  size="large" @click="login">登录</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.username == "admin" && this.password == 123456) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style>
.about {
  margin-top: 150px;
  margin-left: 50px;
  width: 300px;
}
</style>
