<template>
    <div>
        <el-image
                style="width: 100%; height: 100%"
                :src="url"></el-image>
<!--        <img src="../../assets/welcome_picture.png">-->
    </div>
</template>

<script>
    export default {
        name: "Welcome.vue",
        data(){
            return{
                url:require('../../assets/welcome_picture.png'),
            }

        }
    }
</script>

<style scoped>

</style>