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
                        v-model="content"
                        type="textarea"
                        :autosize="{ minRows: 10, maxRows: 10}"
                        placeholder="请输入内容"
                        :show-word-limit="true"
                >
                </el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item style="margin-right: 120px">
                <el-button type="primary" @click="saveNotice">添加</el-button>
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
                userInfo:JSON.parse(sessionStorage.getItem("userInfo")),
                title:"",
                content:""
            }
        },
        methods:{
            rebuild(){
                this.title="";
                this.content="";
            },
            saveNotice(){
                let nowDate = new Date();
                let date = {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate(),
                }
                let createDate = date.year + '-' + date.month + '-' + date.date;
                const config={
                    url:"/notice/saveNotice",
                    method:"post",
                    data:{
                        'userId':this.userInfo.id,
                        'content':this.content,
                        'title':this.title,
                        'createDate':createDate,
                    }
                }

                this.$axios(config).then((resp)=>{
                    if (resp.status===200){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.title="";
                        this.content="";
                        this.$router.push("/Home/NoticeQuery")
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