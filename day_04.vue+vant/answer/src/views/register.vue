<template>
  <div>
    <van-cell-group>
      <!-- 导航 -->
      <van-nav-bar
        title="注册"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <!-- 登陆表单 -->
      <van-field
        v-model="username"
        required
        label="用户名"
        :error-message="nameerr"
        placeholder="请输入用户名"
      />
      <!-- 密码框 -->
      <van-field
        v-model="password"
        type="password"
        label="密码"
        :error-message="passerr"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password2"
        type="password"
        label="密码"
        :error-message="passerror"
        placeholder="请再次输入密码"
        required
      />
    </van-cell-group>
    <van-button type="primary" size="large" @click="toregister"
      >注册</van-button
    >
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" size="large"
      >已有账号？点击登录</van-button
    >
  </div>
</template>

<script>
import { Notify } from "vant";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      nameerr: "",
      passerr: "",
      passerror: ""
    };
  },
  methods: {
    // 将Actions 方法映射过来
    ...mapActions(["register"]),
    // 点击注册
    toregister() {
      // 校验
      if (this.username == "") {
        this.nameerr = "请输入用户名";
        return false;
      } else if (this.password == "") {
        this.passerr = "请输入用户名";
        return false;
      } else if (this.password !== this.password2) {
        this.passerror = "两次密码不一致请重新输入";
        return false;
      } else {
        // 调用映射进来的register方法 将用户名传入
        this.register({
          username: this.username
        });
      }
    },
    onClickLeft() {
      this.$router.push("/login");
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
