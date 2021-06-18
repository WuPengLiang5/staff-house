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
<!--          <canvas ref="canvas" width="320" height="240"></canvas>-->

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

    }
  },
  methods: {
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
      console.log(size)

      // 上传拍照信息  调用接口上传图片 .........

      // 保存到本地
      // this.dialogCamera = false
      // let ADOM = document.createElement('a')
      // ADOM.href = URL.createObjectURL(str)
      // ADOM.download = new Date().getTime() + '.jpeg'
      // ADOM.click()
    },
    // 关闭摄像头
    closeCamera () {
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

      this.$router.push({name:"Login"})
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