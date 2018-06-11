<template>
  <div>
      <el-form :inline="true" ref="form" :model="form" label-width="120px">
      <el-form-item label='订单状态'>
        <el-select v-model="form.order_status" placeholder="请选择">
          <el-option
            v-for="item in c_status"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='商品'>
        <el-select v-model="form.goods_type" value-key="label" placeholder="选择商品">

            <el-option v-for="item in platform" :label="item.platform_name" :key="item.id"  :value="item.platform_name">

            </el-option>

        </el-select>
      </el-form-item>
      <el-form-item label='订单号'>
        <el-input v-model="form.order_code" placeholder="订单号" />
      </el-form-item>
      <el-form-item label='面额'>
        <el-select v-model="form.card_price" placeholder="选择金额">

          <el-option v-for="item in platform_money" :label="item.denomination" :key="item.id"  :value="item.denomination">

          </el-option>

        </el-select>
      </el-form-item>
      <el-form-item label='交易时间'>
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
        <el-button type='danger' @click='go_search'>查找</el-button>
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
      <el-table-column class-name="status-col" label="备注" align="center">
        <template slot-scope="scope">
          {{scope.row.remark}}
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
import { get_config_detail, formatDate } from '@/api/configure'
export default {
  name: 's_camilo',
  data() {
    return {
      form: {
        time_end: formatDate((new Date().getTime()), 'yyyy-MM-dd')
      },
      c_status: [{
        value: '1',
        label: '未完成'
      },
      {
        value: '2',
        label: '已完成'
      }],
      platform: [],
      platform_money: [],
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
        this.list = response
        this.listLoading = false
      })
      get_config_detail().then(response => {
        this.platform = response.platform
        this.platform_money = response.denomination
      }).catch(error => {
        console.log(error)
      })
    },
    showdetail(code, time) {
      this.$emit('my-event', code, time)
    },
    go_search() {
      this.listLoading = true
      get_camilo_order(this.form).then(response => {
        console.log(response)
        this.list = response
        this.listLoading = false
      })
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
