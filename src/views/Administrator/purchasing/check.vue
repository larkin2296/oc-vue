<template>
  <div>
      <el-form v-model='form' :inline="true" label-width="120px">
        <el-form-item label='采购商'>
            <el-input v-model='form.truename'></el-input>
        </el-form-item>
        <el-form-item label='账号'>
            <el-input v-model='form.mobile'></el-input>
        </el-form-item>
        <el-form-item label='qq'>
            <el-input v-model='form.qq_num'></el-input>
        </el-form-item>
        <el-form-item label='审核结果'>
            <el-select v-model="form.status_examine" placeholder="状态">
                <el-option label="全部" value=""></el-option>
            <el-option label="通过" value="1"></el-option>
            <el-option label="审核中" value="2"></el-option>
            <el-option label="未通过" value="3"></el-option>                
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type='danger' @click='go_search'>查询</el-button>
        </el-form-item>
    </el-form>
    <div class='app-container'>
        <el-table :data='list' border fit highlight-current-row>
            <el-table-column label='采购商'>
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label='账号'>
                <template slot-scope="scope">
                    {{ scope.row.mobile }}
                </template>
            </el-table-column>
            <el-table-column label='qq'>
                <template slot-scope="scope">
                    {{ scope.row.qq_num }}
                </template>
            </el-table-column>
            <el-table-column label='工作证'>
                <template slot-scope="scope">
                    {{ scope.row.id_card }}
                </template>
            </el-table-column>
            <el-table-column label='银行卡账号'>
                <template slot-scope="scope">
                    {{ scope.row.alipay }}
                </template>
            </el-table-column>
            <el-table-column label='审核结果'>
                <template slot-scope="scope">
                    <el-tag v-if='scope.row.status_examine == 1' type='success'>审核通过</el-tag>
                    <el-tag v-if='scope.row.status_examine == 2' type='warning'>审核中……</el-tag>
                    <el-tag v-if='scope.row.status_examine == 3' type='info'>审核不通过</el-tag>
                    <el-tag v-if='scope.row.status_examine == 4' type='info'>审核不通过</el-tag>
                </template>
            </el-table-column>
            <el-table-column label='工作证照片' width='100'>
                <template slot-scope="scope">
                    <el-button type='warning' v-if='scope.row.status_examine != 4' @click='show(scope.$index)'>查看</el-button>
                </template>
            </el-table-column>
            <el-table-column label='操作' width='200'>
                <template slot-scope="scope">
                    <el-button type='success' v-if='scope.row.status_examine == 2' size='mini' @click='check_success(scope.$index)'>通过</el-button>
                    <el-button type='danger' v-if='scope.row.status_examine == 2' size='mini' @click='check_error(scope.$index)'>不通过</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog title="图片详情" :before-close="handleClose" :visible.sync="dialogTableVisible">
        <img v-for="item in img_url" :src="item" :key="item" style='width:30%;height:3s0%;'/>
    </el-dialog>
  </div>
</template>

<script>
import { get_audit_data } from '@/api/administrator'
import { check_status } from '@/api/system'
export default {
  data() {
    return {
      form: {},
      list: [],
      dialogTableVisible: false,
      img_url: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_audit_data().then(res => {
        this.list = res.data
      })
    },
    go_search() {
      get_audit_data(this.form).then(res => {
        this.list = res.data
      })
    },
    show(index) {
      this.img_url = this.list[index].attachments
      this.dialogTableVisible = true
    },
    handleClose(done) {
      this.img_url = []
      done()
    },
    check_success(index) {
      let id = this.list[index].id
      check_status(1, id).then(res => {
        this.$message({
          type: 'success',
          message: '审核通过'
        })
        this.fetchData()
      })
    },
    check_error(index) {
      let id = this.list[index].id
      check_status(3, id).then(res => {
        this.$message({
          type: 'success',
          message: '审核不通过'
        })
        this.fetchData()
      })
    }
  }
}
</script>
