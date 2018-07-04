<template>
<div v-if='is_permission == 1'>
    <div class='title'>{{form.goods_type}}今日折扣 {{discount}}</div>
    <div class='title'>{{form.goods_type}}{{form.card_price}}  {{inventory}}</div>

    <el-form :inline="true" ref="form" :model="form" label-width="120px" class='choose'>
    <el-form-item label="商品类型" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">

        <el-select v-model="form.goods_type" @change='changediscount' value-key="label" placeholder="选择商品">
          <el-option label="全部" value=""></el-option>

            <el-option v-for="item in platform" :label="item.platform_name" :key="item.id"  :value="item.platform_name">

            </el-option>

        </el-select>
    </el-form-item>

    <el-form-item label="面额">

        <el-select v-model="form.card_price" @change='changediscount' placeholder="选择金额">
          <el-option label="全部" value=""></el-option>

          <el-option v-for="item in platform_money" :label="item.denomination" :key="item.id"  :value="item.denomination">

          </el-option>

        </el-select>
    </el-form-item>

    <el-form-item label="数量">

        <el-input v-model="form.card_num"></el-input>

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
      <el-table-column label="商品" align="center">
        <template slot-scope="scope">
          {{scope.row.platform}}
        </template>
      </el-table-column>
      <el-table-column label="面额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.unit_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center">
        <template slot-scope="scope">
          {{scope.row.num}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="单价" align="center">
        <template slot-scope="scope">
          {{scope.row.real_unit_price}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="总价" >
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click='del(scope.$index)' plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-input type='hidden' v-model='discount' name='discount' />
    <el-input type='hidden' v-model='order_type' name='order_type' />
    <div>总价：{{ totalprice }} 元</div>
    <el-button type="danger" @click='onsubmit' plain>付款</el-button>
  </div>
</div> 
</template>

<script>
import { camilo_order } from '@/api/purchasing'
import { get_config_detail, get_config_goodset, get_permission_data, get_discount_data, get_inventory_status } from '@/api/configure'
import store from '@/store'
export default {
  data() {
    return {
      is_permission: 0,
      form: {
        goods_type: '',
        card_price: '',
        card_num: ''
      },
      list: [],
      totalprice: 0,
      platform: [],
      platform_money: [],
      discount: '',
      order_type: 1,
      config: [],
      inventory: '',
      inventory_num: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_permission_data('recharge_camilo').then(res => {
        if (res.code === '200') {
          this.is_permission = 1
          get_config_detail().then(response => {
            this.platform = response.platform
            this.platform_money = response.denomination
          }).catch(error => {
            console.log(error)
          })
          get_config_goodset().then(res => {
            this.config = res.data
          })
        }
      })
    },
    add_trolly() {
      if (this.form.card_num <= 0) {
        this.$message({
          message: '数量不小0!',
          type: 'error'
        })
      } else if (this.inventory === '无库存') {
        this.$message({
          message: '无库存不能添加!',
          type: 'error'
        })
      } else if (this.form.card_num > this.inventory_num) {
        this.$message({
          message: '大于当前库存!',
          type: 'error'
        })
      } else {
        this.inventory_num = this.inventory_num - this.form.card_num
        this.list.push({ platform: this.form.goods_type, unit_price: this.form.card_price, num: this.form.card_num, real_unit_price: Number(this.form.card_price) * Number(this.discount), price: Number(Number(this.form.card_price) * Number(this.discount)) * Number(this.form.card_num), discount: this.discount, user_id: store.getters.id, order_type: this.order_type })
        this.totalprice += Number(Number(this.form.card_price) * Number(this.discount)) * Number(this.form.card_num)
      }
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    del($index) {
      this.totalprice -= this.list[$index].price
      this.list.splice($index, 1)
    },
    changediscount() {
      get_discount_data(this.form).then(res => {
        this.discount = res.data[0].camilo_sell
      })
      get_inventory_status(this.form).then(res => {
        if (res.data !== null) {
          this.inventory = '有库存'
          this.inventory_num = res.data[0]
        } else {
          this.inventory = '无库存'
          this.inventory_num = 0
        }
      })
    },
    onsubmit() {
      if (this.list.length === 0) {
        this.$message({
          message: '购物车为空',
          type: 'error'
        })
      } else {
        this.$confirm('是否付款创建订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          // let param = Object()
          // param.
          camilo_order(this.list).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: '订单创建成功!'
              })
              this.$router.push({ path: '/search/camilo' })
            } else {
              this.$message({
                type: 'error',
                message: response.msg
              })
            }
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {
        })
      }
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


