<template>
  <div>
      <h3>提现记录</h3>
      <div class="app-container">
      <el-table :data='deposit_list' border fit highlight-current-row>
          <el-table-column label='提现单'>
                <template slot-scope="scope">
                <span>{{scope.row.forward_number}}</span>
                </template>
            </el-table-column>
            <el-table-column label='金额'>
                <template slot-scope="scope">
                <span>{{scope.row.money}}</span>
                </template>
            </el-table-column>
            <el-table-column label='提现时间'>
                <template slot-scope="scope">
                <span>{{scope.row.created_at}}</span>
                </template>
            </el-table-column>
            <el-table-column label='提现状态'>
                <template slot-scope="scope">
                <el-tag>{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>
            </el-table>
      </div>
  </div>
</template>

<script>
import { get_deposit_list } from '@/api/supplier'
export default {
  data() {
    return {
      deposit_list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_deposit_list().then(res => {
        this.deposit_list = res.data
      })
    }
  }
}
</script>

<style scoped>
h3{
  padding-left: 10px;
}
</style>
