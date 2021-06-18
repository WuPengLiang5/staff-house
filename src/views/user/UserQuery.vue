<template>
    <div>
        <span>用户查询</span>
        <div style="margin-top:50px;">
            <el-input v-model="studentName" placeholder="请输入用户名" style="width:60%" clearable></el-input>
            <el-select v-model="rangeValue" clearable placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 10px;" @click="selectUser">搜索</el-button>
        </div>
        <el-table max-height="600" :data="userData">
            <el-table-column
                    prop="loginName"
                    label="登录名"
                    weight="3"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="用户名"
                    weight="3"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="权限"
                    weight="3"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="操作"
                    width="150"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="checkInfo(scope.row)" type="text" size="small" weight="3">查看</el-button>
                    <el-button @click="updateUserInfo(scope.row)" type="text" size="small" weight="3"  v-show="isManage">编辑</el-button>
                    <el-button @click="deleteUser(scope.row)" type="text" size="small" weight="3"  v-show="isManage">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="dialogTitle[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form ref="userData" :model="userData" :disabled="isDisabled" label-width="100px">
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
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-show="isUpdate">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "userQuery",
        data(){
            return{
                userData:[],
                studentName:"",
                isManage:true,
                dialogFormVisible:false,
                user:{},
                dialogTitle: {
                    checkInfo: "查看信息",
                    updateInfo: "编辑信息"
                },
                isUpdate:false,
                //是否禁用表单
                isDisabled:true,
                dialogStatus:"",
                options: [{
                    value: 'all',
                    label: '全部'
                },{
                    value: '1',
                    label: '普通用户'
                },{
                    value: '2',
                    label: '管理员'
                }],
                rangeValue:"",
            }
        },
        methods:{
            selectUser(){
               this.userData=[{loginName:"888888888",userName:"李二",status:"普通用户"}];
            },
            checkInfo(row){
                this.dialogFormVisible = true;
                this.dialogStatu = "checkInfo";
                this.user.id = row;
            },
            deleteUser(row){
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                this.user.id = row;
            },
            updateUserInfo(row){
                this.dialogFormVisible = true;
                this.dialogStatu = "updateInfo";
                this.user.id = row;
                this.isUpdate = true;
                this.isDisabled = false;
            },
            getUserList(){
                this.$axios.get("/user/listUserInfo").then((resp)=> {
                    this.userData = resp.data;
                }).catch(error =>{
                    this.$message({
                        type: 'error',
                        message: "查询失败，原因是"+error.toString()
                    });
                });
            }
        },
        mounted() {
            this.getUserList();
        },
    }
</script>

<style scoped>

</style>