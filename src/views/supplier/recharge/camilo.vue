<template>
  <div id='camilo' v-if='is_permission == 1'>
      <div class='title'>{{choose_platform}}今日折扣 {{discount}}</div>
      <el-form id='form'>
          <el-form-item label='平台选择'>
              <el-radio-group v-model="choose_platform" @change='changediscount'>
                <el-radio-button v-for="item in platform" :key="item.id" :label="item.platform_name">{{item.platform_name}}</el-radio-button>
              </el-radio-group>
          </el-form-item>
          <el-form-item label='面额'>
            <el-radio-group v-model="choose_price" @change='changediscount'>
            <el-radio v-for="mtem in platform_money" :key="mtem.id" :label="mtem.denomination" border>￥{{mtem.denomination}}</el-radio>
            </el-radio-group>
          </el-form-item>
      </el-form>
      <el-tabs type='border-card'>
        <el-tab-pane label="手动">
          <el-form :inline="true" v-model='camilo_list'>
            <el-form-item label='卡密字段一'>
              <el-input v-model='camilo_list.cam_name'></el-input>
            </el-form-item>
            <el-form-item label='卡密字段二'>
              <el-input v-model='camilo_list.cam_other_name'></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type='danger' @click='add_list'>添加</el-button>
            </el-form-item>
          </el-form>
          <div class="app-container">
            <el-table :data='camilo_table' border fit highlight-current-row>
            <el-table-column label='平台名称'>
                <template slot-scope="scope">
                <span>{{scope.row.plaform}}</span>
                </template>
            </el-table-column>
            <el-table-column label='面额'>
                <template slot-scope="scope">
                <span>{{scope.row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column label='卡密字段一'>
                <template slot-scope="scope">
                <span>{{scope.row.cam_name}}</span>
                </template>
            </el-table-column>
            <el-table-column label='卡密字段二'>
                <template slot-scope="scope">
                <span>{{scope.row.cam_other_name}}</span>
                </template>
            </el-table-column>
            <el-table-column label='操作'>
                <template slot-scope="scope">
                <el-button type='danger' @click='del_list(scope.$index)'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
          </div>
          <el-button type='danger' @click='sub_camilo'>提交</el-button>
        </el-tab-pane>
        <el-tab-pane label="导入">
          <el-upload class="upload-demo"
          ref="upload"
          :multiple="false"
          action="123"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :auto-upload="false" accept=".xls,.xlsx">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <a class='downbutton' href='http://47.98.199.243/index.php/api/download/export' download>下载模板</a>               
            </el-upload>
          <el-table :data='card_list' border fit highlight-current-row>
            <el-table-column label='卡密字段一'>
              <template slot-scope="scope">
              {{ scope.row.cam_name }}
              </template>
            </el-table-column>
            <el-table-column label='卡密字段二'>
              <template slot-scope="scope">
              {{ scope.row.cam_other_name }}
              </template>
            </el-table-column>
            <el-table-column label='操作'>
              <template slot-scope="scope">
              <el-button type='danger' @click='del(scope.$index)'>删除</el-button>
              </template>
            </el-table-column>     
          </el-table>
          <el-button type='danger' @click='sub_camilo_list'>提交</el-button>               
      </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { get_config_detail, upload_file, get_config_goodset, get_permission_data, get_discount_data } from '@/api/configure.js'
import { sub_camilo_data, get_camilo_upload } from '@/api/supplier.js'
export default {
  data() {
    return {
      is_permission: 0,
      radio: '1',
      choose_platform: '',
      choose_price: '',
      fileList: [],
      platform: [],
      platform_money: [],
      camilo_list: {
        cam_name: '',
        cam_other_name: ''
      },
      camilo_table: [],
      dialogVisible: false,
      card_list: [],
      config: [],
      discount: '',
      url: ''
    }
  },
  created() {
    this.fetchdata()
  },
  methods: {
    fetchdata() {
      get_permission_data('cam_permission').then(res => {
        if (res.code === '200') {
          this.is_permission = 1
          get_config_detail().then(response => {
            this.platform = response.platform
            this.platform_money = response.denomination
          }).catch(error => {
            console.log(error)
          })
          get_config_goodset().then(res => {
            this.config = res.data
          })
        } else {
          this.is_permission = 0
          this.$message.error('您没有权限')
        }
      })
    },
    download() {
      this.url = '/oc/common/attach/download/' + 80
    },
    changediscount() {
      var param = Object()
      param.goods_type = this.choose_platform
      param.card_price = this.choose_price
      get_discount_data(param).then(res => {
        this.discount = res.data[0].camilo_recharge
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        done()
      }).catch(_ => {})
    },
    handleSuccess(res, file, fileList) {
      console.log(1111111)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitUpload() {
      if (this.choose_platform === '' || this.choose_price === '') {
        this.$message({
          type: 'error',
          message: '请选择平台和面额'
        })
      } else {
        this.$refs.upload.submit()
      }
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
      param.append('status', 1)
      upload_file(param).then((res) => {
        if (res.code === 200) {
          get_camilo_upload(res.data.path).then(response => {
            this.card_list = response.data
          })
          this.$message({
            type: 'success',
            message: '上传成功!'
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    del($index) {
      this.card_list.splice($index, 1)
    },
    add_list() {
      if (this.choose_platform === '' || this.choose_price === '') {
        this.$message({
          type: 'error',
          message: '请选择平台和面额'
        })
      } else if (this.camilo_list.cam_name === '') {
        this.$message({
          type: 'error',
          message: '卡密字段一必填'
        })
      } else {
        this.camilo_table.push({ plaform: this.choose_platform, price: this.choose_price, cam_name: this.camilo_list.cam_name, cam_other_name: this.camilo_list.cam_other_name })
      }
    },
    del_list($index) {
      this.camilo_table.splice($index, 1)
    },
    sub_camilo() {
      var param = Object()
      param.cam = this.camilo_table
      param.money_id = this.choose_price
      param.platform_id = this.choose_platform
      param.discount = this.discount
      this.send_camilo(param)
    },
    sub_camilo_list() {
      var param = Object()
      param.cam = this.card_list
      param.money_id = this.choose_price
      param.platform_id = this.choose_platform
      param.discount = this.discount
      this.send_camilo(param)
    },
    send_camilo(data) {
      this.$confirm('是否添加卡密?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        sub_camilo_data(data).then(response => {
          if (response.code === '200') {
            this.camilo_table = []
            this.card_list = []
            this.$message({
              type: 'success',
              message: '卡密提交成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: response.message + response.data
            })
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
      })
    }
  }
}

</script>

<style scoped>
#camilo{

}
#form{
    padding:40px;
}
.el-tabs--border-card{
    height:400px;
}
.single_card .el-form-item{
  width:400px;
}
.title{
  margin-top: 25px;
  margin-left:50px;
  color:red;
}
.downbutton{
      display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
        box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: .1s;
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
}
</style>
