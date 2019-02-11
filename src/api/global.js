let SETING_ENV = "prod";
let REQUEST_URL = "";  
const MBAH5_VERSION = '1.0.0'; 
 
//  beta
if (process.env.NODE_ENV === 'development') {    
  REQUEST_URL = "https://sunlands.109km.com/education-beta/frontend/web/"; 
  SETING_ENV = "dev"
}else if(process.env.NODE_ENV === 'production'){  
  REQUEST_URL = "https://global.sunlands.com/frontend/web/";    
  SETING_ENV = "prod"
}else if(process.env.NODE_ENV === 'preparation'){   
  REQUEST_URL = "https://smallprogram.sunlands.com/education-preview/frontend/web/"; 
  SETING_ENV = "prep"
}
if(SETING_ENV === 'prep'){
  REQUEST_URL = "https://smallprogram.sunlands.com/education-preview/frontend/web/"; 
}else if(SETING_ENV === 'prod'){
  REQUEST_URL = "https://global.sunlands.com/frontend/web/";   
}
const apiConfig = {
  method: 'post',
  // 基础url前缀
  // baseURL: REQUEST_URL,
  // 请求头信息
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  // 参数
  data: {
    //version:MBAH5_VERSION
  },
  // 设置超时时间
  timeout: 10000, 
  // 返回数据类型
  responseType: 'json'
}
module.exports = {
  REQUEST_URL,  
  apiConfig,
  MBAH5_VERSION,
  SETING_ENV
};
