<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>职位管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加职位</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="padding-top: 50px;text-align: left">
      <el-form ref="employeeData" :model="employeeData" :rules="dataRule" :inline="true" label-width="90px" label-position="left">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="employeeData.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="cardId">
          <el-input v-model="employeeData.cardId"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="employeeData.sex" placeholder="--请选择性别--">
            <el-option
                v-for="item in sexOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="jobId">
          <el-select v-model="employeeData.jobId" placeholder="--请选择职位--">
            <el-option
                v-for="item in positionOption"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="employeeData.education"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="employeeData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="employeeData.tel"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="employeeData.phone"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input v-model="employeeData.party"></el-input>
        </el-form-item>
        <el-form-item label="QQ号码">
          <el-input v-model="employeeData.qqNum"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="employeeData.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="employeeData.postCode"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-input v-model="employeeData.birthday"></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="employeeData.pace"></el-input>
        </el-form-item>
        <el-form-item label="所学专业">
          <el-input v-model="employeeData.speciality"></el-input>
        </el-form-item>
        <el-form-item label="爱好">
          <el-input v-model="employeeData.hobby"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="employeeData.remark"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="employeeData.depId" placeholder="--请选择所属部门--" @click="clearAll">
            <el-option
                v-for="item in depOption"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearAll">清空</el-button>
        <el-button type="primary" @click="addEmployee('employeeData')">添 加</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "employeeInsert",
  data() {
    return {
      employeeData: {},
      sexOption: [{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }],
      depOption: [],
      positionOption: [],
      dataRule:{
        name: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
        cardId: [{required: true, message: '身份证号不能为空', trigger: 'blur'}],
        sex: [{required: true, message: '性别不能为空', trigger: 'blur'}],
        jobId: [{required: true, message: '职位不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    addEmployee(employeeData) {
      this.$refs[employeeData].validate((valid) => {
        if (valid) {
          this.$axios.post('/Employee/addEmployee', this.employeeData).then(res => {
            this.$message.success(res.data.msg);
          })
          this.clearAll();
        }
      })
    },
    clearAll() {
      this.employeeData = {};
    },
    getDep() {
      this.$axios.get('/department/listDepartment').then(res => {
        this.depOption=res.data
      })
    },
    getPosition() {
      this.$axios.get('/job/getAllJobsByLike?page=1&limit=100').then(res => {
        this.positionOption=res.data.data.records;
      })
    }
  },
  mounted () {
    this.getDep();
    this.getPosition();
  },
}
</script>

<style scoped>
</style>