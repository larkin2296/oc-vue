<template>
  <div id='search'>
    <el-tabs type="border-card">
      <el-tab-pane label="短充查询">
        <pf-direct></pf-direct>
        <pt-direct></pt-direct>
      </el-tab-pane>
      <el-tab-pane label="长充查询">
        <pf-direct></pf-direct>
        <pt-direct></pt-direct>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import PfDirect from '@/components/Ocform/pdirect'
import PtDirect from '@/components/Octable/pdirect'

export default {
  components: {
    PfDirect,
    PtDirect
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