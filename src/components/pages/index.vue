<template>
  <!-- <mt-button >按钮</mt-button>  -->
  <div class="scroll-box"> 
    <headerbar :pageInfo="pageInfo"></headerbar>
    <!-- 导航 -->
    <navbar :pageIndex="pageIndex"></navbar>
    <mt-loadmore bottomDropText = "加载更多中" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">

      <!-- 轮播图 -->
      <swiper class="section" v-if="swiperList.length>0" :swiperList="swiperList"></swiper>

      <!-- 了解国际MBA --> 
       <section class="section mba-introduce" v-if="mbainfoList.length>0">
        <h2><span>了解国际MBA</span><p>Understand MBA</p></h2>
        <foldcard :foldCardList="mbainfoList"></foldcard>
       </section>


      <!-- 报考院校 --> 
      <section class="section college">
        <h2><span>报考院校</span><p>University for examinatio</p></h2> 
        <div class="college-sec">
          <div v-if="areaList.length>1" class="change-sec" @click="nextArea(areaData.id)"> 
            <p class="change-data"></p>
          </div>
          <img class="area-bg" :src="areaData.thumb" alt="">
          <ul class="sce-navbar flex-float">
            <li :class="collegeClass===1?'navbar-item active':'navbar-item'" @click="collegeSearch(areaData.id,1)">价格</li> 
            <li :class="collegeClass===3?'navbar-item active':'navbar-item'" @click="collegeSearch(areaData.id,3)">热度</li>
            <li :class="collegeClass===2?'navbar-item active':'navbar-item'" @click="collegeSearch(areaData.id,2)">排名</li>
          </ul> 
          <collegelist v-if="collegeList.length >0" :collegeList="collegeList" :filterType="collegeClass" ></collegelist> 
          <p v-else class="none-text">暂无数据</p>
        </div>
         
      </section>

      <!--选讲课&公开课-->
      <span class="top-border"></span>
      <section class="section public-class" v-if="monthShow">
        <h2><span>宣讲课&公开课</span><p>Lecturing & open class</p></h2>
        <div>
          <ul class="sce-navbtn flex-center"> 
            <li 
            v-for="(item,index) in monthNavList" :key="index" 
            :class="monthActive===(item.month)?'navbtn-item active': 'navbtn-item'" @click="checkMonth(item.month)" 
            >
              {{item.dec}} 
            </li>   

          </ul> 
          <classlist :publicList = "publicList" v-if="publicList.length>0"></classlist>
          <p v-else class="none-text">暂无数据</p>
 
        </div>
      </section>
      <!-- 课表 -->
      <section  class="section curriculum">
        <h2><span>课表</span><p>timetable</p></h2>
        <div class="flex-center">
          <router-link :to="{name:'download'}" class="curriculum-left">
            <img class="curriculum-left-bg" src="../../../static/image/curriculum1.png" alt="">
            <div class="absolute-center">
              <img src="../../../static/image/curriculum1-text-c.png" alt="">
              <img src="../../../static/image/curriculum1-text-e.png" alt="">
            </div>
            <div class="absolute-bottom curriculum-more">点击可查看课表</div>
          </router-link>
          <div class="curriculum-right">
            <router-link :to="{name:'download'}" class="right-item">  
              <img class="curriculum-right-bg" src="../../../static/image/curriculum2.png" alt=""> 
              <div class="absolute-center">
                <img src="../../../static/image/curriculum2-text-c.png" alt="">
                <img src="../../../static/image/curriculum2-text-e.png" alt="">
              </div>
            </router-link>
            <router-link :to="{name:'download'}" class="right-item"> 
              <img class="curriculum-right-bg" src="../../../static/image/curriculum3.png" alt="">
              
              <div class="absolute-center">
                <img src="../../../static/image/curriculum3-text-c.png" alt="">
                <img src="../../../static/image/curriculum3-text-e.png" alt="">
              </div>
            </router-link>
              
          </div>
        </div>
      </section> 

      <!-- 招生简章 --> 
      <section class="section mba-introduce" v-if="recruitList.length>0">
        <h2><span>招生简章</span><p>student recruitment brochure</p></h2>
        <foldcard :foldCardList="recruitList"></foldcard>
      </section>

      <!-- MBA简报 --> 
      <section class="section mba-biref" v-if="mbaBirefActive">
        <h2><span>MBA简报</span><p>MBA dynamics</p></h2>
        <ul class="sce-navbtn flex-center">
          <li v-if="newNum>0" :class="mbaBirefActive===1?'navbtn-item active':'navbtn-item'" @click="mbaBiref(1)">MBA资讯</li>
          <li v-if="qaNum>0" :class="mbaBirefActive===2?'navbtn-item active': 'navbtn-item'" @click="mbaBiref(2)">报考问答</li>
          <li v-if="utilNum>0" :class="mbaBirefActive===3?'navbtn-item active':'navbtn-item'" @click="mbaBiref(3)">工具类文章</li> 
        </ul>
        <biref v-if="birefList.length>0" :birefList="birefList" :type="mbaBirefActive"></biref> 
        <p v-else class="none-text">暂无数据</p>
      </section> 
        
    </mt-loadmore> 
    
    <login></login>
    <tabbar fixed v-model="selected"> </tabbar>
  </div>
</template>

<script> 
  import navbar from '@/components/common/navbar'
  import swiper from '@/components/common/swiper'
  import headerbar from '@/components/common/header'
  import foldcard from '@/components/common/foldCard'
  import collegelist from '@/components/common/collegeList'
  import classlist from '@/components/common/classList'
  import biref from '@/components/common/biref'
  import login from '@/components/common/login'
  import tabbar from '@/components/common/tabbar'
  export default {
    name: 'index',
    data() {
      return {
        pageIndex: 1,
        selected: 1,
        pageInfo: {
          name: "index",
          title: ""
        },
        monthActive:'',
        monthNavList: [],
        monthShow:true,
        monthList: [],
        swiperList: [],
        mbainfoList: [],
        recruitList: [],
        areaList: [],
        areaDataIndex: 0,
        areaData: '',
        collegeList: [],
        collegeClass: 0,
        publicList: [],
        mbaBirefActive:1,
        ListpageNums: 0,
        birefList: [],
        allLoaded: false,
        newNum:0,
        qaNum:0,
        utilNum:0
      }
    },
    components: {
      navbar,
      swiper,
      headerbar,
      foldcard,
      collegelist,
      classlist,
      biref,
      login,
      tabbar
    },
    beforeCreate: function () {
      this.Loading.open('加载中...');
    },
    created: function () { 
      // 微信自定义分享
      this.util.wxChatShare(this); 
      // 
      window.addEventListener('scroll', this.handleScroll, true);
      // 获取首页数据
      this.getIndexData();
      // 获取月份。含有跨年获取
      this.getMonth();
    },
    mounted: function () {
    },
    methods: {
      async getIndexData() {
        let that = this;
        let res = await that.$ajax.get('index.php?r=home-page/h5-home');
        let resData = res.data;
        if (resData.code === 0) {
          // 轮播图 list
          that.swiperList.push(...resData.bannerList);
          // mba介绍 list 顺序填入自定义 icon
          that.mbainfoList.push(...resData.mbainfoList);
          that.mbainfoList.forEach((val, index) => {
            val.icon = index + 1;
          })
          // 院校地区
          that.areaList.push(...resData.areaList);
          that.areaData = resData.areaList[that.areaDataIndex];
          // 根据地区id获取对应 地区的大学; tabNum
          that.collegeSearch(that.areaData.id, 1)
          // 月份筛选
          that.monthList.push(...resData.courseList);
          // 清除数据为空的月份
          that.deleteEmptyMonth(that.monthList);
          //月份默认/切换
          that.checkMonth(that.monthActive);
          // 招生简章
          that.recruitList.push(...resData.recruitList);
          that.recruitList.forEach((val, index) => {
            val.icon = index + 4;
          })
          // 底部三模块列表长度 0 隐藏模块 
          that.newNum = resData.newNum;
          that.qaNum = resData.qaNum;
          that.utilNum = resData.utilNum;
          //默认选中 
          if(that.newNum<=0){ 
            if(that.qaNum<=0){
              if(that.utilNum<=0){ 
                that.mbaBirefActive = false
              }else{ 
                that.mbaBirefActive = 3
              }
            }else{
              that.mbaBirefActive = 2
            }
          };
          // 底部数据获取
          this.mbaBiref(that.mbaBirefActive)
          // 关闭loading
          setTimeout(() => this.Loading.close(), 0)
        }

      },
      // 月份计算
      getMonth() {
        let monthNavList = [];
        let month = new Date().getMonth() + 1;
        let year = parseInt(String(new Date().getFullYear()).substring(2, 4));
        if (month <= 4) {
          for (let i = 0; i < 4; i++) {
            if (month - i <= 0) {
              monthNavList[i] = {
                month: month - i + 12,
                dec: `${year-1}年${month-i+12}月`,
              };
            } else {
              monthNavList[i] = `${year}年${month-i}月`;
              monthNavList[i] = {
                month: month - i,
                dec: `${year}年${month-i}月`,
              };
            }
          }
        } else {
          for (let i = 0; i < 4; i++) {
            monthNavList[i] = month - 3 + i + '月'
            monthNavList[i] = month - 3 + i + '月';
            monthNavList[i] = {
              month: month - 3 + i,
              dec: `${month-3+i}月`,
            };
          }
        }
        this.monthNavList.push(...monthNavList)
      },
      // 删除空月份
      deleteEmptyMonth(data){
        let str="";
        let res = data.filter((val)=>{
          return val.course.length
        });
        this.monthList.length=0;
        this.monthList.push(...res);
        this.monthList.forEach((val)=>{
          str+=val.month;
        })
        let resMonth = this.monthNavList.filter((val)=>{
          return str.includes(val.dec)
        });
        this.monthNavList.length=0;
        this.monthNavList.push(...resMonth);
        if(this.monthNavList.length>0){
          this.monthActive = this.monthNavList[0].month;
        }else{
          this.monthShow = false;
        }
      },
      // 月份筛选数据
      checkMonth(type) { 
        this.monthActive = type;
        let m = this.monthList.filter((val) => {
          return val.month.includes(type)
        })[0];
        if (m) {
          this.publicList.length  = 0;
          this.publicList.push(...m.course);
        }
      },
      /** 
       * @param{number} area  地区id
       *  @param{number} sort 排序方式 1:报名费,2:排名,3:热度
      */
      collegeSearch(area, sort) {
        return new Promise(async (resolve, reject) => {
          let that = this;
          let params = {
            area: area,
            sort: sort,
          } 
          let res = await that.$ajax.get("index.php?r=university/search", params);
          let resData = res.data; 
          if (resData.code === 0) {
            if(resData.universityList.length<=0){
              that.nextArea(area)
              return false;
            }
            that.collegeList.length = 0;
            that.collegeList.push(...resData.universityList);
          }
          that.collegeClass = sort || 1;
          resolve();
        })
      },

      // 区域next
      nextArea(id) {
        let list = this.areaList,
          that = this;
        if (that.areaDataIndex + 1 >= list.length) {
          that.areaDataIndex = 0
        } else {
          that.areaDataIndex += 1
        }
        that.collegeSearch(that.areaList[that.areaDataIndex].id,1).then((res) => {
          that.areaData = that.areaList[that.areaDataIndex];
        })  
      },
      // 首页底部数据
      mbaBiref(type) {
        this.mbaBirefActive = type;
        this.allLoaded = false;
        this.ListpageNums = 0
        this.birefList.length = 0;
        if (type === 1) {
          this.getNewsList()
        } else if (type === 2) {
          this.getDiscussList()
        } else if (type === 3) {
          this.getTollList()
        }
      },
      // 首页底部数据 tab1
      async getNewsList() {
        let that = this;
        let params = {
          start: that.ListpageNums,
          count: 5,
        }
        let res = await that.$ajax.get("index.php?r=article/list", params);
        let resData = res.data;

        if (resData.code === 0) {
          that.birefList.push(...resData.newsList);
          if (that.birefList.length >= resData.number) {
            that.allLoaded = true;
          }

        }
      },
      // 首页底部数据 tab2
      async getDiscussList() {
        let that = this;
        let params = {
          start: that.ListpageNums,
          count: 5,
        }
        let res = await that.$ajax.get("index.php?r=ask-answers/list", params);
        let resData = res.data;

        if (resData.code === 0) {
          that.birefList.push(...resData.List);
          if (that.birefList.length >= resData.number) {
            that.allLoaded = true;
          }
        }
      },
      // 首页底部数据 tab3
      async getTollList(start) {
        let that = this;
        let params = {
          start: that.ListpageNums,
          count: 5,
        }
        let res = await that.$ajax.get("index.php?r=article-utils/list", params);
        let resData = res.data;

        if (resData.code === 0) {
          that.birefList.push(...resData.newsList);
          if (that.birefList.length >= resData.number) {
            that.allLoaded = true;
          }
        }
      },
      //加载更多底部数据
      loadBottom() {
        let that = this;
        that.$refs.loadmore.onBottomLoaded();
        that.ListpageNums += 5;
        if (that.mbaBirefActive === 1) {
          that.getNewsList(that.ListpageNums)
        } else if (that.mbaBirefActive === 2) {
          that.getDiscussList(that.ListpageNums)
        } else if (that.mbaBirefActive === 3) {
          that.getTollList(that.ListpageNums)
        }
      },  
    },
    computed: {

    },
  }
</script>
