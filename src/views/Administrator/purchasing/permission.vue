<template>
  <div>
      <el-form v-model='form' :inline="true" label-width="120px">
        <el-form-item label='姓名'>
            <el-input v-model='form.truename'></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type='danger' @click='go_search'>查询</el-button>
        </el-form-item>
    </el-form>
    <div class='app-container'>
        <el-table :data='list' v-loading.body="listLoading" border fit highlight-current-row>
            <el-table-column label='采购商' width='80'>
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label='采购权限' width='500'>
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.recharge_camilo">卡密采购</el-checkbox>
                    <el-checkbox v-model="scope.row.recharge_short_directly">短充采购</el-checkbox>
                    <el-checkbox v-model="scope.row.recharge_long_directly">长充采购</el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label='卡密付款'>
                <template slot-scope="scope">
                    <el-radio v-model="scope.row.pay_camilo" label="1">先款</el-radio>
                    <el-radio v-model="scope.row.pay_camilo" label="2">后款</el-radio>
                </template>
            </el-table-column>
            <el-table-column label='直充付款'>
                <template slot-scope="scope">
                    <el-radio v-model="scope.row.pay_directly" label="1">先款</el-radio>
                    <el-radio v-model="scope.row.pay_directly" label="2">后款</el-radio>
                </template>
            </el-table-column>
            <el-table-column label='操作' width='100'>
                <template slot-scope="scope">
                    <el-button type='danger' @click='save(scope.$index)' >保存</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import { get_user_list, set_user_perrmission } from '@/api/administrator'
export default {
  data() {
    return {
      form: {},
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
        this.list = res.data
        this.listLoading = false
      })
    },
    go_search() {
      this.listLoading = true
      get_user_list(this.form).then(res => {
        this.list = res.data
        this.listLoading = false
      })
    },
    save(index) {
      this.$confirm('是否修改采购商权限', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        set_user_perrmission(this.list[index]).then(response => {
          this.$message({
            type: 'success',
            message: '设置成功'
          })
          this.fetchData()
        })
      }).catch(() => {
      })
    }
  }
}
</script>

