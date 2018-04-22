<template>
  <div>
    <el-form :inline='true' id='form'>
        <el-form-item label='油卡充值平台' >
        <el-select v-model="platform" placeholder="请选择">
            <el-option v-for="item in platforms" :key="item.value" :label="item.label" :value="item.value">
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
    <div class="app-container" style='width:1000px;'>
    <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="油卡卡号" align="center"  width="400">
        <template slot-scope="scope">
          {{scope.row.oil_card_code}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-popover ref="popover4" placement="left" width="600" trigger="click">
          <el-form label-width="150px">
            <el-form-item label='充值面额' >
              <el-input style='width:100px;'/>
            </el-form-item>
            <el-form-item label='充值时间'>
              <el-date-picker
                v-model="recharge_time"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00">
              </el-date-picker>
            </el-form-item>
            <el-form-item label='上传凭证'>
              <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type='danger'>确定上传</el-button>
            </el-form-item>
          </el-form>
        </el-popover>
          <el-button type="primary"  v-popover:popover4>充值反馈</el-button>
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
      platforms: [{
        value: '选项1',
        label: '阳光爱车'
      }, {
        value: '选项2',
        label: '车传奇'
      }, {
        value: '选项3',
        label: '汽车钱包'
      }],
      platform: '',
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
      arrvie_time: '',
      list: [{
        oil_card_code: '123123123',
        price: '10000'
      }],
      gridData: [],
      recharge_time: '',
      fileList: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style scoped>
#form{
    padding:40px
}
</style>


