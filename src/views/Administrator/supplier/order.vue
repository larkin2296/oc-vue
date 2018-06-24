<template>
  <div>
    <el-tabs type="border-card">
        <el-tab-pane label="供货卡密">
            <el-form v-model='form' :inline="true" label-width="120px">
            <el-form-item label='商品'>
                <el-select v-model="form.goods_type" value-key="label" placeholder="选择商品">

                    <el-option v-for="item in platform" :label="item.platform_name" :key="item.id"  :value="item.platform_name">

                    </el-option>

                </el-select>
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
                <el-form-item label='卡号字段一'>
                    <el-input v-model='form.cam_name'></el-input>
                </el-form-item>
                <el-form-item label='卡号字段二'>
                    <el-input v-model='form.cam_other_name'></el-input>
                </el-form-item>
                <el-form-item label='卡密状态'>
                    <el-select v-model="form.status" placeholder="状态">
                    <el-option label="上传成功" value="1"></el-option>
                    <el-option label="问题卡密" value="3"></el-option>
                    <el-option label="下发采购商" value="2"></el-option>
                    <el-option label="销卡成功" value="4"></el-option>                    
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type='danger' @click='go_search'>查询</el-button>
                </el-form-item>
            </el-form>
            <div class='app-container'>
                <el-table :data='camilo_list' border fit highlight-current-row height='400'>
                    <el-table-column label='供货商'>
                        <template slot-scope="scope">
                            {{ scope.row.userName }}
                        </template>
                    </el-table-column>
                    <el-table-column label='商品'>
                        <template slot-scope="scope">
                            {{ scope.row.platform_id }}
                        </template>
                    </el-table-column>
                    <el-table-column label='面额'>
                        <template slot-scope="scope">
                            {{ scope.row.denomination }}
                        </template>
                    </el-table-column>
                    <el-table-column label='字段一' width='150'>
                        <template slot-scope="scope">
                            {{ scope.row.cam_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='字段二'>
                        <template slot-scope="scope">
                            {{ scope.row.cam_other_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='供货时间'>
                        <template slot-scope="scope">
                            {{ scope.row.created_at }}
                        </template>
                    </el-table-column>
                    <el-table-column label='折扣'>
                        <template slot-scope="scope">
                            {{ scope.row.discount }}
                        </template>
                    </el-table-column>
                    <el-table-column label='卡密状态'>
                        <template slot-scope="scope">
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                    <el-table-column label='操作' width='150'>
                        <template slot-scope="scope">
                            <el-button size='mini' type='danger'>删除</el-button>
                            <el-button size='mini' type='warning'>恢复</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="代充订单">
            <el-form v-model='form1' :inline="true" label-width="120px">
                <el-form-item label='供应商'>
                    <el-input v-model='form1.truename'></el-input>
                </el-form-item>
                <el-form-item label='油卡编号'>
                    <el-input v-model='form1.serial_number'></el-input>
                </el-form-item>
                <el-form-item label='油卡号'>
                    <el-input v-model='form1.oil_card_code'></el-input>
                </el-form-item>
                <el-form-item label='交易日期'>
                    <el-date-picker
                        v-model="form1.time_start"
                        type="date"
                        placeholder="选择日期" size='small' format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                    </el-date-picker>~
                    <el-date-picker
                        v-model="form1.time_end"
                        type="date"
                        placeholder="选择日期" size='small' format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label='状态'>
                    <el-select v-model="form1.supply_status" placeholder="状态">
                    <el-option label="已到账" value="1"></el-option>
                    <el-option label="未到账" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type='danger' @click='go_search1'>查询</el-button>
                </el-form-item>
            </el-form>
            <div class='app-container'>
                <el-table :data='directly_list' border fit highlight-current-row height='400'>
                    <el-table-column label='供应商'>
                        <template slot-scope="scope">
                            {{ scope.row.userName }}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label='油卡编号'>
                        <template slot-scope="scope">
                            {{ scope.row.code }}
                        </template>
                    </el-table-column>
                    <el-table-column label='油卡姓名'>
                        <template slot-scope="scope">
                            {{ scope.row.oil_code }}
                        </template>
                    </el-table-column> -->
                    <el-table-column label='油卡号'>
                        <template slot-scope="scope">
                            {{ scope.row.oil_number }}
                        </template>
                    </el-table-column>
                    <el-table-column label='金额'>
                        <template slot-scope="scope">
                            {{ scope.row.already_card }}
                        </template>
                    </el-table-column>
                    <el-table-column label='状态'>
                        <template slot-scope="scope">
                            {{ scope.row.supply_status }}
                        </template>
                    </el-table-column>
                    <el-table-column label='供货时间'>
                        <template slot-scope="scope">
                            {{ scope.row.created_at }}
                        </template>
                    </el-table-column>
                    <el-table-column label='预计到账时间'>
                        <template slot-scope="scope">
                            {{ scope.row.end_time }}
                        </template>
                    </el-table-column>
                    <el-table-column label='折扣'>
                        <template slot-scope="scope">
                            {{ scope.row.discount }}
                        </template>
                    </el-table-column>
                    <el-table-column label='查看凭证'>
                        <template slot-scope="scope">
                            <el-button type='warning' @click='show_pic(scope.row.direct_id)'>查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label='操作' width='150'>
                        <template slot-scope="scope">
                            <el-button size='mini' v-if="scope.row.supply_status == '未到账'" type='success' @click='make_account(scope.$index)'>置为已到账</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="图片详情" :before-close="handleClose" :visible.sync="dialogTableVisible">
                <img v-bind:src="img_url" style='width:50%;height:50%;'/>
                </el-dialog>
            </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { get_dcamilo_list, get_ddirectly_list, set_account } from '@/api/system'
import { get_config_detail } from '@/api/configure'
export default {
  data() {
    return {
      form: {},
      form1: {},
      camilo_list: [],
      directly_list: [],
      img_url: '',
      platform: [],
      platform_money: [],
      dialogTableVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_dcamilo_list().then(response => {
        this.camilo_list = response.data
      })
      get_ddirectly_list().then(res => {
        this.directly_list = res.data
      })
      get_config_detail().then(response => {
        this.platform = response.platform
        this.platform_money = response.denomination
      }).catch(error => {
        console.log(error)
      })
    },
    go_search() {
      get_dcamilo_list(this.form).then(response => {
        this.camilo_list = response.data
      })
    },
    go_search1() {
      get_ddirectly_list(this.form1).then(res => {
        this.directly_list = res.data
      })
    },
    show_pic(src) {
      this.img_url = src
      this.dialogTableVisible = true
    },
    handleClose(done) {
      done()
    },
    make_account(index) {
      var param = Object()
      param.id = this.directly_list[index].id
      param.card = this.directly_list[index].oil_number
      param.money = this.directly_list[index].already_card
      set_account(param).then(res => {
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '设置成功!'
          })
          this.fetchData()
        }
      })
    }
  }
}
</script>
