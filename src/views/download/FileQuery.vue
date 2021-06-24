<template>
  <div>
    <div style="height: 25px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>下载中心</el-breadcrumb-item>
        <el-breadcrumb-item>查询文档</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="border: #EBEEF5 1px solid; width: 950px; padding-left: 12px;padding-top: 1px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
      <p style="text-align: left;margin: 10px">数据筛选</p>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="输入查询">
          <el-input v-model="formInline.documentId" placeholder="文档编号"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker
              v-model="formInline.submitTime"
              type="date"
              placeholder="Pick a day"
              :value-format="'yyyy/MM/dd'">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search" style="margin-left: 50px">查询</el-button>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%"  >
        <el-table-column fixed prop="createDate" label="日期" width="150"></el-table-column>
        <el-table-column prop="id" label="文档编号" width="120"></el-table-column>
        <el-table-column prop="filename" label="文档名称" width="220"></el-table-column>
        <el-table-column prop="remark" label="文件类型" width="120"></el-table-column>
        <el-table-column prop="title" label="文件主题" width="150"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                icon="el-icon-download"
                @click="download(scope.row)"
            >下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total= "total"
                     :prev-text="prevPage"
                     :next-text="nextPage"
                     :page-size="8">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadFile",
  data() {
    return {
      page:1,
      total:50,
      formInline: {
        documentId: '',
        submitTime: '',
      },
      tableData: []
    };
  },
  created() {
    this.$axios.get("/document/getDocumentsByPage?page="+this.page).then((resp)=>{
      // console.log(resp.data.data)
      const data = resp.data.data;
      this.tableData = data.documents;
      this.total = data.number;
    })
  },
  methods: {
    prevPage(){
      this.page -= 1;
      this.$axios.get("/document/getDocumentsByPage?page="+this.page).then((resp)=>{
        // console.log(resp.data.data)
        const data = resp.data.data;
        this.tableData = data.documents;
        this.total = data.number;
      })
    },
    nextPage(){
      this.page += 1;
      this.$axios.get("/document/getDocumentsByPage?page="+this.page).then((resp)=>{
        // console.log(resp.data.data)
        const data = resp.data.data;
        this.tableData = data.documents;
        this.total = data.number;
      })
    },
    onSubmit() {
      console.log(this.formInline.documentId)
      if (this.formInline.documentId!=='' && this.formInline.submitTime != ''){//两个数据都填写
        this.$axios.get("/document/checkDocumentsByIdAndCreateDate?createDate="+this.formInline.submitTime
        +"&id="+this.formInline.documentId+"&page="+this.page).then((resp)=>{
          const data = resp.data.data;
          this.total = data.number;
          this.tableData = data.documents;
        }).catch((error)=>{
          this.$message({
            type:"error",
            message:"查询失败！没有该文档。"
          })
        })
      }else if(this.formInline.submitTime == '' && this.formInline.documentId !=''){//填写id
        this.$axios.get("/document/checkDocumentById?id="+this.formInline.documentId).then((resp)=>{
          this.total = 8;
          const data = resp.data.data;
          this.tableData = data.document;
        }).catch((error)=>{
          this.$message({
            type:"error",
            message:"查询失败！没有该文档。"
          })
        })
      }else if (this.formInline.documentId=='' && this.formInline.submitTime!=''){//填写时间
        this.$axios.get("/document/checkDocumentsByCreateDate?page="+this.page+"&createDate="+this.formInline.submitTime).then((resp)=>{
          const data = resp.data.data;
          this.tableData = data.documents;
          this.total = data.number;
        }).catch((error)=>{
          this.$message({
            type:"error",
            message:"查询失败！没有该文档。"
          })
        })
      }else {
        this.$axios.get("/document/getDocumentsByPage?page="+this.page).then((resp)=>{
          // console.log(resp.data.data)
          const data = resp.data.data;
          this.tableData = data.documents;
          this.total = data.number;
        })
      }
    },
    // 文件下载
    download(row) {
      const id = row.id;
      window.location.href = "http://localhost:8088/document/downloadFile?id="+id;
    },
  }
}
</script>

<style scoped>

</style>
