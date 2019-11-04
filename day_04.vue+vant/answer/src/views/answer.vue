<template>
  <div class="question">
    <van-nav-bar title="答题" left-text left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active" @change="changeA">
      <van-tab :title='"全部("+ questions.length +")"'>
        <van-button v-if="!showq" type="primary" @click="handleAnswer">开始答题</van-button>
        <dl v-if="showq">
          <dt>
            <h1>题目:{{questions[cur_que].title}}</h1>
            </dt>
          <dd v-for="(item,index) in questions[cur_que].options" :key="index">
            <label class="cLabel">
              <input :value="index" v-model="answers[cur_que]" type="radio" name="1" />{{item}}
            </label>
          </dd>
          <van-button plain type="primary" v-if="showq" @click="moveNext">提交答案，进入下一题</van-button>
          <van-button plain type="primary" @click="showAnswer">查看答案</van-button>
          <br/>
          <van-tag type="primary" v-show="falg">正确答案：{{questions[cur_que].right + 1}}</van-tag>
        </dl>
      </van-tab>
      <van-tab :title='"答错的("+ wrong +")"'>
        <van-button v-if="!showq" type="primary" @click="handleAnswerA">开始答题</van-button>
        <dl v-if="showq">
          <dt>
            <h1>题目:{{questions[cur_que].title}}</h1>
            </dt>
          <dd v-for="(item,index) in questions[cur_que].options" :key="index">
            <label class="cLabel">
              <input :value="index" v-model="answers[cur_que]" type="radio" name="1" />{{item}}
            </label>
          </dd>
          <van-button plain type="primary" v-if="showq" @click="moveNext">提交答案，进入下一题</van-button>
          <van-button plain type="primary" @click="showAnswer">查看答案</van-button>
          <br/>
          <van-tag type="primary" v-show="falg">正确答案：{{questions[cur_que].right + 1}}</van-tag>
        </dl>
      </van-tab>
      <van-tab :title='"答对的("+ right +")"'>
        <van-button v-if="!showq" type="primary" @click="handleAnswerA">开始答题</van-button>
        <dl v-if="showq">
          <dt>
            <h1>题目:{{questions[cur_que].title}}</h1>
            </dt>
          <dd v-for="(item,index) in questions[cur_que].options" :key="index">
            <label class="cLabel">
              <input :value="index" v-model="answers[cur_que]" type="radio" name="1" />{{item}}
            </label>
          </dd>
          <van-button plain type="primary" v-if="showq" @click="moveNext">提交答案，进入下一题</van-button>
          <van-button plain type="primary" @click="showAnswer">查看答案</van-button>
          <br/>
          <van-tag type="primary" v-show="falg">正确答案：{{questions[cur_que].right + 1}}</van-tag>
        </dl>
      </van-tab>
      <van-tab :title='"没做过的("+ notdo +")"'>
        <van-button v-if="!showq" type="primary" @click="handleAnswer">开始答题</van-button>
        <dl v-if="showq">
          <dt>
            <h1>题目:{{questions[cur_que].title}}</h1>
            </dt>
          <dd v-for="(item,index) in questions[cur_que].options" :key="index">
            <label class="cLabel">
              <input :value="index" v-model="answers[cur_que]" type="radio" name="1" />{{item}}
            </label>
          </dd>
          <van-button plain type="primary" v-if="showq" @click="moveNext">提交答案，进入下一题</van-button>
          <van-button plain type="primary" @click="showAnswer">查看答案</van-button>
          <br/>
          <van-tag type="primary" v-show="falg">正确答案：{{questions[cur_que].right + 1}}</van-tag>
        </dl>
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
  data () {
    return {
      showq: false,
      falg: false,
      radio: '1',
      active: 0,
      questions: [], // 所有的题
      cur_que: 0, // 当前显示的题目的下标
      answers: [], // 所有用户勾选过的答案
      wrong: 0, // 答错的
      right: 0, // 答对的
      notdo: 0,
      index: 0
    }
  },
  methods: {
    // 查看答案
    showAnswer () {
      this.falg = !this.falg
    },
    // 返回跳转到首页
    onClickLeft () {
      this.$router.push('/')
    },
    // 初始化数据
    init () {
      this.answers = []
      this.cur_que = 0
    },
    handleAnswer () {
      this.showq = !this.showq
    },
    handleAnswerA () {
      this.showq = !this.showq
      // this.getQuestionById()
      this.init()
    },
    // 获取题目
    getQuestionById () {
      this.init()
      this.$http.get(`/categories/${1}/questions`).then(res => {
        this.questions = res.data.data
        this.notdo = this.questions.length
      })
    },
    moveNext () {
      let right = this.questions[this.cur_que].right
      let answers = this.answers[this.cur_que]
      // console.log(right)
      // console.log(answers)
      if (this.questions.length === this.answers.length) {
        // console.log('fejia')
        if (this.notdo !== 0) {
          this.notdo--
          if (answers !== undefined) {
            this.cur_que++
            if (answers === right) {
              this.right++
              this.$toast.success('答对了')
              this.index++
              sessionStorage.setItem('integral', this.index)
            } else {
              this.wrong++
              this.$toast.fail('答错了')
            }
          } else {
            // alert('请勾选一个答案')
            this.$dialog.alert({
              message: '请勾选一个答案'
            })
          }
        }
        this.$dialog.alert({
          message: '已完成所有题！'
        })
        this.cur_que--
        return
      }
      if (answers !== undefined) {
        this.cur_que++
        this.notdo--
        if (answers === right) {
          this.right++
          this.$toast.success('答对了')
          this.index++
          sessionStorage.setItem('integral', this.index)
          // let integ = sessionStorage.getItem('integral')
          // integ += 1
          // console.log(integ)
          // sessionStorage.setItem('integral')
          // console.log(sessionStorage.setItem('integral'))
        } else {
          this.wrong++
          this.$toast.fail('答错了')
        }
      } else {
        // alert('请勾选一个答案')
        this.$dialog.alert({
          message: '请勾选一个答案'
        })
      }

      // console.log(answers)
      // console.log(right)
    },
    changeA () {
      this.showq = false
    }
  },
  created () {
    this.index = sessionStorage.getItem('integral')
    this.getQuestionById()
    // 加载分类数据
    this.$http.get('/categories').then(res => {
      this.categories = res.data.data
    })
  }
}
</script>

<style scoped>
.van-button {
  margin: 15px 0px 0px 10px;
}
.cLabel {
  font-size: 20px;
}
</style>

