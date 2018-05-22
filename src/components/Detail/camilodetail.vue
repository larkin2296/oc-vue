<template>
<el-container>
  <el-header>
    <div class='top'>
      <el-form :inline="true" label-width="140px">
        <el-form-item label='订单号'>
          {{ order_code }}
        </el-form-item>
        <el-form-item label='下单时间'>
          {{ order_time }}
        </el-form-item>
      </el-form>
      <el-form :inline="true" label-width="140px">
        <el-form-item label='卡密数量'>
          {{ camilo_num}} 张
        </el-form-item>
        <el-form-item label='卡密已使用'>
          {{ camilo_use}} 张
        </el-form-item>
        <el-form-item label='卡密未使用'>
          {{ camilo_unuse}} 张
        </el-form-item>
        <el-form-item label='上报问题卡密'>
          {{ camilo_problem}} 张
        </el-form-item>
      </el-form>
      <el-dialog
        title="上报错误卡密"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-table :data='problem_table' border fit highlight-current-row>
          <el-table-column label='错误卡密号'>
            <template slot-scope="scope">
            {{ scope.row.cam_name }}
            </template>
          </el-table-column>
          <el-table-column label='错误类型'>
            <template slot-scope="scope">
            <el-select v-model="scope.row.type" placeholder="请选择">
              <el-option
                v-for="item in mistake_type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </template>
          </el-table-column>    
        </el-table>
        <el-button type='danger' @click='send_problem'>上报</el-button>
      </el-dialog>
    </div>
  </el-header>
  <el-main>
    <div class="app-container">
    <el-table :data="tableData" v-loading.body="listLoading" stripe style="width: 100%" border fit highlight-current-row>
    <el-table-column label="序号" width="100">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.choose"></el-checkbox>
        </template>
    </el-table-column>
    <el-table-column label="平台">
      <template slot-scope="scope">
        {{ scope.row.platform_name }}
        </template>
    </el-table-column>
    <el-table-column label="面额">
      <template slot-scope="scope">
        {{ scope.row.denomination }}
        </template>
    </el-table-column>
    <el-table-column label="卡密字段一">
      <template slot-scope="scope">
        {{ scope.row.cam_name }}
        </template>
    </el-table-column>
    <el-table-column label="卡密字段二">
      <template slot-scope="scope">
        {{ scope.row.cam_other_name }}
        </template>
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status_name | statusFilter">{{scope.row.status_name}}</el-tag>
        <input type='hidden' v-model="scope.row.id" />
        <input type='hidden' v-model="scope.row.order_id" />
        </template>
    </el-table-column>
      </el-table>
      </div>
  </el-main>
  <el-footer>
    <el-form>
      <el-button type='primary' @click='sub_userd'>上报已使用</el-button>
      <el-button type='danger' @click='sub_problem'>上报问题卡密</el-button>
    </el-form>
  </el-footer>
</el-container>
</template>

<script>
import { get_camilo_detail, set_camilo_userd, send_problem_card } from '@/api/purchasing'
export default {
  props: ['order', 'time'],
  data() {
    return {
      tableData: [],
      order_code: '',
      order_time: this.time,
      camilo_num: 0,
      camilo_use: 0,
      camilo_unuse: 0,
      camilo_problem: 0,
      problem_table: [
      ],
      mistake_type: [{
        label: '卡密重复',
        value: '卡密重复'
      }, {
        label: '卡密错误',
        value: '卡密错误'
      }, {
        label: '卡密失效',
        value: '卡密失效'
      }, {
        label: '面额不符',
        value: '面额不符'
      }],
      dialogVisible: false,
      checkList: [],
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '未使用': 'success',
        '问题卡密': 'gray',
        '已使用': 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_camilo_detail(this.order).then(response => {
        this.tableData = response.data
        this.camilo_num = response.msg.num
        this.camilo_use = response.msg.is_usd
        this.camilo_problem = response.msg.is_error
        this.camilo_unuse = response.msg.no_use
        this.order_code = response.msg.order
        this.listLoading = false
      })
    },
    sub_userd() {
      this.$confirm('已确认后卡密出现问题概不负责', '确认卡密已使用？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        set_camilo_userd(this.tableData).then(response => {
          this.$message({
            type: 'success',
            message: '设置成功'
          })
          this.fetchData()
        })
      }).catch(() => {
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        done()
      }).catch(_ => {})
    },
    sub_problem() {
      var that = this
      this.problem_table = []
      this.tableData.forEach(function(val) {
        if (typeof val['choose'] === 'undefined' || val['choose'] === false) {
          console.log(val)
        } else {
          that.problem_table.push({ cam_name: val['cam_name'], id: val['id'], order_id: val['order_id'] })
        }
      })
      this.dialogVisible = true
      // this.problem_table = this.checkList
      // console.log(this.problem_table)
    },
    send_problem() {
      var that = this
      this.$confirm('确认上报问题卡密后会补发卡密，如有违规操作，自行承担责任', '确认？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        send_problem_card(that.problem_table).then(response => {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
          this.fetchData()
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
.top{
  width:800px;
}
</style>
