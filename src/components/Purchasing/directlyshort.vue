<template>
  <div id='search'>
    <el-form :inline="true" ref="form" :model="form" label-width="120px">
      <el-form-item label='订单状态'>
        <el-select v-model="form.order_status" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="item in c_status"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='订单号'>
        <el-input v-model="form.order_code" placeholder="订单号" />
      </el-form-item>
      <!-- <el-form-item label='最近充值时间'>
        <el-date-picker
        v-model="form.time_start"
        type="datetime"
        placeholder="选择日期时间" size='small' format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>~
      <el-date-picker
        v-model="form.time_end"
        type="datetime"
        placeholder="选择日期时间" size='small' format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button type='danger' @click='go_search'>查找</el-button>
      </el-form-item>
  </el-form>
    <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
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
          <el-tag type='success' v-if='scope.row.status == 1'>未完成</el-tag>
          <el-tag type='info' v-else-if='scope.row.status == 2'>已完成</el-tag>
          <el-tag type='primary' v-else-if='scope.row.status == 3'>问题订单</el-tag>
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
          <el-button type="danger" v-if='scope.row.real_unit_price == 0' @click="del(scope.row.order_code)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
import { get_sdirecty_order, del_short_order } from '@/api/purchasing'
export default {
  name: 'OcForm',
  data() {
    return {
      form: {},
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
    },
    go_search() {
      this.listLoading = true
      get_sdirecty_order(this.form).then(response => {
        this.list = response
        this.listLoading = false
      })
    },
    del(code) {
      this.$confirm('确定删除短充订单？(如有已充值未到账订单将无法删除)', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del_short_order(code).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message.error('已有未到账充值，无法删除')
          }
        })
      }).catch(() => {
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
