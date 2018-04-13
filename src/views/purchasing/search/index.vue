<template>
  <div id='search'>
    <el-tabs type="border-card">
      <el-tab-pane label="直充查询">
        <pf-camilo></pf-camilo>
        <pt-camilo></pt-camilo>
      </el-tab-pane>
      <el-tab-pane label="卡密查询">
        <pf-direct></pf-direct>
        <pt-direct></pt-direct>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import PfCamilo from '@/components/Ocform/pcamilo'
// import PfDirect from '@/components/Ocform/pdirect'
import PtCamilo from '@/components/Octable/pcamilo'
// import PtDirect from '@/components/Octable/pdirect'

export default {
  components: {
    PfCamilo,
    PfDirect: function(resolve) {
      require(['@/components/Ocform/pdirect'], resolve)
    },
    PtCamilo,
    PtDirect: function(resolve) {
      require(['@/components/Octable/pdirect'], resolve)
    }
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