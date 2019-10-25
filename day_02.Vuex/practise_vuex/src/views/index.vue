<template>
  <div id="aa">
    <div class="box">
      <h3>分类列表</h3>
      <ul class="rrr">
        <li v-for="(item, index) in classify" :key="index">
          {{ index + 1 }}: {{ item.classify }}
          <button @click="getanswer(item.id)">开始答题</button>
        </li>
      </ul>
    </div>
    <div class="box">
      <h3>排行榜</h3>
      <ul>
        <li v-for="(item, index) in rankinglist" :key="index">
          {{ item.id }}, 姓名：{{ item.name }},积分:{{ item.point }}
        </li>
      </ul>
    </div>
    <div class="box">
      <h3>答题表</h3>
      <div v-if="answer[0]">
        <p class="question">题目：{{ answer[questionid - 1].question }}</p>
        <span class="LenB">{{ questionid }}/{{ answer.length }}</span>
        <ul>
          <li
            v-for="(item, index) in answer[questionid - 1].options"
            :key="index"
          >
            <input type="radio" name="answer" id />
            {{ item.qq }}
          </li>
        </ul>
        <div>
          <button @click="prev">上一题</button>
          <button @click="row">下一题</button>
        </div>
        <ul>
          <li class="qqq" v-for="index in answer.length" :key="index">
            {{ index }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      classify: [], //分类
      answer: [], //题库
      questionid: 1, // 题目id,
      intergra: 0,
      rankinglist: []
    };
  },
  created() {
    this.getclassify();
    this.ranking();
  },
  methods: {
    ...mapMutations(["setintegral"]),
    //获取分类
    getclassify() {
      this.$http.get("/classify").then(res => {
        this.classify = res.data.data;
      });
    },
    // 获取分类的题库
    getanswer(id) {
      this.$http.get(`/classify/${id}/question`).then(res => {
        this.answer = res.data.data;
        window.console.log(this.answer);
      });
    },
    //上一题
    prev() {
      this.questionid -= 1;
    },
    // 题目正确与否
    row() {
      if (this.questionid < this.answer.length) {
        this.$http.get("/answer").then(res => {
          this.questionid += 1;
          if (res.data.data.ok == 0) {
            this.intergra += 1;
            this.setintegral(this.intergra);
            document
              .querySelectorAll(".qqq")
              [this.questionid - 1].classList.add("green");
          } else {
            document
              .querySelectorAll(".qqq")
              [this.questionid - 1].classList.add("red");
          }
        });
      }
    },
    // 旁行榜
    ranking() {
      this.$http.get("/users").then(res => {
        window.console.log(res.data.data);

        this.rankinglist = res.data.data;
      });
    }
  }
};
</script>
<style>
#aa {
  overflow: auto;
}
.qqq {
  display: inline-block;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.LenB {
  position: absolute;
  top: 85px;
  right: 30px;
  color: orange;
  font-size: 30px;
  font-style: italic;
}
.box {
  position: relative;
  float: left;
  display: inline-block;
  margin-right: 30px;
  width: 400px;
  height: 400px;
  box-shadow: 10px -4px 5px #888888;
}
li {
  font-family: Microsoft YaHei;
  font-size: 20px;
  height: 50px;
  line-height: 50px;
}
.rrr li:nth-child(even) {
  background-color: pink;
  color: red;
}
li > button {
  margin-top: 13px;
  margin-right: 10px;
  float: right;
}
ul {
  padding: 0;
}
.question {
  display: inline-block;
  font-size: 25px;
}
.red {
  background-color: red;
}
.green {
  background-color: green;
}
</style>
