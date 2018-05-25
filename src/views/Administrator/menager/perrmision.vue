<template>
  <div>
    <div class='app-container'>
        <el-table :data='list' v-loading.body="listLoading" border fit highlight-current-row>
            <el-table-column label='管理员'>
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label='采购权限' width='500'>
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.camilo_management">采购商管理</el-checkbox>
                    <el-checkbox v-model="scope.row.supplier_management">供应商管理</el-checkbox>
                    <el-checkbox v-model="scope.row.service_provider_management">服务商管理</el-checkbox>
                    <el-checkbox v-model="scope.row.goods_management">商品管理</el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label='操作'>
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
