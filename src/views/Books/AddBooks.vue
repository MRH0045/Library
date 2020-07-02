<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">

      <el-form-item label="图书名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>

      <el-form-item label="ISBN" prop="isbn">
        <el-input v-model="ruleForm.isbn" />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="ruleForm.author" />
      </el-form-item>
      <el-form-item label="出版社名称" prop="namePub">
        <el-input v-model="ruleForm.namePub" />
      </el-form-item>

      <el-form-item label="图书简介" prop="details">
        <el-input v-model="ruleForm.details" type="textarea" />
      </el-form-item>
      <el-form-item label="出版日期" prop="dataPub">

        <el-date-picker
          v-model="ruleForm.dataPub"
          type="datetime"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="图书类别" prop="bookKind">
        <el-select v-model="ruleForm.bookKind" placeholder="请选择图书类别">
          <el-option v-for="item in bookKind" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="存放位置" prop="bookSite">
        <el-select v-model="ruleForm.bookSite" placeholder="请选择图书存放位置">
          <el-option v-for="item in bookSite" :key="item.id" :label="item.area+item.bookcaseNum" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="图书总量" prop="ruleTotal">
        <el-input-number v-model="ruleForm.total" :min="1" :max="1000" label="图书总量" />
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
          <img v-if="ruleForm.bookPicture" :src="ruleForm.bookPicture" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>

      <el-form-item style="float:right;">
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<style>
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
import { getAllBookLocation } from '@/api/bookLocation'
import { queryAllBookType } from '@/api/bookType'
import { addBook } from '@/api/book'
export default {
  data() {
    return {
      bookKind: [],
      bookSite: [],
      value: '',
      ruleForm: {
        name: '',
        isbn: '',
        author: '',
        bookPicture: '',
        bookKind: '',
        namePub: '',
        details: '',
        bookSite: '',
        total: 1,
        dataPub: ''
      },
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
        total: [
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
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.status === 0) {
        this.ruleForm.bookPicture = 'http://localhost:8000/img/' + res.data
        console.log(this.ruleForm.bookPicture)
      }
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isLt5M
    },
    requestData() {
      getAllBookLocation().then((res) => {
        this.bookSite = res.data
      })
      queryAllBookType().then((res) => {
        this.bookKind = res.data
      })
    },
    submitForm() {
      addBook(this.ruleForm).then((res) => {
        console.log(res)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}

</script>
