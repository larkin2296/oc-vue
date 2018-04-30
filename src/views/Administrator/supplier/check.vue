<template>
  <div>
      <el-form :inline="true" label-width="120px">
        <el-form-item label='供应商'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='账号'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='联系方式'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='qq'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='推荐人'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='银行卡信息'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label='审核结果'>
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
            <el-table-column label='账号'>
                <template slot-scope="scope">
                    {{ scope.row.code }}
                </template>
            </el-table-column>
            <el-table-column label='qq'>
                <template slot-scope="scope">
                    {{ scope.row.oil_code }}
                </template>
            </el-table-column>
            <el-table-column label='身份证号'>
                <template slot-scope="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column label='身份证照片'>
                <template slot-scope="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column label='银行卡账号'>
                <template slot-scope="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column label='查看文件'>
            <template slot-scope="scope">
                <el-button></el-button>
            </template>
            </el-table-column>
            <el-table-column label='审核结果'>
                <template slot-scope="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column label='操作'>
                <template slot-scope="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>
