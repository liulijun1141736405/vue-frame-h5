import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import dialogStore from './dialogStore.js'; //详情页通用列表弹窗 

export default new vuex.Store({
  modules: {
    dialog: dialogStore,
  }
})
