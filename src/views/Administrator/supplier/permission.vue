<template>
  <div>
      <el-form :inline='true' id='form'>
          <el-form-item label='供应商'>
              <el-input></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type='danger'>查找</el-button>
          </el-form-item>
      </el-form>
      <div class="app-container" style='width:1200px;'>
      <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column label='供应商名称'>
              <template slot-scope="scope">
                  {{ scope.row.supplier_name }}
              </template>
          </el-table-column>
          <el-table-column label='卡密供货权限'>
              <template slot-scope="scope">
                  <el-button v-if='scope.row.p_re_camilo == 1' type='success' size='small'>已开启，点击关闭</el-button>
                  <el-button v-else type='primary'>开启</el-button>
              </template>
          </el-table-column>
          <el-table-column label='长充供货权限'>
              <template slot-scope="scope">
                  <el-button v-if='scope.row.p_re_directly == 1' type='success' size='small'>已开启，点击关闭</el-button>
                  <el-button v-else type='primary'>开启</el-button>
              </template>
          </el-table-column>
          <el-table-column label='提现权限'>
              <template slot-scope="scope">
                  <el-button v-if='scope.row.p_re_deposit == 1' type='success' size='small'>已开启，点击关闭</el-button>
                  <el-button v-else type='primary'>开启</el-button>
              </template>
          </el-table-column>
          <el-table-column label='推荐好友权限'>
              <template slot-scope="scope">
                  <el-button v-if='scope.row.p_re_invite == 1' type='success' size='small'>已开启，点击关闭</el-button>
                  <el-button v-else type='primary'>开启</el-button>
              </template>
          </el-table-column>
          <el-table-column label='油卡获取数量'>
              <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="edit-input" size="small" v-model="scope.row.status"></el-input>
              <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
            </template>
            <span v-else>{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label='编辑油卡数量'>
            <template slot-scope="scope">
              <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
              <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column label='操作'>
            <template slot-scope="scope">
              <el-button type="danger" >保存</el-button>            
            </template>
          </el-table-column>
      </el-table>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        supplier_name: '张三',
        p_re_camilo: 1,
        p_re_directly: 1,
        p_re_deposit: 1,
        p_re_invite: 1,
        status: 3,
        edit: false
      }
      ]
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

