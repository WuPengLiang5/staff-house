<template>
    <div>
        <span>添加用户</span><br><br><br><br>
        <el-form ref="user" :model="user"  label-width="100px" :rules="rules">
            <el-form-item label="登录名" prop="loginName">
                <el-input v-model="user.loginName"></el-input>
            </el-form-item>
            <el-form-item label="初始密码" prop="password">
                <el-input v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="user.userName"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="status">
                <el-select v-model="user.status" clearable placeholder="请选择" style="width: 100%">
                    <el-option label="管理员" value="1"></el-option>
                    <el-option label="普通用户" value="2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="clearAll('user')">清空</el-button>
            <el-button type="primary" @click="insertUser('user')">添 加</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userInsert",
        data() {
            return {
                user:{},
                rules:{
                    loginName: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
                    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入初始密码', trigger: 'blur' }],
                    status: [{ required: true, message: '请选择用户权限', trigger: 'blur' }],
                }
            }
        },
        methods:{
            clearAll(formName){
                this.user = {};
                this.$refs[formName].resetFields();
            },
            insertUser(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/user/saveUserInfo",this.user).then( (resp)=>{
                            if (resp) {
                                this.$message.success("添加成功！");
                                this.clearAll('user');
                            }
                        }).catch((error)=>{
                            this.$message({
                                message: '添加数据失败，原因是'+error.toString(),
                                type: 'error'
                            })
                        })
                    } else {
                        this.$message({
                            message: '请输入所有字段',
                            type: 'error'
                        });
                        return false;
                    }
                })
                // this.$router.push({name:'404'});
            }
        }
    }
</script>

<style scoped>

</style>