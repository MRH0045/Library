<template>
  <el-table
    :data="message"
    style="width: 25%"
  >
    <el-table-column>
      <template slot-scope="scope">

        <el-popover trigger="click" placement="right">
          <p>名称: {{ scope.row.name }}</p>
          <p>作者: {{ scope.row.author }}</p>
          <p>出版社: {{ scope.row.press }}</p>
          <p>剩余: {{ scope.row.remind }}</p>
          <p> bns: {{ scope.row.id }}</p>
          <p>地址: {{ scope.row.addr }}</p>
          <div slot="reference" class="name-wrapper">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ scope.row.name }}</span>
                <el-button style="float: right; padding: 3px 0" type="text">详细信息</el-button>
              </div>
              <div>
                <p>{{ scope.row.author }}</p>
                <p>{{ scope.row.press }}</p>
              </div>
            </el-card>
          </div>
          <el-button type="text" @click="open(scope.$index, scope.row)">借阅</el-button>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
  .text {
    font-size: 20px;
  }

  .item {
    margin-bottom: 10px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: right
  }

  .box-card {
    width: 250px;
  }
</style>

<script>
export default {
  data() {
    return {
      message: [
        {
          id: '01',
          name: '我的前半生',
          author: '爱新觉罗·溥仪',
          press: '人民出版社',
          total: '10',
          remind: '5',
          addr: '1楼'

        },
        {
          id: '02',
          name: '我的前半生2',
          author: '溥仪',
          press: '人民出版社',
          total: '10',
          remind: '5',
          addr: '1楼'

        },
        {
          id: '03',
          name: '我的前半生3',
          author: '溥仪',
          press: '人民出版社',
          total: '10',
          remind: '5',
          addr: '1楼'

        }
      ],
      visible: false
    }
  },
  methods: {
    open() {
      this.$confirm('是否借阅此图书', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '借阅成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>
