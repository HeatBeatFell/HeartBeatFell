<template>
  <div class="cart">
    <van-nav-bar title="购物车" />
    <van-checkbox
      v-model="cart[item.id].idchk"
      v-for="(item, index) in goods"
      :key="index"
    >
      <!-- 商品卡片部分   这里我们进行各种数据的把规定 -->
      <van-card :title="item.name" :price="item.price" :thumb="item.image">
        <!-- 自定义数量插槽 -->
        <van-stepper slot="num" v-model="cart[item.id].count" />
        <!-- 自定义右下角部分插槽 -->
        <!-- 这里计算出来的小计可能有误差 这里我们保留两位小数即可 -->
        <van-button size="small" type="danger" slot="footer"
          >￥ {{ (cart[item.id].count * item.price).toFixed(2) }}</van-button
        >
      </van-card>
    </van-checkbox>

    <!--提交订单部分 -->
    <van-submit-bar :price="priceall" button-text="提交订单">
      <van-checkbox v-model="chkall">全选</van-checkbox>
      <span slot="tip">
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </span>
    </van-submit-bar>
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
  },
  // 计算属性
  computed: {
    priceall: function() {
      let num = 0;
      this.goods.forEach(v => {
        if (this.cart[v.id].idchk) {
          num += v.price * this.cart[v.id].count * 100;
        }
      });
      return num;
    },
    chkall: {
      get: function() {
        for (var i = 0; i < this.cart.length; i++) {
          if (this.cart[i] == null) continue;
          if (this.cart[i].idchk === false) {
            return false;
          }
        }
        return true;
      },
      set: function(newval) {
        this.cart.forEach(v => {
          if (v !== null) {
            v.idchk = newval;
          }
        });
      }
    }
  },
  //监听属性
  watch: {
    // 当cart 中的数据发生改变时触发
    cart: {
      deep: true,
      handler: function() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    }
  }
};
</script>

<style>
.cart .van-checkbox__label {
  width: 100%;
}
.cart .van-submit-bar {
  margin-bottom: 50px;
}
</style>
