<template>
  <div>
      <el-form :inline="true" label-width="120px">
        <el-form-item label='商品名称'>
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
            <el-form-item label='供货状态'>
                <el-select v-model="form.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                <el-option label="销卡成功" value="4"></el-option>
                <el-option label="问题卡密" value="3"></el-option>
                <el-option label="发下采购商" value="2"></el-option>                
                <el-option label="未使用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='最近充值时间'>
                <el-date-picker
                v-model="form.time_start"
                type="datetime"
                placeholder="选择日期时间" size='small' format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>~
            <el-date-picker
                v-model="form.time_end"
                type="datetime"
                placeholder="选择日期时间" size='small' format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
            </el-form-item>
        <el-form-item>
            <el-button type='danger' @click='go_search'>查询</el-button>
        </el-form-item>
        </el-form>
        <div class="app-container">
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row height='400'>
            <el-table-column label='供货时间'>
                <template slot-scope="scope">
                <span>{{scope.row.supplier_time}}</span>
                </template>
            </el-table-column>
            <el-table-column label='卡密字段一'>
                <template slot-scope="scope">
                <span>{{scope.row.cam_name}}</span>
                </template>
            </el-table-column>
            <el-table-column label='卡密字段二'>
                <template slot-scope="scope">
                <span>{{scope.row.cam_other_name}}</span>
                </template>
            </el-table-column>
            <el-table-column label='商品名称'>
                <template slot-scope="scope">
                <span>{{scope.row.platform_id['platform_name']}}</span>
                </template>
            </el-table-column>
            <el-table-column label='面额'>
                <template slot-scope="scope">
                <span>{{scope.row.denomination['denomination']}}</span>
                </template>
            </el-table-column>
            <el-table-column label='折扣'>
                <template slot-scope="scope">
                <span>{{scope.row.discount}}</span>
                </template>
            </el-table-column>
            <el-table-column label='供货状态'>
                <template slot-scope="scope">
                <el-tag type='success' v-if='scope.row.status == 1'>未使用</el-tag>
                <el-tag type='warning' v-else-if='scope.row.status == 2'>已发放</el-tag>
                <el-tag type='info' v-else-if='scope.row.status == 3'>问题卡密</el-tag>
                <el-tag type='primary' v-else-if='scope.row.status == 4'>销卡成功</el-tag>
                </template>
            </el-table-column>
            <el-table-column label='实际销卡面额'>
                <template slot-scope="scope">
                <span>{{scope.row.discount * scope.row.denomination['denomination']}}</span>
                </template>
            </el-table-column>
            <el-table-column label='备注'>
                <template slot-scope="scope">
                <span>{{scope.row.remark}}</span>
                </template>
            </el-table-column>
        </el-table>
        </div>
  </div>
</template>

<script>
import { get_camilo_order } from '@/api/supplier'
import { get_config_detail } from '@/api/configure'
export default {
  data() {
    return {
      listLoading: true,
      list: [],
      form: {},
      platform: [],
      platform_money: []
    }
  },
  created() {
    this.fetchdata()
  },
  methods: {
    fetchdata() {
      this.listLoading = true
      get_camilo_order(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
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
      get_camilo_order(this.form).then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

