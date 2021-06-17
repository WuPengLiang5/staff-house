<template>
    <div>
        <span>用户查询</span>
        <div style="margin-top:50px;">
            <el-input v-model="studentName" placeholder="请输入用户名" style="width:80%" clearable></el-input>
            <el-button type="primary" style="margin-left: 10px;" @click="selectUser">搜索</el-button>
        </div>
        <el-table max-height="600" :data="searchResult"
                  @selection-change="handleSelectionChange">
            <el-table-column
                    prop="loginName"
                    label="登录名"
                    weight="3">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="用户名"
                    weight="3">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="权限"
                    weight="3">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="操作"
                    width="150">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" weight="3">查看</el-button>
                    <el-button type="text" size="small" weight="3">编辑</el-button>
                    <el-button type="text" size="small" weight="3">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        name: "userQuery",
        data(){
            return{
                userData:[{loginName:"1212556",userName:"李二",status:"管理员",}],
                searchResult:[],
                studentName:"",
                multipleSelection:[],
            }
        },
        methods:{
            selectUser(){
                this.searchResult = this.userData;
            },
        }
    }
</script>

<style scoped>

</style>