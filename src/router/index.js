import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index'

Vue.use(Router)
/** 
 * deep 页面层级 判断前进后退
*/
export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index, 
      meta: {
        title: '首页'
      }
    },

    
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
