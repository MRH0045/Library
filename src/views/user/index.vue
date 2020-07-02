<template>
  <div class="app-container">
    <el-container>
      <el-main style="background-color: rgb(238, 241, 246)" width="100px">
        <el-form label-position="left" class="demo-table-expand">
          <el-form-item label="昵称:">
            <span>{{ user.name }}</span>
          </el-form-item>
          <el-form-item v-if="user.username" label="用户名:">
            <span>{{ user.username }}</span>
          </el-form-item>
          <el-form-item v-if="user.studentNumber" label="学号:">
            <span>{{ user.studentNumber }}</span>
          </el-form-item>
          <el-form-item label="手机号码:">
            <span>{{ user.phone }}</span>
          </el-form-item>
          <el-form-item v-if="user.brrowedCount" label="已借图书:">
            <span>{{ user.brrowedCount }}</span>
          </el-form-item>

          <el-form-item v-if="user.effDate" label="生效时间:">
            <span>{{ user.effDate }}</span>
          </el-form-item>

          <el-form-item v-if="user.expDete" label="失效时间:">
            <span>{{ user.expDete }}</span>
          </el-form-item>

          <el-form-item label="备注:">
            <span>{{ user.details }}</span>
          </el-form-item>
          <div style="text-align: right; margin: 0">

            <el-button type="primary" @click="showpostDetail = true">修改信息</el-button>

          </div>
        </el-form>
      </el-main>
    </el-container>
    <el-dialog
      :title="'修改信息'"
      :visible.sync="showpostDetail"
      width="50%"
      @close="flush()"
    >
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="user.name" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="user.phone" />
        </el-form-item>
        <el-form-item label="备注" prop="details">
          <el-input v-model="user.details" type="textarea" />
        </el-form-item>
        <div style="text-align: right; margin: 0">
          <el-form-item><el-button @click="showpostDetail = false">取消</el-button>
            <el-button type="primary" @click="handleInfo">修改</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>

  </div>
</template>

<style >
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 10px;
    width: 50%;
  }
</style>>
<script lang="ts">
import { getUserInfo, updateUserInfo } from '@/api/user'
export default {
  name: 'User',
  data() {
    return {
      showpostDetail: false,
      user: {}
      // updateForm: {
      //   id: '',
      //   name: '',
      //   details: ''
      // }
    }
  },
  created() {
    this.requestData()
  },
  methods: {
    requestData() {
      getUserInfo().then((res) => {
        this.user = res.data
      })
    },
    flush() {
      this.showpostDetail = false
      this.requestData()
    },
    handleInfo() {
      updateUserInfo(this.user).then((res) => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.requestData()
        this.showpostDetail = false
      })
    }
  }
}
</script>
