<template>
  <div>
      <el-form :inline="true" ref="form" :model="form" label-width="120px">
      <el-form-item label='卡密状态'>
        <el-select v-model="form.status" placeholder="请选择">
          <el-option
            v-for="item in c_status"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='商品'>
        <el-select v-model="form.goods" placeholder="请选择">
          <el-option
            v-for="item in c_goods"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='订单号'>
        <el-input v-model="form.order" placeholder="订单号" />
      </el-form-item>
      <el-form-item label='卡号'>
        <el-input v-model="form.card" placeholder="卡号" />
      </el-form-item>
      <el-form-item label='面额'>
        <el-select v-model="form.price" placeholder="请选择">
          <el-option
            v-for="item in c_price"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='卡密'>
        <el-select v-model="form.camilo_status" placeholder="请选择">
          <el-option
            v-for="item in c_status"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='交易时间'>
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
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="订单号">
        <template slot-scope="scope">
          {{scope.row.order_code}}
        </template>
      </el-table-column>
      <el-table-column label="商品" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.platform.platform_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="交易时间" align="center">
        <template slot-scope="scope">
          {{scope.row.created_at}}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.order_status | statusFilter">{{scope.row.order_status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="查看卡密" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.order_status == '已完成'" type="warning" @click="showdetail(scope.row.id, scope.row.created_at)">查看卡密</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
import { get_camilo_order } from '@/api/purchasing'
export default {
  name: 's_camilo',
  data() {
    return {
      form: {
        status: '',
        goods: '',
        order: '',
        card: '',
        price: '',
        time_start: '',
        time_end: ''
      },
      c_status: [{
        value: '0',
        label: '未用完'
      },
      {
        value: '1',
        label: '已用完'
      }],
      c_goods: [{
        value: '0',
        label: '汽车钱包'
      },
      {
        value: '1',
        label: '车传奇'
      }],
      c_price: [{
        value: '50',
        label: '50元'
      },
      {
        value: '100',
        label: '100元'
      }],
      list: null,
      listLoading: true,
      hello: '测试是不是成功'
    }
  },
  filters: {
    statusFilter(order_status) {
      const statusMap = {
        '已完成': 'success',
        '问题订单': 'gray',
        '未完成': 'danger'
      }
      return statusMap[order_status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_camilo_order(this.listQuery).then(response => {
        console.log(response)
        this.list = response
        this.listLoading = false
      })
    },
    showdetail(code, time) {
      this.$emit('my-event', code, time)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
#search{
  height: 500px;
}
</style>
