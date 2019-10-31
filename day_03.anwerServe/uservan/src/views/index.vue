<template>
  <div class="home">
    <!-- 懒加载轮播图 -->
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
      :width="500"
      :height="200"
    >
      <van-swipe-item>
        <img src="../assets/1.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../assets/2.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../assets/3.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../assets/4.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../assets/5.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../assets/6.jpg" alt />
      </van-swipe-item>
    </van-swipe>
    <!-- grid宫格 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <img src="../assets/超市.png" />
        <span>国美超市</span>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/cz.png" />
        <span>美团充值</span>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/dq.png" />
        <span>国美电器</span>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/gj.png" />
        <span>唯品管家</span>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/jz.png" />
        <span>美团家装</span>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/wd.png" />
        <span>我的</span>
      </van-grid-item>
    </van-grid>
    <!-- tabbar -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search" dot>搜索</van-tabbar-item>
      <van-tabbar-item icon="friends-o" info="5">消息</van-tabbar-item>
      <van-tabbar-item icon="setting-o" info="20">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
img {
  width: 100%;
  height: 100%;
}

</style>
