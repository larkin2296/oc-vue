<template>
  <div id='search'>
        <pf-camilo></pf-camilo>
        <pt-camilo></pt-camilo>
  </div>
</template>

<script>
import PfCamilo from '@/components/Ocform/pcamilo'
import PtCamilo from '@/components/Octable/pcamilo'

export default {
  components: {
    PfCamilo,
    PtCamilo
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