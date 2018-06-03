<template>
  <div>
      <el-collapse-transition>
        <el-tabs type="border-card" v-show='show3'>
            <el-tab-pane label="填写">
                <el-form id='add_card' autoComplete="on" :inline="true" ref="addform" :model="addform" :rules="CardRules" status-icon class="demo-ruleForm">
                    <el-form-item  label='编号' prop="serial_number">
                        <el-input v-model='addform.serial_number'></el-input>
                    </el-form-item>
                    <el-form-item  label='姓名' prop="ture_name">
                        <el-input v-model='addform.ture_name' auto-complete="on" />
                    </el-form-item>
                    <el-form-item  label='油卡号' prop="oil_card_code">
                        <el-input v-model='addform.oil_card_code'></el-input>
                    </el-form-item>
                    <el-form-item  label='身份证' prop="identity_card">
                        <el-input v-model='addform.identity_card'></el-input>
                    </el-form-item>
                    <el-form-item  label='官网账号' prop="web_account">
                        <el-input v-model='addform.web_account'></el-input>
                    </el-form-item>
                    <el-form-item  label='密码' prop="web_password">
                        <el-input v-model='addform.web_password'></el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" @click="addcard">Create</el-button>
                </el-form-item>
                <el-input type='hidden' v-model='addform.user_id' />
                </el-form>
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
                  <a class='downbutton' href='http://47.98.199.243:8080/src/template/oil_binding.xlsx'>下载模板</a>
                </el-upload>    
            </el-tab-pane>
        </el-tabs>
    </el-collapse-transition>
    <el-form id='search_card' :inline="true" :model="form">
        <el-form-item label='编号'>
            <el-input v-model='form.serial_number'></el-input>
        </el-form-item>
        <el-form-item label='姓名'>
            <el-input v-model='form.true_name'></el-input>
        </el-form-item>
        <el-form-item label='油卡号'>
            <el-input v-model='form.oil_card_code'></el-input>
        </el-form-item>
        <el-form-item label="状态" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <el-select v-model='form.is_longtrem' placeholder="选择状态">
          <el-option label="长期" value="1"></el-option>
          <el-option label="短期" value="0"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="go_search">查询</el-button>
      </el-form-item>
    <el-form-item>
        <el-button type="danger" @click="show3 = !show3">添加</el-button>
    </el-form-item>
    </el-form>
    <div class="app-container">
    <el-table :data="tableData" v-loading.body="listLoading" stripe style="width: 100%" border fit highlight-current-row>
    <el-table-column label="序号">
      <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
    </el-table-column>
    <el-table-column label="编号">
      <template slot-scope="scope">
          {{scope.row.serial_number}}
        </template>
    </el-table-column>
    <el-table-column label="姓名">
      <template slot-scope="scope">
          {{scope.row.ture_name}}
        </template>
    </el-table-column>
    <el-table-column label="卡号" width="220">
      <template slot-scope="scope">
          {{scope.row.oil_card_code}}
        </template>
    </el-table-column>
    <el-table-column label="状态">
        <template slot-scope="scope">
          <el-radio-group v-model="scope.row.status" size="small" @change="set_status(scope.row.id)" :disabled="scope.row.disabled">
            <el-radio-button label="正常"></el-radio-button>
            <el-radio-button label="停用"></el-radio-button>
          </el-radio-group>
        </template>
    </el-table-column>
    <el-table-column label="操作" width="220">
        <template slot-scope="scope">
        <el-button type='danger' v-show="scope.row.is_start" @click="start_card(scope.$index)">启用此卡</el-button>
        <el-button v-if="scope.row.is_longtrem === 0 && is_permission == 1" type='primary' v-show="scope.row.longtrem" @click="longtrem_card(scope.$index)">设置为长期</el-button>
        <el-button v-else-if="scope.row.is_longtrem === 1" type='success' v-show="scope.row.longtrem">长期卡</el-button>
        <el-button type='info' v-if="scope.row.card_status === 2" @click="del_card(scope.row.id)">删除此卡</el-button>
        </template>
    </el-table-column>
      </el-table>
      </div>
      <el-dialog
        title="充值记录"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <el-table :data='addcard_list' border fit highlight-current-row>
        <el-table-column label='编号'>
          <template slot-scope="scope">
          {{ scope.row.serial_number }}
          </template>
        </el-table-column>
        <el-table-column label='姓名'>
          <template slot-scope="scope">
          {{ scope.row.ture_name }}
          </template>
        </el-table-column>
        <el-table-column label='油卡号'>
          <template slot-scope="scope">
          {{ scope.row.oil_card_code }}
          </template>
        </el-table-column>
        <el-table-column label='身份证号'>
          <template slot-scope="scope">
          {{ scope.row.identity_card }}
          </template>
        </el-table-column>
        <el-table-column label='官网账号'>
          <template slot-scope="scope">
          {{ scope.row.web_account }}
          </template>
        </el-table-column>
        <el-table-column label='官网密码'>
          <template slot-scope="scope">
          {{ scope.row.web_password }}
          </template>
        </el-table-column>
        <el-table-column label='操作'>
          <template slot-scope="scope">
          <el-button type='danger' @click='del(scope.$index)'>删除</el-button>
          </template>
        </el-table-column>     
      </el-table>
      <el-button type='danger' @click='sub_camilo_list'>提交</el-button>
        </el-dialog>
  </div>
</template>

<script>

import { binding_card, get_card_list, card_start, set_longtrem, confirm_status, get_oilcard_upload, del_card_data } from '@/api/purchasing'
import { validatorName, validatorID } from '@/utils/validate'
import { get_permission_data, upload_file } from '@/api/configure'
// import { upload } from '@/api/message'
import store from '@/store'

export default {
  name: 'card',
  data() {
    const validateTname = (rule, value, callback) => {
      if (!validatorName(value)) {
        callback(new Error('请输入正确姓名'))
      } else {
        callback()
      }
    }
    const validateIdentiy = (rule, value, callback) => {
      if (!validatorID(value)) {
        callback(new Error('请输入正确身份证'))
      } else {
        callback()
      }
    }
    const validateCard = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('不能为空'))
      } else {
        callback()
      }
    }
    return {
      is_permission: 0,
      tableData: [],
      addform: {
        serial_number: '',
        ture_name: '',
        oil_card_code: '',
        identity_card: '',
        web_account: '',
        web_password: '',
        user_id: store.getters.id
      },
      listLoading: true,
      CardRules: {
        ture_name: [{ trigger: 'blur', validator: validateTname }],
        identity_card: [{ trigger: 'blur', validator: validateIdentiy }],
        oil_card_code: [{ trigger: 'blur', validator: validateCard }]
      },
      form: {},
      value2: true,
      show3: false,
      fileList: [],
      token: {
        accessToken: ''
      },
      dialogVisible: false,
      addcard_list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_card_list(this.listQuery).then(response => {
        this.tableData = response
        this.listLoading = false
      })
      get_permission_data('recharge_long_directly').then(res => {
        if (res.code === '200') {
          this.is_permission = 1
        }
      })
    },
    go_search() {
      this.listLoading = true
      get_card_list(this.form).then(response => {
        this.tableData = response
        this.listLoading = false
      })
    },
    addcard() {
      this.$confirm('是否添加该油卡?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.addform.validate(valid => {
          if (valid) {
            this.loading = true
            binding_card(this.addform).then(response => {
              if (response.code === '200') {
                this.$message({
                  message: '恭喜你，油卡添加成功',
                  type: 'success'
                })
                this.fetchData()
              } else if (response.code === '500') {
                this.$message.error(response.message)
              }
            }).catch(error => {
              console.log(error)
            })
          }
        })
      }).catch(() => {
      })
    },
    del_card(id) {
      this.$confirm('是否删除该油卡?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del_card_data(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    start_card($index) {
      this.$confirm('是否启动该油卡?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        card_start(this.tableData[$index].id).then(response => {
          this.fetchData()
        }).catch(error => {
          console.log(error)
        })
        this.$message({
          type: 'success',
          message: '启动成功!'
        })
      }).catch(() => {
      })
    },
    longtrem_card($index) {
      this.$confirm('设置为长期卡后不可更改，供应商会自动获取并进行充值，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        set_longtrem(this.tableData[$index].id).then(response => {
          this.tableData[$index].is_longtrem = response.is_longtrem
        }).catch(error => {
          console.log(error)
        })
        this.$message({
          type: 'success',
          message: '设置成功!'
        })
      }).catch(() => {
      })
    },
    set_status(id) {
      this.$confirm('更改油卡状态(如有未完成充值订单将无法停用)?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        confirm_status(id).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '设置成功!'
            })
            this.fetchData()
          } else {
            this.$message.error(res.message)
            this.fetchData()
          }
        })
      }).catch(() => {
      })
    },
    handleSuccess(res, file, fileList) {
      console.log(1111111)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitUpload() {
      this.$refs.upload.submit()
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
          get_oilcard_upload(res.name).then(response => {
            this.$message({
              type: 'success',
              message: '上传成功!'
            })
            this.addcard_list = response.data
            this.dialogVisible = true
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    sub_camilo_list() {
      binding_card(this.addcard_list).then(response => {
        if (response.code === '200') {
          this.$message({
            message: '恭喜你，油卡添加成功',
            type: 'success'
          })
          this.fetchData()
        } else if (response.code === '500') {
          this.$message.error(response.message)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
#search_card{
    width: 1200px;
    margin: 0 auto;
    padding:40px 5px
}
#add_card{
    width: 1200px;
    margin: 0 auto;
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
