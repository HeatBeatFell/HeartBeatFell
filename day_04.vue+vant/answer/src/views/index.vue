<template>
  <div class="index">
    <!-- 导航 -->
    <van-nav-bar title="选择题目分类" />
    <!-- 宫格 -->
    <van-grid>
      <van-grid-item
        v-for="(item,index) in categories"
        :key="index"
        @click="handleCate"
      >{{item.cat_name}}</van-grid-item>
    </van-grid>
    <!-- 导航 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">分类</van-tabbar-item>
      <van-tabbar-item replace to="/ranklist" icon="bar-chart-o">排行</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [] // 分类数据
    };
  },
  methods: {
    handleCate() {
      let token = sessionStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
      } else {
        this.$router.push("/answer");
      }
    }
  },
  created() {
    // 加载分类数据
    this.$http.get("/categories").then(res => {
      this.categories = res.data.data;
    });
  }
};
</script>
