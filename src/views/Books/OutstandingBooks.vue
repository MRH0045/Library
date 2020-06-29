<template>
  <el-table
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column
      label="名称"
      width="180"
    >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="数量"
      width="80"
    >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row. count }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="地址"
      width="80"
    >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.address }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          @click="handleDelete(scope.$index, scope.row)"
        >还书</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        name: '紫禁城的黄昏',
        count: '1',
        address: '2 楼'
      },
      {
        name: '紫禁城的黄昏2',
        count: '1',
        address: ' 2楼'
      }]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
