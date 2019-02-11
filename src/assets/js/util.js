const ua = navigator.userAgent.toLowerCase();
const isWeixin = ua.indexOf('micromessenger') != -1;
const isAndroid = ua.indexOf('android') != -1; 
let scrollTop=0;
const util = {
  isWeixin: isWeixin,
  isAndroid: isAndroid,
  scrollTop:scrollTop, 

};

export default util
