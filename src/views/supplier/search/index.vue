<template>
  <div id='search'>
    <el-tabs type="border-card">
      <el-tab-pane label="卡密供货查询">
          <el-form :inline="true" label-width="120px">
            <el-form-item label='商品名称'>
                  <el-select placeholder="商品名称">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="汽车之家" value="0"></el-option>
                    <el-option label="车传奇" value="1"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label='面额'>
                  <el-select placeholder="面额">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="50" value="50"></el-option>
                    <el-option label="100" value="100"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label='供货状态'>
                  <el-select placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="销卡成功" value="0"></el-option>
                    <el-option label="处理中" value="1"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label='油卡'>
                  <el-input></el-input>
              </el-form-item>
              <el-form-item label='供货时间'>
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
          <el-table border fit highlight-current-row>
              <el-table-column label='供货时间'>
                  <template slot-scope="scope">
                    <span>{{scope.row.supply_time}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='供应单号'>
                  <template slot-scope="scope">
                    <span>{{scope.row.order_code}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='商品名称'>
                  <template slot-scope="scope">
                    <span>{{scope.row.plaform}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='面额'>
                  <template slot-scope="scope">
                    <span>{{scope.row.price}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='折扣'>
                  <template slot-scope="scope">
                    <span>{{scope.row.discount}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='供货状态'>
                  <template slot-scope="scope">
                    <span>{{scope.row.status}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='实际销卡面额'>
                  <template slot-scope="scope">
                    <span>{{scope.row.real_price}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='备注'>
                  <template slot-scope="scope">
                    <span>{{scope.row.remark}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='操作'>
                  <template slot-scope="scope">
                    <el-button type='danger'>查看卡密详情</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="直充供货查询">
          <el-form :inline="true" label-width="120px">
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
          <el-table border fit highlight-current-row>
              <el-table-column label='供应单号'>
                  <template slot-scope="scope">
                    <span>{{scope.row.order_code}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='油卡号'>
                  <template slot-scope="scope">
                    <span>{{scope.row.oil_card_code}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='到账时间'>
                  <template slot-scope="scope">
                    <span>{{scope.row.arrive_time}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='提交时间'>
                  <template slot-scope="scope">
                    <span>{{scope.row.submit_time}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='金额'>
                  <template slot-scope="scope">
                    <span>{{scope.row.price}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='订单状态'>
                  <template slot-scope="scope">
                    <span>{{scope.row.status}}</span>
                  </template>
              </el-table-column>
              <el-table-column label='操作'>
                  <template slot-scope="scope">
                    <el-button type='success'>查看详情</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>