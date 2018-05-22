<template>
  <div>
    <el-form :inline="true" label-width="120px" style='margin-top:20px;'>
        <el-form-item label='商品'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='面额'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='交易时间'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='订单号'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='卡号'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='卡密状态'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type='danger'>查询</el-button>
        </el-form-item>
    </el-form>
    <div class='app-container'>
        <el-table :data='camilo_order' v-loading.body="listLoading" border fit highlight-current-row>
            <el-table-column label='订单号'>
                <template slot-scope="scope">
                    {{ scope.row.order_code }}
                </template>
            </el-table-column>
            <el-table-column label='油卡'>
                <template slot-scope="scope">
                    {{ scope.row.platform_id.platform_name }}
                </template>
            </el-table-column>
            <el-table-column label='金额'>
                <template slot-scope="scope">
                    {{ scope.row.num }}
                </template>
            </el-table-column>
            <el-table-column label='时间'>
                <template slot-scope="scope">
                    {{ scope.row.denomination.denomination * scope.row.num }}
                </template>
            </el-table-column>
            <el-table-column label='折扣'>
                <template slot-scope="scope">
                    {{ scope.row.discount }}
                </template>
            </el-table-column>
            <el-table-column label='实际总价'>
                <template slot-scope="scope">
                    {{ scope.row.denomination.denomination * scope.row.num * scope.row.discount }}
                </template>
            </el-table-column>
            <el-table-column label='已充值金额'>
                <template slot-scope="scope">
                    {{ scope.row.denomination.denomination * scope.row.num * scope.row.discount }}
                </template>
            </el-table-column>
            <el-table-column label='操作' width='200'>
                <template slot-scope="scope">
                    <el-button type='warning' size="mini" @click='end_send_camilo'>查看</el-button>
                    <el-button type='primary' size="mini"  @click='show_detail(scope.row.id)'>充值</el-button>  
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
    title="卡密详情"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-table :data='camilo_detail_list' border fit highlight-current-row>
    <el-table-column label='卡密字段一'>
        <template slot-scope="scope">
        {{ scope.row.cam_name }}
        </template>
    </el-table-column>
    <el-table-column label='卡密字段二'>
        <template slot-scope="scope">
        {{ scope.row.cam_other_name }}
        </template>
    </el-table-column>
    <el-table-column label='卡密状态'>
        <template slot-scope="scope">
            <el-tag type='success' v-if='scope.row.status == 2'>未使用</el-tag>
            <el-tag type='info' v-else-if='scope.row.status == 3'>问题卡密</el-tag>
            <el-tag type='primary' v-else-if='scope.row.status == 4'>销卡成功</el-tag>
        </template>
    </el-table-column>
    <el-table-column label='备注'>
        <template slot-scope="scope">
        {{ scope.row.remark }}
        </template>
    </el-table-column>  
    </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { get_pcamilo_order, send_camilo_data } from '@/api/administrator'
import { get_camilo_detail } from '@/api/purchasing'
export default {
  data() {
    return {
      listLoading: true,
      camilo_order: [],
      camilo_detail_list: [],
      dialogVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_pcamilo_order(this.listQuery).then(response => {
        this.camilo_order = response.data
        this.listLoading = false
      })
    },
    send_camilo(index) {
      let param = this.camilo_order[index]
      this.$confirm('是否下发卡密?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        send_camilo_data(param).then(response => {
          if (response.code === '200') {
            this.$message({
              type: 'success',
              message: '卡密下发成功!'
            })
          }
        }).catch(error => {
          console.log(error)
          this.$message.error('卡密下发失败!')
        })
      }).catch(() => {
      })
    },
    show_detail(id) {
      get_camilo_detail(id).then(response => {
        this.camilo_detail_list = response.data
        this.dialogVisible = true
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        done()
      }).catch(_ => {})
    }
  }
}
</script>
