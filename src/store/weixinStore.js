export default {
  state: {
    weixinStatus: false,
  },
  mutations: {
    switchWeixin(state) {
      state.weixinStatus = state.weixinStatus ? false : true;
    }, 
    closeWeixin(state) {
      state.weixinStatus = false
    }
  },
  actions: {
    switchWeixin(context) {
      context.commit('switchWeixin')
    },
    
    closeWeixin(context) {
      context.commit('closeWeixin')
    }


    
  }
}
