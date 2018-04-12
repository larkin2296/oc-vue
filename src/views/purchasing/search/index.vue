<template>
  <div id='search'>
    <oc-form></oc-form>
    <oc-table></oc-table>
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