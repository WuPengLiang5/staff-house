<template>

    <div>
        <div>
        <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="220px" style="margin-top: 50px;">
            <el-form-item prop="title" label="公告名称" style="margin-right: 120px" >
                <el-input v-model="addForm.title"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item prop="content" label="公告内容" style="margin-right: 120px" >
                <el-input
                        v-model="addForm.content"
                        type="textarea"
                        :autosize="{ minRows: 10, maxRows: 10}"
                        placeholder="请输入内容"
                        :show-word-limit="true">
                </el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item style="margin-right: 120px">
                <el-button type="primary" @click="saveNotice('addForm')">添加</el-button>
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
                addForm:{
                    title:"",
                    content:"",
                },
                addRules:{
                   title:[{
                        required: true,
                        message: '标题不能为空',
                        trigger: 'blur'
                    }],
                    content:[{
                        required: true,
                        message: '内容不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods:{
            rebuild(){
                this.title="";
                this.content="";
            },
            saveNotice(addForm){
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
                        'content':this.addForm.content,
                        'title':this.addForm.title,
                        'createDate':createDate,
                    }
                }

                this.$refs[addForm].validate((valid) =>{
                    if(valid){
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
                    }else{
                        this.$message({
                            message: '公告标题或公告内容有错',
                            type: 'error'
                        });
                    }
                })

            },
            init(){
                this.addForm = {
                    title:"",
                    content:"",
                };
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