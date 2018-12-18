let SETING_ENV = "dev";
let REQUEST_URL = ""; 
const MBAH5_VERSION = '1.0.0';

if (SETING_ENV === "dev") {
  REQUEST_URL = "";
}

if(SETING_ENV === "beta"){ 
  REQUEST_URL ="";
}

if(SETING_ENV === "prod"){ 
  REQUEST_URL ="";
}

const apiConfig = {
  method: 'post',
  // 基础url前缀
  baseURL: REQUEST_URL,
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json'
}
module.exports = {
  REQUEST_URL,
  apiConfig,
  weChatShare,
  MBAH5_VERSION,
  SETING_ENV
};
