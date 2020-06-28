<template>
  <div class="app-container">
    <p>
      {{ message }}
    </p>
    <p>
      <el-input v-model="input" placeholder="序列号" />
    </p>
    <p>
      <el-input v-model="input" placeholder="书籍名称" />
    </p>
    <p>
      <el-input v-model="input" placeholder="作者" />
    </p>
    <p>
      <el-input v-model="input" placeholder="出版社" />
    </p>
    <p>
      <el-input v-model="input" placeholder="数量" />
    </p>
    <p>
      <el-select v-model="value" placeholder="请选择图书种类">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </p>
    <p>
      <el-select v-model="value" placeholder="请选择存储位置">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </p>
    <el-row>
      <el-button type="primary">确认</el-button>
    </el-row>

  </div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      message: '图书信息',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  }
}
</script>
