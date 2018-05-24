<template>
  <div>
    <el-tabs type="border-card">
        <el-tab-pane label="供货卡密">
            <el-form :inline="true" label-width="120px">
                <el-form-item label='商品'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='面额'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='交易时间'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='卡号字段一'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='卡密状态'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type='danger'>查询</el-button>
                </el-form-item>
            </el-form>
            <div class='app-container'>
                <el-table :data='camilo_list' border fit highlight-current-row>
                    <el-table-column label='供货商'>
                        <template slot-scope="scope">
                            {{ scope.row.userName }}
                        </template>
                    </el-table-column>
                    <el-table-column label='商品'>
                        <template slot-scope="scope">
                            {{ scope.row.platform_id }}
                        </template>
                    </el-table-column>
                    <el-table-column label='面额'>
                        <template slot-scope="scope">
                            {{ scope.row.denomination }}
                        </template>
                    </el-table-column>
                    <el-table-column label='字段一'>
                        <template slot-scope="scope">
                            {{ scope.row.cam_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='字段二'>
                        <template slot-scope="scope">
                            {{ scope.row.cam_other_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='供货时间'>
                        <template slot-scope="scope">
                            {{ scope.row.success_time }}
                        </template>
                    </el-table-column>
                    <el-table-column label='折扣'>
                        <template slot-scope="scope">
                            {{ scope.row.discount }}
                        </template>
                    </el-table-column>
                    <el-table-column label='卡密状态'>
                        <template slot-scope="scope">
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                    <el-table-column label='操作'>
                        <template slot-scope="scope">
                            <el-button size='mini' type='danger'>删除</el-button>
                            <el-button size='mini' type='warning'>恢复</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="代充订单">
            <el-form :inline="true" label-width="120px">
                <el-form-item label='采购商'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='油卡编号'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='油卡姓名'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='油卡号'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='交易日期'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label='对账状态'>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type='danger'>查询</el-button>
                </el-form-item>
            </el-form>
            <div class='app-container'>
                <el-table :data='directly_list' border fit highlight-current-row>
                    <el-table-column label='供应商'>
                        <template slot-scope="scope">
                            {{ scope.row.user_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='油卡编号'>
                        <template slot-scope="scope">
                            {{ scope.row.code }}
                        </template>
                    </el-table-column>
                    <el-table-column label='油卡姓名'>
                        <template slot-scope="scope">
                            {{ scope.row.oil_code }}
                        </template>
                    </el-table-column>
                    <el-table-column label='油卡号'>
                        <template slot-scope="scope">
                            {{ scope.row.oil_number }}
                        </template>
                    </el-table-column>
                    <el-table-column label='金额'>
                        <template slot-scope="scope">
                            {{ scope.row.already_card }}
                        </template>
                    </el-table-column>
                    <el-table-column label='状态'>
                        <template slot-scope="scope">
                            {{ scope.row.supply_status }}
                        </template>
                    </el-table-column>
                    <el-table-column label='供货时间'>
                        <template slot-scope="scope">
                            {{ scope.row.created_at }}
                        </template>
                    </el-table-column>
                    <el-table-column label='预计到账时间'>
                        <template slot-scope="scope">
                            {{ scope.row.end_time }}
                        </template>
                    </el-table-column>
                    <el-table-column label='折扣'>
                        <template slot-scope="scope">
                            {{ scope.row.notes }}
                        </template>
                    </el-table-column>
                    <el-table-column label='查看凭证'>
                        <template slot-scope="scope">
                            <el-button type='warning' @click='show_pic(scope.row.direct_id)'>查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label='操作'>
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.supply_status == '未到账'" type='success'>置为已到账</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="图片详情" :before-close="handleClose" :visible.sync="dialogTableVisible">
                <img v-bind:src="img_url" style='width:50%;height:50%;'/>
                </el-dialog>
            </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { get_dcamilo_list, get_ddirectly_list } from '@/api/system'
export default {
  data() {
    return {
      camilo_list: [],
      directly_list: [],
      img_url: '',
      dialogTableVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_dcamilo_list().then(response => {
        this.camilo_list = response.data
      })
      get_ddirectly_list().then(res => {
        this.directly_list = res.data
      })
    },
    show_pic(src) {
      this.img_url = src
      this.dialogTableVisible = true
    },
    handleClose(done) {
      done()
    }
  }
}
</script>
