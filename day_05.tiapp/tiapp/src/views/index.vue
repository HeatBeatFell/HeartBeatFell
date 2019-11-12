<template>
  <div class="index">
    <!--顶部导航  -->
    <van-nav-bar title="请选择题目类型" />

    <!-- grif宫格 -->
    <van-grid>
      <van-grid-item
        v-for="(item, index) in catlist"
        :key="index"
        :text="item.cat_name"
        :to="'/question?id=' + item.id + '&cat_name=' + item.cat_name"
      />
    </van-grid>

    <!-- 底部导航 -->
    <van-tabbar>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o" to="/ranking">排行</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>

    <!-- 提示框 -->
    <van-dialog v-model="show" title="获取分类列表失败"> </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //分类列表
      catlist: [],
      // 提示框
      show: false
    };
  },
  created() {
    this.getcatlist();
  },
  methods: {
    // 获取分类
    getcatlist() {
      this.$http.get("/categories").then(res => {
        if (res.data.ok == 1) {
          this.catlist = res.data.data;
        } else {
          this.show = true;
        }
      });
    }
  }
};
</script>

<style></style>
