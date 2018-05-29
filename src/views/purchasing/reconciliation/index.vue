<template>
  <div>
      <el-form :model='search' :inline='true' label-width="120px">
          <!-- <el-form-item label='编号'>
              <el-input v-model='search.serial_number'></el-input>
          </el-form-item> -->
          <el-form-item label='油卡号'>
            <el-select v-model="search.oil_card_code" value-key="label" placeholder="选择油卡">

            <el-option v-for="item in oil_card_code" :label="item.oil_card_code" :key="item.id"  :value="item.oil_card_code">

            </el-option>

            </el-select>
          </el-form-item>
          <!-- <el-form-item label='姓名'>
              <el-input v-model='search.ture_name'></el-input>
          </el-form-item> -->
          <el-form-item label='周期'>
              <el-date-picker v-model="search.start_time" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              ~
              <el-date-picker v-model="search.end_time" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item>
              <el-button type='danger' @click='go_search'>查询</el-button>
          </el-form-item>
      </el-form>
      <div class="app-container">
      <el-row :gutter="30" style='color:#606266;' class='row'>
        <el-col :span="8">总金额: {{ sum_money }}</el-col>
        <el-col :span="8">圈存金额: {{ initialize_money }}</el-col>
        <el-col :span="8">充值金额: {{ recharge_money }}</el-col>
      </el-row>
      <el-table :data="list" class='table' v-loading.body="listLoading" border fit highlight-current-row>
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
      <el-table-column label="卡号" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.oil_card_code}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="时间" align="center">
        <template slot-scope="scope">
          {{scope.row.time}}
        </template>
      </el-table-column>
      <el-table-column label="金额" width="200" align="center">
        <template slot-scope="scope">
          <el-tag type='danger' v-if='scope.row.type == "sub"'>-{{scope.row.money}}</el-tag>
          <el-tag type='success' v-if='scope.row.type == "add"'>+{{scope.row.money}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-button type='danger'>生成对账单</el-button>
      </div>
  </div>
</template>

<script>
import { get_reconciliation_data } from '@/api/purchasing'
import { get_oil_card } from '@/api/configure'
export default {
  name: 'reconciliation',
  data() {
    return {
      search: {
        serial_number: '',
        oil_card_code: '',
        ture_name: '',
        time: ''
      },
      list: [],
      oil_card_code: [],
      sum_money: 0,
      initialize_money: 0,
      recharge_money: 0,
      listLoading: false
    }
  },
  created() {
    this.get_config()
  },
  methods: {
    get_config() {
      get_oil_card().then(res => {
        this.oil_card_code = res.data
      })
    },
    fetchData(param) {
      this.listLoading = true
      get_reconciliation_data(param).then(res => {
        this.list = res.data.data
        this.sum_money = res.data.total.sum
        this.initialize_money = res.data.total.sub
        this.recharge_money = res.data.total.add
        this.listLoading = false
      })
    },
    go_search() {
      this.fetchData(this.search)
    }
  }
}
</script>

<style scoped>
form{
    padding-top: 50px;
}
.row{
  margin-bottom: 20px;
}
.table{
  margin-bottom: 20px;
}
</style>
