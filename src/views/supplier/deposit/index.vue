<template>
  <div v-if='is_permission == 1'>
      <el-button type='danger' @click='send_deposit'>一键提现</el-button>
      <h3>卡密售出情况</h3>
      <div class="app-container">
      <el-table :data='camilo_list' border fit highlight-current-row>
          <el-table-column label='卡密'>
                <template slot-scope="scope">
                <span>{{scope.row.cam_name}}</span>
                </template>
            </el-table-column>
            <el-table-column label='面额'>
                <template slot-scope="scope">
                <span>{{scope.row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column label='供货状态'>
                <template slot-scope="scope">
                <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>
            </el-table>
      </div>
      <h3>直充售出情况</h3>
      <div class="app-container">
      <el-table :data='directly_list' border fit highlight-current-row>
          <el-table-column label='直充供应单号'>
                <template slot-scope="scope">
                <span>{{scope.row.supply_single_number}}</span>
                </template>
            </el-table-column>
            <el-table-column label='金额'>
                <template slot-scope="scope">
                <span>{{scope.row.already_card}}</span>
                </template>
            </el-table-column>
            <el-table-column label='供货状态'>
                <template slot-scope="scope">
                <el-tag>{{scope.row.supply_status}}</el-tag>
                </template>
            </el-table-column>
      </el-table>
      </div>
  </div>
</template>

<script>
import { get_deposit_data, send_deposit_data, deposit } from '@/api/supplier'
import { get_permission_data } from '@/api/configure'
export default {
  data() {
    return {
      is_permission: 0,
      camilo_list: [],
      directly_list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_permission_data().then(res => {
        if (res.code === '200') {
          this.is_permission = 1
          get_deposit_data().then(res => {
            console.log(res)
            this.camilo_list = res.data.cam
            this.directly_list = res.data.forward
          })
        }
      })
    },
    send_deposit() {
      var param = Object()
      param.cam = this.camilo_list
      param.forward = this.directly_list
      console.log(param)
      send_deposit_data(param).then(res => {
        if (res.code === '200') {
          this.$confirm('本次提现申请一共提现' + res.data + '元，是否提现', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            param.money = res.data
            deposit(param).then(response => {
              console.log(param)
              this.fetchData()
            }).catch(error => {
              console.log(error)
            })
            this.$message({
              type: 'success',
              message: '已提交提现申请!'
            })
          }).catch(() => {
          })
        }
      })
    }
  }
}
</script>

<style scoped>
h3{
  margin-left: 10px;
}
.el-button{
    margin:10px;
}
</style>
