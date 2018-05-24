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
            <el-input></el-input>
        </el-col>
        <el-col :span="2">
            销售折扣
        </el-col>
        <el-col :span="4">
            <el-input></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="4">
              长充折扣
          </el-col>
          <el-col :span="4">
              <el-input></el-input>
          </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="4">
              短充折扣范围
          </el-col>
          <el-col :span="10">
              <el-input></el-input>~<el-input></el-input>
          </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="4">
              <el-button type='danger'>修改</el-button>
          </el-col>
      </el-row>
      </div>
      </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log()
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

