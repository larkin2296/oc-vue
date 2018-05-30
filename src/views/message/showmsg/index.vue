<template>
  <div>
    <div id='msg_tab'>
      <el-tabs type="border-card">
        <el-tab-pane label="个人信息查看">
          <el-form class="msg" :model='msg' label-width="100px">
            <el-form-item label='真实姓名'>
              {{ msg.name }}
            </el-form-item>
            <el-form-item label='性别'>
              <el-tag v-if='msg.sex == 1'>男</el-tag>
              <el-tag v-if='msg.sex == 2'>女</el-tag>
            </el-form-item>
            <el-form-item label="手机">
              {{ msg.mobile }}
            </el-form-item>
            <el-form-item label="支付宝账号">
              {{ msg.alipay }}
            </el-form-item>
            <el-form-item label="qq号">
              {{ msg.qq_num }}
            </el-form-item>
            <el-form-item label="city">
              {{ msg.city }}
            </el-form-item>
        </el-form>
        </el-tab-pane>
        <el-tab-pane label="邀请查看" v-if='is_permission == 1'>
          <el-button type='danger' @click='create_link'>生成邀请链接</el-button>
          {{ invitelink }}
            <el-table  v-model="inviteform" border fit highlight-current-row>
              <el-table-column label='被邀请人'>               
              </el-table-column>
              <el-table-column label='邀请时间'>               
              </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="密码修改">
          <el-form ref="psd_form" :model='psd_form' :rules="psdRules" status-icon class='demo-ruleForm'>
            <el-form-item label='旧密码' prop="old_psd">
              <el-input type='password' v-model='psd_form.old_psd'></el-input>
            </el-form-item>
            <el-form-item label='新密码' prop="new_psd">
              <el-input type='password' v-model='psd_form.new_psd'></el-input>
            </el-form-item>
            <el-form-item label='确认密码' prop="ag_psd">
              <el-input type='password' v-model='psd_form.ag_psd'></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type='danger' @click='modify_password'>修改</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="头像修改">
          <el-upload
          action="123"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeAvatarUpload" list-type="picture-card"
            :auto-upload="false">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        <el-button type='danger' @click="submitUpload">上传</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { get_message, c_link } from '@/api/message'
import { password_modify } from '@/api/message'
import { get_permission_data } from '@/api/configure'
import store from '@/store'
import qs from 'qs'
export default {
  name: 'msg',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    const validatePagain = (rule, value, callback) => {
      if (value !== this.psd_form.new_psd) {
        callback(new Error('两次密码不一样'))
      } else {
        callback()
      }
    }
    return {
      is_permission: 0,
      msg: [{
        sex: '男'
      }],
      inviteform: [],
      invitelink: '',
      psd_form: {
        old_psd: '',
        new_psd: '',
        ag_psd: ''
      },
      psdRules: {
        new_psd: [{ trigger: 'blur', validator: validatePass }],
        ag_psd: [{ trigger: 'blur', validator: validatePagain }]
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_message(store.getters.token).then(response => {
        this.msg = response.data
      })
      get_permission_data('recommend_status').then(res => {
        if (res.code === '200') {
          this.is_permission = 1
        } else {
          this.is_permission = 0
        }
      })
    },
    modify_password() {
      this.$confirm('是否修改密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.psd_form.validate(valid => {
          if (valid) {
            this.loading = true
            password_modify(store.getters.token, qs.stringify(this.psd_form)).then(response => {
              if (response.code === '200') {
                this.$message({
                  message: '恭喜你，修改成功',
                  type: 'success'
                })
                this.$store.dispatch('LogOut').then(() => {
                  location.reload() // 为了重新实例化vue-router对象 避免bug
                })
              } else if (response.code === '500') {
                this.$message.error(response.msg)
              }
            }).catch(error => {
              console.log(error)
            })
          }
        })
      }).catch(() => {
      })
    },
    create_link() {
      c_link(store.getters.token).then(response => {
        console.log(response)
        this.invitelink = response.data
        this.listLoading = false
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      let param = new FormData()
      param.append('file', file)
      axios.post('http://localhost/oil_cord_system/public/index.php/api/upload/', param, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        if (res.status === 200) {
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.el-form,.el-table{
  width:300px;
  height:500px;
  margin:5% auto;
}
</style>
