<template>
  <div class="app-container">

    <el-container>
      <el-header style="background-color: rgb(238, 220, 246)">
        <span>{{ name }}</span>
      </el-header>
      <el-main style="background-color: rgb(238, 241, 246)" width="100px">
        图书序号:
        <span>{{ index }}</span>
        <br>
        图书名称:
        <span>{{ name }}</span>
        <br>
        作者:
        <span>{{ author }}</span>
        <br>
        出版社:
        <span>{{ press }}</span>
        <br>
        数量:
        <span>{{ count }}</span>
        <br>
        可借数量:
        <span>{{ reminding }}</span>
        <br>
        地址:
        <span>{{ add }}</span>
      </el-main>
    </el-container>
  </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: top;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: top;
    line-height: 40px;
  }
</style>

<script lang="ts">

export default {
  data() {
    return {
      index: '1234',
      name: '我的前半生',
      author: '溥仪',
      press: '人民出版社',
      count: '10',
      reminding: '5',
      add: '1楼'

    }
  }
}
</script>
