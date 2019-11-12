<template>
  <div class="cart">
    <van-nav-bar title="购物车" />
    <van-checkbox v-model="cart[item.id].idchk"  v-for="(item, index) in goods" :key="index">
      <van-card
        :num="cart[item.id].count"
        :title="item.name"
        :price="item.price"
        :thumb="item.image"
      ></van-card>
    </van-checkbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: [], //储存商品详情
      id: JSON.parse(localStorage.getItem("id")) || [],
      cart: JSON.parse(localStorage.getItem("cart")) || []
    };
  },
  created() {
    if (this.id.length > 0) {
      this.$http.get(`/goods?id=` + this.id.join(",")).then(res => {
        this.goods = res.data.data;
      });
    }
  }
};
</script>

<style></style>
