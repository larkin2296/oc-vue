<template>
  <div id='camilo'>
      <el-form id='form'>
          <el-form-item label='平台选择'>
              <el-radio-group v-model="radio3">
                <el-radio-button label="阳光汽车"></el-radio-button>
                <el-radio-button label="中石化"></el-radio-button>
                <el-radio-button label="中石油"></el-radio-button>
                <el-radio-button label="阳光爱车"></el-radio-button>
                <el-radio-button label="车传奇"></el-radio-button>
              </el-radio-group>
          </el-form-item>
          <el-form-item label='面额'>
            <el-radio v-model="radio" label="1" border>￥100</el-radio>
            <el-radio v-model="radio" label="2" border>￥200</el-radio>
            <el-radio v-model="radio" label="3" border>￥300</el-radio>
          </el-form-item>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick" type='border-card'>
        <el-tab-pane label="单张" name="first">
            <template>
                <el-form>
                    <el-form-item label='卡密字段一'>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label='卡密字段二'>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type='danger'>提交</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </el-tab-pane>
        <el-tab-pane label="导入" name="second">
            <el-upload class="upload-demo"
                ref="upload"
                :multiple="false"
                action="123"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-change="handleChange"
                :before-upload="beforeUpload"
                :file-list="fileList"
                :auto-upload="false" accept=".xls,.xlsx">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传xls,xlsx文件，且不超过500kb</div>
            </el-upload>
        </el-tab-pane>
        <el-tab-pane label="输入" name="third">角色管理</el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      radio: '1',
      radio3: '中石化',
      activeName: 'second',
      fileList: []
    }
  },
  method: {
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
</style>
