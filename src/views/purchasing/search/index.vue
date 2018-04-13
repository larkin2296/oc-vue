<template>
  <div id='search'>
    <el-tabs type="border-card">
      <el-tab-pane label="直充查询">
        <oc-form></oc-form>
        <oc-table></oc-table>
      </el-tab-pane>
      <el-tab-pane label="卡密查询">
        <oc-form></oc-form>
        <oc-table></oc-table>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import OcForm from '@/components/Ocform'
import OcTable from '@/components/Octable'

export default {
  components: {
    OcForm,
    OcTable
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
#search{
  height: 500px;
}
</style>