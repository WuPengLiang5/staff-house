import axios from 'axios'
import { Message} from "element-ui";

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
        config.headers.token = sessionStorage.getItem("Authorization");
        return config;
    },
    error => {
        if (error.response.status === 500 || error.response.status === 404) {
            Message.error({message: "没有找到服务，请确认请求地址是否正确"})
        } else if( error.response.status === 403) {
            Message.error({message: "权限不足"})
        } else if(error.response.status === 401){
            Message.error({message: "尚未登录，请登录"});
            this.$router.push({name:"/Login"})
        } else {
            Message.error({message: "未知错误"})
        }
        return Promise.reject(error);
    });

//定义拦截器
axios.interceptors.response.use((response)=>{
    return response;
},error => {
    if (error.response.status === 504 || error.response.status === 404) {
        Message.error({message: "没有找到服务，请确认请求地址是否正确"})
    } else if( error.response.status === 403) {
        Message.error({message: "权限不足"})
    } else if(error.response.status === 401){
        Message.error({message: "尚未登录，请登录"})
    }else if (error.response.status === 500){
        Message.error({message: "服务端报错"})
    } else {
        Message.error({message: "未知错误"})
    }
})

export default axios