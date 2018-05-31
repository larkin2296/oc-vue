<template>
  <div>
      <el-form v-model='form' :inline="true" label-width="120px">
        <el-form-item label='供应商'>
            <el-input v-model='form.truename'></el-input>
        </el-form-item>
        <el-form-item label='时间'>
            <el-date-picker
                v-model="form.created_at"
                type="date"
                placeholder="选择日期" size='small' format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>
        </el-form-item>
        <el-form-item label='提现单状态'>
            <el-select v-model="form.status" placeholder="状态">
            <el-option label="已转账" value="1"></el-option>
            <el-option label="未转账" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type='danger' @click='go_search'>查询</el-button>
        </el-form-item>
    </el-form>
    <div class='app-container'>
        <el-table :data='list' border fit highlight-current-row>
            <el-table-column label='序号'>
                <template slot-scope="scope">
                    {{ scope.$index }}
                </template>
            </el-table-column>
            <el-table-column label='供应商'>
                <template slot-scope="scope">
                    {{ scope.row.user }}
                </template>
            </el-table-column>
            <el-table-column label='提现单号'>
                <template slot-scope="scope">
                    {{ scope.row.forward_number }}
                </template>
            </el-table-column>
            <el-table-column label='金额'>
                <template slot-scope="scope">
                    {{ scope.row.money }}
                </template>
            </el-table-column>
            <el-table-column label='时间'>
                <template slot-scope="scope">
                    {{ scope.row.created_at }}
                </template>
            </el-table-column>
            <el-table-column label='状态'>
                <template slot-scope="scope">
                    <el-tag>{{ scope.row.status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label='操作'>
                <template slot-scope="scope">
                    <el-button v-if='scope.row.status != "已提现"' type='success'>已转账</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import { get_depositshow_list } from '@/api/system'
export default {
  data() {
    return {
      form: {},
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_depositshow_list().then(res => {
        console.log(res)
        this.list = res.data
      })
    },
    go_search() {
      get_depositshow_list(this.form).then(res => {
        console.log(res)
        this.list = res.data
      })
    }
  }
}
</script>
