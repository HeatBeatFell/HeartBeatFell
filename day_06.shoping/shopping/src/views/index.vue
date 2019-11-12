<template>
  <div class="index">
    <!-- 轮播 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in img" :key="index">
        <img :src="image.image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格 -->
    <van-grid>
      <van-grid-item
        v-for="(item, index) in catname"
        :key="index"
        :text="item.cat_name"
      />
    </van-grid>
    <!-- 商品 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="0"
    >
      <van-grid :column-num="2">
        <van-grid-item v-for="(item, index) in shop" :key="index">
          <van-image slot="icon" :src="item.image"></van-image>
          <div slot="text">
            <div class="goods_name">{{ item.goods_name }}</div>
            <div class="price">￥{{ item.price }}</div>
            <van-button size="small" @click="addtocart(item.id)" type="warning"
              >加入购物车</van-button
            >
          </div>
        </van-grid-item>
      </van-grid>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      img: [],
      catname: [],
      shop: [],
      per_page: 10,
      page: 1
    };
  },
  created() {
    //首屏图片
    // console.log(111);
    this.$http.get("/main_ad_images").then(res => {
      // console.log(res);
      this.img = res.data.data;
    });
    // 首屏分类
    this.$http.get("/index_categories").then(res => {
      // console.log(res);
      this.catname = res.data.data;
    });
  },
  methods: {
    //加入购物车
    addtocart(id) {
      //先从浏览器获取id
      let ids = localStorage.getItem("id");
      // 判断有没有空的
      if (ids === null) {
        // 如果有空的 就把获取来的添加进去
        ids = [id];
      } else {
        // 如果没有就把它转化为数组 添加新的id
        ids = JSON.parse(ids);
        ids.push(id);
        // 然后去重  解决可能重复添加购物车的情况出现 这里我们使用新语法
        ids = Array.from(new Set(ids));
      }
      // 最后把他重新存入浏览器  注意转为字符串
      localStorage.setItem("id", JSON.stringify(ids));

      // 根据我们选择的储存方案  现在我们储存数量和状态
      // 还是先从浏览器获取
      let cart = localStorage.getItem("cart");
      if (cart === null) {
        cart = [];
        cart[id] = {
          idchk: false,
          count: 1
        };
      } else {
        cart = JSON.parse(cart);
        if (cart[id] === null || cart[id] === undefined) {
          cart[id] = {
            idchk: false,
            count: 1
          };
        } else {
          cart[id].count++;
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    },

    //load函数
    onLoad() {
      this.page = this.page + 1;
      this.$http
        .get(`/index_goods?page=${this.page}&per_page=${this.per_page}`)
        .then(res => {
          this.shop = this.shop.concat(res.data.data);
        });
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.shop.length >= 80) {
        this.finished = true;
      }
    }
  }
};
</script>

<style>
.index .price {
  color: red;
  font-size: 14px;
  margin: 5px 0;
  font-weight: bold;
}
</style>
