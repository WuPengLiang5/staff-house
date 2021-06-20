<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
        <el-breadcrumb-item>员工查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="text-align: left;margin-top:10px">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="职位">
          <el-select v-model="selected" placeholder="--请选择职位--">
            <el-option
                v-for="item in positionOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="studentName" placeholder="请输入职位" style="width:300px" clearable></el-input>
        </el-form-item>

        <el-form-item label="身份证号码">
          <el-input v-model="studentName" placeholder="请输入职位" style="width:300px" clearable></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="selected" placeholder="--请选择性别--">
            <el-option
                v-for="item in sexOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机">
          <el-input v-model="studentName" placeholder="请输入职位" style="width:300px" clearable></el-input>
        </el-form-item>

        <el-form-item label="所属部门">
          <el-select v-model="selected" placeholder="--请选择所属部门--">
            <el-option
                v-for="item in positionOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" style="margin-left: 10px;" @click="searchPosition">搜索</el-button>
        <el-button type="primary" style="margin-left: 10px;" @click="deletePosition">删除选中</el-button>
      </el-form>
    </div>
    <el-table
        ref="multipleTable"
        :data="tableData"
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
          prop="date"
          label="姓名"
          width="100">
      </el-table-column>
      <el-table-column
          prop="name"
          label="性别"
          width="100">
      </el-table-column>
      <el-table-column
          prop="name"
          label="手机号码"
          width="100">
      </el-table-column>
      <el-table-column
          prop="name"
          label="邮箱"
          width="100">
      </el-table-column>
      <el-table-column
          prop="name"
          label="职位"
          width="100">
      </el-table-column>
      <el-table-column
          prop="name"
          label="学历"
          width="100">
      </el-table-column>
      <el-table-column
          prop="name"
          label="身份证号码"
          width="100">
      </el-table-column>
      <el-table-column
          prop="name"
          label="部门"
          width="100">
      </el-table-column>
      <el-table-column
          prop="name"
          label="联系地址"
          width="100">
      </el-table-column>      <el-table-column
        prop="name"
        label="建档日期"
        width="100">
    </el-table-column>
      <el-table-column
          label="操作"
          show-overflow-tooltip>
        <span class="modify" style="cursor: pointer;color: red" @click="modifyPosition">修改</span>
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 10px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
      </el-pagination>
    </div>

    <el-dialog :title="dialogTitle[dialogStatu]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="userData" :model="userData" :disabled="isDisabled" label-width="100px">
        <el-form-item label="职位名称">
          <el-input v-model="userData.loginName"></el-input>
        </el-form-item>
        <el-form-item label="详细信息">
          <el-input v-model="userData.userName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-show="isUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "employeeQuery",
  data() {
    return {
      sexOption: [{value: 1, label: '男'}, {value: 2, label: '女'}],
      tableData: [  {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],
      userData: [{loginName: "1212556", userName: "李二", status: "管理员"}],
      studentName: "",
      isManage: true,
      dialogFormVisible: false,
      user: {},
      dialogTitle: {
        checkInfo: "查看信息",
        updateInfo: "编辑信息"
      },
      isUpdate: false,
      //是否禁用表单
      isDisabled: true,
      dialogStatu: "",
      positionOption: [{
        value: '0',
        label: 'java'
      }, {
        value: '1',
        label: 'c'
      }, {
        value: '2',
        label: 'python'
      }],
      selected: '',
      rangeValue: "",
      form:{},
      currentPage:0,
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
    selectUser() {
      this.userData = [{loginName: "888888888", userName: "李二", status: "普通用户"}];
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
    updateUserInfo(row) {
      this.dialogFormVisible = true;
      this.dialogStatu = "updateInfo";
      this.user.id = row;
      this.isUpdate = true;
      this.isDisabled = false;
    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    },
    searchPosition(){

    },
  }
}
</script>

<style scoped>

</style>