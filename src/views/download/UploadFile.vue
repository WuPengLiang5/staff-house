<template>
  <div>
    <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">
          上传pdf/word工作日志文件，大小不超过10M
        </div>
      </template>
    </el-upload>

  </div>

</template>

<script>
export default {
  name: "FileQuery"
}
</script>

<style scoped>

</style>
