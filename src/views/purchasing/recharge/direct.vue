<template>
<div v-if='is_permission == 1'>
    <div class='title'>今日短充金额范围 {{config.sdirectly_price_down}} ~ {{config.sdirectly_price_up}}</div>
    <div class='title'>今日折扣范围 {{config.sdirectly_discount_down}} ~ {{config.sdirectly_discount_up}}</div>
    <div class='title'>短充时长限制 {{config.sdirectly_day}}天</div>
    <el-form ref="form" :model="form" label-width="120px" class='choose'>
      <el-form-item label="油卡">
        <el-button type='warning' @click="show_select">选择油卡</el-button>已选择{{card_num}}张卡
      </el-form-item>

      <el-form-item label="金额">

        <el-input v-model="form.price" style='width:200px;'></el-input>

      </el-form-item>

      <el-form-item label="折扣">

        <el-input v-model="form.discount" style='width:200px;'></el-input>

      </el-form-item>

      <el-form-item label='截止时间'>
          <el-date-picker
          v-model="form.cutoff_time"
          type="date"
          placeholder="选择日期" size='small' format="yyyy-MM-dd" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add_trolly">添加</el-button>
      </el-form-item>
    
</el-form>
    <div class="app-container">
    <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="油卡" align="center">
        <template slot-scope="scope">
          {{scope.row.oil_card_code}}
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="折扣" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.discount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际金额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.real_price}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="截止时间" align="center">
        <template slot-scope="scope" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          {{scope.row.cutoff_time}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click='del(scope.$index)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="danger" plain @click='onsubmit'>生成</el-button>
  </div>
  <el-dialog
    title="油卡选择"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-form :model='get_search' :inline="true">
      <el-form-item label='油卡号'>
        <el-input v-model='get_search.oil_card_code'></el-input>
      </el-form-item>
      <el-form-item label='编号'>
        <el-input v-model='get_search.serial_number'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='danger' @click='search_card'>查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data='card_list' border fit highlight-current-row height='200'>
    <el-table-column label='选择'>
        <template slot-scope="scope">
        <el-checkbox v-model="scope.row.choose"></el-checkbox>
        </template>
    </el-table-column>
    <el-table-column label='油卡编号'>
      <template slot-scope="scope">
        {{ scope.row.serial_number }}
      </template>
    </el-table-column>
    <el-table-column label='油卡号'>
        <template slot-scope="scope">
        {{ scope.row.oil_card_code }}
        </template>
    </el-table-column>
    </el-table>
    <el-button type='danger' @click='add_card'>添加</el-button>
    <h4>已添加</h4>
    <el-table :data='ready_card' border fit highlight-current-row height='200'>
      <el-table-column label='油卡编号'>
      <template slot-scope="scope">
        {{ scope.row.serial_number }}
        </template>
      </el-table-column>
      <el-table-column label='油卡号'>
          <template slot-scope="scope">
          {{ scope.row.oil_card_code }}
          </template>
      </el-table-column>
      <el-table-column label='操作'>
        <template slot-scope="scope">
          <el-button type='danger' @click='dele(scope.$index)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type='danger' @click="dialogVisible = false">确定</el-button>
    </el-dialog>
</div> 
</template>

<script>
import { get_short_card, set_sdirectly_order, get_search_card } from '@/api/purchasing'
import { get_config_goodset, get_permission_data } from '@/api/configure'
import store from '@/store'
export default {
  data() {
    return {
      is_permission: 0,
      form: {
        goods_type: '',
        card_price: '',
        cutoff_time: '',
        discount: '',
        price: ''
      },
      list: [],
      checkAll: false,
      checkedCard: [],
      oil_card_code: [],
      isIndeterminate: true,
      discount: 0.98,
      config: [],
      dialogVisible: false,
      get_search: {},
      card_list: [],
      ready_card: [],
      card_num: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_permission_data('recharge_short_directly').then(res => {
        if (res.code === '200') {
          this.is_permission = 1
          get_short_card(this.listQuery).then(response => {
            this.oil_card_code = response
          })
          get_config_goodset().then(res => {
            this.config = res.data
          })
        }
      })
    },
    search_card() {
      get_search_card(this.get_search).then(res => {
        console.log(res)
        this.card_list = res.data
      }).catch(error => {
        console.log(error)
      })
    },
    show_select() {
      this.dialogVisible = true
    },
    add_card() {
      var that = this
      console.log(this.card_list)
      this.card_list.forEach(function(val) {
        if (typeof val['choose'] === 'undefined' || val['choose'] === false) {
          console.log(val)
        } else {
          that.ready_card.push({ serial_number: val['serial_number'], oil_card_code: val['oil_card_code'] })
        }
      })
      this.card_num = this.ready_card.length
    },
    handleClose(done) {
      done()
    },
    dele($index) {
      this.ready_card.splice($index, 1)
    },
    add_trolly() {
      if (this.form.price < this.config.sdirectly_price_down || this.form.price > this.config.sdirectly_price_up) {
        this.$message.error('金额超出额定范围!')
      } else if (this.form.discount < this.config.sdirectly_discount_down || this.form.discount > this.config.sdirectly_discount_up) {
        this.$message.error('折扣超出额定范围!')
      } else if (this.dateDiff(this.form.cutoff_time) > this.config.sdirectly_day) {
        this.$message.error('时间超出额定范围!')
      } else if (this.card_num === 0) {
        this.$message.error('未选择油卡!')
      } else {
        var card = []
        this.ready_card.forEach(function(val) {
          card.push(val['oil_card_code'])
        })
        this.list.push({ oil_card_code: card, price: this.form.price, real_price: Number(this.form.price) * Number(this.form.discount), cutoff_time: this.form.cutoff_time, discount: this.form.discount, user_id: store.getters.id, order_type: 2 })
      }
    },
    del($index) {
      this.totalprice -= this.list[$index].price
      this.list.splice($index, 1)
    },
    onsubmit() {
      if (this.list.length === 0) {
        this.$message({
          type: 'error',
          message: '购物车为空!'
        })
      } else {
        this.$confirm('是否付款创建订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          set_sdirectly_order(this.list).then(response => {
            console.log(response)
          }).catch(error => {
            console.log(error)
          })
          this.$message({
            type: 'success',
            message: '订单创建成功!'
          })
        }).catch(() => {
        })
      }
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleCheckAllChange(val) {
      this.checkedCard = val ? this.oil_card_code : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.oil_card_code.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.oil_card_code.length
    },
    dateDiff(sDate1) {
      var date2 = new Date()
      var date1 = new Date(Date.parse(sDate1.replace(/-/g, '/')))
      var iDays = parseInt(Math.abs(date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24)
      return iDays
    }
  }
}
</script>

<style scoped>
.choose{
  padding-top:50px;
}
.title{
  margin-top: 25px;
  margin-left:50px;
  color:red;
}
</style>
