<template>
    <div>
        <span>添加用户</span><br><br><br><br>
        <el-form ref="userData" :model="userData" label-width="100px">
            <el-form-item label="登录名">
                <el-input v-model="userData.loginName"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="userData.userName"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-select v-model="userData.status" clearable placeholder="请选择" style="width: 100%">
                    <el-option label="管理员" value="2"></el-option>
                    <el-option label="普通用户" value="1"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="clearAll">清空</el-button>
            <el-button type="primary">添 加</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userInsert",
        data() {
            return {
                userData:{loginName:"1212556",userName:"李二",status:"管理员"},
            }
        },
        methods:{
            clearAll(){
                this.userData = {};
            }
        }
    }
</script>

<style scoped>

</style>