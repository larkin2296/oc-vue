<template>
<div>
    <el-form ref="form" :model="form" label-width="120px" class='choose'>
    <el-form-item label="选择油卡" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <el-checkbox-group v-model="checkedCard" @change="handleCheckedCitiesChange">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox v-for="card in oil_card_code" :label="card" :key="card">油卡{{card}}</el-checkbox>
        </el-checkbox-group>
    </el-form-item>

      <el-form-item label="金额">

        <el-input v-model="form.card_price" style='width:200px;'></el-input>

      </el-form-item>

      <el-form-item label='截止时间'>
          <el-date-picker
          v-model="form.cutoff_time"
          type="date"
          placeholder="选择日期" size='small' format="yyyy 年 MM 月 dd 日">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
    
</el-form>
    <div class="app-container">
    <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="油卡" align="center">
        <template slot-scope="scope">
          {{scope.row.card_code}}
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="截止时间" align="center">
        <template slot-scope="scope">
          {{scope.row.cutoff_time}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="danger" plain>付款</el-button>
  </div>
</div> 
</template>

<script>
import { get_short_card } from '@/api/purchasing'
export default {
  data() {
    return {
      form: {
        goods_type: '',
        card_price: '',
        cutoff_time: ''
      },
      list: [],
      checkAll: false,
      checkedCard: [],
      oil_card_code: [],
      isIndeterminate: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_short_card(this.listQuery).then(response => {
        console.log(response)
        this.oil_card_code = response
      })
    },
    onSubmit() {
      console.log(this.checkedCard)
      // this.list = ({ author: 'name', display_time: '2010-06-12 16:32:23', id: '330000200103215497', pageviews: 797, status: 'draft', title: 'Stoxqx pygsyozdch yjqubbm drtyljfqng tqhcb mymxof hjwrxyej tjgw ubfalhb shfeeig snsatg lwidobvrjm nxlfkuhpi bsegvg ueiwn vcnd.' })
      // this.d_num = Number(this.d_num) + 1
      console.log(this.form)
      this.list.push({ card_code: this.checkedCard, price: this.form.card_price, cutoff_time: this.form.cutoff_time })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleCheckAllChange(val) {
      console.log(val)
      this.checkedCard = val ? this.oil_card_code : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
      const checkedCount = value.length
      this.checkAll = checkedCount === this.oil_card_code.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.oil_card_code.length
    }
  }
}
</script>

<style scoped>
.choose{
  padding-top:50px;
}
</style>
