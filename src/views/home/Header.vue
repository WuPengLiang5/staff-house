<template>
    <div class="header">
        <!-- 是否展开侧边栏 -->
        <div class="header-title" @click="foldOrOpen">
            <a class="el-icon-s-fold" v-if="foldAside" title="折叠侧边栏" />
            <a class="el-icon-s-unfold" v-else title="展开侧边栏" />
        </div>
        <!-- 设置、文档、用户设置等 -->
        <div class="header-menu">
            <el-menu mode="horizontal" class="header-menu-submenu">
                <!-- 设置 -->
                <el-menu-item title="设置" index="1"  @click="faceRegister">
                    <i class="el-icon-info"></i>人脸注册
                </el-menu-item>
                <!-- 帮助文档 -->
                <el-menu-item title="帮助" index="2" @click="showPasswordBox">
                    <template slot="title">
                        <i class="el-icon-setting"></i>修改密码
                    </template>
                </el-menu-item>
                <!-- 用户设置 -->
                <el-menu-item title="用户设置" index="3">
                    <template slot="title">
                        <span class="header-span">
                            <img src="../../assets/login_backPicture.jpg" :alt="userInfo.userName"> {{ userInfo.userName }}
                        </span>
                    </template>
                </el-menu-item>
                <el-menu-item index="4" @click="logout">
                    <i class="el-icon-close"></i>退出登录
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 密码修改框 -->
        <UpdatePassword v-if="UpdatePasswordVisible" ref="updatePassword"></UpdatePassword>
    </div>
</template>

<script>
    import UpdatePassword from '@/views/home/UpdatePassword.vue'
    export default {
        name: 'Header',
        data() {
            return {
                // 是否展开侧边栏
                foldAside: true,
                // 是否展开密码框
                UpdatePasswordVisible: false,

                userInfo:{},
            }
        },
        components: {
            // 引入密码框组件
            UpdatePassword
        },
        methods: {
            // 展开密码修改框
            showPasswordBox() {
                this.UpdatePasswordVisible = true;
                // this.$nextTick 表示数据渲染后，执行密码框初始化
                this.$nextTick(() => {
                    this.$refs.updatePassword.init()
                })
            },
            // 展开、折叠侧边栏
            foldOrOpen() {
                this.foldAside = !this.foldAside;
                // this.$emit 用于触发父组件的方法，并传递参数值
                this.$emit("foldOrOpenAside", this.foldAside)
            },

            faceRegister() {
                this.$router.push({name:"FaceRegister"})
            },
            // 退出登录，回到登录界面
            logout() {
                // TODO：退出逻辑待完成
              sessionStorage.clear();
              this.$router.push({
                name: "Login"
              })
            },
        },
        mounted() {
            this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        },
    }
</script>

<style>
    .header {
        padding: 0 10px;
        display: flex;
        height: 50px;
        line-height: 50px;
    }

    .header-title {
        height: 50px;
        width: 50px;
        float: left;
        font-size: 50px;
        cursor: pointer;
    }

    .header-menu {
        height: 50px;
        width: 100%;
        flex: 1;
        line-height: 50px;
        font-size: 30px;
    }
    .header-menu-submenu {
        float: right;
    }
    .header-submenu-a {
        text-decoration: none;
        color: #4CC4B8;
        font-weight: bold;
        font-size: 16px;
    }
    .header-submenu-a:hover {
        background-color: #2C3E50;
    }
    .el-menu--horizontal>.el-menu-item,
    .el-menu--horizontal>.el-submenu .el-submenu__title {
        height: 50px !important;
        line-height: 50px !important;
    }
    .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
        min-width: auto !important;
    }
    .header-span img {
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin: 5px 10px 10px 10px;
    }
    .header-span {
        font-size: 20px;
    }
</style>