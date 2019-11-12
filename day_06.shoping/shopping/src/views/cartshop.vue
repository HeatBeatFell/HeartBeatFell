<template>
  <div class="cartshop">
    <van-nav-bar title="添加商品到购物车" />
    <van-button type="info" @click="show = true">加入购物车</van-button>
    <hr />

    <van-row type="flex" justify="center">
      <van-col span="2">
        <van-checkbox v-model="checked" />
      </van-col>
      <van-col span="3">编号</van-col>
      <van-col span="4">名称</van-col>
      <van-col span="4">价格</van-col>
      <van-col span="4">数量</van-col>
      <van-col span="4">小计</van-col>
      <van-col span="4">删除</van-col>
    </van-row>
    <van-row  v-for="(item, index) in goods" :key="index">
      <van-col span="2">
        <van-checkbox v-model="checked" />
      </van-col>
      <van-col span="3">{{ index }}}</van-col>
      <van-col span="4">{{ item.name }}</van-col>
      <van-col span="4">{{ item.price }}</van-col>
      <van-col span="4">{{ item.number }}</van-col>
      <van-col span="4">{{ num }}</van-col>
      <template>
        <div>
          <van-col span="4" @click="remou(index)">删除</van-col>
        </div>
      </template>
    </van-row>
    <van-overlay :show="show">
      <van-cell-group>
        <!-- 表单部分 -->
        <!-- 商品名称 -->
        <van-field v-model="shop.name" label="商品名称" placeholder="请输入商品名称" />
        <!-- 商品价格 -->
        <van-field v-model="shop.price" type="number" label="价格" placeholder="请输入商品价格" />
        <!-- 商品数量 -->
        <van-field v-model="shop.number" type="number" label="数量" placeholder="请输入商品数量" />
      </van-cell-group>
      <div>
        <van-button type="info" @click="addshop">确定</van-button>
        <van-button type="warning" @click="show = false">取消</van-button>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否显示遮罩层
      show: false,
      shop: {
        name: "",
        price: "",
        number: "" || 1
      },
      // 用来储存商品s
      goods: []
    };
  },
  //计算属性
  computed: {
    num: function() {
      return this.shop.price * this.shop.number;
    }
  },
  // 监听属性
  watch: {
    shop: function() {
      return this.shop.price * this.shop.number;
    }
  },

  methods: {
    // 点击添加新的商品到浏览器
    addshop() {
      // 先从浏览器获取商品id
      let localgoods = localStorage.getItem("goods");
      // 判断一下有没有
      if (localgoods === null) {
        // 如果啥都没有就给他一个空数组
        localgoods = [];
        localgoods.push(this.shop);
      } else {
        // 如果有的话就让他先转换成字符串
        localgoods = JSON.parse(localgoods);
        // 然后添加新的商品
        localgoods.push(this.shop);
      }
      localStorage.setItem("goods", JSON.stringify(localgoods));
      this.goods = JSON.parse(localStorage.getItem("goods"));
      this.show = false;
    }
  }
};
</script>

<style></style>
