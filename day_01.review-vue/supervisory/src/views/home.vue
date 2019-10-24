<template>
  <el-container>
    <el-header>
      <div class="logo">
        <img src="../assets/timg.jpg" alt />
        <span>传智健康档案管理系统</span>
      </div>
      <el-button type="info">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.logo {
  display: flex;
  font-size: 22px;
  align-items: center;
  user-select: none;
}
img {
  padding: 0;
  margin: 0;
  font-size: 14px;
  width: 60px;
  margin-right: 10px;
}

.el-header {
  background-color: #ffffff;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
