<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>职位管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加职位</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="padding-top: 50px;text-align: left">
      <el-form ref="positionData" :model="positionData" :inline="true" label-width="90px" label-position="left">
        <el-form-item label="姓名">
          <el-input v-model="positionData.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="positionData.cardId"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="positionData.sex" placeholder="--请选择性别--">
            <el-option
                v-for="item in sexOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <el-select v-model="positionData.jobId" placeholder="--请选择职位--">
            <el-option
                v-for="item in opsitionOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="positionData.education"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="positionData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="positionData.tel"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="positionData.phone"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input v-model="positionData.party"></el-input>
        </el-form-item>
        <el-form-item label="QQ号码">
          <el-input v-model="positionData.qqNum"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="positionData.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="positionData.postCode"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-input v-model="positionData.birthday"></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="positionData.pace"></el-input>
        </el-form-item>
        <el-form-item label="所学专业">
          <el-input v-model="positionData.speciality"></el-input>
        </el-form-item>
        <el-form-item label="爱好">
          <el-input v-model="positionData.hobby"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="positionData.remark"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="positionData.depId" placeholder="--请选择所属部门--">
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
        <el-button @click="clearAll">清空</el-button>
        <el-button type="primary">添 加</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "employeeInsert",
  data() {
    return {
      employeeData: {
        depId: 0,
        jobId: 0,
        name: '',
        cardId: '',
        address: '',
        postCode: '',
        tel: '',
        phone: '',
        qqNum: '',
        email: '',
        sex: 0,
        party: '',
        birthday: '',
        pace: '',
        education: '',
        speciality: '',
        hobby: '',
        remark: ''
      },
      sexOption: [{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }],
      depOption: [{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }],
      value: ''
    }
  },
  methods: {
    addEmployee() {
      this.$axios.post('/Employee/addEmployee', this.employeeData).then(res => {
        this.$message.success(res.data.msg);
      })
      this.clearAll();
    },
    clearAll() {
      this.employeeData = {};
    },
  }
}
</script>

<style scoped>
</style>