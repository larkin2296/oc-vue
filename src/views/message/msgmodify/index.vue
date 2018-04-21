<template>
  <div>
    <div id='msg_tab'>
      <el-tabs type="border-card">
        <el-tab-pane label="个人信息修改">
          <el-form class="msg" v-model='msg' :label-position="left" label-width="100px">
            <el-form-item label='真实姓名'>
              <el-input />
            </el-form-item>
            <el-form-item label='性别'>
              <el-radio-group v-model='msg.sex'>
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="支付宝账号">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="qq号">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="城市">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="身份证">
              <el-input></el-input>
            </el-form-item>
        </el-form>
        </el-tab-pane>
        <el-tab-pane label="密码修改">
          <el-form class='psd_modify'>
            <el-form-item label='旧密码'>
              <el-input></el-input>
            </el-form-item>
            <el-form-item label='新密码'>
              <el-input></el-input>
            </el-form-item>
            <el-form-item label='确认密码'>
              <el-input></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type='danger'>修改</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="头像修改">
          <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-tab-pane>
        <el-tab-pane label="上传信息">
          <el-form class='psd_modify'>
            <el-form-item label='上传身份证'></el-form-item>
            <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item>
              <el-button type='danger'>上传</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msg',
  data() {
    return {
      msg: [{
        sex: '男'
      }],
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
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
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
.el-form{
  width:300px;
  height:500px;
  margin:5% auto;
}
.avatar-uploader{
    width: 190px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


