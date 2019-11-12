<template>
  <div class="home">
    <el-form :model="shopform" label-width="100px">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="shopform.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="shopform.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="number">
        <el-input v-model="shopform.number"></el-input>
      </el-form-item>
      <el-button type="primary" @click="addshop">加入购物车</el-button>
    </el-form>

    <hr />
    <el-table :data="goods" style="width: 100%">
      <el-table-column width="55">
        <template slot-scope="slot">
          <el-checkbox v-model="slot.row.ischk" />
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="number" label="数量">
        <template slot-scope="slot">
          <el-input-number
            size="small"
            v-model="slot.row.number"
            :step="1"
            @change="ad"
            :min="1"
            :max="100"
            label="描述文字"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="小计">
        <template slot-scope="slot">
          <div>{{ slot.row.price * slot.row.number }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="slot">
          <el-button type="danger" @click="deleteshop(slot.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-checkbox v-model="chlall">全选</el-checkbox>
      <el-button type="danger" @click="removeall">删除所选</el-button>
      <span>￥{{ num }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopform: {
        name: "",
        price: "",
        number: "" || 1,
        ischk: false
      },
      num: 0,
      chlall: false,
      // 用来储存商品s
      goods: []
    };
  },
  created() {
    this.goods = JSON.parse(localStorage.getItem("goods"));
  },
  // 监听属性
  watch: {
    //监听本地数组
    goods: {
      // 深度监听发
      deep: true,
      handler: function() {
        // 初始化数据
        let num = 0;
        let chlall = true;
        // 循环数组
        this.goods.forEach(i => {
          // 如果都为选中状态  就计算总价
          if (i.ischk) {
            num += i.number * i.price;
          }
          // 如果部为选中状态 就让全选按钮未选中
          if (!i.ischk) {
            chlall = false;
          }
        });
        // 然后赋值
        this.num = num;
        this.chlall = chlall;
      }
    },
    chlall: {
      handler: function() {
        if (this.chlall) {
          this.goods.forEach(i => {
            i.ischk = true;
          });
        }
      }
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
        localgoods.push(this.shopform);
      } else {
        // 如果有的话就让他先转换成字符串
        localgoods = JSON.parse(localgoods);
        // 然后添加新的商品
        localgoods.push(this.shopform);
      }
      localStorage.setItem("goods", JSON.stringify(localgoods));
      this.goods = JSON.parse(localStorage.getItem("goods"));
      // 清空商品对象
      this.shopform.name = this.shopform.price = this.shopform.number = "";
    },
    // 根据索引删除数据
    deleteshop(id) {
      // 现在本地数组里删除该数据
      this.goods.splice(id, 1);
      // 在重新储存到浏览器中
      localStorage.setItem("goods", JSON.stringify(this.goods));
    },
    // 数量发生变化后重新储存数据
    ad() {
      localStorage.setItem("goods", JSON.stringify(this.goods));
    },
    // 批量删除
    removeall() {
      for (var i = this.goods.length - 1; i >= 0; i--) {
        // console.log(this.goods);
        if (this.goods[i].ischk == true) {
          // 现在本地数组里删除该数据
          this.goods.splice(i, 1);
          // 在重新储存到浏览器中
          localStorage.setItem("goods", JSON.stringify(this.goods));
          this.goods = JSON.parse(localStorage.getItem("goods"));
        }
      }
    }
  }
};
</script>

<style>
.home .el-form-item {
  margin-bottom: 22px;
  display: inline-block;
}
.home .el-form-item__content {
  margin-left: 0px;
}
.home .el-form {
  padding-left: 100px;
}
.home .el-button--primary {
  margin-left: 100px;
}
</style>
