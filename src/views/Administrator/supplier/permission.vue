<template>
  <div>
      <el-form :inline="true" label-width="120px">
        <el-form-item label='供应商'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type='danger'>查询</el-button>
        </el-form-item>
    </el-form>
    <div class='app-container'>
        <el-table :data='list' v-loading.body="listLoading" border fit highlight-current-row>
            <el-table-column label='供应商' width='80'>
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label='供应权限' width='500'>
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.cam_permission">卡密供货</el-checkbox>
                    <el-checkbox v-model="scope.row.long_term_permission">长充供货</el-checkbox>
                    <el-checkbox v-model="scope.row.put_forward_premission">提现权限</el-checkbox>
                    <el-checkbox v-model="scope.row.recommend_status">推荐权限</el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label='油卡获取数量'>
              <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="edit-input" size="small" v-model="scope.row.several"></el-input>
              <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
            </template>
            <span v-else>{{ scope.row.several }}</span>
            </template>
          </el-table-column>
            <el-table-column label='编辑油卡数量'>
            <template slot-scope="scope">
              <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
              <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
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
import { set_supplier_perrmission, get_supplier_list } from '@/api/administrator'
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
      get_supplier_list().then(res => {
        this.list = res.data
        this.listLoading = false
      })
    },
    save(index) {
      this.$confirm('是否修改供应商权限', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        set_supplier_perrmission(this.list[index]).then(response => {
          this.$message({
            type: 'success',
            message: '设置成功'
          })
          this.fetchData()
        })
      }).catch(() => {
      })
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>
