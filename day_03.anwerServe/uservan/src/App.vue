<template>
  <div id="app">
  <!-- 导航 -->
    <div id="nav">
      <van-nav-bar
        title="国美易购唯品会"
        right-text="登录"
        @click-right="onClickRight"
      />
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    onClickRight() {
      this.$router.push("/login");
    }
  }
};
</script>

<style></style>
