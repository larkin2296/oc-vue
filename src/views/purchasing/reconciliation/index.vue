<template>
  <div>
      <el-form :inline='true' label-width="120px">
          <el-form-item label='编号'>
              <el-input></el-input>
          </el-form-item>
          <el-form-item label='油卡号'>
              <el-input></el-input>
          </el-form-item>
          <el-form-item label='姓名'>
              <el-input></el-input>
          </el-form-item>
          <el-form-item label='周期'>
              <el-date-picker
                v-model="value6"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
          </el-form-item>
          <el-form-item>
              <el-button type='danger'>查询</el-button>
          </el-form-item>
      </el-form>
      <div class="app-container">
      <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
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
      <el-table-column class-name="status-col" label="对账周期" align="center">
        <template slot-scope="scope">
          {{scope.row.cutoff_time}}
        </template>
      </el-table-column>
      <el-table-column label="圈存金额" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.initialize}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="差额" align="center">
        <template slot-scope="scope">
          {{scope.row.balance}}
        </template>
      </el-table-column>
    </el-table>
      </div>
    <el-button type="danger" plain>付款</el-button>
  </div>
</template>

<script>
export default {
  name: 'reconciliation'
}
</script>

<style scoped>
form{
    padding-top: 50px;
}
</style>
