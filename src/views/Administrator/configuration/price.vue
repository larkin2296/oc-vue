<template>
    <div>
    <el-tabs type="border-card">
      <el-tab-pane label="商品平台管理">
      <div class="app-container">
          <h3>价格配置管理</h3>
      <el-row :gutter="20">
        <el-col :span="4">
            卡密商品列表
        </el-col>
        <el-col :span="2">
            进货折扣
        </el-col>
        <el-col :span="4">
            <el-input v-model='form.camilo_recharge'></el-input>
        </el-col>
        <el-col :span="2">
            销售折扣
        </el-col>
        <el-col :span="4">
            <el-input v-model='form.camilo_sell'></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="4">
              长充折扣
          </el-col>
          <el-col :span="4">
              <el-input v-model='form.ldirectly_discount'></el-input>
          </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="4">
              短充折扣范围
          </el-col>
          <el-col :span="10">
              <el-input v-model='form.sdirectly_discount_down'></el-input>~<el-input v-model='form.sdirectly_discount_up'></el-input>
          </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="4">
              <el-button type='danger' @click='savedata'>修改</el-button>
          </el-col>
      </el-row>
      </div>
      </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import { get_config_goodset, save_config } from '@/api/configure'
export default {
  data() {
    return {
      form: {
        camilo_recharge: '',
        camilo_sell: '',
        ldirectly_discount: '',
        sdirectly_discount_down: '',
        sdirectly_discount_up: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_config_goodset().then(res => {
        console.log(res)
        this.form = res.data
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
.el-row{
    margin-bottom: 20px;
}
.el-input{
    width: 150px;
}
</style>

