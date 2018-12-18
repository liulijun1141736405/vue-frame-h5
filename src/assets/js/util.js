const ua = navigator.userAgent.toLowerCase();
const isWeixin = ua.indexOf('micromessenger') != -1;
const isAndroid = ua.indexOf('android') != -1; 
let scrollTop=0;
const util = {
  isWeixin: isWeixin,
  isAndroid: isAndroid,
  scrollTop:scrollTop,
  sharePage:'',
  getItem: function (name) {
    let val = localStorage.getItem(name);
    try {
      val = JSON.parse(val)
    } catch (error) {}
    return val
  },

  setItem: function (name, data) {
    if (data.constructor === Object || Array.isArray(data)) {
      let val = JSON.stringify(data)
      localStorage.setItem(name, val);
    } else {
      localStorage.setItem(name, data);
    }
  },
  //数量转换
  format(value, symbol) {
    if (value<=0){return 0;}
    let obj = {
      symbol: symbol || "",
      int: undefined, //整数位
      dec: undefined, //小数位
      targ: "", //正负
      times: ['', '万', '亿', '万亿', '亿亿']
    }
    value = String(value);
    let reg = /^-?\d+\.?\d+$/;
    if (!reg.test(value)) {
      return false;
    }

    if (value[0] == "-") {
      obj.targ = "-";
      value = value.substring(1, value.length)
    }

    let times = 0;
    value = Number(value);
    while (value > 10000) {
      value = value / 10000;
      times++;
    } 
    let arr = String(value).split(".")
    obj.int = arr[0];
    obj.dec = arr[1] && arr[1].substring(0,1);

    return obj.dec === "0" || !obj.dec ? obj.symbol + obj.targ + obj.int + obj.times[times] : obj.symbol + obj.targ + obj.int + "." + obj.dec + obj.times[times];
  },

  weiXinDialog() {
    // 
    if (this.util.isWeixin) {
      this.$store.dispatch('switchWeixin')
    } else {
      this.Toast("点击下方分享，进行分享页面")
    }
  },
    /**
   * 获取页面连接参数
   * @param {string} name 链接参数名字
   * @return {string || null} 返回 参数内容
   */
  getUrlParam: function (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
   wxChatShare: function ($vue,imgUrl) {
    imgUrl = imgUrl || "https://wxapp-1254383113.file.myqcloud.com/69314799197936.jpg";

    if (window.entryUrl === '' || window.entryUrl === undefined) {
      window.entryUrl = location.href.split('#')[0]
    }
    let url = window.location.href; 
    let verifiUrl = $vue.util.isAndroid ? location.href.split('#')[0] : window.entryUrl ;
  
    let param = {
      title: "这里有顶尖的MBA高考院校",
      desc: "点击链接查看院校详细介绍",
      link: url,
      imgUrl: imgUrl,
      localUrl: verifiUrl
    }; 
    $vue.wx.wxChat($vue, param);
  },

  scrollStop(){ 
    util.scrollTop = document.scrollingElement.scrollTop;
    document.body.classList.add("modal-open");
    document.body.style.top = -util.scrollTop + 'px'; 
  },
  /***取消滑动限制***/
  scrollMove(type){  
    document.body.classList.remove("modal-open"); 
    if(type === "index"){
      return false;
    }else{
      document.scrollingElement.scrollTop = util.scrollTop; 
    }
            
  }

};

export default util
