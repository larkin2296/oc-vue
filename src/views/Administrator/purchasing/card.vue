<template>
  <div>
    <el-form :inline="true" label-width="120px">>
        <el-form-item label="采购商">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="油卡编号">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="油卡号">
            <el-input></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type='danger'>查询</el-button>
        </el-form-item>
        <div class='app-container'>
        <el-table border fit highlight-current-row>
            <el-table-column label='姓名'>
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label='编号'>
                <template slot-scope="scope">
                    {{ scope.row.code }}
                </template>
            </el-table-column>
            <el-table-column label='油卡号'>
                <template slot-scope="scope">
                    {{ scope.row.oil_code }}
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
    </el-form>
  </div>
</template>
