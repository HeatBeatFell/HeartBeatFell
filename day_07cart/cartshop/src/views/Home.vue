<template>
  <div class="home">
    <el-form :model="shopform" label-width="100px">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="shopform.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" type="number" prop="price">
        <el-input v-model="shopform.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="number" type="number">
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
          <el-button type="danger" @click="deleteshop(slot.$index)">删除</el-button>
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
        price: 0,
        number: "" || 1,
        ischk: false
      },

      // 用来储存商品s
      goods: []
    };
  },
  created() {
    // 在获取首屏数据的时候如过
    let aa = localStorage.getItem("goods");
    if (!aa) return;
    this.goods = JSON.parse(aa);
    // localStorage.getItem("goods") == "null" ||
    // localStorage.getItem("goods") == null
    //   ? []
    //   : JSON.parse(localStorage.getItem("goods"));
    // console.log(localStorage.getItem("goods") == "null");
  },
  // 监听属性
  watch: {
    //监听本地数组
    goods: {
      // 深度监听发
      deep: true,
      handler: function() {
        localStorage.setItem("goods", JSON.stringify(this.goods));
      }
    }
  },
  // 计算属性
  computed: {
    //计算总价
    num: function() {
      // 设置一个变量用来计数
      let num = 0;
      // 判断本地数组里有没有数据  如果没有就不进行循环便利
      if (this.goods.length !== 0) {
        // 如果有数据  就进行循环
        for (var i = 0; i < this.goods.length; i++) {
          if (this.goods[i].ischk) {
            // 然后把他们的单价和数量相乘得到总价
            num += this.goods[i].price * this.goods[i].number;
          }
        }
      }
      // 计算属性的函数一定要返回
      return num;
    },

    // 选中状态
    chlall: {
      // 读取数据
      get: function() {
        if (this.goods !== []) {
          // 循环本地商品详情数组
          for (var i = 0; i < this.goods.length; i++) {
            // 如果有一个为false 就让全选按钮为false
            if (this.goods[i].ischk == false) {
              return false;
            }
          }
        }
        // 如果没有就让他为选中状态
        return true;
      },
      // 设置数据
      set: function(newval) {
        if (this.goods !== []) {
          // 循环数组
          this.goods.forEach(v => {
            //  让每个复选框的值跟全选框的装态一致
            v.ischk = newval;
          });
        }
      }
    }
  },

  methods: {
    // 点击添加新的商品到浏览器
    addshop() {
      this.goods.push({
        name: this.shopform.name,
        price: this.shopform.price,
        number: this.shopform.number,
        ischk: this.shopform.ischk
      });
      // 清空商品对象
      this.shopform.name = this.shopform.price = this.shopform.number = "";
    },
    // 根据索引删除数据
    deleteshop(id) {
      // 现在本地数组里删除该数据
      this.goods.splice(id, 1);
    },

    // 批量删除
    removeall() {
      for (var i = this.goods.length - 1; i >= 0; i--) {
        // console.log(this.goods);
        if (this.goods[i].ischk == true) {
          // 现在本地数组里删除该数据
          this.goods.splice(i, 1);
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
