<template>
  <div>
      <el-form :inline="true" label-width="120px">
        <el-form-item label='姓名'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='采购权限'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='付款权限'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type='danger'>查询</el-button>
        </el-form-item>
    </el-form>
    <div class='app-container'>
        <el-table :data='list' v-loading.body="listLoading" border fit highlight-current-row>
            <el-table-column label='采购商' width='80'>
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label='采购权限'>
                <template slot-scope="scope">
                    <el-checkbox v-model="camilo_recharge">卡密采购</el-checkbox>
                    <el-checkbox v-model="sdirectly_recharge">短充采购</el-checkbox>
                    <el-checkbox v-model="ldirectly_recharge">长充采购</el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label='卡密付款'>
                <template slot-scope="scope">
                    <el-radio v-model="pay_camilo" label="1">先款</el-radio>
                    <el-radio v-model="pay_camilo" label="2">后款</el-radio>
                </template>
            </el-table-column>
            <el-table-column label='直充付款'>
                <template slot-scope="scope">
                    <el-radio v-model="pay_directly" label="1">先款</el-radio>
                    <el-radio v-model="pay_directly" label="2">后款</el-radio>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-button type='danger' @click='save' >保存</el-button>
  </div>
</template>

<script>
import { get_user_list } from '@/api/administrator'
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
      get_user_list().then(res => {
        console.log(res)
        this.list = res.data
        this.listLoading = false
      })
    }
  }
}
</script>

