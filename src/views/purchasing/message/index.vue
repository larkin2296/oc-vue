<template>
  <div>
    <div id='msg_tab'>
      <el-tabs type="border-card">
        <el-tab-pane label="个人信息查看">
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
            <el-form-item label="city">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label='状态'>
              <el-radio-group v-model='msg.sex'>
                <el-radio label="正常"></el-radio>
                <el-radio label="锁定"></el-radio>
              </el-radio-group>
            </el-form-item>
        </el-form>
        </el-tab-pane>
        <el-tab-pane label="密码修改">
        </el-tab-pane>
        <el-tab-pane label="头像修改">
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
.msg{
  width:300px;
  height:500px;
  margin:5% auto;
}
</style>


