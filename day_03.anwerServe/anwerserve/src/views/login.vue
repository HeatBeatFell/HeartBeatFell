<template>
  <div class="nav">
    <el-form
      :model="loginForm"
      :rules="loginFormrule"
      ref="loginFormref"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginFormrule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6到 10 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  }
  
};
</script>

<style>
.nav {
  position: relative;
  width: 500px;
  height: 300px;
  border-radius: 5px;
  margin-top: 50px;
}
.el-form {
  position: absolute;
  top: 50px;
  left: 50px;
}
.el-form-item {
  width: 350px;
}
.el-button--medium {
  margin-left: 64px;
}
</style>
