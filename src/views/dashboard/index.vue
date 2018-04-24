<template>
  <div class="dashboard-container">
    <el-row :gutter="500">
      <el-col :span="6">
        <el-card shadow="always" class='today_discount'>
          <div slot="header" class="clearfix" style='color:#409EFF;'>
            <span>今日折扣</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class='today_discount'>
          <div slot="header" class="clearfix" style='color:#409EFF;'>
            <span>账务状态</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="500">
      <el-col :span="6">
        <el-card shadow="always" class='today_discount' >
          <div slot="header" class="clearfix" style='color:#409EFF;'>
            <span>订单信息</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class='today_discount' >
          <div slot="header" class="clearfix" style='color:#409EFF;'>
            <span>系统提示</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <div>{{id}}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'id'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 70px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.today_discount{
  width:400px;
}
.el-row {
    margin-bottom: 40px;
    margin-left: 30px;
    &:last-child {
      margin-bottom: 0;
    }
}
</style>
