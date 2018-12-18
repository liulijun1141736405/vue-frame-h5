import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index'
import waterfalls from '@/components/pages/waterfalls'
import insdetail from '@/components/pages/insdetail'
import bulletin from '@/components/pages/bulletin'
import interview from '@/components/pages/interview'
import download from '@/components/pages/download'
import webView from '@/components/pages/webView'

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

    {
      path: '/insdetail:id',
      name: 'insdetail',
      component: insdetail, 
      meta: {
        title: '详情'
      } 
    },

    {
      path: '/waterfalls',
      name: 'waterfalls',
      component: waterfalls, 
      meta: {
        title: '院校风采'
      }  
    },

    {
      path: '/bulletin',
      name: 'bulletin',
      component: bulletin, 
    },

    {
      path: '/interview',
      name: 'interview',
      component: interview, 
    },

    {
      path: '/download',
      name: 'download',
      component: download
    },
    {
      path: '/webView:id',
      name: 'webView',
      component: webView
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
