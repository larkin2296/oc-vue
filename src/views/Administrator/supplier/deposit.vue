<template>
  <div>
      <h3>提现控制</h3>
      <div class="app-container">
      <el-table :data="list" border fit highlight-current-row>
          <el-table-column label='设置'>
              <template slot-scope="scope">
                  {{ scope.row.conf_type }}
              </template>
          </el-table-column>
          <el-table-column label='状态'>
            <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="edit-input" size="small" v-model="scope.row.status"></el-input>
              <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
            </template>
            <span v-else>{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label='操作'>
            <template slot-scope="scope">
              <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
              <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">Edit</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-button type='danger' @click='modify'>修改</el-button>
      <el-button type='danger'>关闭/开启提现</el-button>
      </div>
  </div>
</template>

<script>
import { get_deposit_list, modify_deposit } from '@/api/system'
export default {
  data() {
    return {
      greater_money: 0,
      proportion: 0,
      deductions: 0,
      lower_money: 0,
      upper_money: 0,
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_deposit_list().then(res => {
        console.log(res.data[0])
        this.greater_money = res.data[0].greater_money
        this.proportion = res.data[0].proportion
        this.deductions = res.data[0].deductions
        this.lower_money = res.data[0].lower_money
        this.upper_money = res.data[0].upper_money
        this.list.push({
          conf_type: '提现上限',
          status: this.upper_money,
          conf_code: 'upper_money',
          edit: false
        }, {
          conf_type: '提现下限',
          status: this.lower_money,
          conf_code: 'lower_money',
          edit: false
        }, {
          conf_type: '扣费金额',
          status: this.deductions,
          conf_code: 'deduction',
          edit: false
        }, {
          conf_type: '扣费比例',
          status: this.proportion,
          conf_code: 'proportion',
          edit: false
        }, {
          conf_type: '大于金额开始扣费设置',
          status: this.greater_money,
          conf_code: 'greater_money',
          edit: false
        })
      })
    },
    cancelEdit(row) {
      row.status = row.originalTitle
      row.edit = false
    },
    confirmEdit(row) {
      console.log(row)
      row.edit = false
      row.originalTitle = row.status
    },
    modify() {
      modify_deposit(this.list).then(res => {
        this.$message({
          message: res.message,
          type: 'success'
        })
      })
    }
  }
}
</script>

