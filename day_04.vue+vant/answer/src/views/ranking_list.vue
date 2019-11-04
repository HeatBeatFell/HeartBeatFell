<template>
  <div class="topn">
    <van-tabs v-model="active" @change="changeTab">
      <van-tab title="全部">
        <van-row class="head">
          <van-col span="4">排行</van-col>
          <van-col span="10">姓名</van-col>
          <van-col span="10">积分</van-col>
        </van-row>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(item,index) in heros" :key="index">
            <van-row>
              <van-col span="8">{{index+1}}</van-col>
              <van-col span="11">{{item.username}}</van-col>
              <van-col span="4">{{item.integral}}</van-col>
            </van-row>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab v-for="(item,index) in categories" :key="index" :title="item.cat_name">
        <van-row class="head">
          <van-col span="4">排行</van-col>
          <van-col span="10">姓名</van-col>
          <van-col span="10">积分</van-col>
        </van-row>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(item,index) in heros" :key="index">
            <van-row>
              <van-col span="8">{{index+1}}</van-col>
              <van-col span="11">{{item.username}}</van-col>
              <van-col span="4">{{item.integral}}</van-col>
            </van-row>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
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
      active: 0,
      list: [],
      loading: false,
      finished: false,
      categories: [], // 分类
      heros: [] // 排行
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    changeTab() {
      // 加载排行数据
      this.$http.get("/heros").then(res => {
        // this.heros = res.data.data
        function compare(prop) {
          return function(a, b) {
            var value1 = a[prop];
            var value2 = b[prop];
            return value2 - value1;
          };
        }
        this.heros = res.data.data.sort(compare("integral"));
      });
    }
  },
  created() {
    // 加载分类数据
    this.$http.get("/categories").then(res => {
      this.categories = res.data.data;
    });
    // 加载排行数据
    this.$http.get("/heros").then(res => {
      // this.heros = res.data.data
      function compare(prop) {
        return function(a, b) {
          var value1 = a[prop];
          var value2 = b[prop];
          return value2 - value1;
        };
      }
      this.heros = res.data.data.sort(compare("integral"));
    });
  }
};
</script>

<style scoped>
.topn {
  text-align: center;
}
.topn .head {
  background-color: #eee;
  padding: 5px;
  color: #000;
}
</style>
