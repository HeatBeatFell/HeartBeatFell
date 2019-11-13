<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="form.mobile"
        required
        clearable
        label="手机号"
        placeholder="请输入11位手机号"
        :error-message="err.mobile"
      />

      <van-field
        v-model="form.password"
        required
        clearable
        type="password"
        label="密码"
        placeholder="请以字母开头输入6-18位密码"
        :error-message="err.password"
      />
    </van-cell-group>
    <van-button type="primary" size="large" @click="login">登录</van-button>
    <van-button
      to="/register"
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      size="large"
    >还没账号?去注册</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        mobile: "",
        password: ""
      },
      err: {
        mobile: "",
        password: ""
      }
    };
  },
  methods: {
    // 登录
    login() {
      let mobileRe = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (!mobileRe.test(this.form.mobile)) {
        this.err.mobile = "手机号码格式错误";
        return false;
      }
      let passwordRe = /^[a-zA-Z]\w{5,17}$/;
      if (!passwordRe.test(this.form.password)) {
        this.err.password = "请输入以字母开头的6-18位密码";
        return false;
      }
      //转换提交格式
      let formdata = new URLSearchParams();
      formdata.append("mobile", this.form.mobile);
      formdata.append("password", this.form.password);

      this.$http.post("/login", formdata).then(res => {
        if (res.data.ok === 1) {
          localStorage.setItem("token", res.data.data.token);
          this.$router.push("/");
        } else {
          this.$toast(res.data.error);
        }
      });
    }
  }
};
</script>

<style>
.login .van-nav-bar {
  margin-bottom: 100px;
}
.login .van-button {
  margin-top: 50px;
}
.login {
  padding: 30px;
}
</style>
