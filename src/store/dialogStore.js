export default {
  state: {
    dialogStatus: false,
  },
  mutations: {
    switchDialog(state) { //这里的state对应着上面这个state
      state.dialogStatus = state.dialogStatus ? false : true;
      //你还可以在这里执行其他的操作改变state
    },
    closeDialog(state) { //这里的state对应着上面这个state
      state.dialogStatus = false;
      //你还可以在这里执行其他的操作改变state
    }
  },
  actions: {
    switchDialog(context) {
      context.commit('switchDialog')
    },
    closeDialog(context) {
      context.commit('closeDialog')
    }
  }
}
