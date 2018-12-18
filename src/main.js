// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'mint-ui/lib/style.css'
import {
  Indicator,
  Toast,
  MessageBox
} from 'mint-ui';
import App from './App'
import './assets/js/rem'
import router from './router'
import Mint from 'mint-ui'
import global from './api/global'
import util from './assets/js/util'
import ajax from './api/api'
import './assets/style/pagesless/style.less'
import store from './store/store'
//前进更新后退缓存页面
import Navigation from 'vue-navigation' 
import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

import wx from "./assets/js/wx"; 
 
interactive.init('greatbear');
Vue.prototype.interactive = interactive; 

Vue.use(VueLazyload)
Vue.use(Navigation, {router})
Vue.use(Mint);
Vue.use(preview)
Vue.prototype.GLOBAL = global; 
Vue.prototype.util = util;
Vue.prototype.Loading = Indicator;
Vue.prototype.Toast = Toast;
Vue.prototype.MsgBox = MessageBox;


Vue.prototype.wx = wx;
Vue.prototype.$ajax = ajax;
Vue.config.productionTip = false;

if (typeof (Storage) !== "undefined") {
  console.log("支持Storage")
} else {
  console.log("不支持Storage")
}
 
 
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
