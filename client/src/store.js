import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const types = {
    SET_AUTHENTICATED:"SET_AUTHENTICATED",//是否认证通过
    SET_USER:"SET_USER",//用户信息
};

//状态
const state ={
    isAuthenticated:false,
    user:{}
};
//获取状态信息
const getters ={
    isAuthenticated:state => state.isAuthenticated,
    user:state =>state.user,
};
//更改状态信息
const mutations ={
    [types.SET_AUTHENTICATED](state,isAuthenticated){
      if(isAuthenticated) state.isAuthenticated =isAuthenticated;
      else state.isAuthenticated = false;
    },
    [types.SET_USER](state,user) {
        if (user) state.user = user;
        else state.user = {};
    }
};
//异步操作
const actions ={
    //授权
    setAuthenticated:({commit},isAuthenticated) => {
      commit(types.SET_AUTHENTICATED,isAuthenticated);
    },
    //用户
    setUser:({commit},user) => {
      commit(types.SET_USER,user);
    },
    //清除，退出登录
    clearState:({commit}) =>{
        commit(types.SET_AUTHENTICATED,false);
        commit(types.SET_USER,null);
    }
};
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})
