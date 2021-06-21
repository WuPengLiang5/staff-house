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
      <el-button type="primary" style="margin-left: 10px;" @click="deletePosition">删除选中</el-button>
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
        <span class="modify" style="cursor: pointer;color: red" @click="modifyPosition">修改</span>
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

    <el-dialog :title="dialogTitle[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="userData" :model="userData" :disabled="userData.status==='管理员'" label-width="100px">
        <el-form-item label="职位名称">
          <el-input v-model="userData.loginName"></el-input>
        </el-form-item>
        <el-form-item label="详细信息">
          <el-input v-model="userData.userName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-show="userData.status==='管理员'">确 定</el-button>
      </div>
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
      multipleSelection: [],
      userData: {loginName: "1212556", userName: "李二", status: "管理员"},
      isManage: true,
      dialogFormVisible: false,
      dialogTitle: '修改职位',
      dialogStatus: "",
      currentPage: 1,
      pageSize: 5
    }
  },
  methods: {
    modifyPosition() {
      this.dialogFormVisible = true;
    },
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
    checkInfo(row) {
      this.dialogFormVisible = true;
      this.dialogStatu = "checkInfo";
      this.user.id = row;
    },
    deletePosition(row) {
      this.$confirm('此操作将永久删除该职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
      this.user.id = row;
    },
    searchPosition() {

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
      console.log(this.currentPage)
      console.log(this.pageSize)
      this.$axios.get('/job/getAllJobsByLike?page=' + this.currentPage + '&limit=' + this.pageSize).then(response => {
        const data = response.data;
        console.log(data.code);
        console.log(data.msg);
        console.log(data.data);
        this.positions = data.data.records;
        this.totalPositions = data.data.total;
      })
    }
  },
  mounted() {
    this.getAllJobsByLike();
  }
}
</script>

<style scoped>

</style>