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
          placeholder="请输入图书关键字"
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
      <el-form-item>
        <el-select v-model="queryOptions.bookKind" clearable placeholder="图书类别" @change="selectForm()">
          <el-option v-for="item in bookKind" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryOptions.bookSite" clearable placeholder="存放位置" @change="selectForm()">
          <el-option v-for="item in bookSite" :key="item.id" :label="item.area+item.bookcaseNum" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>

    <el-row>
      <el-col v-for="(item, index) in data" :key="index" style="width:312px">
        <el-card :body-style="{ padding: '8px' }" shadow="hover" style="width:280px;height:450px;margin-bottom:20px">

          <el-image style="width: 260px; height: 300px" :src="item.bookPicture" fit="cover" />
          <div style="padding: 10px;">
            <p>书名：{{ item.name }}</p>
            <p>作者：{{ item.author }}</p>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="handleBook(item)">查看详情></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      :title="book.name"
      :visible.sync="showpostDetail"
      width="50%"
      @close="showpostDetail = false"
    >
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="图书名称">
          <span>{{ book.name }}</span>
        </el-form-item>
        <el-form-item label="作者">
          <span>{{ book.author }}</span>
        </el-form-item>
        <el-form-item label="ISBN">
          <span>{{ book.isbn }}</span>
        </el-form-item>
        <el-form-item label="出版社名称">
          <span>{{ book.namePub }}</span>
        </el-form-item>
        <el-form-item label="图书类别">
          <span>{{ book.bookKind }}</span>
        </el-form-item>
        <el-form-item label="图书位置">
          <span>{{ book.bookSite }}</span>
        </el-form-item>
        <el-form-item label="可借数量">
          <span>{{ book.total-book.lendCount }}</span>
        </el-form-item>
        <el-form-item label="出版日期">
          <span>{{ book.dataPub }}</span>
        </el-form-item>
        <el-form-item label="图书简介">
          <span>{{ book.details }}</span>
        </el-form-item>
        <div style="text-align: right; margin: 0">
          <el-form-item><el-button @click="showpostDetail = false">取消</el-button>
            <el-button type="primary" @click="lendBook(book.id)">借书</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <div><el-pagination
      v-show="total > 0"
      :current-page.sync="queryOptions.page"
      :page-sizes="[12,16,20,24]"
      :page-size="12"
      layout="total,sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /></div>

  </div>

</template>

<style >
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
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
<script>
import { queryAllBooks, borrowBook } from '@/api/book'
import { getAllBookLocation } from '@/api/bookLocation'
import { queryAllBookType } from '@/api/bookType'
export default {
  data() {
    return {
      showpostDetail: false,
      data: [],
      bookSite: [],
      bookKind: [],
      queryOptions: {
        keyWords: '',
        page: 1,
        pageSize: 12,
        bookKind: '',
        bookSite: '',
        sortType: 0
      },
      total: 0,
      options: [{
        value: '0',
        label: '正常'
      }, {
        value: '1',
        label: '封禁'
      }],
      book: {}
    }
  },
  created() {
    this.requestData()
    getAllBookLocation().then((res) => {
      this.bookSite = res.data
    })
    queryAllBookType().then((res) => {
      this.bookKind = res.data
    })
  },
  methods: {
    selectForm() {
      this.requestData()
    },
    requestData() {
      queryAllBooks(this.queryOptions).then((res) => {
        this.data = res.data.data
        this.total = res.data.total
      })
    },
    lendBook(id) {
      borrowBook(id).then((res) => {
        if (res.status === 0) {
          this.$message({
            message: '借书成功！',
            type: 'success'
          })
          this.showpostDetail = false
          this.requestData()
        }
      })
    },
    handleBook(item) {
      this.book = item
      for (var i = 0; i < this.bookSite.length; i++) {
        if (item.bookSite === this.bookSite[i].id) {
          this.book.bookSite = this.bookSite[i].area + this.bookSite[i].bookcaseNum
        }
      }
      for (var j = 0; j < this.bookKind.length; j++) {
        if (item.bookKind === this.bookKind[j].id) {
          this.book.bookKind = this.bookKind[j].name
        }
      }
      this.showpostDetail = true
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
    }
  }
}
</script>
