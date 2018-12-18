<template>
  <div id="app">  
    <navigation>
      <router-view> 
      </router-view>  
    </navigation>
    <weixin></weixin>
  </div>
</template>

<script>
import weixin from '@/components/common/weixin' 
export default {
  name: 'App',
  data(){
    return{ 
    }
  },
  components:{
    weixin
  },
  created(){ 
    let that = this; 
    that.$router.beforeEach((to, from, next) => {    
 
      next();
    })
  },
  mounted(){ 
   
  },
  methods:{
 
  }
}
</script>

 
