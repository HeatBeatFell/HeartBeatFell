<template>
  <div class="question">
    <!-- 导航 -->
    <van-nav-bar
      :title="$route.query.cat_name"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 题目 -->
    <van-tabs v-model="type">
      <van-tab name="all" :title="'全部(' + total + ')'"></van-tab>
      <van-tab name="right" :title="'答对的(' + right + ')'"></van-tab>
      <van-tab name="wrong" :title="'达错的(' + wrong + ')'"></van-tab>
      <van-tab name="undo" :title="'未做的(' + undo + ')'"></van-tab>
    </van-tabs>
    <div class="ti">
      <van-button v-if="question.length ==0" type="primary" @click="getquestions">开始答题</van-button>

    <div v-else>
      <h2> 题目：{{ question[cur_qer].title }}</h2>

      <van-radio-group>
        <van-radio
          v-for="(item, index) in question[cur_qer].options.split(',')"
          :key="index"
          name="1"
        >
          {{ item }}
        </van-radio>
      </van-radio-group>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "all",
      total: "",
      right: "",
      wrong: "",
      undo: "",
      question: [],
      cur_qer: 0
    };
  },
  created() {
    this.$http
      .get(`/categories/${this.$route.query.id}/question_count_info`)
      .then(res => {
        this.total = res.data.data.total;
        this.right = res.data.data.right;
        this.wrong = res.data.data.wrong;
        this.undo = res.data.data.undo;
      });
  },
  methods: {
    getquestions() {
      this.$http
        .get(`/categories/${this.$route.query.id}/questions?type=${this.type}`)
        .then(res => {
          this.question = res.data.data;
        });
    }
  }
};
</script>

<style>
.question .ti{
  padding: 20px;
}
</style>
