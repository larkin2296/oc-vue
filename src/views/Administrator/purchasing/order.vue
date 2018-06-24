<template>
  <div>
    <el-tabs type="border-card">
        <el-tab-pane label="卡密订单">
            <el-form v-model='form' :inline="true" label-width="120px">
                <el-form-item label='商品'>
                    <el-select v-model="form.goods_type" value-key="label" placeholder="选择商品">
                        <el-option label="全部" value=""></el-option>

                        <el-option v-for="item in platform" :label="item.platform_name" :key="item.id"  :value="item.platform_name">

                        </el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label='面额'>
                    <el-select v-model="form.card_price" placeholder="选择金额">
                        <el-option label="全部" value=""></el-option>

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
                <el-form-item label='订单号'>
                    <el-input v-model='form.order_code'></el-input>
                </el-form-item>
                <el-form-item label='卡密状态'>
                    <el-select v-model="form.order_status" placeholder="状态">
                        <el-option label="全部" value=""></el-option>
                    <el-option label="未完成" value="1"></el-option>
                    <el-option label="终止发放" value="3"></el-option>
                    <el-option label="已完成" value="2"></el-option>                
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type='danger' @click='go_search'>查询</el-button>
                </el-form-item>
            </el-form>
            <div class='app-container'>
                <el-table :data='camilo_order' v-loading.body="listLoading" border fit highlight-current-row height='600'>
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
                            <el-button type='warning' size="mini" v-if='scope.row.status == 1' @click='end_send_camilo(scope.$index)'>终止发放</el-button>
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
            <el-form v-model='form1' :inline="true" label-width="120px">
                <!-- <el-form-item label='采购商'>
                    <el-input v-model='form1.user'></el-input>
                </el-form-item> -->
                <el-form-item label='油卡编号'>
                    <el-input v-model='form1.serial_number'></el-input>
                </el-form-item>
                <!-- <el-form-item label='油卡姓名'>
                    <el-input v-model='form1.ture_name'></el-input>
                </el-form-item> -->
                <el-form-item label='油卡号'>
                    <el-input v-model='form1.oil_card_code'></el-input>
                </el-form-item>
                <el-form-item label='交易日期'>
                    <el-date-picker
                    v-model="form1.time_start"
                    type="date"
                    placeholder="选择日期" size='small' format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                </el-date-picker>
                </el-form-item>
                <el-form-item label='对账状态'>
                    <el-select v-model="form1.check_money" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已对账" value="1"></el-option>
                    <el-option label="未对账" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type='danger' @click='go_search1'>查询</el-button>
                </el-form-item>
            </el-form>
            <div class='app-container'>
                <el-table :data='directly_order' border fit highlight-current-row height='400'>
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
                            <el-tag v-if='scope.row.check_money == 0'>未对账</el-tag>
                            <el-tag v-if='scope.row.check_money == 1'>已对账</el-tag>
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
    <el-dialog
    title="终止原因"
    :visible.sync="dialogVisible1"
    width="20%"
    :before-close="handleClose">
    <el-form v-model='error_reason' inline="true">
    <el-form-item label='终止原因'>
        <el-input v-model='error_reason.reason'></el-input>
        <el-button type='danger' @click='stop_send'>终止</el-button>
    </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { get_pcamilo_order, send_camilo_data, get_pdirectly_order, stop_send_camilo } from '@/api/administrator'
import { get_camilo_detail } from '@/api/purchasing'
import { get_config_detail } from '@/api/configure'
export default {
  data() {
    return {
      form: {},
      form1: {},
      listLoading: true,
      camilo_order: [],
      camilo_detail_list: [],
      dialogVisible: false,
      platform: [],
      platform_money: [],
      directly_order: [],
      error_reason: {
        id: '',
        reason: ''
      },
      dialogVisible1: false
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
      get_config_detail().then(response => {
        this.platform = response.platform
        this.platform_money = response.denomination
      }).catch(error => {
        console.log(error)
      })
    },
    go_search() {
      this.listLoading = true
      get_pcamilo_order(this.form).then(response => {
        this.camilo_order = response.data
        this.listLoading = false
      })
    },
    go_search1() {
      get_pdirectly_order(this.form1).then(res => {
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
            this.fetchData()
          } else {
            this.$message.error(response.message)
          }
        }).catch(error => {
          console.log(error)
          this.$message.error('卡密下发失败!')
        })
      }).catch(() => {
      })
    },
    end_send_camilo(index) {
      this.dialogVisible1 = true
      this.error_reason.id = this.camilo_order[index].id
    },
    stop_send() {
      let param = this.error_reason
      this.$confirm('是否终止下发卡密?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        stop_send_camilo(param).then(response => {
          if (response.code === '200') {
            this.$message({
              type: 'success',
              message: '卡密终止成功!'
            })
            this.dialogVisible1 = false
          } else {
            this.$message.error(response.message)
          }
        }).catch(error => {
          console.log(error)
          this.$message.error('卡密终止失败!')
        })
      }).catch(() => {
      })
    },
    handleClose(done) {
      this.error_reason = {}
      done()
    },
    show_detail(id) {
      get_camilo_detail(id).then(response => {
        this.camilo_detail_list = response.data
        this.dialogVisible = true
      })
    }
  }
}
</script>
