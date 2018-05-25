<template>
  <div>
      <el-collapse-transition>
        <el-tabs type="border-card" v-show='show3'>
            <el-tab-pane label="填写">
                <el-form id='add_card' autoComplete="on" :inline="true" ref="addform" :model="addform" :rules="CardRules" status-icon class="demo-ruleForm">
                    <el-form-item  label='用户名' prop="name">
                        <el-input v-model='addform.name'></el-input>
                    </el-form-item>
                    <el-form-item  label='密码' prop="name">
                        <el-input v-model='addform.name' auto-complete="on" />
                    </el-form-item>
                    <el-form-item  label='姓名' prop="truename">
                        <el-input v-model='addform.truename'></el-input>
                    </el-form-item>
                    <el-form-item  label='性别' prop="sex">
                        <el-select v-model='addform.sex' placeholder="请选择">
                            <el-option
                            v-for="item in sex"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  label='手机号' prop="mobile">
                        <el-input v-model='addform.mobile'></el-input>
                    </el-form-item>
                    <el-form-item  label='身份' prop="role_status">
                        <el-select v-model='addform.role_status' placeholder="请选择">
                            <el-option
                            v-for="item in identity"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" @click="addcard">Create</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </el-collapse-transition>
    <el-button type="danger" @click="show3 = !show3">新增</el-button>
    <div class="app-container">
    <el-table :data="tableData" v-loading.body="listLoading" stripe style="width: 100%" border fit highlight-current-row>
    <el-table-column label="序号">
      <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
    </el-table-column>
    <el-table-column label="姓名">
      <template slot-scope="scope">
          {{scope.row.truename}}
        </template>
    </el-table-column>
    <el-table-column label="用户名">
      <template slot-scope="scope">
          {{scope.row.name}}
        </template>
    </el-table-column>
    <el-table-column label="性别" width="220">
      <template slot-scope="scope">
          <el-tag v-if='scope.row.sex == 1'>男</el-tag>
          <el-tag v-if='scope.row.sex == 2'>女</el-tag>
        </template>
    </el-table-column>
    <el-table-column label="手机号">
        <template slot-scope="scope">
          {{scope.row.mobile}}
        </template>
    </el-table-column>
    <el-table-column label="角色" width="220">
        <template slot-scope="scope">
          <el-tag v-if='scope.row.role_status == 3'>普通管理员</el-tag>
          <el-tag v-if='scope.row.role_status == 4'>超级管理员</el-tag>
        </template>
    </el-table-column>
      </el-table>
      </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  data() {
    return {
      tableData: [],
      addform: {
        name: '',
        truename: '',
        password: '',
        mobile: '',
        sex: ''
      },
      listLoading: true,
      formInline: {
        serial_number: '',
        ture_name: '',
        oil_card_code: '',
        status: ''
      },
      value2: true,
      show3: false,
      fileList: [],
      token: {
        accessToken: ''
      },
      sex: [{
        label: '男',
        value: 1
      }, {
        label: '女',
        value: 2
      }],
      identity: [{
        label: '普通管理员',
        value: 3
      }, {
        label: '超级管理员',
        value: 4
      }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = false
    },
    addcard() {
      this.$confirm('是否添加该油卡?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.addform.validate(valid => {
          if (valid) {
            this.loading = false
          }
        })
      }).catch(() => {
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
</style>
