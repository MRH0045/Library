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
          clearable
          @clear="handleFilter"
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
    <el-table
      :data="data"
      stripe
      fit
      border
      style="width: 100%;"
      @selection-change="handleSelect"
    >

      <el-table-column
        align="center"
        label="ISBN"
        prop="isbn"
      />
      <el-table-column
        align="center"
        label="书名"
        prop="name"
      />
      <el-table-column
        align="center"
        label="作者"
        prop="author"
      />
      <el-table-column
        align="center"
        prop="namePub"
        label="出版社名称"
      />
      <el-table-column
        align="center"
        label="已借出数量"
        prop="lendCount"
      />
      <el-table-column
        align="center"
        label="总量"
        prop="total"
      />
      <el-table-column
        align="center"
        prop="dataPub"
        label="出版时间"
      />

      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handlebit(scope.row)"
          >
            编辑
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
    <el-dialog
      :title="'修改图书信息'"
      :visible.sync="showpostDetail"
      width="50%"
      @close="showpostDetail = false"
    >
      <el-form ref="book" :model="book" :rules="rules" label-width="100px" class="demo-ruleForm">

        <el-form-item label="图书名称" prop="name">
          <el-input v-model="book.name" />
        </el-form-item>

        <el-form-item label="ISBN" prop="isbn">
          <el-input v-model="book.isbn" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="book.author" />
        </el-form-item>
        <el-form-item label="出版社名称" prop="namePub">
          <el-input v-model="book.namePub" />
        </el-form-item>

        <el-form-item label="图书简介" prop="details">
          <el-input v-model="book.details" type="textarea" />
        </el-form-item>
        <el-form-item label="出版日期" prop="dataPub">
          <el-date-picker
            v-model="book.dataPub"
            type="datetime"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="图书类别" prop="bookKind">
          <el-select v-model="book.bookKind" placeholder="请选择图书类别">
            <el-option v-for="item in bookKind" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="存放位置" prop="bookSite">
          <el-select v-model="book.bookSite" placeholder="请选择图书存放位置">
            <el-option v-for="item in bookSite" :key="item.id" :label="item.area+item.bookcaseNum" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="图书总量" prop="ruleTotal">
          <el-input-number v-model="book.total" :min="1" :max="1000" label="图书总量" />
        </el-form-item>

        <el-form-item label="上传封面图片" prop="bookPicture">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8000/v1/system/uploadAvatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="image"
            with-credentials
          >
            <img v-if="book.bookPicture" :src="book.bookPicture" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
      >
        <el-button type="primary" @click="submitForm()">修改</el-button>
        <el-button @click="showpostDetail = false">
          取 消
        </el-button>
      </div>

    </el-dialog>
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
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script lang="ts">
import { queryAllBooks, removeBook, updateBook } from '@/api/book'
import { getAllBookLocation } from '@/api/bookLocation'
import { queryAllBookType } from '@/api/bookType'

export default {
  name: 'UserManagement',
  data() {
    return {
      bookSite: [],
      bookKind: [],
      data: [],
      queryOptions: {
        keyWords: null,
        page: 1,
        pageSize: 10,
        status: '',
        sortType: 0
      },
      // ruleForm: {
      //   id: '',
      //   name: '',
      //   isbn: '',
      //   author: '',
      //   bookPicture: '',
      //   bookKind: '',
      //   namePub: '',
      //   details: '',
      //   bookSite: '',
      //   total: 1,
      //   dataPub: ''
      // },
      total: 0,
      loading: true,
      value: '',
      showpostDetail: false,
      book: {},
      rules: {
        name: [
          { required: true, message: '请输入图书名称', trigger: 'blur' }
        ],
        isbn: [
          { required: true, message: '请输入图书isbn', trigger: 'blur' }
        ],
        namePub: [
          { required: true, message: '请输入出版社名称', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者名字', trigger: 'blur' }
        ],
        ruleTotal: [
          { required: true, message: '请输入图书总量', trigger: 'blur' }
        ],
        bookKind: [
          { required: true, message: '请选择图书类别', trigger: 'change' }
        ],
        bookSite: [
          { required: true, message: '请选择图书存放位置', trigger: 'change' }
        ],
        details: [
          { required: true, message: '请填写图书简介', trigger: 'blur' }
        ]
      }
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
    submitForm() {
      updateBook(this.book).then((res) => {
        if (res.status === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
        this.showpostDetail = false
        this.requestData()
      })
    },
    requestData() {
      queryAllBooks(this.queryOptions).then((res) => {
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
    handlebit(item) {
      this.book = item
      this.showpostDetail = true
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
      removeBook(id).then((res) => {
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
