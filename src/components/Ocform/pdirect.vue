<template>
<el-form :inline="true" ref="form" :model="form" label-width="120px">
    <el-form-item label='订单类型'>
      <el-select v-model="form.status" placeholder="请选择">
        <el-option
          v-for="item in c_status"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label='编号'>
      <el-input v-model="form.number" placeholder="编号" />
    </el-form-item>
    <el-form-item label='姓名'>
      <el-input v-model="form.name" placeholder="姓名" />
    </el-form-item>
    <el-form-item label='卡号'>
      <el-input v-model="form.card" placeholder="卡号" />
    </el-form-item>
    <el-form-item label='面额'>
      <el-select v-model="form.price" placeholder="请选择">
        <el-option
          v-for="item in c_price"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label='交易时间'>
      <el-date-picker
      v-model="form.time_start"
      type="date"
      placeholder="选择日期" size='small'>
    </el-date-picker>~
    <el-date-picker
      v-model="form.time_end"
      type="date"
      placeholder="选择日期" size='small'>
    </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type='danger' >查找</el-button>
    </el-form-item>
</el-form>
</template>

<script>
export default {
  name: 'OcForm',
  data() {
    return {
      form: {
        status: '',
        number: '',
        card: '',
        price: '',
        time_start: '',
        time_end: '',
        name: ''
      },
      c_status: [{
        value: '0',
        label: '已完成'
      },
      {
        value: '1',
        label: '未完成'
      }],
      c_price: [{
        value: '50',
        label: '50元'
      },
      {
        value: '100',
        label: '100元'
      }]
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
form{
    padding-top: 50px;
}
</style>
