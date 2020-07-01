<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item>
        <el-select v-model="queryOptions.status" clearable placeholder="归还状态" @change="selectForm()">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
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
        prop="user.name"
      />
      <el-table-column
        align="center"
        label="用户学号"
        prop="user.studentNumber"
      />
      <el-table-column
        align="center"
        prop="book.name"
        label="图书名"
      />
      <el-table-column
        align="center"
        label="归还状态"
        prop="borrowLog.status"
      >
        <template slot-scope="scope">
          <el-tag>
            <span v-if="scope.row.borrowLog.status===0">已还</span>
            <span v-if="scope.row.borrowLog.status===1">未还</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="borrowLog.borrowTime"
        label="借书时间"
      />
      <el-table-column
        align="center"
        prop="borrowLog.returnTime"
        label="归还时间"
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
            @click="handlebit(scope.row)"
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
import { queryBorrowLog } from '@/api/borrowLog'

export default {
  name: 'BorrowLog',
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
        label: '已还'
      }, {
        value: '1',
        label: '未还'
      }],
      value: ''
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
      queryBorrowLog(this.queryOptions).then((res) => {
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
    handleSizeChange(val) {
      this.queryOptions.pageSize = val
      this.requestData()
    },
    handleCurrentChange(val) {
      this.queryOptions.page = val
      this.requestData()
    },
    handleDelete(id) {

    }

  }

}
</script>
