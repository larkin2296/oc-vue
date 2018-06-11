<template>
  <div>
    <div class='title'>今日折扣 {{config.ldirectly_discount}}</div>
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
          <input type='hidden' :model='scope.row.id' />
        </template>     
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary"  @click='sub_problem(scope.$index)'>充值反馈</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    title="上报充值记录"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-form :model="supplier_data" label-width="150px">
      <el-form-item label='充值油卡' >
      {{ supplier_data.oil_card }}
      <input type='hidden' :model='supplier_data.id' />
    </el-form-item>
    <el-form-item label='充值金额' >
      <el-input v-model='supplier_data.price' style='width:100px;'/>
    </el-form-item>
    <el-form-item label='到账时间'>
      <el-date-picker
      v-model='supplier_data.recharge_time'
      type="datetime"
      placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
    </el-form-item>
    <el-form-item label='上传凭证'>
      <el-upload class="upload-demo"
          ref="upload"
          :multiple="false"
          action="123"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="changeUpload"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :auto-upload="false">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> 
    </el-form-item>
    <el-form-item>
      <el-button type='danger' @click='submitUpload'>确定上传</el-button>
    </el-form-item>
  </el-form>
  </el-dialog>
  </div>
</template>

<script>
import { upload_file, get_config_goodset, get_permission_data } from '@/api/configure.js'
import { get_camilo_card, get_directly_upload } from '@/api/supplier'
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
      fileList: [],
      dialogVisible: false,
      supplier_data: {
        oil_card: '',
        price: '',
        recharge_time: '',
        pic_add: ''
      },
      pic_list: [],
      config: [],
      discount: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_permission_data('long_term_permission').then(res => {
        if (res.code === '200') {
          get_camilo_card().then(response => {
            this.list = response.data
          })
          get_config_goodset().then(res => {
            this.config = res.data
            this.discount = res.data.ldirectly_discount
          })
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        done()
      }).catch(_ => {})
    },
    sub_problem(index) {
      this.supplier_data.oil_card = this.list[index].oil_card_code
      this.supplier_data.id = this.list[index].id
      this.dialogVisible = true
    },
    submitUpload() {
      if (this.supplier_data.price === '' || this.supplier_data.recharge_time === '') {
        this.$message({
          type: 'error',
          message: '请填写完整'
        })
      } else if ((Date.parse(new Date(this.supplier_data.recharge_time)) / 1000) > (new Date().getTime() / 1000)) {
        this.$message({
          type: 'error',
          message: '日期不能超过当天'
        })
      } else {
        this.$refs.upload.submit()
      }
    },
    handleSuccessfunction(response, file, fileList) {
      console.log(response)
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
    changeUpload: function(file, fileList) {
      this.fileList = fileList
      this.$nextTick(
        () => {
          let upload_list_li = document.getElementsByClassName('el-upload-list')[0].children
          for (let i = 0; i < upload_list_li.length; i++) {
            let li_a = upload_list_li[i]
            let imgElement = document.createElement('img')
            imgElement.setAttribute('src', fileList[i].url)
            imgElement.setAttribute('style', 'max-width:30%;padding-left:5%')
            if (li_a.lastElementChild.nodeName !== 'IMG') {
              li_a.appendChild(imgElement)
            }
          }
        })
    },
    beforeUpload(file) {
      let param = new FormData()
      param.append('file', file)
      param.append('status', 3)
      upload_file(param).then((res) => {
        this.supplier_data.id_hash = res.data.id_hash
        this.supplier_data.discount = this.discount
        get_directly_upload(this.supplier_data).then(response => {
          console.log(response)
          this.dialogVisible = false
        })
        this.$message({
          type: 'success',
          message: '上传成功!'
        })
      }, (res) => {
        console.log(res)
      })
    },
    get_camilo() {
      this.$confirm('是否获取油卡?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        get_camilo_card().then(response => {
          if (response.code === 200) {
            this.list = response.data
          }
          this.$message({
            type: 'success',
            message: response.message
          })
        })
      }).catch((error) => {
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
.title{
  margin-top: 25px;
  margin-left:50px;
  color:red;
}
</style>
