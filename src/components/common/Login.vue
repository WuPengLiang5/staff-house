<template>
    <div class="login-wrapper">
        <div class="login-content">
            <div class="login-main">
                <h2 class="login-main-title">
                    <span style="color: #6495ed">CSI员工</span>
                    <span style="color: #ee8145">之家</span></h2>
                <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
                    <el-form-item prop="loginName">
                        <el-input v-model="dataForm.loginName" placeholder="帐号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit('dataForm')">登录</el-button>
                        <el-button class="login-btn-submit" type="primary" @click="faceSubmit()">刷脸</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Login",
        data() {
            return {
                dataForm: {
                    loginName: '',
                    password: ''
                },
                dataRule: {
                  loginName: [{
                        required: true,
                        message: '帐号不能为空',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            // 跳转刷脸页面
            faceSubmit() {
                this.$router.push({name: 'FaceLogin'});
            },

            // 提交表单
            dataFormSubmit(dataForm) {
                // TODO：登录代码逻辑待完善
              this.$refs[dataForm].validate((valid) => {
                if (valid) {
                  this.$axios({
                    header:{
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method:'post',
                    url:"/login/doLogin",
                    data:{
                      "loginName":this.dataForm.loginName,
                      "password":this.dataForm.password
                    },
                  }).then((resp) => {
                    console.log(resp.data)
                    if (resp.data.loginName!=="notfound"){
                      const userInfo = resp.data
                      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
                      this.$store.commit("changeLogin",userInfo)
                      this.$router.push({name: 'Home'});
                    }else{
                      this.$message({
                        type: 'error',
                        message: "登录失败：密码错误"
                      });
                    }
                  }).catch(error => {
                    this.$message({
                      type: 'error',
                      message: "登录失败，原因是" + error.toString()
                    });
                  });
                }else{
                  this.$message({
                    message: '请输入所有字段',
                    type: 'error'
                  });
                  return false
                }
              });
            }
        }
    }
</script>
<style>
    .login-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        background-color: rgba(38, 50, 56, .6);
        background: url(../../assets/login_backPicture.jpg) no-repeat;
        background-size: 100% 100%;
    }
    .login-content {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        height: 300px;
        width: 400px;
        background-color: #112234;
        opacity: .8;
    }
    .login-main {
        color: beige;
        padding: 20px 20px 10px 20px;
    }
</style>