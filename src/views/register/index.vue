<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="registerForm" :rules="registerRules" ref="registerForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">注 册</h3>
      <el-form-item prop="tel">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name='tel' placeholder="输入手机号" v-model='registerForm.tel' auto-complete="on"/>
      </el-form-item>
      <el-form-item prop='pass'>
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="password" />
        </span>
        <el-input name='pass' type='password' placeholder="输入密码"  v-model='registerForm.pass' auto-complete="on"/>
      </el-form-item>
      <el-form-item prop='pass_again'>
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="password" />
        </span>
        <el-input name='pass_again' type='password' placeholder="确认密码"  v-model='registerForm.pass_again' auto-complete="on"/>
      </el-form-item>
      <el-form-item>
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="qq" />
        </span>
        <el-input placeholder="QQ号" v-model='registerForm.qq'/>
      </el-form-item>


      <el-form-item>
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="alipay" />
        </span>
        <el-input placeholder="支付宝账号" v-model='registerForm.alipay'/>
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
import { register } from '@/api/login'
// import { login } from '@/api/login'

export default {
  name: 'register',
  data() {
    var validateTel = (rule, value, callback) => {
      if (!validatorTel(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    var validatePagain = (rule, value, callback) => {
      if (value !== this.registerForm.pass) {
        callback(new Error('两次密码不一样'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        tel: '',
        pass: '',
        pass_again: '',
        qq: '',
        alipay: ''
      },
      registerRules: {
        tel: [{ required: true, trigger: 'blur', validator: validateTel }],
        pass: [{ required: true, trigger: 'blur', validator: validatePass }],
        pass_again: [{ required: true, trigger: 'blur', validator: validatePagain }]
      },
      loading: false
    }
  },
  methods: {
    handleRegister: function() {
      this.$refs.regsiterForm.validate(valid => {
        if (valid) {
          this.loading = true
          register(this.registerForm).then(response => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
      margin: 120px auto;
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
  }
</style>
