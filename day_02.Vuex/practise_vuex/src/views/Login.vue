<template>
  <div class="about">
    <div>
      <div class="item">
        账号：
        <input v-model="username" type="text" />
      </div>
      <div class="item">
        密码：
        <input v-model="password" type="password" />
      </div>
      <button @click="dologin">登录</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    dologin() {
      this.login({
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style>
.about {
  height: 100px;
  width: 300px;
  padding: 20px;
  border: 1px solid #abb2bf;
  box-shadow: #abb2bf;
}

.item {
  height: 30px;
  margin-bottom: 10px;
}
button {
  width: 80px;
  margin-left: 60px;
  background-color: #abb2bf;
}
</style>
