<template>
  <div>
    <el-form :inline="true" label-width="120px">
        <el-form-item label="采购商">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="油卡编号">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="油卡号">
            <el-input></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type='danger'>查询</el-button>
        </el-form-item>
        </el-form>
        <div class='app-container'>
        <el-table :data='list' v-loading.body="listLoading" border fit highlight-current-row>
            <el-table-column label='姓名'>
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label='编号'>
                <template slot-scope="scope">
                    {{ scope.row.serial_number }}
                </template>
            </el-table-column>
            <el-table-column label='油卡号'>
                <template slot-scope="scope">
                    {{ scope.row.oil_card_code }}
                </template>
            </el-table-column>
            <el-table-column label='状态'>
                <template slot-scope="scope">
                    <el-tag type='success' v-if='scope.row.card_status == 1'>正常</el-tag>
                    <el-tag type='info' v-else-if='scope.row.card_status == 2'>已停用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label='类型'>
                <template slot-scope="scope">
                    <el-tag type='warning' v-if='scope.row.is_longtrem == 1'>长期卡</el-tag>
                    <el-tag v-else-if='scope.row.is_longtrem == 0'>短期卡</el-tag>
                </template>
            </el-table-column>
            <el-table-column label='操作'>
                <template slot-scope="scope">
                    <el-button size='mini' type='danger'>强制回收</el-button>
                    <el-button size='mini' type='danger'>停用</el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
  </div>
</template>

<script>
import { get_purchasing_card } from '@/api/administrator'
export default {
  data() {
    return {
      list: [],
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_purchasing_card().then(res => {
        console.log(res)
        this.list = res.data
        this.listLoading = false
      })
    }
  }
}
</script>

