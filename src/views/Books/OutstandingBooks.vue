<template>
  <div class="app-container">

    <el-dialog
      :title="`个人信息`"
      :visible.sync="showDialog"
      width="30%"
      @close="showDialog = false"
    >
      <el-container>
        <el-aside width="100px" />
        <el-main>
          <span>

            <el-avatar
              shape="square"

              src="user.headPortrait"
            /></span>
          <br><br>
          <span> <i class="el-icon-user" />
            真实姓名:{{ user.realName }}</span><br><br>
          <span>
            <svg-icon icon-class="sex" />
            性别:{{ user.sex?user.sex:'未填写' }}</span><br><br>
          <span> <i class="el-icon-mobile" />
            手机:{{ user.phone?user.phone:'未填写' }}</span><br><br>
          <span>
            <svg-icon icon-class="qq" />
            QQ:{{ user.qq ?user.qq:'未填写' }}</span><br><br>

        </el-main>
        <el-aside width="100px" />
      </el-container>

    </el-dialog>

  </div>
</template>

<script lang="ts">
import { queryUser, forbidUser } from '@/api/manager'

export default {
  name: 'User',
  data() {
    return {
      data: [],
      selectUserId: [],
      queryOptions: {
        nickName: '',
        page: 1,
        pageSize: 10
      },
      user: {},
      total: 0,
      loading: true,
      showDialog: false
    }
  },
  created() {
    // this.requestData()
  },
  methods: {
    requestData() {
      queryUser(this.queryOptions).then(res => {
        if (res.status === 0) {
          this.data = res.data.list
          this.total = res.data.total
          this.loading = false
        }
      })
    },
    handleSelect(select) {
      this.selectUserId = select.map(item => {
        return item.id
      })
    },
    handleForbid(id) {
      this.$confirm(`确定封禁(解禁)用户吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        forbidUser(id).then(res => {
          if (res.status === 0) {
            this.requestData()
            this.$message({
              type: 'success'
              // message: res.msg
            })
          }
        })
      })
    },
    handleFilter() {
      this.queryOptions.page = 1
      this.requestData()
    },
    handlePersonInfo(user) {
      this.user = user
      this.showDialog = true
    },
    handleSizeChange(val) {
      this.queryOptions.pageSize = val
      this.requestData()
    },
    handleCurrentChange(val) {
      this.queryOptions.page = val
      this.requestData()
    }
  }
}
</script>
