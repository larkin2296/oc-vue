<template>
  <div id='search'>
    <el-form :inline="true" ref="form" :model="form" label-width="120px">
      <el-form-item label='编号'>
        <el-input v-model="form.number" placeholder="编号" />
      </el-form-item>
      <el-form-item label='姓名'>
        <el-input v-model="form.name" placeholder="姓名" />
      </el-form-item>
      <el-form-item label='卡号'>
        <el-input v-model="form.card" placeholder="卡号" />
      </el-form-item>
      <el-form-item label='最近充值时间'>
        <el-date-picker
        v-model="form.time_start"
        type="date"
        placeholder="选择日期" size='small' format="yyyy-MM-dd" value-format="yyyy-MM-dd">
      </el-date-picker>~
      <el-date-picker
        v-model="form.time_end"
        type="date"
        placeholder="选择日期" size='small' format="yyyy-MM-dd" value-format="yyyy-MM-dd">
      </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type='danger' >查找</el-button>
      </el-form-item>
  </el-form>
    <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          {{scope.row.serial_number}}
        </template>
      </el-table-column>
      <el-table-column label="油卡号" align="center">
        <template slot-scope="scope">
          {{scope.row.oil_card_code}}
        </template>
      </el-table-column>
      <el-table-column label="最近充值时间" align="center">
        <template slot-scope="scope">
          {{scope.row.last_recharge_time}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="充值金额">
        <template slot-scope="scope">
          <span>{{scope.row.total_money}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="created_at" label="已圈存金额">
        <template slot-scope="scope">
          <span>{{scope.row.initialize_price}}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="查看详情" align="center">
        <template slot-scope="scope">
          <el-button type="warning" @click="showdetail(scope.row.oil_card_code)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
import { get_ldirecty_order } from '@/api/purchasing'
export default {
  name: 'OcForm',
  data() {
    return {
      form: {
        status: '',
        number: '',
        card: '',
        price: '',
        time_start: '',
        time_end: '',
        name: ''
      },
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
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
      get_ldirecty_order().then(response => {
        console.log(response)
        this.list = response
        this.listLoading = false
      })
    },
    showdetail(code) {
      this.$emit('my-event', code)
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
form{
    padding-top: 50px;
}
</style>
