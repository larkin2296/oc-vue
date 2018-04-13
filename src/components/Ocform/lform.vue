<template>
<el-form :inline="true" ref="form" :model="form" label-width="120px">
    <el-form-item label="Activity zone" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">

        <el-select v-model="form.region" placeholder="please select your zone">

          <el-option label="Zone one" value="shanghai"></el-option>

          <el-option label="Zone two" value="beijing"></el-option>

        </el-select>
    </el-form-item>

    <el-form-item label="Activity name">

        <el-input v-model="form.name"></el-input>

    </el-form-item>

    <el-form-item label="Activity zone">

        <el-select v-model="form.region" placeholder="please select your zone">

          <el-option label="Zone one" value="shanghai"></el-option>

          <el-option label="Zone two" value="beijing"></el-option>

        </el-select>
    </el-form-item>

    <el-form-item label="Activity name">

        <el-input v-model="form.name"></el-input>

    </el-form-item>

    <el-form-item label="Activity name">

        <el-input v-model="form.name"></el-input>

    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
</el-form>
</template>

<script>
export default {
  name: 'OcForm',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
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
