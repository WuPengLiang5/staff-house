import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 存储token
        Authorization: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
    },

    mutations: {
        // 修改token，并将token存入 sessionStorage
        changeLogin (state, user) {
            state.Authorization = user.token;
            sessionStorage.setItem('Authorization',user.token);
        }
    }
});

export default store;