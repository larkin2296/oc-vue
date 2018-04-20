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
                <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
                </el-upload>
            </el-tab-pane>
        </el-tabs>
    </el-collapse-transition>
    <el-form id='search_card' :inline="true" :model="formInline">
        <el-form-item label='编号'>
            <el-input v-model='formInline.serial_number'></el-input>
        </el-form-item>
        <el-form-item label='姓名'>
            <el-input v-model='formInline.true_name'></el-input>
        </el-form-item>
        <el-form-item label='油卡号'>
            <el-input v-model='formInline.oil_card_code'></el-input>
        </el-form-item>
        <el-form-item label="状态" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <el-select v-model='formInline.status' placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    <el-form-item>
        <el-button type="danger" @click="show3 = !show3">添加</el-button>
    </el-form-item>
    </el-form>
    <div class="app-container">
    <el-table :data="tableData" v-loading.body="listLoading" stripe style="width: 100%" border fit highlight-current-row>
    <el-table-column label="序号">
      <template slot-scope="scope">
          {{scope.row.$value}}
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
          <el-radio-group v-model="scope.row.status" size="small">
            <el-radio-button label="正常"></el-radio-button>
            <el-radio-button label="停用"></el-radio-button>
          </el-radio-group>
        </template>
    </el-table-column>
    <el-table-column label="启用" width="220">
        <template slot-scope="scope">
        <el-button type='danger' v-show="scope.row.is_start">启用此卡</el-button>
        </template>
    </el-table-column>
      </el-table>
      </div>
  </div>
</template>

<script>
import { binding_card, get_card_list } from '@/api/purchasing'
import { validatorName, validatorID } from '@/utils/validate'
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
      formInline: {
        serial_number: '',
        ture_name: '',
        oil_card_code: '',
        status: ''
      },
      value2: true,
      show3: false,
      fileList: [
        { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ]
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
    },
    addcard() {
      this.$refs.addform.validate(valid => {
        if (valid) {
          this.loading = true
          binding_card(this.addform).then(response => {
            console.log(response)
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    onSubmit() {
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
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
</style>

