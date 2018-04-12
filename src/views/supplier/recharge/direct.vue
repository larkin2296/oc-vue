<template>
  <div>
    <el-form :inline='true' id='form'>
        <el-form-item label='油卡充值平台' >
        <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label='到账时间'>
        <el-select v-model="arrvie_time" placeholder="请选择">
            <el-option v-for="item in choose_time" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type='danger'>获取</el-button>
        </el-form-item>
    </el-form>
    <div class="app-container">
    <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="油卡卡号" align="center">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="面额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain>充值反馈</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '阳光爱车'
      }, {
        value: '选项2',
        label: '车传奇'
      }, {
        value: '选项3',
        label: '汽车钱包'
      }],
      value: '',
      choose_time: [{
        value: '选项1',
        label: '1.24小时以内'
      }, {
        value: '选项2',
        label: '2.1~3.5天'
      }, {
        value: '选项3',
        label: '3.5天以上'
      }],
      arrvie_time: ''
    }
  }
}
</script>

<style scoped>
#form{
    padding:40px
}
</style>


