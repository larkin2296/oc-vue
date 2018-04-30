<template>
  <div>
      <el-form :inline="true" label-width="120px">
        <el-form-item label='供应商'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='时间'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='提现单状态'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type='danger'>查询</el-button>
        </el-form-item>
    </el-form>
    <div class='app-container'>
        <el-table border fit highlight-current-row>
            <el-table-column label='序号'>
                <template slot-scope="scope">
                    {{ scope.$index }}
                </template>
            </el-table-column>
            <el-table-column label='供应商'>
                <template slot-scope="scope">
                    {{ scope.row.user_name }}
                </template>
            </el-table-column>
            <el-table-column label='提现单号'>
                <template slot-scope="scope">
                    {{ scope.row.deposit_order }}
                </template>
            </el-table-column>
            <el-table-column label='金额'>
                <template slot-scope="scope">
                    {{ scope.row.price }}
                </template>
            </el-table-column>
            <el-table-column label='时间'>
                <template slot-scope="scope">
                    {{ scope.row.create_at }}
                </template>
            </el-table-column>
            <el-table-column label='状态'>
                <template slot-scope="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column label='操作'>
                <template slot-scope="scope">
                    <el-button></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>
