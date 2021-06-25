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
        <el-input v-model="document.filename" style="width:80%;float: left"></el-input>
      </el-form-item>
      <el-form-item label="文档描述">
        <el-input type="textarea" v-model="document.title"></el-input>
      </el-form-item>
      <el-form-item label="文档">
        <el-upload
            class="upload-demo"
            ref="upload"
            drag
            action="/document/uploadFile"
            :on-change="fileChange"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError"
            :auto-upload="false"
            :limit=limitNum
            :headers="token"
            :file-list="fileList"
            accept=".docx,.doc,.pdf">
          <template #trigger>
            <el-button size="small" type="primary">选取文件</el-button>
          </template>
          <div slot="tip" class="el-upload__tip">只能上传word/pdf文件，且不超过10M</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-row style="float: right;">
          <el-button type="info" >取消</el-button>
          <el-button type="success" @click="submitUpload">提交</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
  </div>

</template>

<script>
export default {
  name: "FileQuery",
  data() {
    return {
        document:{
          filename:"",
          title:"",
          remark:"",
          path:"",
          userId:"",
          createDate:""
        },
        limitNum:1,//同时允许上传的最大数
        fileList:[],//文件列表
        token: {'token':sessionStorage.getItem("Authorization")}
    }
  },
  methods:{
    beforeAvatarUpload(file) {
      const FileExt = file.name.replace(/.+\./, "");
      const limitSize = file.size/1024/1024;
      if (['zip', 'rar','pdf','docx'].indexOf(FileExt.toLowerCase()) === -1) {
        this.$message({
          type: 'warning',
          message: '请上传后缀名为pdf、docx、xlsx、zip或rar的附件！'
        });
        return false;
      }else if (limitSize >= 10){
        this.$message({
          type:'warning',
          message:'请上传文件大小小于10M的文件！'
        })
      }
    },
    // 文件改变时
    fileChange(file, fileList) {
      this.fileList = fileList
    },
    submitUpload(file){
      this.$refs.upload.submit();
    },
    handleAvatarSuccess(response,file){
      //文件后缀
      const reg = file.name.split('.').pop();
      this.document.remark=reg;
      console.log(response.data)
      this.document.path = response.data.path;
      this.document.createDate = response.data.createDate;
      this.document.userId = JSON.parse(window.sessionStorage.getItem("userInfo")).id;
      this.$axios.post("/document/saveDocument",this.document).then((resp)=>{
        this.document.filename = "";
        this.document.title = "";
        this.fileList = [];
        this.$message({
          type:'success',
          message:'文件上传成功!'
        })
      }).catch((error)=>{
        this.$message({
          type:'error',
          message:'文件上传失败！'
        })
      })
    },
    handleAvatarError(){
      this.$message({
        type:'error',
        message:'文件上传失败！'
      })
    }
  }
  }
</script>

<style scoped>

</style>
