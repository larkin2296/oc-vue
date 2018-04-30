<template>
  <div>
    <el-tabs type="border-card">
        <el-tab-pane label="供货卡密">
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
                <el-table border fit highlight-current-row>
                    <el-table-column label='供货商'>
                        <template slot-scope="scope">
                            {{ scope.row.user_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='商品'>
                        <template slot-scope="scope">
                            {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='面额'>
                        <template slot-scope="scope">
                            {{ scope.row.code }}
                        </template>
                    </el-table-column>
                    <el-table-column label='字段一'>
                        <template slot-scope="scope">
                            {{ scope.row.cam_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='字段二'>
                        <template slot-scope="scope">
                            {{ scope.row.cam_other_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='供货时间'>
                        <template slot-scope="scope">
                            {{ scope.row.created_at }}
                        </template>
                    </el-table-column>
                    <el-table-column label='折扣'>
                        <template slot-scope="scope">
                            {{ scope.row.discount }}
                        </template>
                    </el-table-column>
                    <el-table-column label='卡密状态'>
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
                    <el-table-column label='供应商'>
                        <template slot-scope="scope">
                            {{ scope.row.user_name }}
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
                    <el-table-column label='金额'>
                        <template slot-scope="scope">
                            {{ scope.row.already_card }}
                        </template>
                    </el-table-column>
                    <el-table-column label='供货时间'>
                        <template slot-scope="scope">
                            {{ scope.row.created_at }}
                        </template>
                    </el-table-column>
                    <el-table-column label='预计到账时间'>
                        <template slot-scope="scope">
                            {{ scope.row.end_time }}
                        </template>
                    </el-table-column>
                    <el-table-column label='折扣'>
                        <template slot-scope="scope">
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                    <el-table-column label='查看凭证'>
                        <template slot-scope="scope">
                            <el-button></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label='操作'>
                        <template slot-scope="scope">
                            <el-button></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>