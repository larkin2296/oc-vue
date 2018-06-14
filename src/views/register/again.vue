<template>
  <div class="login-container">
    <el-form v-if='show == 0' autoComplete="on" :model="registerForm" :rules="registerRules" ref="registerForm" label-width="0px"
      class="card-box login-form">
      <h3 class="title">重置密码</h3>
      <el-form-item prop="mobile">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name='mobile' placeholder="输入手机号" v-model='registerForm.mobile' auto-complete="on"/>
      </el-form-item>
      <el-form-item>
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="password" />
        </span>
        <el-input name='code' v-model='registerForm.code' placeholder='输入验证码' style='width:35%;'/>
        <el-button type='primary' :disabled="b_msg_state == '0'" v-on:click='countdown' :class="{ 'c_before':click_button === 1,'c_after':click_button === 0}">{{ b_msg }}</el-button><span class='ver_code' v-show="vn">{{ver_number}}</span>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleRegister">
          确认
        </el-button>
      </el-form-item>
    </el-form>
    <el-form v-if='show == 1' :model="passwordForm" :rules="passwordRules" ref="passwordForm" label-width="0px"
      class="card-box login-form">
        <h3 class="title">输入新密码</h3>
        <el-form-item prop='password'>
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="password" />
        </span>
        <el-input name='password' type='password' placeholder="输入密码"  v-model='passwordForm.password' auto-complete="on"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleModify">
          确认
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validatorTel } from '@/utils/validate'
import { resetpassMessage, resetpassMessage_again, again_check, updatePasswd } from '@/api/register'
// import { login } from '@/api/login'

export default {
  name: 'register',
  data() {
    const validateTel = (rule, value, callback) => {
      if (!validatorTel(value)) {
        this.b_msg_state = '0'
        callback(new Error('请输入正确的手机号'))
      } else {
        this.b_msg_state = '1'
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    const validatePagain = (rule, value, callback) => {
      if (value !== this.passwordForm.password) {
        callback(new Error('两次密码不一样'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        mobile: '',
        code: ''
      },
      ver_number: 60,
      registerRules: {
        mobile: [{ trigger: 'blur', validator: validateTel }]
      },
      passwordRules: {
        password: [{ trigger: 'blur', validator: validatePass }],
        pass_again: [{ trigger: 'blur', validator: validatePagain }]
      },
      loading: false,
      active: 0,
      registerid: {
      },
      vn: false,
      click_button: 1,
      b_msg: '获取验证码',
      b_msg_state: '0',
      show: 0,
      passwordForm: {}
    }
  },
  methods: {
    handleRegister: function() {
      this.loading = true
      again_check(this.registerForm).then(res => {
        if (res.code === '200') {
          this.show = 1
          this.loading = false
        } else {
          this.$message({
            type: 'error',
            message: '验证码不正确'
          })
        }
      })
    },
    handleModify: function() {
      if (this.passwordForm.password === '' || this.passwordForm.pass_again === '') {
        this.$message({
          type: 'error',
          message: '填写完整'
        })
      } else {
        var param = Object()
        param.password = this.passwordForm.password
        param.mobile = this.registerForm.mobile
        updatePasswd(param).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$router.push({ path: '/login' })
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        })
      }
    },
    countdown: function() {
      if (!this.timer) {
        if (this.b_msg === '获取验证码') {
          resetpassMessage(this.registerForm.mobile).then(response => {
            if (response.code !== '200') {
              this.$message.error(response.message)
            } else {
              this.b_msg_state = '0'
              this.click_button = 0
              this.vn = true
              const TIME_COUNT = 60
              this.ver_number = TIME_COUNT
              this.show = false
              this.b_msg = '已发送短信'
              this.timer = setInterval(() => {
                if (this.ver_number > 0 && this.ver_number <= TIME_COUNT) {
                  this.ver_number--
                } else {
                  this.show = true
                  clearInterval(this.timer)
                  this.timer = null
                  this.vn = false
                  this.click_button = 1
                  this.b_msg = '重新发送短信'
                  this.b_msg_state = '1'
                }
              }, 1000)
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          resetpassMessage_again(this.registerForm.mobile).then(response => {
            console.log(response)
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    position: fixed;
    height: 100%;
    width:100%;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .c_before{
      margin-left:40px;
      margin-right:0px;
    }
    .c_after{
      margin-left:0px;
      margin-right:5px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 20px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .el-radio-group {
      padding-top:10px;
      padding-bottom:20px;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .ver_code{
      color:white;
      font-size: 20px;
      margin-left:10px;
    }
  }
</style>
