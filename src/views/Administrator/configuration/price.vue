<template>
    <div>
    <el-tabs type="border-card">
      <el-tab-pane label="平台折扣管理">
      <div class="app-container">
          <h3>价格配置管理</h3>
      <el-row :gutter="20">
          <el-col :span="4">
              长充折扣
          </el-col>
          <el-col :span="4">
              <el-input v-model='form.ldirectly_discount'></el-input>
          </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="4">
              短充折扣范围
          </el-col>
          <el-col :span="10">
              <el-input v-model='form.sdirectly_discount_down'></el-input>~<el-input v-model='form.sdirectly_discount_up'></el-input>
          </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="4">
              <el-button type='danger' @click='savedata'>修改</el-button>
          </el-col>
      </el-row>
      </div>
      </el-tab-pane>
      <el-tab-pane label="商品折扣">
      <div class="app-container">
          <el-form :inline="true" :model="addplat" label-width="100px">
              <el-form-item label="商品类型">

                  <el-select v-model="addplat.goods_type" value-key="label" placeholder="选择商品">

                      <el-option v-for="item in platform" :label="item.platform_name" :key="item.id"  :value="item.platform_name">

                      </el-option>

                  </el-select>
              </el-form-item>

              <el-form-item label="面额">

                  <el-select v-model="addplat.card_price" placeholder="选择金额">

                    <el-option v-for="item in platform_money" :label="item.denomination" :key="item.id"  :value="item.denomination">

                    </el-option>

                  </el-select>
              </el-form-item>
              <el-form-item>
                  <el-button type='danger' @click='search'>查找</el-button>
              </el-form-item>
          </el-form>
          <el-table :data='platform_list' border fit highlight-current-row>
            <el-table-column label='商品'>
              <template slot-scope="scope">
                  {{ scope.row.platform_name }}
              </template>
          </el-table-column>
          <el-table-column label='面额'>
              <template slot-scope="scope">
                  {{ scope.row.denomination }}
              </template>
          </el-table-column>
          <el-table-column label='进货折扣'>
            <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="edit-input" size="small" v-model="scope.row.camilo_recharge"></el-input>
              <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
              </template>
            <span v-else>{{ scope.row.camilo_recharge }}</span>
              <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
              <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">Edit</el-button>
            </template>
          </el-table-column>
          <el-table-column label='销售折扣'>
            <template slot-scope="scope">
            <template v-if="scope.row.edit1">
              <el-input class="edit-input" size="small" v-model="scope.row.camilo_sell"></el-input>
              <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit1(scope.row)">cancel</el-button>
              </template>
            <span v-else>{{ scope.row.camilo_sell }}</span>
            <el-button v-if="scope.row.edit1" type="success" @click="confirmEdit1(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
            <el-button v-else type="primary" @click='scope.row.edit1=!scope.row.edit1' size="small" icon="el-icon-edit">Edit</el-button>
            </template>
          </el-table-column>
          <el-table-column label='操作'>
            <template slot-scope="scope">
              <el-button type='danger' @click='save_discount(scope.$index)'>保存</el-button>
            </template>
          </el-table-column>
          </el-table>
      </div>
      </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import { get_config_goodset, save_config, get_config_detail, get_discount_data, save_discount_data } from '@/api/configure'
export default {
  data() {
    return {
      addplat: {},
      form: {
        camilo_recharge: '',
        camilo_sell: '',
        ldirectly_discount: '',
        sdirectly_discount_down: '',
        sdirectly_discount_up: ''
      },
      platform: [],
      platform_money: [],
      platform_list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_config_goodset().then(res => {
        console.log(res)
        this.form = res.data
      })
      get_config_detail().then(response => {
        this.platform = response.platform
        this.platform_money = response.denomination
      })
    },
    savedata() {
      save_config(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.form = res.data
      })
    },
    save_discount(index) {
      let data = this.platform_list[index]
      this.$confirm('是否修改该平台折扣?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        save_discount_data(data).then(res => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          console.log(res)
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
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
    cancelEdit1(row) {
      row.status = row.originalTitle
      row.edit1 = false
    },
    confirmEdit1(row) {
      console.log(row)
      row.edit1 = false
      row.originalTitle = row.status
    },
    search() {
      get_discount_data(this.addplat).then(res => {
        this.platform_list = res.data
      })
    }
  }
}
</script>

<style scoped>
.el-row{
    margin-bottom: 20px;
}
.el-input{
    width: 150px;
}
</style>

