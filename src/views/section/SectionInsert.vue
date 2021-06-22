<template>

    <div>
        <div>
            <el-form  label-width="220px" style="margin-top: 50px;">
                <el-form-item label="部门名称" style="margin-right: 120px" >
                    <el-input v-model="department.name"></el-input>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item label="详细信息" style="margin-right: 120px" >
                    <el-input
                            v-model="department.remark"
                            type="textarea"
                            :autosize="{ minRows: 10, maxRows: 10}"
                            placeholder="请输入内容"
                            :show-word-limit="true">
                    </el-input>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item style="margin-right: 120px">
                    <el-button type="primary" @click="saveDepartment">添加</el-button>
                    <el-button type="primary" @click="rebuild">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DepartmentInsert",
        data(){
            return{
                department:{
                    name:'',
                    remark:'',
                    id:''
                }
            }
        },
        methods:{
            rebuild(){
                this.department.name = "";
                this.department.remark = "";
            },
            saveDepartment() {
                const config={
                    url:"/department/saveDepartment",
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
                            message: '添加成功',
                            type: 'success'
                        });
                        this.name="";
                        this.remark="";
                        this.$router.push("/Home/SectionQuery")
                    }else{
                        this.$message({
                            message: '添加失败',
                            type: 'error'
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #head{
        padding-left: 10px;
        margin-left:-20px;
        height: 40px;
        background-color: #82ecff;
        padding-top: 25px;
        width: 1400px;
        margin-top: -25px;
    }
</style>