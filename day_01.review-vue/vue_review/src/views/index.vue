<template>
  <div>
    首页
    <div v-for="(item,index) in students" :key="index">
      id:{{item.id}}
      姓名：{{item.students_name}}
      年龄：{{item.age}}
      头像：
      <img
        :src="item.face"
      />
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/students').then(res => {
      // 2. 保存到 data 中
      this.students = res.data.data
    })
  },
  data () {
    return {
      students: []
    }
  }
}
</script>
