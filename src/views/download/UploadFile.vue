<template>
  <div>
    <div style="height: 25px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>下载中心</el-breadcrumb-item>
        <el-breadcrumb-item>上传文档</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

  <div style="width: 70%;">
    <el-form ref="form" :model="document" label-width="80px">
      <el-form-item label="文档名称">
        <el-input v-model="document.title" style="width:80%;float: left"></el-input>
      </el-form-item>
      <el-form-item label="文档描述">
        <el-input type="textarea" v-model="document.desc"></el-input>
      </el-form-item>
      <el-form-item label="文档">
        <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">
              上传pdf/word工作日志文件，大小不超过10M
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-row style="float: right;">
          <el-button type="info" >取消</el-button>
          <el-button type="primary">提交</el-button>
        </el-row>
      </el-form-item>
    </el-form>


  </div>


  </div>

</template>

<script>
export default {
  name: "FileQuery",
  data(){
    return {
      document:{
        title:""
      }
    }
  }
}
</script>

<style scoped>

</style>
