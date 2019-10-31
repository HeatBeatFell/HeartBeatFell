<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">首页</router-link>|
      <router-link to="/login">登录</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  height: 700px;
  background-color: #f4f4f4;
}
#nav {
  list-style: none;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-right: 30px;
  background-color: #f4f4f4;
  text-decoration: none;
  font-size: 20px;
}
</style>
