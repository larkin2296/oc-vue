<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="商品平台管理">
      <h3>商品平台管理</h3>
      <div class="app-container">
          <el-form :inline="true" :model="addplat" label-width="120px">
              <el-form-item label='平台名称'>
                  <el-input v-model='addplat.platform_name'></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type='danger' @click='addplatform'>添加</el-button>
              </el-form-item>
          </el-form>
      <el-table :data='platform_list' border fit highlight-current-row>
          <el-table-column label='平台名称'>
                <template slot-scope="scope">
                <span>{{scope.row.platform_name}}</span>
                </template>
            </el-table-column>
            <el-table-column label='操作'>
                <template slot-scope="scope">
                <el-button v-if='scope.row.status === 1' type='success'>停用</el-button>
                <el-button v-else-if='scope.row.status === 0' type='danger'>启用</el-button>
                </template>
            </el-table-column>
            </el-table>
      </div>
      </el-tab-pane>
      <el-tab-pane label='商品面额管理'>
      <h3>商品面额管理</h3>
      <div class="app-container">
      <el-form :inline="true" :model="addprice" label-width="120px">
              <el-form-item label='面额'>
                  <el-input v-model='addprice.denomination'></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type='danger' @click='adddenomination'>添加</el-button>
              </el-form-item>
          </el-form>
      <el-table :data='denomination_list' border fit highlight-current-row>
          <el-table-column label='面额'>
                <template slot-scope="scope">
                <span>{{scope.row.denomination}}</span>
                </template>
            </el-table-column>
            <el-table-column label='操作'>
                <template slot-scope="scope">
                <el-button v-if='scope.row.status === 1' type='success'>停用</el-button>
                <el-button v-else-if='scope.row.status === 0' type='danger'>启用</el-button>
                </template>
            </el-table-column>
            </el-table>
      </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { get_platform_list, get_denomination_list, add_platform, add_denomination } from '@/api/configure'
export default {
  data() {
    return {
      addplat: {
        platform_name: ''
      },
      addprice: {
        denomination: ''
      },
      platform_list: [],
      denomination_list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_platform_list(this.listQuery).then(response => {
        this.platform_list = response
        this.listLoading = false
      })
      get_denomination_list(this.listQuery).then(response => {
        this.denomination_list = response
        this.listLoading = false
      })
    },
    addplatform() {
      this.$confirm('是否该商品平台?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        add_platform(this.addplat).then(response => {
          this.fetchData()
        }).catch(error => {
          console.log(error)
        })
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
      }).catch(() => {
      })
    },
    adddenomination() {
      this.$confirm('是否该面额?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        add_denomination(this.addprice).then(response => {
          this.fetchData()
        }).catch(error => {
          console.log(error)
        })
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
h3{
  margin-left: 10px;
}
.el-button{
    margin:10px;
}
</style>