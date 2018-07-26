<template>
  <div>
    <el-steps :active="active">
      <el-step title="信息填写" icon="el-icon-edit"></el-step>
      <el-step title="上传工作证" icon="el-icon-upload"></el-step>
      <el-step title="上传银行卡" icon="el-icon-upload"></el-step>
      <el-step title="完成" icon="el-icon-picture"></el-step>
    </el-steps>
    <div class='page' v-if='active == 1'>
      <el-form class="msg" v-model='msg' label-width="100px">
        <el-form-item label='真实姓名'>
          <el-input v-model='msg.true_name'></el-input><span class='must'>*</span>
        </el-form-item>
        <el-form-item label='性别'>
          <el-radio-group v-model='msg.sex'>
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="银行卡账号">
          <el-input v-model='msg.alipay'></el-input><span class='must'>*</span>
        </el-form-item>
        <el-form-item label="qq号">
          <el-input v-model='msg.qq_num'></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model='msg.city'></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model='msg.id_card'></el-input><span class='must' v-if='role == 2'>*</span>
        </el-form-item>
        <el-form-item>
        <el-button type='primary' style="margin-top: 12px;" @click="next">下一步</el-button>
        </el-form-item>
        </el-form>   
    </div>
    <div class='page' v-if='active == 2'>
        <h3>工作证正反面照片</h3>
        <div class="img-list">
          <div class="img-content" v-for="(item,key) in imagelist" :key="key">
            <img :src="item.url">
            <div class="name">
              <div>{{ item.name }}</div>
            </div>
            <!-- 删除icon -->
            <div class="del">
              <i @click="handleFileRemove(item,key)" class="el-icon-delete"></i>
            </div>
            <!-- 放大icon -->
            <div class="layer" @click="handleFileEnlarge(item.url)">
              <i class="el-icon-view"></i>
            </div>
          </div>
          <!-- <div v-if="!pass && progress !== 0" class="img-content img-progress">
            <el-progress type="circle" :percentage="progress" :status="proStatus"></el-progress>
          </div> -->
          <div class="img-upload">
            <el-upload class="uploader" accept="image/*"
              ref="upload"
              list-type="picture-card"
              :show-file-list="false"
              action='123'
              :data="params.data"
              :on-error="uploadOnError"
              :before-upload="beforeUpload"
              :on-progress="uploadOnProgress">
                <el-button type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <el-dialog title="" :visible.sync="isEnlargeImage" size="large" :modal-append-to-body="false" top="8%" width="60%">
            <img @click="isEnlargeImage = false" style="width:100%;" :src="enlargeImage">
          </el-dialog>
        </div>
        <el-button style="margin-top: 12px;" @click="next_1">下一步</el-button>
    </div>
    <div class='page' v-if='active == 3'>
      <h3>上传银行卡正面照片</h3>
        <div class="img-list">
          <div class="img-content" v-for="(item,key) in imagelist1" :key="key">
            <img :src="item.url">
            <div class="name">
              <div>{{ item.name }}</div>
            </div>
            <!-- 删除icon -->
            <div class="del">
              <i @click="handleFileRemove1(item,key)" class="el-icon-delete"></i>
            </div>
            <!-- 放大icon -->
            <div class="layer" @click="handleFileEnlarge1(item.url)">
              <i class="el-icon-view"></i>
            </div>
          </div>
          <!-- <div v-if="!pass && progress !== 0" class="img-content img-progress">
            <el-progress type="circle" :percentage="progress" :status="proStatus"></el-progress>
          </div> -->
          <div class="img-upload">
            <el-upload class="uploader" accept="image/*"
              ref="upload"
              list-type="picture-card"
              :show-file-list="false"
              action='123'
              :data="params.data"
              :on-error="uploadOnError1"
              :before-upload="beforeUpload1"
              :on-progress="uploadOnProgress1">
                <el-button type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <el-dialog title="" :visible.sync="isEnlargeImage1" size="large" :modal-append-to-body="false" top="8%" width="60%">
            <img @click="isEnlargeImage1 = false" style="width:100%;" :src="enlargeImage1">
          </el-dialog>
        </div>
        <el-button style="margin-top: 12px;" @click="send_msg">完成</el-button>
    </div>
    <div class='page' v-if='active == 4'>
      <h3>{{result_msg}}</h3>
    </div>
  </div>
</template>

<script>
import { upload_file } from '@/api/configure.js'
import { create_msg } from '@/api/message.js'
import store from '@/store'
export default {
  name: 'msg',
  data() {
    return {
      msg: {
        true_name: '',
        sex: '1',
        alipay: '',
        qq_num: '',
        city: '',
        id_card: '',
        img_url: [],
        card_url: []
      },
      dialogImageUrl: '',
      dialogVisible: false,
      dialogVisible1: false,
      progress: 0,
      pass: null,
      isEnlargeImage: false,
      isEnlargeImage1: false,
      enlargeImage: '',
      enlargeImage1: '',
      active: 1,
      imagelist: [],
      imagelist1: [],
      params: {
        data: {}
      },
      result_msg: '',
      role: ''
    }
  },
  computed: {
    proStatus() {
      if (this.pass) {
        return 'success'
      } else if (this.pass === false) {
        return 'exception'
      } else {
        return ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.role = store.getters.roles
      console.log(this.role)
    },
    next() {
      if (this.msg.true_name === '' || this.msg.alipay === '') {
        if (this.role === 2 && this.msg.id_card === '') {
          this.$message.error('必填项请填写完整')
        }
      } else {
        this.active++
      }
    },
    next_1() {
      if (this.msg.img_url.length !== 2) {
        this.$message.error('请上传正确的身份证信息')
      } else {
        this.active++
      }
    },
    uploadOnProgress(e, file) {
      console.log(e.percent, file)
      this.progress = Math.floor(e.percent)
    },
    uploadOnProgress1(e, file) {
      console.log(e.percent, file)
      this.progress = Math.floor(e.percent)
    },
    uploadOnChange(file) {
      console.log('——————————change——————————')
      // console.log(file)
      if (file.status === 'ready') {
        console.log('ready')
        this.pass = null
        this.progress = 0
      } else if (file.status === 'fail') {
        this.$message.error('图片上传出错，请刷新重试！')
      }
    },
    // uploadOnSuccess(e, file) {
    //   console.log('——————————success——————————')
    //   this.pass = true
    //   this.$message.success('上传成功')
    //   this.imagelist.push({
    //     url: file.url,
    //     name: '新增图片'
    //   })
    // },
    uploadOnError(e, file) {
      console.log('——————————error——————————')
      console.log(e)
      this.pass = false
    },
    uploadOnError1(e, file) {
      console.log('——————————error——————————')
      console.log(e)
      this.pass = false
    },
    beforeUpload(file) {
      let param = new FormData()
      param.append('file', file)
      param.append('status', 3)
      upload_file(param).then((res) => {
        this.imagelist.push({
          url: res.data.url,
          name: res.data.origin_name
        })
        this.msg.img_url.push({
          id: res.data.id_hash
        })
      }, (res) => {
        console.log(res)
      })
    },
    beforeUpload1(file) {
      let param = new FormData()
      param.append('file', file)
      param.append('status', 3)
      upload_file(param).then((res) => {
        this.imagelist1.push({
          url: res.data.url,
          name: res.data.origin_name
        })
        this.msg.card_url.push({
          id: res.data.id_hash
        })
      }, (res) => {
        console.log(res)
      })
    },
    handleFileEnlarge(_url) {
      console.log(_url)
      if (_url) {
        this.enlargeImage = _url
        this.isEnlargeImage = !this.isEnlargeImage
      }
    },
    handleFileEnlarge1(_url) {
      console.log(_url)
      if (_url) {
        this.enlargeImage1 = _url
        this.isEnlargeImage1 = !this.isEnlargeImage1
      }
    },
    handleFileRemove(file, i) {
      console.log(file, i)
      if (!file.url) {
        return false
      }
      let that = this
      this.$confirm('是否删除此附件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      // 可添加ajax
        this.$message.success('删除成功')
        this.$message({
          type: 'success',
          message: '删除成功',
          onClose: () => {
            that.imagelist.splice(i, 1)
            that.msg.img_url.splice(i, 1)
          }
        })
      }).catch((meg) => console.log(meg))
    },
    handleFileRemove1(file, i) {
      console.log(file, i)
      if (!file.url) {
        return false
      }
      let that = this
      this.$confirm('是否删除此附件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      // 可添加ajax
        this.$message.success('删除成功')
        this.$message({
          type: 'success',
          message: '删除成功',
          onClose: () => {
            that.imagelist1.splice(i, 1)
            that.msg.card_url.splice(i, 1)
          }
        })
      }).catch((meg) => console.log(meg))
    },
    send_msg() {
      create_msg(this.msg).then(res => {
        if (res.code === 200) {
          this.active++
          this.result_msg = res.message
        }
      })
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
  .page{
    width:80%;
    height:500px;
    margin:0 auto;
  }
  .el-steps{
    width:80%;
    margin:0 auto;
    margin-top:25px;
    margin-bottom:25px;
  }
  .el-form{
    margin:0 auto;
  }
  *{
    box-sizing: border-box;
}
*{
	box-sizing: border-box;
}
.img-list{
	overflow:hidden;
	width:100%;
}
.img-list .img-content{
	float:left;
	text-align:left;
	position:relative;
	display:inline-block;
	width:200px;
	height:270px;
	padding:5px;
	margin:5px 20px 20px 0;
	border:1px solid #d1dbe5;
	border-radius:4px;
	transition:all .3s;
	box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
.img-list .img-upload{
	float:left;
	width:200px;
	height:270px;
	display:table;
	text-align:center;
}
.img-list .uploader{
	width:100%;
	display:table-cell;
	vertical-align:middle;
}
.img-list .img-progress{
	text-align:center;
	padding-top:50px;
}
.img-list .img-content img{
	display:block;
	width:100%;
	height:190px;
	margin:0 auto;
	border-radius:4px;
}
.img-list .img-content .name{
	margin-top:10px;
}
.img-list .img-content .name>div{
	width:90%;
	text-overflow:ellipsis;
	overflow:hidden;
	height:25px;
	line-height:25px;
}
.img-list .img-content:hover .del,
.img-list .img-content:hover .layer{
	opacity:1;
}
.img-list .img-content .del,
.img-list .img-content .layer{
	opacity:0;
	transition:all .3s;
}
.img-list .img-content .del{
	position:absolute;
	bottom:10px;
	right:10px;
	color:#8492a6;
	cursor:pointer;
	font-size:1.1em;
}
.img-list .img-content .layer{
	position:absolute;
	left:0;
	right:0;
	top:0;
	height:200px;
	color:#fff;
	text-align:center;
	z-index:5;
	background-color:rgba(0,0,0,.4);
}
.img-list .img-content .layer i{
	font-size:1.6em;
	margin-top:80px;
}
.must{
  color:red;
}
.el-input{
  width: 140px;
}
</style>


