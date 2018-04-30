<template>
  <div>
      <el-form :inline="true" label-width="120px">
        <el-form-item label='商品名称'>
                <el-select placeholder="商品名称">
                <el-option label="全部" value=""></el-option>
                <el-option label="汽车之家" value="0"></el-option>
                <el-option label="车传奇" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='面额'>
                <el-select placeholder="面额">
                <el-option label="全部" value=""></el-option>
                <el-option label="50" value="50"></el-option>
                <el-option label="100" value="100"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='供货状态'>
                <el-select placeholder="状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="销卡成功" value="0"></el-option>
                <el-option label="处理中" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='油卡'>
                <el-input></el-input>
            </el-form-item>
            <el-form-item label='供货时间'>
            <el-date-picker
            v-model="value6"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type='danger'>查询</el-button>
        </el-form-item>
        </el-form>
        <div class="app-container">
        <el-table v-loading.body="listLoading" border fit highlight-current-row>
            <el-table-column label='供货时间'>
                <template slot-scope="scope">
                <span>{{scope.row.supply_time}}</span>
                </template>
            </el-table-column>
            <el-table-column label='卡密'>
                <template slot-scope="scope">
                <span>{{scope.row.camilo_code}}</span>
                </template>
            </el-table-column>
            <el-table-column label='商品名称'>
                <template slot-scope="scope">
                <span>{{scope.row.plaform}}</span>
                </template>
            </el-table-column>
            <el-table-column label='面额'>
                <template slot-scope="scope">
                <span>{{scope.row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column label='折扣'>
                <template slot-scope="scope">
                <span>{{scope.row.discount}}</span>
                </template>
            </el-table-column>
            <el-table-column label='供货状态'>
                <template slot-scope="scope">
                <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>
            <el-table-column label='实际销卡面额'>
                <template slot-scope="scope">
                <span>{{scope.row.real_price}}</span>
                </template>
            </el-table-column>
            <el-table-column label='备注'>
                <template slot-scope="scope">
                <span>{{scope.row.remark}}</span>
                </template>
            </el-table-column>
            <el-table-column label='操作'>
                <template slot-scope="scope">
                </template>
            </el-table-column>
        </el-table>
        </div>
  </div>
</template>

<script>
import { get_camilo_order } from '@/api/supplier'
export default {
  data() {
    return {
      listLoading: true
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
        this.list = response
        this.listLoading = false
      })
    }
  }
}
</script>

