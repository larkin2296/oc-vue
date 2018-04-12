<template>
<div>
    <oc-form></oc-form>
    <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div> 
</template>

<script>
import OcForm from '@/components/Ocform'
export default {
  components: {
    OcForm
  },
  data() {
    return {
      list: null
    }
  },
  methods: {
    onSubmit() {
      this.list.push({ author: 'name', display_time: '2010-06-12 16:32:23', id: '330000200103215497', pageviews: 797, status: 'draft', title: 'Stoxqx pygsyozdch yjqubbm drtyljfqng tqhcb mymxof hjwrxyej tjgw ubfalhb shfeeig snsatg lwidobvrjm nxlfkuhpi bsegvg ueiwn vcnd.' })
    //   this.d_num = Number(this.d_num)+1;
    //   this.data_list.push({id:this.d_num,platform:this.platform,price:this.price,num:this.num,e_price:this.price,total_price:(Number(this.price)*Number(this.num))});
    }
  }
}
</script>

