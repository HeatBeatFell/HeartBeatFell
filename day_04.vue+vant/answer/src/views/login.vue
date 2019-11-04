<template>
  <div>
    <van-cell-group>
      <!-- 导航 -->
      <van-nav-bar
        title="登录"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <!-- 登陆表单 -->
      <van-field
        v-model="username"
        required
        label="用户名"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <van-button @click="dologin" type="primary" size="large">登录</van-button>
    <van-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      size="large"
      @click="toregister"
      >注册</van-button
    >
  </div>
</template>

<script>
import { Notify } from "vant";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    //讲vuex中的login方法引入到methods中
    ...mapActions(["login"]),
    ...mapMutations(["setface"]),
    // 导航栏返回进入首页
    dologin() {
      // 判断受否为空
      if (this.username !== "" && this.password !== "") {
        this.login({
          username: this.username
        });
      } else {
        Notify({ type: "warning", message: "请输入账号密码" });
      }
    },
    onClickLeft() {
      this.$router.push("/");
    },
    // 点击注册按钮进行注册
    toregister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style>
.van-nav-bar {
  margin-bottom: 100px;
}
.van-button {
  border-radius: 10px;
  width: 300px;
  margin-left: 50px;
  margin-top: 30px;
  cursor: hand;
}
</style>
