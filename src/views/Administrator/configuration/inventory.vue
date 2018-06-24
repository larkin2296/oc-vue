<template>
    <div>
      <div class="app-container">
          <el-form :inline="true" :model="addplat" label-width="100px">
              <el-form-item label="商品类型">

                  <el-select v-model="addplat.goods_type" value-key="label" placeholder="选择商品">
                    <el-option label="全部" value=""></el-option>

                      <el-option v-for="item in platform" :label="item.platform_name" :key="item.id"  :value="item.platform_name">

                      </el-option>

                  </el-select>
              </el-form-item>

              <el-form-item label="面额">

                  <el-select v-model="addplat.card_price" placeholder="选择金额">
                    <el-option label="全部" value=""></el-option>

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
                  {{ scope.row.platform_name.platform_name }}
              </template>
          </el-table-column>
          <el-table-column label='面额'>
              <template slot-scope="scope">
                  {{ scope.row.denomination.denomination }}
              </template>
          </el-table-column>
          <el-table-column label='总库存'>
              <template slot-scope="scope">
                  {{ scope.row.num }}
              </template>
          </el-table-column>
          <el-table-column label='有效库存'>
              <template slot-scope="scope">
                  {{ scope.row.vaild_num }}
              </template>
          </el-table-column>
          <el-table-column label='受限库存'>
              <template slot-scope="scope">
                  {{ scope.row.invalid_num }}
              </template>
          </el-table-column>
          </el-table>
      </div>
    </div>
</template>

<script>
import { get_config_detail, get_inventory_data } from '@/api/configure'
export default {
  data() {
    return {
      addplat: {},
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
      get_inventory_data(this.addplat).then(res => {
        console.log(res)
        this.platform_list = res.data
      })
      get_config_detail().then(response => {
        this.platform = response.platform
        this.platform_money = response.denomination
      })
    },
    search() {
      get_inventory_data(this.addplat).then(res => {
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

