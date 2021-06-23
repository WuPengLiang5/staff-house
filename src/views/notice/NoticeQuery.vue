<template>
    <div>
        <div style="height: 55px">
            <div style="float: left;color: #336dff;margin-top: 15px">公告名称：</div>
            <el-input style="float: left;width: 240px;margin-bottom: 10px;margin-top: 7px" v-model="noticeTitle" placeholder="请输入公告名称"></el-input>
            <div style="float: left;color: #336dff;padding-left: 5px;margin-top: 14px">公告内容 ：</div>
            <el-input style="float: left;width: 240px;margin-bottom: 10px;margin-top: 7px" v-model="noticeContent" placeholder="请输入公告内容"></el-input>
            <el-button style="float:left;margin: 7px 0px 5px 10px" type="primary" @click="search">搜索</el-button>
            <el-button style="float:left;margin: 7px 0px 5px 5px" type="primary" @click="clearInput">清空</el-button>
            <el-button style="float:left;margin: 7px 0px 5px 5px" type="danger" :disabled="isDisabled" @click="deleteNoticeByQuery" v-if="isManage">删除</el-button>
        </div>
        <el-table
            :data="tableData"
            ref="multipleTable "
            border
            style="width: 100%"
            margin="auto"
            @selection-change="selectionChange">
            <el-table-column
                    type="selection"
                    fixed
                    align="center"
                    v-if="checkboxV">
            </el-table-column>

            <el-table-column
                fixed
                prop="title"
                label="公告名称"
                align="center">
        </el-table-column>
        <el-table-column
                label="公告内容"
                align="center">
            <template slot-scope="scope">
                <div v-if="scope.row.content.length>=8">
                    {{scope.row.content.slice(0,8)}}.....
                </div>
                <div v-else>
                    {{scope.row.content}}
                </div>
            </template>
        </el-table-column>
        <el-table-column
                prop="createDate"
                label="创建时间"
                align="center">
        </el-table-column>
        <el-table-column
                prop="userName"
                label="公告人"
                align="center">
        </el-table-column>
        <el-table-column
                    label="操作"
                    align="center"
                    v-if="isManage">
            <template slot-scope="scope">
                <el-button  type="text" size="small" v-on:click="deleteNotice(scope.row.id)" >删除</el-button>
                <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            </template>
        </el-table-column>
        <el-table-column
                label="预览"
                align="center">
            <template slot-scope="scope">
                <a class="el-icon-view"  @click="viewNotice(scope.row)" style="cursor: pointer"></a>
            </template>
        </el-table-column>
    </el-table>
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange()"
                    :current-page.sync="currentPage"
                    :page-size="6"
                    layout="prev, pager, next, jumper"
                    :total="allNotice.length">
            </el-pagination>
        </div>
        <div v-show="view" >
            <div class="view">
                <div id="head"><div style="float: left">公告预览</div></div>
                <h1>{{notice.title}}</h1>
                <div><p style="text-align:left;margin-left: 20px">{{notice.content}}</p></div>
                <p style="text-align:right;margin-right: 10px">日期：{{notice.creatDate}}</p>
                <p style="text-align:right;margin-right: 10px">公告人：{{notice.userName}}</p>
            </div>
        </div>
        <div v-show="overView" class="over" @click="closepopup"></div>
        <div v-show="overView2" class="over"></div>
        <div class="editWindow" v-show="editView">
            <el-form  label-width="220px" style="margin-top: 50px;">
                <el-form-item label="公告名称" style="margin-right: 180px">
                    <el-input
                    v-model="notice.title"></el-input>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item label="公告内容" style="margin-right: 180px">
                    <el-input

                            type="textarea"
                            :autosize="{ minRows: 10, maxRows: 10}"
                            placeholder="请输入内容"
                            :show-word-limit="true"
                            v-model="notice.content">
                    </el-input>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item style="margin-right: 180px">
                    <el-button type="primary" @click="updateNotice">确定</el-button>
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
                deleteArry:[],
                isDisabled:true,
                currentPage:1,
                pageCount:1,
                notice:{
                    userName:'',
                    title:"",
                    content:'',
                    id:'',
                    creatDate:'',
                },
                noticeTitle:'',
                noticeContent:'',
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                overView:false,
                overView2:false,
                editView:false,
                view: false,
                tableData:[],
                allNotice:[],
                isManage:false,
                checkboxV:true,
            }
        },
        methods: {
            handleCurrentChange(){
                this.onePageNotice();
            },
            //checkbox绑定值获取
            selectionChange(selection){     // 参数selection返回所选行的各个分量
                if(selection.length>0){
                    this.isDisabled = false;
                    this.deleteArry = selection;
                }else{
                    this.isDisabled = true;                }
            },
            //根据页号获取该页数据
            onePageNotice(){
                this.tableData=[];
                this.pageCount = Math.ceil(this.allNotice.length/6)
                if(this.currentPage>this.pageCount)
                    this.currentPage--;
                for(let i=0;i<6;i++){
                    if(this.allNotice[(this.currentPage-1)*6+i]==
                            null){
                        break;
                    }
                    this.tableData.push(this.allNotice[(this.currentPage-1)*6+i])
                }

                this.pageCount = Math.ceil(this.allNotice.size/6)
            },
            //批量删除
            deleteNoticeByQuery(){
                const idArr = [];
                for(let i = 0;i < this.deleteArry.length;i++){
                    idArr.push(this.deleteArry[i].id)
                }

                const config={
                    url:"/notice/deleteNoticeByQuery",
                    method:"post",
                    data: {
                        "ids":idArr
                    }
                }

                this.$confirm('此操作将永久删除这些公告, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios(config).then((resp) => {
                        if (resp.status === 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.listNotice()
                        } else {
                            this.$message({
                                message: '删除失败',
                                type: 'error'
                            });
                        }
                    })
                });
            },
            //查询
            search(){
                const config={
                    url:"/notice/searchNotice",
                    method:"post",
                    data:{
                        "title":this.noticeTitle,
                        "content":this.noticeContent
                    }
                }
                this.$axios(config).then((resp)=>{

                        this.allNotice=resp.data;
                        this.currentPage = 1;
                        this.onePageNotice();
                    })
            },
            //清除查询框
            clearInput(){
                this.noticeTitle=''
                this.noticeContent=''
                this.currentPage = 1;
                this.search()
            },
            //获取所有公告
            listNotice(){
                this.$axios.post("/notice/listNotice").then((resp)=>{
                    this.allNotice = resp.data
                    this.onePageNotice();
                })
            },
            //关闭公告编辑窗口
            close(){
                this.overView2 = false;
                this.editView = false;
            },
            //更新公告
            updateNotice(){
                const config={
                    url:"/notice/updateNotice",
                    method:"post",
                    data:{
                        'title':this.notice.title,
                        'content':this.notice.content,
                        'id':this.notice.id,
                    }
                }
                this.$axios(config).then((resp)=>{
                    console.log(resp.status)
                    if (resp.status===200){
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.listNotice()
                    }else{
                        this.$message({
                            message: '编辑失败',
                            type: 'error'
                        });
                    }
                })
                this.overView2 = false;
                this.editView = false;
            },
            //预览公告
            viewNotice(row){
                this.notice.title = row.title;
                this.notice.content = row.content;
                this.notice.creatDate = row.createDate;
                this.notice.userName = row.userName;
                this.view = true;
                this.overView = true;
            },
            //关闭预览
            closepopup() {
                this.view = false;
                this.overView = false;
            },
            handleClick(row) {
                console.log(row);
            },
            //打开编辑窗口
            edit(editNotice){
                this.notice.id = editNotice.id;
                this.notice.title = editNotice.title;
                this.notice.content = editNotice.content;
                this.editView=true;
                this.overView2=true;
            },
            //删除公告
            deleteNotice(id){
                const config={
                    url:"/notice/deleteNotice",
                    method:"post",
                    params:{
                        'id':id,
                    }
                }
                this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios(config).then((resp)=>{
                        if (resp.status===200){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.listNotice()
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
            judgeStatus(){
                this.isManage = JSON.parse(sessionStorage.getItem('userInfo')).status ===1;
                this.checkboxV = this.isManage;
            },
        },
        //添加页面添加成功后，跳转刷新
        activated(){
            //重新加载数据
            this.listNotice();
            this.judgeStatus();
            this.clearInput()
        },
    }
</script>

<style scoped>

    .view {
        position: fixed;
        height: 360px;
        width: 670px;
        background-color: #ffffff;
        border-radius: 10px;
        margin-left: 40%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
    }
    .view #head{
        width: 100%;
        height: 5%;
        font-size: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-image: linear-gradient(to bottom,white,cornflowerblue);
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