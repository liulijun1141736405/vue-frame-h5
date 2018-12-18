import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import loginStore from './loginStore.js'; //登录 
import dialogStore from './dialogStore.js'; //详情页通用列表弹窗 
import weixinStore from './weixinStore.js'; //某个store对象

export default new vuex.Store({
  modules: {
    dialog: dialogStore,
    login: loginStore,
    weixin: weixinStore
  }
})
