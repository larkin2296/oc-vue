<template>
<div>
    <el-form :inline="true" ref="form" :model="form" label-width="120px" class='choose'>
    <el-form-item label="选择油卡" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">

        <el-select v-model="form.goods_type" placeholder="选择油卡">

          <el-option label="Zone one" value="shanghai"></el-option>

          <el-option label="Zone two" value="beijing"></el-option>

        </el-select>
    </el-form-item>

    <el-form-item label="金额">

        <el-input v-model="form.card_num"></el-input>

    </el-form-item>

    <el-form-item label='截止时间'>
          <el-date-picker
          v-model="form.cutoff_time"
          type="date"
          placeholder="选择日期" size='small'>
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
      <el-table-column align="center" prop="created_at" label="姓名" >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.card_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center">
        <template slot-scope="scope">
          {{scope.row.num}}
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

export default {
  data() {
    return {
      form: {
        goods_type: '',
        card_price: '',
        card_num: ''
      },
      list: []
    }
  },
  methods: {
    onSubmit() {
    //   this.list = ({ author: 'name', display_time: '2010-06-12 16:32:23', id: '330000200103215497', pageviews: 797, status: 'draft', title: 'Stoxqx pygsyozdch yjqubbm drtyljfqng tqhcb mymxof hjwrxyej tjgw ubfalhb shfeeig snsatg lwidobvrjm nxlfkuhpi bsegvg ueiwn vcnd.' })
      // this.d_num = Number(this.d_num) + 1
      this.list.push({ author: 'name', display_time: '2010-06-12 16:32:23', id: '330000200103215497', pageviews: 797, status: 'draft', title: 'Stoxqx pygsyozdch yjqubbm drtyljfqng tqhcb mymxof hjwrxyej tjgw ubfalhb shfeeig snsatg lwidobvrjm nxlfkuhpi bsegvg ueiwn vcnd.' })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.choose{
  padding-top:50px;
}
</style>
