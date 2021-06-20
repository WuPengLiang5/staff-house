<template>
    <div>

        <div style="height: 55px">
            <div style="float: left;color: #336dff;margin-top: 15px">公告名称：</div>
            <el-input style="float: left;width: 240px;margin-bottom: 10px;margin-top: 7px" v-model="input" placeholder="请输入公告名称"></el-input>
            <div style="float: left;color: #336dff;padding-left: 5px;margin-top: 14px">公告内容 ：</div>
            <el-input style="float: left;width: 240px;margin-bottom: 10px;margin-top: 7px" v-model="input2" placeholder="请输入公告内容"></el-input>
            <el-button style="float:left;margin: 7px 0px 5px 10px" type="primary">搜索</el-button>
            <el-button style="float:left;margin: 7px 0px 5px 5px" type="primary">清空</el-button>
        </div>
    <el-table
            :data="tableData"
            border
            style="width: 100%"
            margin="auto"
    >

    <el-table-column
                fixed
                width="60"
                align="center"
    >
            <input V-if="" type="checkbox">
        </el-table-column>
        <el-table-column
                fixed
                prop="title"
                label="公告名称"
                width="150"
                align="center"
        >
        </el-table-column>
        <el-table-column
                prop="content"
                label="公告内容"
                width="300"
                align="center"
        >

        </el-table-column>
        <el-table-column
                prop="date"
                label="创建时间"
                width="150"
                align="center"
        >

        </el-table-column>
        <el-table-column
                prop="name"
                label="公告人"
                width="150"
                align="center"
        >
        </el-table-column>
        <el-table-column
                    fixed="right"
                    label="操作"
                    width="150"
                    align="center"
        >
                <el-button  type="text" size="small" v-on:click="open" >删除</el-button>
                <el-button type="text" size="small" @click="edit">编辑</el-button>
        </el-table-column>
        <el-table-column
                fixed="right"
                label="预览"
                width="100"
                align="center"
        >
                <a class="el-icon-view"  @click="showpopup()" style="cursor: pointer"></a>
        </el-table-column>
    </el-table>
    <el-pagination
            background
            layout="prev, pager, next"
            :total="1">
    </el-pagination>
        <div v-show="popup" >
            <div class="login">
                <h1>Duang</h1>
                <p>今天吃肉喝水，干干干</p>
                <span style="float: right;padding-right: 30px">日期：2020.7.8</span>
                <p style="margin-left: 560px">公告人：无哦</p>
            </div>
        </div>
        <div v-show="overView" class="over" @click="closepopup"></div>
        <div v-show="overView2" class="over" @click="closepopup"></div>
        <div class="editWindow" v-show="editView">
            <el-form  label-width="220px" style="margin-top: 50px;">
                <el-form-item label="公告名称" style="margin-right: 180px">
                    <el-input
                    v-model="addTitle"></el-input>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item label="公告内容" style="margin-right: 180px">
                    <el-input

                            type="textarea"
                            :autosize="{ minRows: 10, maxRows: 10}"
                            placeholder="请输入内容"
                            :show-word-limit="true"
                            v-model="textarea"
                    >
                    </el-input>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item style="margin-right: 180px">
                    <el-button type="primary" @click="success">确定</el-button>
                    <el-button type="primary" @click="close">取消</el-button>
                </el-form-item>
            </el-form>
            <div id="editor"></div>
        </div>
        </div>

</template>

<script>

    export default {
        name: "NoticeQuery",
        data() {
            return {
                input:'',
                input2:'',
                addTitle:'居然展示课',
                textarea: '今天上午，以及京津冀，死哦的hi奥vhiadiwydi',
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                overView:0,
                overView2:0,
                editView:0,
                popup: false,
                tableData: [{
                    title:"Duang",
                    date: '2016-05-02',
                    name: '王小虎',
                    content:"今天吃肉喝水，干干干"

                }, {
                    title:'xiuxiu',
                    date: '2016-05-04',
                    name: '王小虎',
                    content:"My me mini mystery main most money",
                }]
            }
        },
        methods: {

            close(){
                this.overView2 = 0;
                this.editView = 0;
            },
            success(){
                this.$message({
                    message: '添加成功',
                    type: 'success'
            });
                this.overView2 = 0;
                this.editView = 0;
            },
            //打开活动规则页面
            showpopup(){
                this.popup = true;
                this.overView = 1;
            },
            //关闭活动规则页面
            closepopup() {
                this.popup = false;
                this.overView = 0;
            },
            handleClick(row) {
                console.log(row);
            },
            edit(){
                this.addTitle='居然展示课';
                this.textarea='今天上午，以及京津冀，死哦的hi奥vhiadiwydi';
                this.editView=1;
                this.overView2=1;
            },
            open() {
                this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
    }
</script>

<style scoped>

    .login {
        position: fixed;
        font-size: 24px;
        height: 360px;
        width: 50%;
        background-color: #ffffff;
        border-radius: 10px;
        margin-left: 40%;
        top: 50%;
        transform: translate(-50%, -50%);
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
</style>