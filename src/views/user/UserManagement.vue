<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item
        prop="keyWords"
      >
        <el-input
          v-model="queryOptions.keyWords"
          placeholder="请输入用户关键字"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          icon="el-icon-search"
          @click="handleFilter"
        >
          搜索
        </el-button>
      </el-form-item>
      <el-select v-model="queryOptions.postType" clearable placeholder="用户状态" @change="selectForm()">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <!-- <el-button
        type="primary"
        plain
        @click="showCheckbox=!showCheckbox"
      >
        多选
      </el-button>
      <el-button
        v-if="showCheckbox"
        type="danger"
        @click="handleBatchDelete"
      >
        批量冻结
      </el-button> -->
    </el-form>
    <el-table
      :data="data"
      stripe
      fit
      border
      style="width: 100%;"
      @selection-change="handleSelect"
    >

      <!-- <el-table-column
        v-if="showCheckbox"
        type="selection"
        width="55"
      /> -->
      <el-table-column
        align="center"
        label="用户名称"
        prop="name"
      />
      <el-table-column
        align="center"
        label="用户学号"
        prop="studentNumber"
      />
      <el-table-column
        align="center"
        prop="details"
        label="用户备注"
      />
      <el-table-column
        align="center"
        label="用户状态"
        prop="status"
      >
        <template slot-scope="scope">
          <el-tag>
            <span v-if="scope.row.status===0">正常</span>
            <span v-if="scope.row.status===1">封禁</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="effDate"
        label="生效时间"
      />
      <el-table-column
        align="center"
        prop="expDete"
        label="失效时间"
      />

      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status===0"
            type="primary"
            size="mini"
            @click="handlePost(scope.row)"
          >
            封禁
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.id)"
          >

            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="total > 0"
      :current-page.sync="queryOptions.page"
      :page-sizes="[10,20, 50, 100]"
      :page-size="10"
      layout="total,sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<script lang="ts">
import { queryUser, removeUser } from '@/api/user'

export default {
  name: 'UserManagement',
  data() {
    return {
      data: [],
      queryOptions: {
        keyWords: '',
        page: 1,
        pageSize: 10,
        status: '',
        sortType: 0
      },
      total: 0,
      loading: true,
      options: [{
        value: '0',
        label: '正常'
      }, {
        value: '1',
        label: '封禁'
      }],
      value: '',
      user: {}
    }
  },
  created() {
    this.requestData()
  },
  methods: {
    selectForm() {
      this.requestData()
    },
    requestData() {
      queryUser(this.queryOptions).then((res) => {
        if (res.status === 0) {
          this.data = res.data.data
          this.total = res.data.total
        }
      })
    },
    handleSelect(select) {
      this.selectUserId = select.map((item) => {
        return item.id
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
    },
    handleDelete(id) {
      removeUser(id).then((res) => {
        if (res.status === 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
        this.requestData()
      })
    }

  }

}
</script>
