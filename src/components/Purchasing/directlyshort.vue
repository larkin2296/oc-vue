<template>
  <div id='search'>
    <el-form :inline="true" ref="form" :model="form" label-width="120px">
      <el-form-item label='订单状态'>
        <el-select v-model="form.status" placeholder="请选择">
          <el-option
            v-for="item in c_status"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='姓名'>
        <el-input v-model="form.name" placeholder="姓名" />
      </el-form-item>
      <el-form-item label='订单号'>
        <el-input v-model="form.card" placeholder="订单号" />
      </el-form-item>
      <el-form-item label='最近充值时间'>
        <el-date-picker
        v-model="form.time_start"
        type="date"
        placeholder="选择日期" size='small'>
      </el-date-picker>~
      <el-date-picker
        v-model="form.time_end"
        type="date"
        placeholder="选择日期" size='small'>
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
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center">
        <template slot-scope="scope">
          {{scope.row.order_code}}
        </template>
      </el-table-column>
      <el-table-column label="需求金额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近充值时间" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="订单状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="订单累计充值金额">
        <template slot-scope="scope">
          <span>{{scope.row.real_unit_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="查看详情" align="center">
        <template slot-scope="scope">
          <el-button type="warning" @click="showdetail(scope.row.order_code)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除订单" align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="del(scope.row.order_code)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
import { get_sdirecty_order } from '@/api/purchasing'
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
      c_status: [{
        value: '0',
        label: '已完成'
      },
      {
        value: '1',
        label: '未完成'
      }],
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
      get_sdirecty_order().then(response => {
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
