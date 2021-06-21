<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>职位管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加职位</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width:400px;margin: 0 auto;padding-top: 50px">
      <el-form ref="positionData" :model="positionData">
        <el-form-item label="职位名称">
          <el-input v-model="positionData.name" style="width: 300px" placeholder="请输入职位"></el-input>
        </el-form-item>
        <el-form-item label="详细描述">
          <el-input
              style="width: 300px"
              type="textarea"
              autosize
              :rows="2"
              placeholder="请输入内容"
              v-model="positionData.remark">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearAll">清空</el-button>
        <el-button type="primary" @click="addPosition">添 加</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "positionInsert",
  data() {
    return {
      positionData: {name: '', remark: ''},
    }
  },
  methods: {
    addPosition() {
      this.$axios.post('/job/addJob', this.positionData).then(res => {
        this.$message.success(res.data.msg);
      })
      this.clearAll();
    },
    clearAll() {
      this.positionData = {name: '', remark: ''};
    }
  }
}
</script>

<style scoped>

</style>