<template>
  <div class="login-wrapper">
    <div class="login-content" style="height: 680px; width: 750px">
      <div class="login-main">
        <h2 class="login-main-title">
          <span style="color: cornflowerblue">CSI员工</span>
          <span style="color: #ee8145">之家</span></h2>
        <div>
          <!--开启摄像头-->
          <el-button size="mini" type="primary" @click="callCamera">开启摄像头</el-button>
          <!--确认-->
          <el-button size="mini" type="primary" @click="photograph">确认</el-button>
          <!--返回-->
          <el-button size="mini" type="primary" @click="closeCamera">返回</el-button>


          <!--图片展示-->
          <video ref="video" width="640" height="480" autoplay></video>
          <!--canvas截取流-->
          <canvas ref="canvas" v-show=false style="z-index: -1" width="320" height="240"></canvas>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FaceLogin",
  data() {
    return {
      user:{
        userId:"",
        userName:"",
        status:""
      }
    }
  },
  methods: {

    open() {
      this.$notify.error({
        title: '错误',
        message: '人脸登录失败'
      });
    },

    // 调用摄像头
    callCamera () {
      // H5调用电脑摄像头API
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(success => {
        // 摄像头开启成功
        this.$refs['video'].srcObject = success
        // 实时拍照效果
        this.$refs['video'].play()
        // eslint-disable-next-line no-unused-vars
      }).catch(error => {
        console.error('摄像头开启失败，请检查摄像头是否可用！')
      })
    },
    // 拍照
    photograph () {
      let ctx = this.$refs['canvas'].getContext('2d')
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs['video'], 0, 0, 320, 240)
      // 转base64格式、图片格式转换、图片质量压缩
      let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg', 0.7)

      // 由字节转换为KB 判断大小
      let str = imgBase64.replace('data:image/jpeg;base64,', '')
      let strLength = str.length
      let fileLength = parseInt(strLength - (strLength / 8) * 2)
      // 图片尺寸  用于判断
      let size = (fileLength / 1024).toFixed(2)

      const config = {
        header:{
          "Content-Type":"multipart/form-data"
        },
        method:'post',
        url:'/login/faceLogin',
        data:{
          "base":str,
        }
      }

      // 上传拍照信息  调用接口上传图片 .........
      this.$axios(config).then(res=>{
        // 保存并查看返回的数据
        this.user.userId = res.data.id;
        this.user.userName = res.data.loginName;
        this.user.status = res.data.status;
        console.log(res.data)
        console.log(this.user)

        if (this.user.userId !== null && this.user.userName!==null && this.user.status !== null) {
          // 如果数据存在则存入sessionStorage中方便后续使用
          // 关闭摄像机
          this.closeCamera();
          sessionStorage.setItem('userId',this.user.userId);
          sessionStorage.setItem('userName',this.user.userName);
          sessionStorage.setItem('status',this.user.status);
          // 登录成功，跳转到首页
          this.$router.push({name:"Home"})
        } else {
          // 登录失败，弹出提示
          console.log("fail");
          this.open();
        }
      })
    },
    // 关闭摄像头
    closeCamera () {
      this.$router.push({name:"Login"})

      if (!this.$refs['video'].srcObject) {
        this.dialogCamera = false
        return
      }
      let stream = this.$refs['video'].srcObject
      let tracks = stream.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
      this.$refs['video'].srcObject = null


    },
  }
}
</script>
<style>
.login-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background: rgba(38, 50, 56, .6) url(../../assets/login_backPicture.jpg) no-repeat;
  background-size: 100% 100%;
}
.login-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  height: 300px;
  width: 400px;
  background-color: #112234;
  opacity: .8;
}
.login-main {
  color: beige;
  padding: 20px 20px 10px 20px;
}
</style>