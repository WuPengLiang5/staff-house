<template>

    <div>
        <div>
        <el-form  label-width="220px" style="margin-top: 50px;">
            <el-form-item label="公告名称" style="margin-right: 120px" >
                <el-input v-model="title"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="公告内容" style="margin-right: 120px" >
                <el-input
                        v-model="text"
                        type="textarea"
                        :autosize="{ minRows: 10, maxRows: 10}"
                        placeholder="请输入内容"
                        show-word-limit="true"
                >
                </el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item style="margin-right: 120px">
                <el-button type="primary" @click="add">添加</el-button>
                <el-button type="primary" @click="rebuild">重置</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NoticeInsert",
        data(){
            return{
                title:"",
                text:""
            }
        },
        methods:{
            rebuild(){
                this.title="";
                this.text="";
            },
            add(){
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.title="";
                this.text="";
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