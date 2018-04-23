<template>
  <div>
      <div class="app-container">
    <el-table :data="tableData" v-loading.body="listLoading" stripe style="width: 100%" border fit highlight-current-row>
    <el-table-column label="序号">
      <template slot-scope="scope">
          {{scope.row.id}}
        </template>
    </el-table-column>
      </el-table>
      </div>
  </div>
</template>

<script>
import { get_sdirectly_detail } from '@/api/purchasing'
export default {
  props: ['order'],
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_sdirectly_detail(this.order).then(response => {
        this.tableData = response
        this.listLoading = false
      })
    }
  }
}
</script>
