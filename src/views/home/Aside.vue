<template>
    <div>
        <!-- 系统 Logo -->
        <el-aside class="header-logo" :width="asideWidth">
            <div @click="$router.push({ name: 'Home' })">
                <a v-if="foldAside">
                    <span style="color: #ee8145">CSI员工之家</span></a>
                <a v-else>后台</a>
            </div>
        </el-aside>
        <el-aside class="aside" :width="asideWidth" :class='"icon-size-" + iconSize'>
            <el-scrollbar style="height: 100%; width: 100%;">
                <!--
                        default-active 表示当前选中的菜单，默认为 home。
                        collapse 表示是否折叠菜单，仅 mode 为 vertical（默认）可用。
                        collapseTransition 表示是否开启折叠动画，默认为 true。
                        background-color 表示背景颜色。
                        text-color 表示字体颜色。
                    -->
                <el-menu :default-active="$route.path"
                         :collapse="!foldAside"
                         :collapseTransition="false"
                         background-color="#263238"
                         text-color="#8a979e"
                          router>
                    <el-submenu index="userManage">
                        <template slot="title">
                            <i class="el-icon-star-off"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="/Home/UserQuery">
                            <span slot="title">用户查询</span>
                        </el-menu-item>
                        <el-menu-item  v-show="isManage" index="/Home/UserInsert">
                            <span slot="title">添加用户</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="sectionManage">
                        <template slot="title">
                            <i class="el-icon-star-off"></i>
                            <span>部门管理</span>
                        </template>
                        <el-menu-item index="/Home/SectionQuery">
                            <span slot="title">部门查询</span>
                        </el-menu-item>
                        <el-menu-item v-show="isManage" index="/Home/SectionInsert">
                            <span slot="title" >添加部门</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="positionManage">
                        <template slot="title">
                            <i class="el-icon-star-off"></i>
                            <span>职位管理</span>
                        </template>
                        <el-menu-item index="/Home/PositionQuery">
                            <span slot="title">职位查询</span>
                        </el-menu-item>
                        <el-menu-item v-show="isManage" index="/Home/PositionInsert">
                            <span slot="title" >添加职位</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="employeeManage">
                        <template slot="title">
                            <i class="el-icon-star-off"></i>
                            <span>员工管理</span>
                        </template>
                        <el-menu-item index="/Home/EmployeeQuery">
                            <span slot="title">员工查询</span>
                        </el-menu-item>
                        <el-menu-item v-show="isManage" index="/Home/EmployeeInsert">
                            <span slot="title" >添加员工</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="noticeManage">
                        <template slot="title">
                            <i class="el-icon-star-off"></i>
                            <span>公告管理</span>
                        </template>
                        <el-menu-item index="/Home/NoticeQuery">
                            <span slot="title">公告查询</span>
                        </el-menu-item>
                        <el-menu-item v-if="isManage" index="/Home/NoticeInsert">
                            <span slot="title" >添加公告</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="downloadCenter">
                        <template slot="title">
                            <i class="el-icon-star-off"></i>
                            <span>下载中心</span>
                        </template>
                        <el-menu-item v-show="isManage" index="/Home/UploadFile">
                            <span slot="title" >上传文档</span>
                        </el-menu-item>
                        <el-menu-item index="/Home/FileQuery" >
                            <span slot="title">文档查询</span>
                        </el-menu-item>
                    </el-submenu>

                </el-menu>
            </el-scrollbar>
        </el-aside>
    </div>
</template>

<script>
    export default {
        name: 'Aside',
        props: ['foldAside'],
        data() {
            return {
                // 保存当前选中的菜单
                menuActiveName: 'home',
                // 保存当前侧边栏的宽度
                asideWidth: '200px',
                // 用于拼接当前图标的 class 样式
                iconSize: 'true',
                //管理员为true，普通用户为false
                isManage:'',
            }
        },
        methods:{
            judgeStatus(){
                this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                this.isManage = this.userInfo.status ===1;
            }
        },
        watch: {
            // 监视是否折叠侧边栏，折叠则宽度为 64px。
            foldAside(val) {
                this.asideWidth = val ? '200px' : '64px';
                this.iconSize = val
            }
        },
        mounted() {
            this.judgeStatus()
        }
    }
</script>

<style>
    .aside {
        margin-bottom: 0;
        height: 100%;
        max-height: calc(100% - 50px);
        width: 100%;
        max-width: 200px;
        background-color: #263238;
        text-align: left;
        right: 0;
    }

    .header-logo {
        background-color: #6495ed;
        text-align: center;
        height: 50px;
        line-height: 50px;
        width: 200px;
        font-size: 24px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 0;
        cursor: pointer;
    }
    .el-submenu .el-menu-item {
        max-width: 200px !important;
    }
    .el-scrollbar__wrap {
        overflow-x: hidden !important;
    }
    .icon-size-false i {
        font-size: 30px !important;
    }
    .icon-size-true i {
        font-size: 18px !important;
    }
    .el-select-dropdown .el-scrollbar .el-scrollbar__wrap {
        overflow: scroll!important;
    }
</style>