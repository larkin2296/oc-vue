<template>
  <div>
      <el-button type='danger'>一键提现</el-button>
      <h3>卡密售出情况</h3>
      <div class="app-container">
      <el-table :data='camilo_list' border fit highlight-current-row>
          <el-table-column label='卡密'>
                <template slot-scope="scope">
                <span>{{scope.row.cam_name}}</span>
                </template>
            </el-table-column>
            <el-table-column label='面额'>
                <template slot-scope="scope">
                <span>{{scope.row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column label='供货状态'>
                <template slot-scope="scope">
                <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>
            </el-table>
      </div>
      <h3>直充售出情况</h3>
      <div class="app-container">
      <el-table :data='directly_list' border fit highlight-current-row>
          <el-table-column label='直充供应单号'>
                <template slot-scope="scope">
                <span>{{scope.row.order_code}}</span>
                </template>
            </el-table-column>
            <el-table-column label='金额'>
                <template slot-scope="scope">
                <span>{{scope.row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column label='供货状态'>
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
      camilo_list: [],
      directly_list: []
    }
  }
}
</script>

<style scoped>
h3{
  margin-left: 10px;
}
.el-button{
    margin:10px;
}
</style>
