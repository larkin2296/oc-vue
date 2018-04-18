<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="订单号">
        <template slot-scope="scope">
          {{scope.row.order_code}}
        </template>
      </el-table-column>
      <el-table-column label="商品" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.goods}}</span>
        </template>
      </el-table-column>
      <el-table-column label="面额" align="center">
        <template slot-scope="scope">
          {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="交易时间" align="center">
        <template slot-scope="scope">
          {{scope.row.pay_time}}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="查看卡密" align="center">
        <template slot-scope="scope">
          <el-button type="warning">查看卡密</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { get_camilo_order } from '@/api/purchasing'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '已完成': 'success',
        '问题订单': 'gray',
        '未完成': 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_camilo_order().then(response => {
        // console.log(response.data.items)
        // this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
