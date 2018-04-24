<template>
<el-container>
  <el-header>
    <el-form :inline="true" label-width="140px">
      <el-form-item label='油卡号'>
        {{ oil_card_code }}
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
    <el-table :data="tableData" v-loading.body="listLoading" stripe style="width: 100%" border fit highlight-current-row>
    <el-table-column label="油卡">
      <template slot-scope="scope">
          {{scope.row.oil_card_code}}
        </template>
    </el-table-column>
    <el-table-column label="充值时间">
      <template slot-scope="scope">
          {{scope.row.recharge_time}}
        </template>
    </el-table-column>
    <el-table-column label="充值金额">
      <template slot-scope="scope">
          {{scope.row.recharge_price}}
        </template>
    </el-table-column>
    <el-table-column label="查看凭证">
      <template slot-scope="scope">
          <el-button type='warning'>查看</el-button>
        </template>
    </el-table-column>
      </el-table>
      </div>
  </el-main>
</el-container>
      
</template>

<script>
import { get_sdirectly_detail } from '@/api/purchasing'
export default {
  props: ['order'],
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_sdirectly_detail(this.order).then(response => {
        this.tableData = response
        this.listLoading = false
      })
    }
  }
}
</script>
