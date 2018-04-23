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
              {{ msg.sex }}
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
            <el-form-item label='状态'>
              <el-radio-group v-model='msg.status'>
                <el-radio label="正常" value='0'></el-radio>
                <el-radio label="锁定" value='1'></el-radio>
              </el-radio-group>
            </el-form-item>
        </el-form>
        </el-tab-pane>
        <el-tab-pane label="邀请查看">
          <el-button type='danger' @click='create_link'>生成邀请链接</el-button>
          {{ invitelink }}
            <el-table  v-model="inviteform" border fit highlight-current-row>
              <el-table-column label='被邀请人'>               
              </el-table-column>
              <el-table-column label='邀请时间'>               
              </el-table-column>
            </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { get_message, c_link } from '@/api/message'
import store from '@/store'
export default {
  name: 'msg',
  data() {
    return {
      msg: [{
        sex: '男'
      }],
      inviteform: [],
      invitelink: ''
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
    },
    create_link() {
      c_link(store.getters.token).then(response => {
        console.log(response)
        this.invitelink = response.data
        this.listLoading = false
      })
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
