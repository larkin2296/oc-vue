<template>
<el-container>
  <el-header>
    <el-form :inline="true" label-width="140px">
      <el-form-item label='油卡号'>
        {{ card }}
      </el-form-item>
      <el-form-item label='最近充值时间'>
        {{ last_recharge_time }}
      </el-form-item>
      <el-form-item label='已充金额'>
        {{ save_money }}
      </el-form-item>
      <el-form-item label='圈存金额'>
        {{ initialize_price }}
      </el-form-item>
    </el-form>
  </el-header>
  <el-main>
    <div class="app-container">
    <el-table :data="tableData" stripe style="width: 100%" border fit highlight-current-row>
    <el-table-column label="油卡">
      <template slot-scope="scope">
          {{scope.row.oil_number}}
        </template>
    </el-table-column>
    <el-table-column label="充值时间">
      <template slot-scope="scope">
          {{scope.row.end_time}}
        </template>
    </el-table-column>
    <el-table-column label="充值金额">
      <template slot-scope="scope">
          {{scope.row.already_card}}
        </template>
    </el-table-column>
      </el-table>
      </div>
  </el-main>
</el-container>
      
</template>

<script>
import { get_ldirectly_detail } from '@/api/purchasing'
export default {
  props: ['card'],
  data() {
    return {
      tableData: [],
      last_recharge_time: '',
      save_money: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_ldirectly_detail(this.card).then(response => {
        this.tableData = response.data
        this.last_recharge_time = response.data[0].end_time
        let tabs = response.data
        tabs.forEach((tab, index) => {
          this.save_money += Number(tab.already_card)
        })
      })
    }
  }
}
</script>
