<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>职位管理</el-breadcrumb-item>
        <el-breadcrumb-item>职位查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width:500px;margin:25px 0;">
      <el-input v-model="positionName" placeholder="请输入职位" style="width:300px"></el-input>
      <el-button type="primary" style="margin-left: 10px;" @click="searchPosition">搜索</el-button>
      <el-button type="primary" style="margin-left: 10px;" @click="deletePosition" v-show="userData.status===1">删除选中</el-button>
    </div>
    <el-table
        ref="multipleTable"
        :data="positions"
        tooltip-effect="dark"
        :border="true"
        style="width: 100%"
        :cell-style="rowClass"
        :header-cell-style="rowClass"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="100">
      </el-table-column>
      <el-table-column
          prop="name"
          label="职位名称"
          width="500">
      </el-table-column>
      <el-table-column
          prop="remark"
          label="详细信息"
          width="500">
      </el-table-column>
      <el-table-column
          label="操作"
          show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="primary" @click="editPosition(scope.row)">{{userData.status===1?'修改':'查看'}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 20px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size=pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total=totalPositions>
      </el-pagination>
    </div>

    <el-dialog
        :title="dialogTitle[userData.status]"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false">
      <el-form ref="userData" :model="updatePosition" :disabled="userData.status!==1" label-width="100px">
        <el-form-item label="职位名称">
          <el-input v-model="updatePosition.name"></el-input>
        </el-form-item>
        <el-form-item label="详细信息">
          <el-input v-model="updatePosition.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-show="userData.status===1" @click="editPositionConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="提示"
        :visible.sync="deleteDialogVisible"
        width="30%">
      <span>此操作将永久删除该职位, 是否继续?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deletePositionConfirm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "positionQuery",
  data() {
    return {
      totalPositions: 0,
      positionName: '',
      positions: [],
      updatePosition: {},
      multipleSelection: [],
      userData: {},
      isManage: true,
      deleteDialogVisible: false,
      dialogFormVisible: false,
      dialogTitle: {1:'修改职位',0:'查看职位'},
      dialogStatus: "",
      currentPage: 1,
      pageSize: 5
    }
  },
  methods: {
    rowClass() { //表格数据居中显示
      return "text-align:center"
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    editPosition(row) {
      this.updatePosition = {id: row.id, name: row.name, remark: row.remark}
      this.dialogFormVisible = true;
    },
    editPositionConfirm() {
      this.$axios.put('/job/editJob', this.updatePosition).then(res=>{
        this.$message.success(res.data.msg);
      })
      this.dialogFormVisible=false;
      this.getAllJobsByLike();
    },
    deletePosition() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择你要删除的职位！');
      } else {
        this.deleteDialogVisible = true;
      }
    },
    deletePositionConfirm() {
      let ids = ''
      this.multipleSelection.forEach((v) => {
        ids += v.id + ','
      })
      ids = ids.substr(0, ids.length - 1)
      this.$axios.delete('/job/deleteJobs?ids=' + ids).then(res => {
        this.$message.success(res.data.msg);
        this.currentPage = 1;
        this.getAllJobsByLike();
        this.deleteDialogVisible = false;
      })
    },
    searchPosition() {
      this.$axios.get('/job/getAllJobsByLike?page=1&limit=' + this.pageSize + '&jobName=' + this.positionName).then(response => {
        const data = response.data;
        this.positions = data.data.records;
        this.totalPositions = data.data.total;
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getAllJobsByLike()
    },
    getAllJobsByLike() {
      this.$axios.get('/job/getAllJobsByLike?page=' + this.currentPage + '&limit=' + this.pageSize).then(response => {
        const data = response.data;
        // console.log(data.code);
        // console.log(data.msg);
        // console.log(data.data);
        this.positions = data.data.records;
        this.totalPositions = data.data.total;
      })
    },
    init(){
      this.positionName = "";
      this.getAllJobsByLike();
    }
  },
  mounted() {
    this.userData = JSON.parse(window.sessionStorage.getItem('userInfo'));
    this.getAllJobsByLike();
  },
  watch: {  //监听
    $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  }
}
</script>

<style scoped>

</style>