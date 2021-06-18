<template>
    <div class="modifydepartment">
        <div class="departmentInfo">
            <font color="#1e90ff">部门名称：</font>
            <input type="text"/>
            <font color="#1e90ff" style="margin-left: 10px">详细描述：</font>
            <input type="text"/>
        </div>
        <div style="clear: both"></div>
        <div class="divDottedTop">
            <button class="button1">添加</button>
            <button class="button2">取消</button>
        </div>
    </div>
</template>

<script>


</script>

<style>
    .modifydepartment{
        border: 1px solid rgba(59, 111, 135, 0.61);
        width: 100%;
        height: 25%;
        background-color: #f1f4f5;
    }
    .button1{
        float: left;
        margin-left: 20px;
    }
    .button2{
        float: left;
        margin-left: 20px;
    }
    .divDottedTop{
        height:50px;
        width: 100%;
        display: flex;
        align-items: center;
        border-top:1px dashed rgba(59, 111, 135, 0.61);
    }
    .departmentInfo{
        float: left;
        height: 150px;
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
</style>