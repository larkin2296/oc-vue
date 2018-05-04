<template>
  <div>
      <el-form :inline="true" label-width="120px">
          <el-form-item label='卡号' >
              <el-input></el-input>
          </el-form-item>
          <el-form-item label='存款'>
              <el-select placeholder="请选择">
                  <el-option label='有存款' value='1' ></el-option>
                  <el-option label='无存款' value='0' ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type='danger' >查询</el-button>
          </el-form-item>
      </el-form>
      <div class="app-container">
          <el-table :data="initialize_list" element-loading-text="Loading" border fit highlight-current-row>
              <el-table-column align="center" label='序号'>
                <template slot-scope="scope" >
                    {{scope.$index + 1}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='卡号'>
                <template slot-scope="scope" >
                    {{scope.$index}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='余额'>
                <template slot-scope="scope" >
                    {{scope.$index}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='已圈存'>
                <template slot-scope="scope" >
                    {{scope.$index}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='上报圈存'>
                <template slot-scope="scope" >
                    {{scope.$index}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='操作'>
                <template slot-scope="scope" >
                    {{scope.$index}}
                </template>
              </el-table-column>
          </el-table>
      </div>
  </div>
</template>

<script>
import { get_initialize_data } from '@/api/purchasing'
export default {
  data() {
    return {
      initialize_list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_initialize_data().then(response => {
        this.initialize_list = response
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
