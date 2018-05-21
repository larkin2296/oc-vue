<template>
  <div>
    <el-tabs type="border-card">
        <el-tab-pane label="卡密订单">
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
                    <el-table-column label='商品'>
                        <template slot-scope="scope">
                            {{ scope.row.platform.platform_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='面额'>
                        <template slot-scope="scope">
                            {{ scope.row.denomination.denomination }}
                        </template>
                    </el-table-column>
                    <el-table-column label='总价'>
                        <template slot-scope="scope">
                            {{ scope.row.price }}
                        </template>
                    </el-table-column>
                    <el-table-column label='折扣'>
                        <template slot-scope="scope">
                            {{ scope.row.discount }}
                        </template>
                    </el-table-column>
                    <el-table-column label='实际总价'>
                        <template slot-scope="scope">
                            {{ scope.row.real_price }}
                        </template>
                    </el-table-column>
                    <el-table-column label='提交时间'>
                        <template slot-scope="scope">
                            {{ scope.row.created_at }}
                        </template>
                    </el-table-column>
                    <el-table-column label='操作'>
                        <template slot-scope="scope">
                            <el-button type='danger'>发放卡密</el-button>
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
                <el-table border fit highlight-current-row>
                    <el-table-column label='采购商'>
                        <template slot-scope="scope">
                            {{ scope.row.name }}
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
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                    <el-table-column label='交易日期'>
                        <template slot-scope="scope">
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                    <el-table-column label='供应号'>
                        <template slot-scope="scope">
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                    <el-table-column label='金额'>
                        <template slot-scope="scope">
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                    <el-table-column label='折后金额'>
                        <template slot-scope="scope">
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                    <el-table-column label='对账状态'>
                        <template slot-scope="scope">
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                    <el-table-column label='折扣'>
                        <template slot-scope="scope">
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listLoading: true,
      camilo_order: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
    //   get_pcamilo_order(this.listQuery).then(response => {
    //     console.log(response)
    //     this.list = response.data
    //     this.listLoading = false
    //   })
    }
  }
}
</script>
