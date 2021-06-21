<template>
    <el-dialog title="修改密码" :visible.sync="visible" :append-to-body="true">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
            <el-form-item label="账号">
                <span>{{ loginName }}</span>
            </el-form-item>
            <el-form-item label="原密码" prop="password">
                <el-input type="password" v-model="dataForm.password" placeholder="原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="dataForm.newPassword" placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="dataForm.confirmPassword" placeholder="确认密码"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit('dataForm')">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
      name:'UpdatePassword',
        data() {
            return {
                loginName: '123',
                visible: false,
                dataForm: {
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                },
                dataRule: {
                    password: [{
                        required: true,
                        message: '原密码不能为空',
                        trigger: 'blur'
                    }],
                    newPassword: [{
                        required: true,
                        message: '新密码不能为空',
                        trigger: 'blur'
                    }],
                    confirmPassword: [{
                        required: true,
                        message: '确认密码不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            // 初始化
            init() {
                this.visible = true
                // 初始化清空表单内容
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields()
                })
            },
            // 表单提交，回到登录界面
            dataFormSubmit(dataForm) {
                // TODO: 表达提交逻辑待完成
              this.$refs[dataForm].validate((valid) => {
                if (valid) {
                  if (this.dataForm.newPassword === this.dataForm.confirmPassword){
                    const config = {
                      header:{
                        "Content-Type":"multipart/form-data"
                      },
                      method: 'post',
                      url: '/login/updateUserPassword',
                      data:{
                        "loginName":this.loginName,
                        "password":this.dataForm.password,
                        "newPassword":this.dataForm.confirmPassword
                      }
                    };
                    this.$axios(config).then((resp)=>{
                      console.log(resp.data)
                      if (resp.data===true){
                        this.$message({
                          type: 'success',
                          message: "成功修改密码"
                        });
                        this.visible = false;
                      }else{
                        this.$message({
                          type: 'error',
                          message: "原密码输入错误"
                        });
                      }
                    })
                  }else{
                    this.$message({
                      type: 'error',
                      message: "两次密码输入不一样，请重新输入"
                    });
                  }
                }
              });


                // this.$nextTick(() => {
                //     this.$router.push({
                //         name: "Login"
                //     })
                // })
            }
        }
    }
</script>