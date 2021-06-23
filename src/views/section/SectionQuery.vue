<template>
    <div>

        <div style="height: 55px">
            <div style="float: left;color: #336dff;margin-top: 15px">部门名称：</div>
            <el-input style="float: left;width: 240px;margin-bottom: 10px;margin-top: 7px" v-model="search" placeholder="请输入部门名称"></el-input>
            <el-button style="float:left;margin: 7px 0px 5px 5px" type="primary" @click="searchByName">搜索</el-button>
            <el-button style="float:left;margin: 7px 0px 5px 5px" type="primary" @click="clearInput">清空</el-button>
            <el-button style="float:left;margin: 7px 0px 5px 10px" type="danger" v-if="isManage" :disabled="isDeleted" @click="deleteAllSelect">删除</el-button>
        </div>
        <el-table
               @selection-change="selectChange"
                :data="tableData"
                border
                style="width: 100%"
                margin="auto"
                ref="multipleTable">
            <el-table-column
                    type="selection"
                    align="center"
                    v-if="checkboxV">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="部门名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="详细描述"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    v-if="isManage">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" v-on:click="deleteId(scope.row.id)" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange()"
                    :current-page.sync="currentPage"
                    :page-size="4"
                    layout="prev, pager, next, jumper"
                    :total="allSection.length">
            </el-pagination>
        </div>
        <div v-show="overView" class="over" @click="closepopup"></div>
        <div v-show="overView2" class="over" @click="closepopup"></div>
        <div class="editWindow" v-show="editView">
            <el-form  label-width="220px" style="margin-top: 50px;">
                <el-form-item label="部门名称" style="margin-right: 180px">
                    <el-input value="技术部" v-model="department.name"></el-input>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item label="详细信息" style="margin-right: 180px">
                    <el-input
                            value="技术部"
                            type="textarea"
                            :autosize="{ minRows: 10, maxRows: 10}"
                            placeholder="请输入内容"
                            v-model="department.remark">
                    </el-input>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item style="margin-right: 180px">
                    <el-button type="primary" @click="updateDepartment">修改</el-button>
                    <el-button type="primary" @click="close">取消</el-button>
                </el-form-item>
            </el-form>
            <div id="editor"></div>
        </div>
    </div>

</template>

<script>

    export default {
        name: "DepartmentQuery",
        data() {
            return {
                allSection:[],
                allPage:1,
                checkboxV:true,
                currentPage: 1,
                deleteArr:[],
                department:{
                    name:'',
                    remark:'',
                    id:''
                },
                editView:false,
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                isDeleted: true,
                isManage: false,
                labelPosition: 'right',
                overView:false,
                overView2:false,
                popup:false,
                search:'',
                textarea: '',
                tableData:[],
            }
        },
        activated() {
            this.listSection();
            this.judgeStatus();
        },
        methods: {
            onePage(){
                this.tableData=[];
                this.allPage=Math.ceil(this.allSection.length/4);
                for(let i=0; i<4; i++){
                    if(this.allSection[(this.currentPage-1)*4+i]==null){
                        break;
                    }
                    this.tableData.push(this.allSection[(this.currentPage-1)*4+i]);
                }
            },
            clearInput(){
                this.search = "";
            },
            close(){
                this.overView2 = false;
                this.editView = false;
            },
            //关闭活动规则页面
            closepopup() {
                this.popup = false;
                this.overView = false;
            },
            deleteAllSelect(){
                this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((resp) => {
                    console.log(resp.status)
                    let i;
                    for (i = 0; i < this.deleteArry.length; i++) {
                        this.deleteAllId(this.deleteArry[i].id)
                    }
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteId(id) {
                console.log(id)
                this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const config={
                        url:"/department/deleteDepartment",
                        method:"post",
                        params:{
                            'departmentId':id,
                        }
                    }
                    this.$axios(config).then((resp)=>{
                        console.log(resp.status)
                        if (resp.status===200){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.listSection()
                        }else{
                            this.$message({
                                message: '删除失败',
                                type: 'error'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteAllId(id) {
                console.log(id)
                const config={
                    url:"/department/deleteDepartment",
                    method:"post",
                    params:{
                        'departmentId':id,
                    }
                }
                this.$axios(config).then((resp)=>{
                    console.log(resp.status)
                    if (resp.status===200){
                        this.listSection()
                    }
                })
            },
            edit(department){
                this.department.id=department.id
                this.department.name=department.name
                this.department.remark=department.remark
                this.editView=true
                this.overView2=true;
            },
            handleClick(row) {
                console.log(row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange() {
                console.log(this.currentPage);
                this.onePage()
            },
            judgeStatus(){
                this.isManage = JSON.parse(sessionStorage.getItem('userInfo')).status ===1;
                this.checkboxV = this.isManage;
                console.log(this.isManage)
            },
            listSection(){
                this.$axios.post("/department/listDepartment").then((resp)=>{
                    this.allSection = resp.data
                    this.onePage();
                })
            },
            selectChange(selection){     // 参数selection返回所选行的各个分量
                if(selection.length>0){
                    // this.isDisabled = false;

                    this.deleteArry = selection;
                    this.isDeleted = false;
                }else{
                    // this.isDisabled = true;
                    this.isDeleted = true;
                }
            },
            searchByName(){
                this.$axios.post("/department/listDepartmentByName?name=" + this.search).then((resp)=>{
                    this.allSection = resp.data
                    this.onePage();
                })
            },
            //打开活动规则页面
            showpopup(){
                this.popup = true;
                this.overView = true;
            },
            success(){
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.overView2 = false;
                this.editView = false;
            },
            updateDepartment(){
                const config={
                    url:"/department/updateDepartment",
                    method:"post",
                    data:{
                        'name':this.department.name,
                        'remark':this.department.remark,
                        'id':this.department.id,
                    }
                }
                this.$axios(config).then((resp)=>{
                    console.log(resp.status)
                    if (resp.status===200){
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '编辑失败',
                            type: 'error'
                        });
                    }
                })
            },
            init(){
                this.search = "";
                this.listSection();
            }
        },
        watch: {  //监听
            $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
                this.init()
            }
        }
    }
</script>

<style scoped>
    .editWindow{
        position: fixed;
        font-size: 24px;
        height: 500px;
        width: 50%;
        background-color: #ffffff;
        border-radius: 10px;
        top: 40%;
        transform: translate(30%, -30%);
        z-index: 1000;
    }
    .over {
        position: fixed;
        width: 100%;
        height: 100%;
        opacity: 0.7;
        top: 0;
        left: 0;
        z-index: 999;
        background-color: #111111;
    }
</style>