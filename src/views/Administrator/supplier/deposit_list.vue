<template>
  <div>
      <el-form :inline="true" label-width="120px">
        <el-form-item label='供应商'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='时间'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='提现单状态'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type='danger'>查询</el-button>
        </el-form-item>
    </el-form>
    <div class='app-container'>
        <el-table :data='list' border fit highlight-current-row>
            <el-table-column label='序号'>
                <template slot-scope="scope">
                    {{ scope.$index }}
                </template>
            </el-table-column>
            <el-table-column label='供应商'>
                <template slot-scope="scope">
                    {{ scope.row.user }}
                </template>
            </el-table-column>
            <el-table-column label='提现单号'>
                <template slot-scope="scope">
                    {{ scope.row.forward_number }}
                </template>
            </el-table-column>
            <el-table-column label='金额'>
                <template slot-scope="scope">
                    {{ scope.row.money }}
                </template>
            </el-table-column>
            <el-table-column label='时间'>
                <template slot-scope="scope">
                    {{ scope.row.created_at }}
                </template>
            </el-table-column>
            <el-table-column label='状态'>
                <template slot-scope="scope">
                    <el-tag>{{ scope.row.status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label='操作'>
                <template slot-scope="scope">
                    <el-button v-if='scope.row.status != "已提现"' type='success'>已转账</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import { get_deposit_list } from '@/api/system'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_deposit_list().then(res => {
        console.log(res)
        this.list = res.data
      })
    }
  }
}
</script>
