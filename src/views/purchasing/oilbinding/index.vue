<template>
  <div>
    <el-form id='search_card' :inline="true" :model="formInline">
        <el-form-item label='编号'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='姓名'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='油卡号'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="状态" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <el-select  placeholder="please select your zone">
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
    <el-collapse-transition>
        <el-tabs type="border-card" v-show='show3'>
            <el-tab-pane label="填写">
                <el-form id='add_card' :inline="true" :model="formInline"  :label-position="right">
                    <el-form-item label='编号'>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label='姓名'>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label='油卡号'>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label='身份证'>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label='官网账号'>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label='密码'>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button type="danger" @click="onSubmit">导入</el-button>
                </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="导入">
                <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-tab-pane>
        </el-tabs>
    </el-collapse-transition>
    <div class="app-container">
    <el-table :data="tableData" stripe style="width: 100%" border fit highlight-current-row>
    <el-table-column prop="date" label="序号">
    </el-table-column>
    <el-table-column prop="name" label="编号">
    </el-table-column>
    <el-table-column prop="address" label="姓名">
    </el-table-column>
    <el-table-column prop="address" label="卡号" width="220">
    </el-table-column>
    <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949" style="display:block">
        </el-switch>
        </template>
    </el-table-column>
      </el-table>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2018-04-12',
        name: '张三',
        address: '上海市张杨路'
      }],
      value2: true,
      show3: false
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

