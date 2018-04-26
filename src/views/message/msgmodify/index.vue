<template>
  <div>
    <el-button type='success' style='margin:30px;width:150px;height:60px;' >提交信息</el-button>
    <el-button type='danger' @click="submitUpload">上传</el-button>
    <div id='msg_tab'>
      <el-form class="msg" v-model='msg' label-width="100px">
        <el-form-item label='真实姓名'>
          <el-input />
        </el-form-item>
        <el-form-item label='性别'>
          <el-radio-group v-model='msg.sex'>
            <el-radio label="男" value='1'></el-radio>
            <el-radio label="女" value='2'></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="银行卡账号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="qq号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item style='margin-left: -210px;'>
          <el-form class='pic_modify' :inline="true">
            <el-form-item label='上传身份证正面'>
              <el-upload
            class="avatar-uploader"
            action="123"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeAvatarUpload" list-type="picture-card"
            :auto-upload="false">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
            <el-form-item label='上传身份证背面'>
            <el-upload
            class="avatar-uploader"
            action="123"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeAvatarUpload" list-type="picture-card"
            :auto-upload="false">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item style='margin-left: -210px;'>
          <el-form class='pic_modify' :inline="true">
            <el-form-item label='上传银行卡正面'>
              <el-upload
            class="avatar-uploader"
            action="123"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeAvatarUpload" list-type="picture-card"
            :auto-upload="false">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
          </el-form>
        </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'msg',
  data() {
    return {
      msg: [{
        sex: '男'
      }],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
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
.el-form{
  width:300px;
  height:500px;
  margin:2% 10%;
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
  .pic_modify{
    width:800px;
    height:200px;
  }
  .avatar-uploader{
    border:none;
  }
</style>


