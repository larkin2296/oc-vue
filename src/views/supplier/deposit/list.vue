<template>
  <div>
      <h3>提现记录</h3>
      <div class="app-container">
      <el-table :data='deposit_list' border fit highlight-current-row>
          <el-table-column label='提现单'>
                <template slot-scope="scope">
                <span>{{scope.row.cam_name}}</span>
                </template>
            </el-table-column>
            <el-table-column label='金额'>
                <template slot-scope="scope">
                <span>{{scope.row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column label='提现时间'>
                <template slot-scope="scope">
                <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>
            <el-table-column label='提现状态'>
                <template slot-scope="scope">
                <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>
            </el-table>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deposit_list: []
    }
  }
}
</script>

<style scoped>
h3{
  padding-left: 10px;
}
</style>
