import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/common/Login";
import notFound from '@/components/common/404.vue';
import Home from "@/views/Home";
import UserInsert from "@/views/user/UserInsert";
import UserQuery from "@/views/user/UserQuery";
import FileQuery from "@/views/download/FileQuery";
import UploadFile from "@/views/download/UploadFile";
import NoticeInsert from "@/views/notice/NoticeInsert";
import NoticeQuery from "@/views/notice/NoticeQuery";
import PositionInsert from "@/views/position/PositionInsert";
import PositionQuery from "@/views/position/PositionQuery";
import SectionInsert from "@/views/section/SectionInsert";
import SectionQuery from "@/views/section/SectionQuery";
import EmployeeInsert from "@/views/employee/EmployeeInsert";
import EmployeeQuery from "@/views/employee/EmployeeQuery";
import UpdatePassword from "@/views/home/UpdatePassword";
Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: {
      name: "Login"
    }
  },
    {
      path: '/404',
      name: '404',
      component: notFound
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/UpdatePassword',
      name: 'UpdatePassword',
      component: UpdatePassword
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [{
        path: '/Home/userQuery',
        name: 'UserQuery',
        component:UserQuery,
      },
        {
        path: '/Home/userInsert',
        name: 'UserInsert',
        component:UserInsert,
      },
        {
          path: '/Home/EmployeeInsert',
          name: 'EmployeeInsert',
          component:EmployeeInsert,
        },{
          path: '/Home/EmployeeQuery',
          name: 'EmployeeQuery',
          component:EmployeeQuery,
        },{
          path: '/Home/SectionQuery',
          name: 'SectionQuery',
          component:SectionQuery,
        },{
          path: '/Home/SectionInsert',
          name: 'SectionInsert',
          component:SectionInsert,
        },{
          path: '/Home/PositionQuery',
          name: 'PositionQuery',
          component:PositionQuery,
        },{
          path: '/Home/PositionInsert',
          name: 'PositionInsert',
          component:PositionInsert,
        },{
          path: '/Home/NoticeQuery',
          name: 'NoticeQuery',
          component:NoticeQuery,
        }, {
          path: '/Home/NoticeInsert',
          name: 'NoticeInsert',
          component:NoticeInsert,
        },{
          path: '/Home/UploadFile',
          name: 'UploadFile',
          component:UploadFile,
        },{
          path: '/Home/FileQuery',
          name: 'FileQuery',
          component:FileQuery,
        },
      ]
    },

];

const router = new VueRouter({
  routes
});

export default router
