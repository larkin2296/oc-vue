<template>
  <div>
      <h3>提现控制</h3>
      <div class="app-container">
      <el-table :data="list" border fit highlight-current-row>
          <el-table-column label='设置'>
              <template slot-scope="scope">
                  {{ scope.row.conf_type }}
              </template>
          </el-table-column>
          <el-table-column label='状态'>
            <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="edit-input" size="small" v-model="scope.row.status"></el-input>
              <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
            </template>
            <span v-else>{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label='操作'>
            <template slot-scope="scope">
              <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
              <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">Edit</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-button type='danger'>关闭/开启提现</el-button>
      <el-button type='danger'>关闭/开启提现接口</el-button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        conf_type: '提现上限',
        status: '0',
        conf_code: 'up_deposit',
        edit: false
      }, {
        conf_type: '提现下限',
        status: '0',
        conf_code: 'down_deposit',
        edit: false
      }, {
        conf_type: '扣费设置',
        status: '0',
        conf_code: 'deduction',
        edit: false
      }]
    }
  },
  methods: {
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

