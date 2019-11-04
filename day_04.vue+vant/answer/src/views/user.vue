<template>
  <div>
    <van-row>
      <van-col span="6">
        <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1" />
      </van-col>
      <van-col span="12">
        <div>{{ username }}</div>
        <van-icon name="gem-o" />
      </van-col>
      <van-col span="6">
        <van-button type="primary" size="small" @click="changepass">修改密码</van-button>
      </van-col>
    </van-row>

   <van-grid>
      <van-grid-item style="flex-basis: 33.333%;" v-for="(item,index) in classlist" :key="index">
        {{item.cat_name}}
        <div class="rate">（正确率：{{item.cat_percent}}%）</div>
      </van-grid-item>
    </van-grid>

    <van-button type="danger" size="large" @click="logout">退出</van-button>

    
    <!-- 底部导航 -->
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">分类</van-tabbar-item>
      <van-tabbar-item replace to="/ranklist" icon="bar-chart-o">排行</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      fileList: [],
      classlist: []
    };
  },
  computed: {
    ...mapState(["username"])
  },
  created() {
    this.getusername();
    this.getclasslist();
  },
  methods: {
    ...mapMutations(["setface"]),
    ...mapActions(["getusername"]),
    // 上传头像地址
    afterRead(file) {
      this.$http.post("/users/face", file).then(res => {
        if (res.data.ok == 1) {
          this.setface(file);
        }
      });
    },
    // 获取分类正确率
    getclasslist() {
      this.$http.get("/categories").then(res => {
        if (res.data.ok == 1) {
          this.classlist = res.data.data;
        }
      });
    },
    // 退出
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    // 修改密码
    changepass() {
      this.$router.push("/register");
    }
  }
};
</script>

<style>
.van-row {
  padding: 25px;
  background-color: #00669e;
}
.van-image__img {
  border-radius: 50%;
}
.van-uploader__upload {
  border-radius: 50%;
}
.van-col--12 {
  text-align: center;
  color: white;
  font-size: 20px;
  padding-top: 10px;
}
.van-grid {
  margin-top: 50px;
}
.van-button--large {
  margin-top: 50px;
  border-radius: 15px;
}

 .rate {
  color: #ff4500;
  font-size: 15px;
}

.van-grid {
  border-top: 15px solid #eee;
  border-bottom: 15px solid #eee;
}
</style>
