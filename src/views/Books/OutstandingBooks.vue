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
            v-if="scope.row.borrowLog.status===1"
            type="primary"
            size="mini"
            @click="handleReturn(scope.row.borrowLog.id)"
          >

            还书
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

<script>
import { queryBorrowLog } from '@/api/borrowLog'
import { returnBook } from '@/api/book'
export default {
  data() {
    return {
      total: 0,
      data: [],
      queryOptions: {
        keyWords: '',
        page: 1,
        pageSize: 10,
        status: '',
        sortType: 0
      }
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
    handleReturn(id) {
      returnBook(id).then((res) => {
        if (res.status === 0) {
          this.$message({
            message: '还书成功！',
            type: 'success'
          })
          this.requestData()
        }
      })
    },
    handleSizeChange(val) {
      this.queryOptions.pageSize = val
      this.requestData()
    },
    handleCurrentChange(val) {
      this.queryOptions.page = val
      this.requestData()
    },
    handlePersonInfo(user) {
      this.user = user
      this.showDialog = true
    },
    handleFilter() {
      this.queryOptions.page = 1
      this.requestData()
    },
    handleSelect(select) {
      this.selectUserId = select.map((item) => {
        return item.id
      })
    }

  }
}
</script>
