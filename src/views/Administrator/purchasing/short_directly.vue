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
                    <el-tag class='card_code' type='success' v-for="oil_card in scope.row.oil_card_code" :key="oil_card">{{oil_card}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label='金额'>
                <template slot-scope="scope">
                    {{ scope.row.price }}
                </template>
            </el-table-column>
            <el-table-column label='已充值金额'>
                <template slot-scope="scope">
                     {{ scope.row.history_price }}
                </template>
            </el-table-column>
            <el-table-column label='时间'>
                <template slot-scope="scope">
                    {{ scope.row.created_at.date }}
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
            <el-table-column label='操作' width='200'>
                <template slot-scope="scope">
                    <el-button type='warning' size="mini" @click='show_detail(scope.row.order_code)'>查看</el-button>
                    <el-button type='primary' size="mini"  @click='recharge(scope.$index)'>充值</el-button>  
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
    <el-table-column label='供应单号'>
        <template slot-scope="scope">
        {{ scope.row.supply_single_number }}
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
    </el-table>
    </el-dialog>
    <el-dialog
    title="上报充值记录"
    :visible.sync="dialogVisible1"
    width="50%"
    :before-close="handleClose">
    <el-form :model="supplier_data" label-width="150px">
      <el-form-item label='充值油卡' >
          <el-radio v-for="card in oil_card_code" v-model='supplier_data.oil_card' :label="card" :key="card">油卡{{card}}</el-radio>
      <input type='hidden' :model='supplier_data.id' />
    </el-form-item>
    <el-form-item label='充值金额' >
      <el-input v-model='supplier_data.price' style='width:100px;'/>
    </el-form-item>
    <el-form-item label='到账时间'>
      <el-date-picker
      v-model='supplier_data.recharge_time'
      type="datetime"
      placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
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
import { upload_file } from '@/api/configure.js'
import { get_sdirectly_order, get_directly_upload, get_sdirectly_detail } from '@/api/administrator'
export default {
  data() {
    return {
      listLoading: true,
      camilo_order: [],
      camilo_detail_list: [],
      dialogVisible: false,
      dialogVisible1: false,
      supplier_data: {
        order_code: '',
        oil_card: '',
        price: '',
        recharge_time: ''
      },
      oil_card_code: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_sdirectly_order(this.listQuery).then(response => {
        this.camilo_order = response.data
        this.listLoading = false
      })
    },
    show_detail(code) {
      this.dialogVisible = true
      get_sdirectly_detail(code).then(res => {
        this.camilo_detail_list = res.data
      })
    },
    recharge(index) {
      this.oil_card_code = this.camilo_order[index].oil_card_code
      this.supplier_data.order_code = this.camilo_order[index].order_code
      this.dialogVisible1 = true
    },
    handleClose(done) {
      this.supplier_data.checkedCard = ''
      this.camilo_detail_list = []
      done()
    },
    submitUpload() {
      if (this.supplier_data.price === '' || this.supplier_data.recharge_time === '' || this.supplier_data.oil_card === '') {
        this.$message({
          type: 'error',
          message: '请填写完整'
        })
      } else {
        this.$refs.upload.submit()
      }
    },
    handleSuccessfunction(response, file, fileList) {
      console.log(response)
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePreview(file) {
      // console.log(file)
    },
    handleChange(file, fileList) {
      // console.log(file)
      // console.log(fileList)
    },
    changeUpload: function(file, fileList) {
      this.fileList = fileList
      this.$nextTick(
        () => {
          let upload_list_li = document.getElementsByClassName('el-upload-list')[0].children
          for (let i = 0; i < upload_list_li.length; i++) {
            let li_a = upload_list_li[i]
            let imgElement = document.createElement('img')
            imgElement.setAttribute('src', fileList[i].url)
            imgElement.setAttribute('style', 'max-width:30%;padding-left:5%')
            if (li_a.lastElementChild.nodeName !== 'IMG') {
              li_a.appendChild(imgElement)
            }
          }
        })
    },
    beforeUpload(file) {
      let param = new FormData()
      param.append('file', file)
      param.append('status', 3)
      upload_file(param).then((res) => {
        this.supplier_data.id_hash = res.data.id_hash
        get_directly_upload(this.supplier_data).then(response => {
          console.log(response)
          this.dialogVisible1 = false
          this.fetchData()
        })
        this.$message({
          type: 'success',
          message: '上传成功!'
        })
      }, (res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.card_code{
    margin-left: 10px;
}
</style>
