<template>
    <div>
        <span>用户查询</span>
        <div style="margin-top:50px;">
            <el-input v-model="userName" placeholder="请输入用户名" style="width:60%" clearable></el-input>
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
        <el-table max-height="800"
                  ref="multipleTable"
                  :data="userData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
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
                    align="center"
                    :formatter="statusFormat">
            </el-table-column>
            <el-table-column
                    prop="operation"
                    label="操作"
                    width="150"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="checkInfo(scope.row)" type="text" size="small" weight="3">查看</el-button>
                    <el-button @click="updateUserInfo(scope.row)" type="text" size="small" weight="3" v-if="isManage">编辑</el-button>
                    <el-button @click="deleteUser(scope.row)" type="text" size="small" weight="3" v-if="isManage"
                               :disabled="scope.row.id === userInfo.id">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[1,5,10]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="userData.length">
        </el-pagination>
        <el-dialog :title="dialogTitle[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form ref="user" :model="user" label-width="100px" >
                <el-form-item label="登录名" prop="loginName">
                    <el-input v-model="user.loginName" :readonly="isDisabled"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="user.userName" :readonly="isDisabled"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="status">
                    <el-select v-model="user.status" :disabled="isDisabled" placeholder="请选择" clearable style="width: 100%">
                        <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="添加时间" v-show="!isUpdate">
                    <el-input v-model="user.createDate" :readonly="isDisabled"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-show="isUpdate" @click="updateUserInfoImpl">确 定</el-button>
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
                userName:"",
                userInfo:"",

                //权限
                isManage:false,
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
                    value: 1,
                    label: '管理员'
                },{
                    value: 2,
                    label: '普通用户'
                }],
                options2: [{
                    value: 1,
                    label: '管理员'
                },{
                    value: 2,
                    label: '普通用户'
                }],
                rangeValue:"",
                //分页
                pageSize:5,
                currentPage:1,
            }
        },
        methods:{
            //表格中权限显示
            statusFormat(row) {
                if (row.status === 1) {
                    return '管理员'
                }else  {
                    return '普通用户'
                }
            },
            //每页条数改变时触发 选择一页显示多少行
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
            },
            //当前页改变时触发 跳转其他页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
            },
            //搜索
            selectUser(){
                if(this.userName === ""){
                    if(this.rangeValue ==="all" ||this.rangeValue ===""){
                        this.getUserList();
                    }else if(this.rangeValue ===1){
                        this.$axios.post("user/listUserInfoByStatus?status="+1).then((resp)=>{
                            this.userData = resp.data;
                        })
                    }else {
                        this.$axios.post("user/listUserInfoByStatus?status="+2).then((resp)=>{
                            this.userData = resp.data;
                        })
                    }
                }else {
                    this.$axios.post("user/getUserInfoByUserName?userName="+this.userName).then((resp)=>{
                        if(resp.data!==null){
                            this.userData=resp.data;
                        }
                    })
                }
            },
            //查看
            checkInfo(row){
                this.dialogFormVisible = true;
                this.dialogStatus = "checkInfo";
                this.isUpdate = false;
                this.isDisabled = true;
                this.user = {};
                this.user = row;
            },
            //删除
            deleteUser(row){
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.get("/user/deleteUserById?id="+row.id).then((resp)=> {
                        if (resp) {
                            this.getUserList();
                            this.$message.success("删除成功！");
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //修改
            updateUserInfo(row){
                this.dialogFormVisible = true;
                this.dialogStatus = "updateInfo";
                this.user = {};
                this.user = JSON.parse(JSON.stringify(row));
                this.isUpdate = true;
                this.isDisabled = false;
            },
            //修改实现
            updateUserInfoImpl(){
                this.$axios.post("/user/updateUserInfoById",this.user).then((resp)=>{
                    this.dialogFormVisible = false;
                    if (resp) {
                        this.$message.success("修改成功!");
                        this.selectUser();
                    }
                }).catch((error)=> {
                    this.$message({
                        type: 'error',
                        message: '数据更新失败，原因是'+error.toString()
                    })
                })
            },
            //得到用户列表
            getUserList(){
                this.$axios.post("/user/listUserInfo").then((resp)=> {
                    this.userData = resp.data;
                }).catch(error =>{
                    this.$router.push({name: '404'});
                });
            },
            judgeStatus(){
                this.isManage = JSON.parse(sessionStorage.getItem('userInfo')).status ===1;
                this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            },
            init(){
                this.userName="";
                this.rangeValue="";
            }
        },
        mounted() {
            this.getUserList();
            this.judgeStatus()
        },
        watch: {  //监听
            $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
                this.init()
            }
        },
    }
</script>

<style scoped>

</style>