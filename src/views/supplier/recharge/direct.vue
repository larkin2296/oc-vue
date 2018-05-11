<template>
  <div>
    <el-form :inline='true' id='form'>
        <el-form-item>
            <el-button type='danger' @click='get_camilo'>获取</el-button>
        </el-form-item>
    </el-form>
    <div class="app-container" style='width:1000px;'>
    <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
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
            <el-form-item label='充值金额' >
              <el-input style='width:100px;'/>
            </el-form-item>
            <el-form-item label='到账时间'>
              <el-date-picker
                v-model="recharge_time"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00">
              </el-date-picker>
            </el-form-item>
            <el-form-item label='上传凭证'>
              <el-upload class="upload-demo"
                ref="upload"
                :multiple="false"
                action="123"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-change="handleChange"
                :before-upload="beforeUpload"
                :file-list="fileList"
                :auto-upload="false" accept=".png,.jpg,.gif">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload> 
            </el-form-item>
            <el-form-item>
              <el-button type='danger' @click='sub_button'>确定上传</el-button>
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
import { upload_file } from '@/api/configure.js'
import { get_camilo_card, send_directly_record } from '@/api/supplier'
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
      list: [],
      gridData: [],
      recharge_time: '',
      fileList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_camilo_card().then(response => {
        this.list = response.data
      })
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePreview(file) {
      // console.log(file)
    },
    handleChange(file, fileList) {
      // console.log(file)
      // console.log(fileList)
    },
    beforeUpload(file) {
      // 这里是重点，将文件转化为formdata数据上传
      let param = new FormData()
      param.append('file', file)
      upload_file(param).then((res) => {
        console.log(res)
        if (res.status === 200) {
          // get_camilo_upload().then(res => {
          //   console.log(res)
          // })
          this.$message({
            type: 'success',
            message: '上传成功!'
          })
        }
      }, (res) => {
        console.log(res)
      })
      return false
    },
    get_camilo() {
      this.$confirm('是否获取油卡?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        get_camilo_card().then(response => {
          this.list = response.data
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    sub_button() {
      this.$refs.upload.submit()
      send_directly_record().then(response => {
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
#form{
    padding:40px
}
</style>
