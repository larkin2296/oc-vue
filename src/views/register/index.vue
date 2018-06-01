<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="registerForm" :rules="registerRules" ref="registerForm" label-width="0px"
      class="card-box login-form">
      <h3 class="title">注 册</h3>
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
      <el-form-item prop='password'>
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="password" />
        </span>
        <el-input name='password' type='password' placeholder="输入密码"  v-model='registerForm.password' auto-complete="on"/>
      </el-form-item>
      <el-form-item prop='pass_again'>
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="password" />
        </span>
        <el-input name='pass_again' type='password' placeholder="确认密码"  v-model='registerForm.pass_again' auto-complete="on"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleRegister">
          注 册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validatorTel } from '@/utils/validate'
import { register, send_message, send_message_again, getUrlKey } from '@/api/register'
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
      if (value !== this.registerForm.password) {
        callback(new Error('两次密码不一样'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        id: '',
        mobile: '',
        password: '',
        pass_again: '',
        code: ''
      },
      ver_number: 60,
      registerRules: {
        mobile: [{ trigger: 'blur', validator: validateTel }],
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
      b_msg_state: '0'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      var id = getUrlKey('id')
      this.registerForm.id = id
    },
    handleRegister: function() {
      this.loading = true
      register(this.registerForm, this.registerForm.id).then(response => {
        console.log(response)
        this.loading = false
        // this.$router.push({ path: '/' })
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    countdown: function() {
      if (!this.timer) {
        if (this.b_msg === '获取验证码') {
          send_message(this.registerForm.mobile).then(response => {
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
          send_message_again(this.registerForm.mobile).then(response => {
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
