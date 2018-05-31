<template>
  <div>
      <div class="app-container">
      <el-table :data="list" class='table' v-loading.body="listLoading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="对账单号" align="center">
        <template slot-scope="scope">
          {{scope.row.order_code}}
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.recon_start}}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.recon_end}}</span>
        </template>
      </el-table-column>
      <el-table-column label="总金额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.total_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="圈存金额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.initialize_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="充值金额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.recharge_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label='状态'>
        <template slot-scope="scope">
        <el-tag v-if='scope.row.status == 1'>未完成</el-tag>
        <el-tag type='success' v-if='scope.row.status == 2'>已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
            <el-button type='warning' v-if='scope.row.status == 1' @click='show(scope.row.id)'>完成对账</el-button>
        </template>
      </el-table-column>
    </el-table>
      </div>
      <el-dialog
        title="对账记录"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <el-table :data='recon_list' border fit highlight-current-row>
        <el-table-column label='编号'>
          <template slot-scope="scope">
          {{ scope.row.serial_number }}
          </template>
        </el-table-column>
        <el-table-column label='油卡号'>
          <template slot-scope="scope">
          {{ scope.row.oil_card_code }}
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
        </el-dialog>
  </div>
</template>

<script>
import { get_reconciliation_list } from '@/api/purchasing'
import { set_reconciliation_status } from '@/api/administrator'
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      dialogVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_reconciliation_list().then(res => {
        this.list = res.data
        this.listLoading = false
      })
    },
    show(id) {
      set_reconciliation_status(id).then(res => {
        this.dialogVisible = true
        this.$message({
          type: 'success',
          message: '启动成功!'
        })
        this.fetchData()
      })
    },
    handleClose(done) {
      done()
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
