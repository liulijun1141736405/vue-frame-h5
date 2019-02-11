<template>
  <div id="app">  
    <navigation>
      <router-view> 
      </router-view>  
    </navigation> 
  </div>
</template>

<script> 
export default {
  name: 'App',
  data(){
    return{ 
    }
  },
  components:{ 
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

 
