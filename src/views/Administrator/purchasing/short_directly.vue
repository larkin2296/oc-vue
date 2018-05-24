<template>
  <div>
    <el-form :inline="true" label-width="120px" style='margin-top:20px;'>
        <el-form-item label='商品'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='面额'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='交易时间'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='订单号'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='卡号'>
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
        <el-table :data='camilo_order' v-loading.body="listLoading" border fit highlight-current-row>
            <el-table-column label='订单号'>
                <template slot-scope="scope">
                    {{ scope.row.order_code }}
                </template>
            </el-table-column>
            <el-table-column label='油卡'>
                <template slot-scope="scope">
                    {{ scope.row.platform_id.oil_card_code }}
                </template>
            </el-table-column>
            <el-table-column label='金额'>
                <template slot-scope="scope">
                    {{ scope.row.price }}
                </template>
            </el-table-column>
            <el-table-column label='时间'>
                <template slot-scope="scope">
                    {{ scope.row.cutoff_time }}
                </template>
            </el-table-column>
            <el-table-column label='折扣'>
                <template slot-scope="scope">
                    {{ scope.row.discount }}
                </template>
            </el-table-column>
            <el-table-column label='实际总价'>
                <template slot-scope="scope">
                    {{ scope.row.price * scope.row.discount }}
                </template>
            </el-table-column>
            <el-table-column label='已充值金额'>
                <template slot-scope="scope">
                    {{ scope.row.recharged_money }}
                </template>
            </el-table-column>
            <el-table-column label='操作' width='200'>
                <template slot-scope="scope">
                    <el-button type='warning' size="mini" @click='show_detail(scope.row.id)'>查看</el-button>
                    <el-button type='primary' size="mini"  @click='recharge(scope.row.id)'>充值</el-button>  
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
    title="充值记录"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-table :data='camilo_detail_list' border fit highlight-current-row>
    <el-table-column label='卡密字段一'>
        <template slot-scope="scope">
        {{ scope.row.cam_name }}
        </template>
    </el-table-column>
    <el-table-column label='卡密字段二'>
        <template slot-scope="scope">
        {{ scope.row.cam_other_name }}
        </template>
    </el-table-column>
    <el-table-column label='卡密状态'>
        <template slot-scope="scope">
            <el-tag type='success' v-if='scope.row.status == 2'>未使用</el-tag>
            <el-tag type='info' v-else-if='scope.row.status == 3'>问题卡密</el-tag>
            <el-tag type='primary' v-else-if='scope.row.status == 4'>销卡成功</el-tag>
        </template>
    </el-table-column>
    <el-table-column label='备注'>
        <template slot-scope="scope">
        {{ scope.row.remark }}
        </template>
    </el-table-column>  
    </el-table>
    </el-dialog>
    <el-dialog
    title="上报充值记录"
    :visible.sync="dialogVisible1"
    width="50%"
    :before-close="handleClose">
    <el-form :model="supplier_data" label-width="150px">
      <el-form-item label='充值油卡' >
      {{ supplier_data.oil_card }}
      <input type='hidden' :model='supplier_data.id' />
    </el-form-item>
    <el-form-item label='充值金额' >
      <el-input v-model='supplier_data.price' style='width:100px;'/>
    </el-form-item>
    <el-form-item label='到账时间'>
      <el-date-picker
      v-model='supplier_data.recharge_time'
      type="datetime"
      placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label='上传凭证'>
      <el-upload class="upload-demo"
          ref="upload"
          :multiple="false"
          action="123"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="changeUpload"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :auto-upload="false">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> 
    </el-form-item>
    <el-form-item>
      <el-button type='danger' @click='submitUpload'>确定上传</el-button>
    </el-form-item>
  </el-form>
  </el-dialog>
  </div>
</template>

<script>
import { get_pcamilo_order } from '@/api/administrator'
export default {
  data() {
    return {
      listLoading: true,
      camilo_order: [],
      camilo_detail_list: [],
      dialogVisible: false,
      dialogVisible1: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_pcamilo_order(this.listQuery).then(response => {
        this.camilo_order = response.data
        this.listLoading = false
      })
    },
    show_detail(id) {
      this.dialogVisible = true
    },
    recharge(id) {
      this.dialogVisible1 = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        done()
      }).catch(_ => {})
    }
  }
}
</script>
