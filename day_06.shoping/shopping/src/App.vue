<template>
  <div id="app">
    <router-view />
    <!-- 底部 -->
    <van-tabbar>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" dot>分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="friends-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
