//引入axios
import axios from 'axios'
import {
  apiConfig
} from './global.js' // 倒入默认配置
import {
  Toast,
  Indicator
} from 'mint-ui';
import qs from 'qs';
let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;
//请求拦截器
const instance = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {},
  data: qs.stringify(apiConfig.data),
  transformResponse: [function (data) {}]
})
instance.interceptors.request.use(apiConfig => {
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[apiConfig.url]) {
    promiseArr[apiConfig.url]('操作取消')
    promiseArr[apiConfig.url] = cancel
  } else {
    promiseArr[apiConfig.url] = cancel
  }
  return apiConfig
}, error => {
  return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break;
      case 401:
        err.message = '未授权，请重新登录'
        break;
      case 403:
        err.message = '拒绝访问'
        break;
      case 404:
        err.message = '请求错误,未找到该资源'
        break;
      case 405:
        err.message = '请求方法未允许'
        break;
      case 408:
        err.message = '请求超时'
        break;
      case 500:
        err.message = '服务器端出错'
        break;
      case 501:
        err.message = '网络未实现'
        break;
      case 502:
        err.message = '网络错误'
        break;
      case 503:
        err.message = '服务不可用'
        break;
      case 504:
        err.message = '网络超时'
        break;
      case 505:
        err.message = 'http版本不支持该请求'
        break;
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = "连接到服务器失败"
  }
  // 错误提示
  Toast(err.message);
  setTimeout(() => Indicator.close(), 0)
  return Promise.resolve(err.response)
})

axios.defaults.baseURL = apiConfig.baseURL;
//设置默认请求头
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.timeout = 10000;

axios.defaults.responseType = "json"
export default {
  //get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        if (res.data.code != 0) {
          Toast(res.data.msg);
          setTimeout(() => Indicator.close(), 0)
        }else{
          resolve(res) 
        }
      })
    })
  },
  //post请求
  post(url, param) {
    param = qs.stringify(param)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        if (res.data.code != 0) {
          Toast(res.data.msg);
          setTimeout(() => Indicator.close(), 0)
        }else{
          resolve(res) 
        } 
      })
    })
  }
}
