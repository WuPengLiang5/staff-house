<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
        <el-breadcrumb-item>员工查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="text-align: left;margin-top:10px">
      <el-form ref="form" :model="searchData" :inline="true">
        <el-form-item label="职位">
          <el-select v-model="searchData.jobId" placeholder="--请选择职位--">
            <el-option
                v-for="item in positionOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="searchData.name" placeholder="请输入姓名" style="width:300px" clearable></el-input>
        </el-form-item>

        <el-form-item label="身份证号码">
          <el-input v-model="searchData.cardId" placeholder="请输入身份证号码" style="width:300px" clearable></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="searchData.sex" placeholder="--请选择性别--">
            <el-option
                v-for="item in sexOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机">
          <el-input v-model="searchData.phone" placeholder="请输入职位" style="width:300px" clearable></el-input>
        </el-form-item>

        <el-form-item label="所属部门">
          <el-select v-model="searchData.depId" placeholder="--请选择所属部门--">
            <el-option
                v-for="item in depOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" style="margin-left: 10px;" @click="searchEmployee">搜索</el-button>
        <el-button type="primary" style="margin-left: 10px;" @click="deleteEmployee" v-show="userData.status===1">删除选中
        </el-button>
      </el-form>
    </div>
    <el-table
        ref="multipleTable"
        :data="employees"
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
          label="姓名"
          width="80">
      </el-table-column>
      <el-table-column
          prop="sexValue"
          label="性别"
          width="50">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号码"
          width="100">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          width="100">
      </el-table-column>
      <el-table-column
          prop="positionName"
          label="职位"
          width="100">
      </el-table-column>
      <el-table-column
          prop="education"
          label="学历"
          width="100">
      </el-table-column>
      <el-table-column
          prop="cardId"
          label="身份证号码"
          width="100">
      </el-table-column>
      <el-table-column
          prop="depName"
          label="部门"
          width="100">
      </el-table-column>
      <el-table-column
          prop="address"
          label="联系地址"
          width="100">
      </el-table-column>
      <el-table-column
          prop="createDate"
          label="建档日期"
          width="100">
      </el-table-column>
      <el-table-column
          label="操作"
          show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="primary" @click="editEmployee(scope.row)">{{ userData.status === 1 ? '修改' : '查看' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 10px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page=currentPage
          :page-sizes="[5, 10, 15, 20]"
          :page-size=pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total=totalEmployees>
      </el-pagination>
    </div>

    <el-dialog
        :title="dialogTitle[userData.status]"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false">
      <el-form ref="positionData"
               :model="updateEmployee"
               :disabled="userData.status!==1"
               :inline="true"
               label-width="90px"
               label-position="left">
        <el-form-item label="姓名">
          <el-input v-model="updateEmployee.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="updateEmployee.cardId"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="updateEmployee.sex" placeholder="--请选择性别--">
            <el-option
                v-for="item in sexOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <el-select v-model="updateEmployee.jobId" placeholder="--请选择职位--">
            <el-option
                v-for="item in positionOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="updateEmployee.education"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="updateEmployee.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="updateEmployee.tel"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="updateEmployee.phone"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input v-model="updateEmployee.party"></el-input>
        </el-form-item>
        <el-form-item label="QQ号码">
          <el-input v-model="updateEmployee.qqNum"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="updateEmployee.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="updateEmployee.postCode"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-input v-model="updateEmployee.birthday"></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="updateEmployee.pace"></el-input>
        </el-form-item>
        <el-form-item label="所学专业">
          <el-input v-model="updateEmployee.speciality"></el-input>
        </el-form-item>
        <el-form-item label="爱好">
          <el-input v-model="updateEmployee.hobby"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="updateEmployee.remark"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="updateEmployee.depId" placeholder="--请选择所属部门--" @click="clearAll">
            <el-option
                v-for="item in depOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-show="userData.status===1" @click="editEmployeeConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="提示"
        :visible.sync="deleteDialogVisible"
        width="30%">
      <span>此操作将永久删除该职位, 是否继续?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteEmployeeConfirm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "employeeQuery",
  data() {
    return {
      updateEmployee: {},
      searchData: {depId: '', jobId: '', sex: '', phone: '', name: '', cardId: ''},
      sexOption: [{value: 1, label: '男'}, {value: 0, label: '女'}],
      employees: [],
      totalEmployees: 0,
      multipleSelection: [],
      userData: {},
      dialogFormVisible: false,
      deleteDialogVisible: false,
      dialogTitle: {
        0: "查看信息",
        1: "编辑信息"
      },
      positionOption: [],
      depOption: [],
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
    deleteEmployee() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择你要删除的员工！');
      } else {
        this.deleteDialogVisible = true;
      }
    },
    deleteEmployeeConfirm() {
      let ids = ''
      this.multipleSelection.forEach((v) => {
        ids += v.id + ','
      })
      ids = ids.substr(0, ids.length - 1)
      this.$axios.delete('/Employee/deleteEmployees?ids=' + ids).then(res => {
        this.$message.success(res.data.msg);
        this.currentPage = 1;
        this.getAllEmployeesByLike();
        this.deleteDialogVisible = false;
      })
    },
    editEmployee(row) {
      this.updateEmployee = {
        id: row.id,
        name: row.name,
        depId: row.depId,
        jobId: row.jobId,
        cardId: row.cardId,
        address: row.address,
        postCode: row.postCode,
        tel: row.tel,
        phone: row.phone,
        qqNum: row.qqNum,
        email: row.email,
        sex: row.sex,
        party: row.party,
        birthday: row.birthday,
        pace: row.pace,
        education: row.education,
        speciality: row.speciality,
        hobby: row.hobby,
        createDate: row.createDate,
        remark: row.remark
      }
      this.dialogFormVisible = true;
    },
    editEmployeeConfirm() {
      this.$axios.put('/Employee/editEmployee', this.updateEmployee).then(res => {
        this.$message.success(res.data.msg);
      })
      this.dialogFormVisible = false;
      this.getAllEmployeesByLike();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getAllEmployeesByLike()
    },
    getAllEmployeesByLike() {
      const currentPage = this.currentPage;
      const pageSize = this.pageSize;

      async function getData() {
        return await axios.get('/Employee/getEmployeeByLike?page=' + currentPage + '&limit=' + pageSize);
      }

      const data = getData()
      console.log(this.positionOption)
      data.then(onFulfilled => {
        onFulfilled.data.data.records.forEach((v) => {
          // console.log(v)
          if (v.sex === 1) {
            v.sexValue = '男'
          } else {
            v.sexValue = '女'
          }
          this.depOption.forEach((depV) => {
            if (depV.value === v.depId) {
              v.depName = depV.label;
            }
          })
          this.positionOption.forEach((positionV) => {
            if (positionV.value === v.jobId) {
              v.positionName = positionV.label;
            }
          })
        })
        this.employees = onFulfilled.data.data.records;
        this.totalEmployees = onFulfilled.data.data.total;
      }).catch(onRejected => {
        console.log(onRejected)
      })
      // this.$axios.get('/Employee/getEmployeeByLike?page=' + this.currentPage + '&limit=' + this.pageSize).then(response => {
      //   const data = response.data;
      //   data.data.records.forEach((v) => {
      //     // console.log(v)
      //     if (v.sex === 1) {
      //       v.sexValue = '男'
      //     } else {
      //       v.sexValue = '女'
      //     }
      //     this.depOption.forEach((depV) => {
      //       if (depV.id === v.depId) {
      //         console.log(1)
      //         v.depName = depV.name;
      //       }
      //     })
      //   })
      //   this.employees = data.data.records;
      //   this.totalEmployees = data.data.total;
      // })
    },
    getDep() {
      async function getData() {
        return await axios.get('/department/listDepartment');
      }

      const data = getData()
      data.then(onFulfilled => {
        onFulfilled.data.forEach((v, i) => {
          this.depOption[i] = {value: v.id, label: v.name}
        })
      }).catch(onRejected => {
        console.log(onRejected)
      })
      // this.$axios.get('/department/listDepartment').then(res => {
      //   res.data.forEach((v, i) => {
      //     this.depOption[i] = {value: v.id, label: v.name}
      //     // console.log(this.depOption)
      //   })
      // })
    },
    getPosition() {
      async function getData() {
        return await axios.get('/job/getAllJobsByLike?page=1&limit=100');
      }

      const data = getData()
      data.then(onFulfilled => {
        onFulfilled.data.data.records.forEach((v, i) => {
          this.positionOption[i] = {value: v.id, label: v.name}
        })
      }).catch(onRejected => {
        console.log(onRejected)
      })
      // this.$axios.get('/job/getAllJobsByLike?page=1&limit=100').then(res => {
      //   res.data.data.records.forEach((v, i) => {
      //     this.positionOption[i] = {value: v.id, label: v.name}
      //   })
      //   // console.log(this.positionOption)
      // })
    },
    searchEmployee() {
      console.log('/Employee/getEmployeeByLike?page=' + this.currentPage + '&limit=' + this.pageSize + '&deptId='
          + this.searchData.depId + '&jobId=' + this.searchData.jobId + '&sex=' + this.searchData.sex + '&name='
          + this.searchData.name + '&phone=' + this.searchData.phone + '&cardId=' + this.searchData.cardId)
      this.$axios.get('/Employee/getEmployeeByLike?page=' + this.currentPage + '&limit=' + this.pageSize + '&deptId='
          + this.searchData.depId + '&jobId=' + this.searchData.jobId + '&sex=' + this.searchData.sex + '&name='
          + this.searchData.name + '&phone=' + this.searchData.phone + '&cardId=' + this.searchData.cardId).then(res => {
        console.log(res)
        res.data.data.records.forEach((v) => {
          // console.log(v)
          if (v.sex === 1) {
            v.sexValue = '男'
          } else {
            v.sexValue = '女'
          }
          this.depOption.forEach((depV) => {
            if (depV.value === v.depId) {
              v.depName = depV.label;
            }
          })
          this.positionOption.forEach((positionV) => {
            if (positionV.value === v.jobId) {
              v.positionName = positionV.label;
            }
          })
        })
        this.employees = res.data.data.records;
        this.totalEmployees = res.data.data.total;
      })
      console.log(this.searchData)
    }
  },
  mounted() {
    this.userData = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.getDep();
    this.getPosition();
    this.getAllEmployeesByLike();
  }
}
</script>

<style scoped>

</style>