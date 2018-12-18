export default {
  state: {
    loginShow: false,
    loginWrap: false,
    loginInfo: "",
  },
  mutations: {
    swichLogin(state) {
      state.loginShow = state.loginShow ? false : true;
    },
    swichLoginWrap(state) {
      state.loginWrap = state.loginWrap ? false : true;
    },
    closeLogin(state) {
      state.loginShow = false;
    },
  },
  actions: {
    swichLogin(context) {
      context.commit('swichLogin')
    },
    swichLoginWrap(context) {
      context.commit('swichLoginWrap')
    },
    closeLogin(context) {
      context.commit('closeLogin')
    },
  }
}
