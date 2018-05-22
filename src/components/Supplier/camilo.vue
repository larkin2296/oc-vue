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
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row>
            <el-table-column label='供货时间'>
                <template slot-scope="scope">
                <span>{{scope.row.supplier_time.date}}</span>
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
      listLoading: true,
      list: []
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
    }
  }
}
</script>

