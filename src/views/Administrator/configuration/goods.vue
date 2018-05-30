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
      <el-table :data='platform_list' border fit highlight-current-row height='400'>
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
      <el-table :data='denomination_list' border fit highlight-current-row height='400'>
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
      <el-tab-pane label='商品配置管理'>
      <h3>商品配置管理</h3>
      <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            短充金额范围
          </div>
        </el-col>
        <el-col :span="8"><div class="grid-content bg-purple">
          <el-input v-model='form.sdirectly_price_down'></el-input>~<el-input v-model='form.sdirectly_price_up'></el-input></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            短充截止时间
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-select v-model="form.sdirectly_day">
              <el-option
              v-for="item in days"
              :key="item.value"
              :label="item.value"
              :value="item.value">
              </el-option>
            </el-select>天
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
          <el-button type='danger' @click='savedata'>保存</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            卡密商品暂停
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-select v-model="goods_platform" placeholder="请选择商品">
              <el-option
              v-for="item in platform"
              :key="item.id"
              :label="item.platform_name"
              :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4"><div class="grid-content bg-purple">
          <el-input placeholder="请输入所包含字段"></el-input></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">
          <el-button type='danger'>暂停</el-button></div></el-col>
      </el-row>
      </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { get_platform_list, get_denomination_list, add_platform, add_denomination, get_config_detail, get_config_goodset, save_config } from '@/api/configure'
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
      platform: [],
      goods_platform: '',
      denomination_list: [],
      days: [{
        label: '一周',
        value: '7'
      }, {
        label: '一个月',
        value: '30'
      }, {
        label: '一季度',
        value: '90'
      }],
      goods_day: '',
      form: {
        sdirectly_price_down: '',
        sdirectly_price_up: '',
        sdirectly_day: ''
      }
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
      get_config_detail().then(response => {
        this.platform = response.platform
      }).catch(error => {
        console.log(error)
      })
      get_config_goodset().then(res => {
        console.log(res)
        this.form = res.data
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
    },
    savedata() {
      save_config(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.form = res.data
      })
    }
  }
}
</script>

<style scoped>
h3{
  margin-left: 10px;
}
.el-row{
  margin-bottom: 20px;
}
.el-button{
    margin:10px;
}
.el-input{
  width:150px;
}
.el-table-column{
  height: 40px;
}
</style>