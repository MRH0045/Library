<template>

  <div class="app-container">
    <div style="600px">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item v-if="user.name" label="昵称:">
          <span>{{ user.name }}</span>
        </el-form-item>
        <el-form-item v-if="user.username" label="用户名:">
          <br>
          <span>{{ user.username }}</span>
        </el-form-item>
        <br>
        <el-form-item v-if="user.studentNumber" label="学号:">
          <span>{{ user.studentNumber }}</span>
        </el-form-item><br>
        <el-form-item v-if="user.phone" label="手机号码:">
          <span>{{ user.phone }}</span>
        </el-form-item>
        <br>
        <el-form-item v-if="user.brrowedCount" label="已借图书:">
          <span>{{ user.brrowedCount }}</span>
        </el-form-item>
        <br>
        <el-form-item v-if="user.effDate" label="生效时间:">
          <span>{{ user.effDate }}</span>
        </el-form-item>
        <br>
        <el-form-item v-if="user.expDete" label="失效时间:">
          <span>{{ user.expDete }}</span>
        </el-form-item>
        <br>
        <el-form-item label="备注:">
          <span>{{ user.details }}</span>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script lang="ts">
import { getUserInfo } from '@/api/user'
export default {
  name: 'User',
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.requestData()
  },
  methods: {
    requestData() {
      getUserInfo().then((res) => {
        console.log(res)
        this.user = res.data
      })
    }
  }
}
</script>
