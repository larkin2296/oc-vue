<template>
  <div>
      <el-form v-model='form' :inline="true" label-width="120px">
          <el-form-item label='卡号' >
              <el-input :model='form.oil_card_code'></el-input>
          </el-form-item>
          <el-form-item label='存款'>
              <el-select placeholder="请选择" v-model='form.save_money'>
                  <el-option label='有存款' value='1' ></el-option>
                  <el-option label='无存款' value='0' ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type='danger' @click='go_search'>查询</el-button>
          </el-form-item>
      </el-form>
      <div class="app-container">
          <el-table :data="initialize_list" element-loading-text="Loading" border fit highlight-current-row>
              <el-table-column align="center" label='序号'>
                <template slot-scope="scope" >
                    {{scope.$index + 1}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='卡号'>
                <template slot-scope="scope" >
                    {{scope.row.oil_card_code}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='余额'>
                <template slot-scope="scope" >
                    {{scope.row.save_money}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='已圈存'>
                <template slot-scope="scope" >
                    {{scope.row.initialize_price}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='操作'>
                <template slot-scope="scope" >
                    <el-button type='danger' @click='show(scope.$index)'>上报圈存</el-button>
                </template>
              </el-table-column>
          </el-table>
      </div>
      <el-dialog
    title="上报圈存记录"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-form :model="initialize_data" label-width="150px">
      <el-form-item label='圈存油卡' >
      {{ initialize_data.oil_card }}
    </el-form-item>
    <el-form-item label='到账时间'>
      <el-date-picker
      v-model='initialize_data.recharge_time'
      type="datetime"
      placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
    </el-form-item>
    <el-form-item label='上报金额'>
      <el-input v-model='initialize_data.money' style='width:100px;'/>
    </el-form-item>
    <el-form-item>
      <el-button type='danger' @click='check_send(initialize_data.id)'>确定上报</el-button>
    </el-form-item>
  </el-form>
  </el-dialog> 
  </div>
</template>

<script>
import { get_initialize_data, send_initialize } from '@/api/purchasing'
export default {
  data() {
    return {
      form: {},
      initialize_list: [],
      dialogVisible: false,
      initialize_data: {
        oil_card: '',
        recharge_time: '',
        money: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_initialize_data().then(response => {
        this.initialize_list = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    go_search() {
      get_initialize_data(this.form).then(response => {
        this.initialize_list = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    show(index) {
      this.dialogVisible = true
      this.initialize_data.oil_card = this.initialize_list[index].oil_card_code
      this.initialize_data.id = index
    },
    handleClose(done) {
      done()
    },
    check_send(index) {
      if (this.initialize_data.money > this.initialize_list[index].save_money) {
        this.$message({
          type: 'error',
          message: '上报金额小于当前余额'
        })
      } else if (this.initialize_data.money < 0) {
        this.$message({
          type: 'error',
          message: '上报金额不能为负'
        })
      } else {
        send_initialize(this.initialize_data).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '圈存成功'
            })
            this.dialogVisible = false
            this.fetchData()
          }
        })
      }
    }
  }
}
</script>
