<template>
  <div>
      <el-form :inline="true" label-width="80px">
        <el-form-item label='油卡'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='供货状态'>
            <el-select placeholder="供货状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="未核实" value="0"></el-option>
            <el-option label="已核实" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label='周期'>
        <el-date-picker
        v-model="value6"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
        </el-date-picker>
    </el-form-item>
    <el-form-item>
        <el-button type='danger'>查询</el-button>
    </el-form-item>
    </el-form>
    <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row>
        <el-table-column label='供应单号'>
            <template slot-scope="scope">
            <span>{{scope.row.supply_single_number}}</span>
            </template>
        </el-table-column>
        <el-table-column label='油卡号'>
            <template slot-scope="scope">
            <span>{{scope.row.oil_number}}</span>
            </template>
        </el-table-column>
        <el-table-column label='到账时间'>
            <template slot-scope="scope">
            <span>{{scope.row.end_time}}</span>
            </template>
        </el-table-column>
        <el-table-column label='提交时间'>
            <template slot-scope="scope">
            <span>{{scope.row.created_at}}</span>
            </template>
        </el-table-column>
        <el-table-column label='金额'>
            <template slot-scope="scope">
            <span>{{scope.row.already_card}}</span>
            </template>
        </el-table-column>
        <el-table-column label='订单状态'>
            <template slot-scope="scope">
            <span>{{scope.row.supply_status}}</span>
            </template>
        </el-table-column>
        <el-table-column label='操作'>
            <template slot-scope="scope">
            <el-button type='success' @click='show_pic(scope.row.direct_id)'>查看凭证</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
    <el-dialog title="图片详情" :before-close="handleClose" :visible.sync="dialogTableVisible">
    <img v-bind:src="img_url" style='width:50%;height:50%;'/>
    </el-dialog>
  </div>
</template>

<script>
import { get_directly_order } from '@/api/supplier'
export default {
  data() {
    return {
      listLoading: true,
      list: [],
      img_url: '',
      dialogTableVisible: false
    }
  },
  created() {
    this.fetchdata()
  },
  methods: {
    fetchdata() {
      this.listLoading = true
      get_directly_order(this.listQuery).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    show_pic(pic) {
      this.img_url = '/oc/common/attach/show/' + pic
      this.dialogTableVisible = true
    },
    handleClose(done) {
      done()
    }
  }
}
</script>
