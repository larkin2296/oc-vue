<template>
  <div>
    <div id='msg_tab'>
      <el-tabs type="border-card">
        <el-tab-pane label="个人信息查看">
          <el-form class="msg" v-model='msg' :label-position="left" label-width="100px">
            <el-form-item label='真实姓名'>
              {{ msg.name }}
            </el-form-item>
            <el-form-item label='性别'>
              {{ msg.sex }}
            </el-form-item>
            <el-form-item label="手机">
              {{ msg.phone }}
            </el-form-item>
            <el-form-item label="支付宝账号">
              {{ msg.alipay }}
            </el-form-item>
            <el-form-item label="qq号">
              {{ msg.qq }}
            </el-form-item>
            <el-form-item label="city">
              {{ msg.city }}
            </el-form-item>
            <el-form-item label='状态'>
              {{ msg.status }}
            </el-form-item>
        </el-form>
        </el-tab-pane>
        <el-tab-pane label="邀请查看">
            <el-table>

            </el-table>
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
      }]
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
