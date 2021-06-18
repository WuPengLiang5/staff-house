<template>
  <div>
    <div style="border: #EBEEF5 1px solid;padding-left: 12px;padding-top: 1px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
      <p style="text-align: left;margin: 10px">数据筛选</p>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="输入查询">
          <el-input v-model="formInline.document" placeholder="文档编号"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker
              v-model="formInline.submitTime"
              type="date"
              placeholder="Pick a day">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
      </el-form>
    </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed prop="createDate" label="日期" width="150"></el-table-column>
          <el-table-column prop="fileId" label="文档编号" width="120"></el-table-column>
          <el-table-column prop="fileName" label="文档名称" width="300"></el-table-column>
          <el-table-column prop="remark" label="主题" width="320"></el-table-column>
          <el-table-column label="操作">
            <el-button type="primary" @click="download" icon="el-icon-download">下载</el-button>
          </el-table-column>
        </el-table>
        <el-pagination background
                  layout="prev, pager, next"
                  :total="1000">
              </el-pagination>
      </div>
  </div>
</template>

<script>
    export default {
        name: "UploadFile",
      data() {
        return {
          formInline: {
            document: '',
            submitTime: '',
          },
          tableData: [{
            createDate: '2016-05-03',
            fileId: 'MXID53',
            fileName: '小王工作日报',
            remark: '我的开发日志'
          },
            {
              createDate: '2016-05-03',
              fileId: 'MXID53',
              fileName: '小王工作日报',
              remark: '我的开发日志'
            },
            {
              createDate: '2016-05-03',
              fileId: 'MXID53',
              fileName: '小王工作日报',
              remark: '我的开发日志'
            },
            {
              createDate: '2016-05-03',
              fileId: 'MXID53',
              fileName: '小王工作日报',
              remark: '我的开发日志'
            },
            {
              createDate: '2016-05-03',
              fileId: 'MXID53',
              fileName: '小王工作日报',
              remark: '我的开发日志'
            }
          ]
        };
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        },
        download(){

        }
      }
    }
</script>

<style scoped>

</style>
