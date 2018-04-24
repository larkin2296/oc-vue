<template>
<el-container>
  <el-header>
    <div class='top'>
      <el-form :inline="true" label-width="140px">
        <el-form-item label='订单号'>
          {{ order_code }}
        </el-form-item>
        <el-form-item label='下单时间'>
          {{ order_time }}
        </el-form-item>
        <el-form-item label='卡密数量'>
          {{ camilo_num}} 张
        </el-form-item>
      </el-form>
    </div>
  </el-header>
  <el-main>
    <div class="app-container">
    <el-table :data="tableData" v-loading.body="listLoading" stripe style="width: 100%" border fit highlight-current-row>
    <el-table-column label="序号">
      <template slot-scope="scope">
        {{ scope.$index }}
        </template>
    </el-table-column>
    <el-table-column label="平台">
      <template slot-scope="scope">
        {{ scope.row.platform }}
        </template>
    </el-table-column>
    <el-table-column label="面额">
      <template slot-scope="scope">
        {{ scope.row.price }}
        </template>
    </el-table-column>
    <el-table-column label="卡密">
      <template slot-scope="scope">
        {{ scope.row.cam_name }}
        </template>
    </el-table-column>
      </el-table>
      </div>
  </el-main>
  <el-footer>
  </el-footer>
</el-container>
</template>

<script>
import { get_camilo_detail } from '@/api/purchasing'
export default {
  props: ['order'],
  data() {
    return {
      tableData: [],
      order_code: this.order,
      order_time: '',
      camilo_num: 0,
      camilo_use: 0,
      camilo_unuse: 0,
      camilo_problem: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_camilo_detail(this.order).then(response => {
        this.tableData = response
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.top{
  width:800px;
}
</style>
