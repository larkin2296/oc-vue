<template>
  <div>
    <el-tabs type="border-card">
        <el-tab-pane label="卡密订单">
            <el-form :inline="true" label-width="120px">
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
                    <el-table-column label='商品'>
                        <template slot-scope="scope">
                            {{ scope.row.platform_id.platform_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='数量'>
                        <template slot-scope="scope">
                            {{ scope.row.num }}
                        </template>
                    </el-table-column>
                    <el-table-column label='面额'>
                        <template slot-scope="scope">
                            {{ scope.row.denomination.denomination }}
                        </template>
                    </el-table-column>
                    <el-table-column label='总价'>
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
                    <el-table-column label='提交时间'>
                        <template slot-scope="scope">
                            {{ scope.row.created_at.date }}
                        </template>
                    </el-table-column>
                    <el-table-column label='操作' width='200'>
                        <template slot-scope="scope">
                            <el-button type='danger' size="mini" v-if='scope.row.status == 1' @click='send_camilo(scope.$index)'>发放卡密</el-button>
                            <el-button type='warning' size="mini" v-if='scope.row.status == 1' @click='end_send_camilo'>终止发放</el-button>
                            <el-button type='primary' v-if='scope.row.status == 2' @click='show_detail(scope.row.id)'>查看下发卡密</el-button>
                            <el-button type='info' v-if='scope.row.status == 3' >已终止</el-button>   
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
        </el-tab-pane>
        <el-tab-pane label="代充订单">
            <el-form :inline="true" label-width="120px">
                <el-form-item label='采购商'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='油卡编号'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='油卡姓名'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='油卡号'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='交易日期'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='对账状态'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type='danger'>查询</el-button>
                </el-form-item>
            </el-form>
            <div class='app-container'>
                <el-table :data='directly_order' border fit highlight-current-row>
                    <el-table-column label='采购商'>
                        <template slot-scope="scope">
                            {{ scope.row.purchasing_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='油卡编号'>
                        <template slot-scope="scope">
                            {{ scope.row.serial_number }}
                        </template>
                    </el-table-column>
                    <el-table-column label='油卡姓名'>
                        <template slot-scope="scope">
                            {{ scope.row.ture_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='油卡号'>
                        <template slot-scope="scope">
                            {{ scope.row.oil_number }}
                        </template>
                    </el-table-column>
                    <el-table-column label='交易日期'>
                        <template slot-scope="scope">
                            {{ scope.row.end_time }}
                        </template>
                    </el-table-column>
                    <el-table-column label='供应号'>
                        <template slot-scope="scope">
                            {{ scope.row.supply_single_number }}
                        </template>
                    </el-table-column>
                    <el-table-column label='金额'>
                        <template slot-scope="scope">
                            {{ scope.row.already_card }}
                        </template>
                    </el-table-column>
                    <el-table-column label='折后金额'>
                        <template slot-scope="scope">
                            {{ scope.row.discount * scope.row.already_card }}
                        </template>
                    </el-table-column>
                    <el-table-column label='对账状态'>
                        <template slot-scope="scope">
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                    <el-table-column label='折扣'>
                        <template slot-scope="scope">
                            {{ scope.row.discount }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { get_pcamilo_order, send_camilo_data, get_pdirectly_order } from '@/api/administrator'
import { get_camilo_detail } from '@/api/purchasing'
export default {
  data() {
    return {
      listLoading: true,
      camilo_order: [],
      camilo_detail_list: [],
      dialogVisible: false,
      directly_order: []
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
      get_pdirectly_order(this.listQuery).then(res => {
        this.directly_order = res.data
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
