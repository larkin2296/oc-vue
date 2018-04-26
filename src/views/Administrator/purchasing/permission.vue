<template>
  <div>
      <el-form :inline="true" label-width="120px">
        <el-form-item label='姓名'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='采购权限'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='付款权限'>
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
            <el-table-column label='采购权限'>
                <template slot-scope="scope">
                    {{ scope.row.code }}
                </template>
            </el-table-column>
            <el-table-column label='付款权限'>
                <template slot-scope="scope">
                    {{ scope.row.oil_code }}
                </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>
