
const network = require("../../utils/network.js")
const utils = require("../../utils/util.js")
const user = require("../../utils/user.js")
const app = getApp() 
let companyId = ''
let paramObj = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memorabilia:null,
    website: null,
    workEnvironment:null,
    workTeam:null,
    allCompanies:[],
    headCompany:null,
    branchCompanies:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    height:129,
    height2:0,
    showChevron: false,   //是否显示箭头
    showChevronDown:true,   //是否显示下箭头
    productListWidth:0,
    array: ['美国', '中国', '巴西', '日本'],
    index:0,
    showShare:false,
    poster:{
      shTitle:'',
      shqrcode:'',
      spName:''
    },
    showImg:false,
    showImgurl:'',
    memorabiliaEmptyImg:false,     //false:发展历程项都有图片，true:有的没图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    companyId = getApp().globalData.companyId
    paramObj = { companyId: companyId, type: 2,}
    if (options.scene) {
      var scene = decodeURIComponent(options.scene)
      var arr1 = scene.split("&");
      var obj = {};
      arr1.forEach(function (item) {
        obj[item.split('=')[0]] = item.split('=')[1]
      })
      options.shareFansId = obj.sId
    }
    if (options.shareFansId) {
      getApp().globalData.shareFansId = options.shareFansId
    }
    let _this = this
    if (getApp().globalData.fansId) {
      //已登录
      //  this.getPosterInfo();
    }else{
      //未登录
      user.login(function () {
        // _this.getPosterInfo();
      })
    }
    
    this.getCompanyDetail();
    // this.getCompanyInfo();
    // this.getShareInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  /**
   * 获取公司详情
   */
  getCompanyDetail:function(){
    let _this = this
    network.post("/api.do", {
      method:"companyWeb/getCompanyDetailForApp",
      param: JSON.stringify({
        id: getApp().globalData.weWebsiteId,
        type: 2
      }),
      
    },function(res){
      if (res.code == "0"){
          let bol = false
          if (res.data.CompanyMemorabilia && res.data.CompanyMemorabilia.length>0){
            bol = res.data.CompanyMemorabilia.some(function (item) {
              return item.imageUrl == "" || item.imageUrl == null;
            });
          }       
          _this.setData({
            memorabilia: res.data.CompanyMemorabilia,
            website: res.data.CompanyWebsite,
            workEnvironment: res.data.WorkEnvironment,
            workTeam: res.data.WorkTeam,    
            memorabiliaEmptyImg:bol,     
          })
          if (res.data.CompanyWebsite && res.data.CompanyWebsite.companyIntroduction) {
            utils.getWxmlInfo("#introContent", function (res) {
              //公司介绍内容高度超过129px，才显示箭头
              let height = res[0].height
              if (height >= 129) {
                _this.setData({
                  showChevron: true,
                  height2: height
                })
              }
            })
          }   
          if (res.data.CompanyWebsite && res.data.CompanyWebsite.productIntroductionList){
              _this.setData({
                productListWidth: 279 * res.data.CompanyWebsite.productIntroductionList.length - 35
              })
          }
           
      }else{
        console.log(`companyWeb/getCompanyDetail:${res.message}`)
      }
    })
  },
  /**
   * 获取总公司信息
   */
  getCompanyInfo:function(){
    let _this = this;
    network.post("/api.do", {
      method: "user/getCompanyInfo",
      param: JSON.stringify(paramObj)
    }, function (res) {
      if (res.code == "0") {
        _this.getBranchCompanyInfo()
        res.data.companyId = res.data.id
        _this.data.allCompanies.push(res.data)
        _this.setData({
          headCompany:res.data
        })
      } else {
        console.log(`user/getCompanyInfo:${res.message}`)
      }
    })
  },
  /**
   * 获取分公司列表
   */
  getBranchCompanyInfo:function(){
    let _this = this;
    network.post("/api.do", {
      method: "user/getBranchCompanyInfo",
      param: JSON.stringify(paramObj)
    }, function (res) {
      if (res.code == "0" && res.data) {
        let arr = _this.data.allCompanies.concat(res.data)
        _this.setData({
          allCompanies: arr,
          branchCompanies:res.data
        })
      } else {
        console.log(`user/getBranchCompanyInfo:${res.message}`) 
      }
    })
  },
  /**
   * 获取分享信息
   */  
  getShareInfo:function(){
    let _this = this;
    network.post("/api.do", {
      method: "positionRecommend/getShareTitleInfo",
      param: JSON.stringify({ reqType: 3, companyId: companyId })
    }, function (res) {
      if (res.code == "0" && res.data) {
        wx.setNavigationBarTitle({
          title: res.data.companyName || '公司'
        })
        _this.setData({
          shareInfo: res.data
        })
       
      } else {
        console.log(`positionRecommend/getShareTitleInfo:${res.message}`)
      }
    })
  },
  /*
  获取生成海报里的内容
  */
  getPosterInfo: function () {
    let _this = this;
    network.post("/api.do", {
      method: "positionRecommend/getSpSharePoster",
      param: JSON.stringify({ shareType: 1, companyId: companyId, shareFansId: getApp().globalData.fansId })
    }, function (res) {
      if (res.code == "0" && res.data) {
        _this.setData({
          poster:res.data
        })
        _this.getCanvas();
      } else {
        console.log(`positionRecommend/getSpSharePoster:${res.message}`)
      }
    })
  },
  /*
  
  */
  openChange:function(res){
    var self=this;
    wx.hideTabBar({
      success:function(){
        self.setData({
          showShare:true
        })
      }
    });
  },
  showShareFalse:function(res){
    this.setData({
      showShare:false
    })
    wx.showTabBar();
  },
  createPoster:function(res){
    var self=this;
    wx.canvasToTempFilePath({
      canvasId: 'firstCanvas',
      fileType: 'jpg',
      quality: '1',
      success: function (res) {
        wx.hideTabBar({
          success: function () {
            self.setData({
              showImgurl: res.tempFilePath,
              showImg: true
            })
          }
        });
      }
    })
  },
  // 保存图片到本地
  saveImg(res){
    var _this =this;
    console.log(_this.data.showImgurl)
    wx.saveImageToPhotosAlbum({
      filePath: _this.data.showImgurl,
      success(res2) {
        wx.showModal({
          content: '海报已保存到系统相册\n快去分享给朋友',
          showCancel: false,
          confirmText: '我知道了',
          success: function (res2) {

          }
        })
      },
      fail(res2) {
        console.log(res2);
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权,将无法正常保存图片到本地,点击确定重新获取授权。',
          success: function (res2) {
            if (res2.confirm) {
              wx.openSetting({
                success: function (res3) {
                  if (res3.authSetting['scope.writePhotosAlbum']) {
                    _this.createPoster();
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  //关闭图片预览
  closeShowimg(){
    this.setData({
      showImg:false
    })
    wx.showTabBar();
  },
  //获取小程序canvas并画图
  getCanvas:function(res){
    var _this=this;
    var context = wx.createCanvasContext('firstCanvas');
    console.log(context)
    wx.downloadFile({
      url: _this.data.poster.shqrcode,
      success: function (res2) {
        console.log(res2.tempFilePath);
        context.drawImage(res2.tempFilePath, 210, 235, 328, 328);
        wx.downloadFile({
          url: 'https://aijuhr.com/images/xcx/company_share.png',
          success: function (res) {
            console.log(res.tempFilePath);
            context.drawImage(res.tempFilePath, 0, 0, 750, 1334);
            context.setFontSize(48);
            context.setFillStyle("#ffffff");
            context.setTextAlign('center')
            context.fillText(_this.data.poster.spName,375,104);
            context.setFontSize(28);
            context.setFillStyle("#ffffff");
            context.setTextAlign('center')
            context.fillText(_this.data.poster.shTitle, 375, 144);
            context.setFontSize(36);
            context.setFillStyle("#333333");
            context.setTextAlign('center')
            context.fillText('正在用爱聚招人', 375, 640);
            context.draw(true)
          }
        })
      }
    })
  },
  /**
   * 跳转
   */
  navigatorTo:function(e){
    let type = e.currentTarget.dataset.type;
    let proIndex = e.currentTarget.dataset.proindex;
    console.log(e.currentTarget.dataset)
    console.log('formId',e.detail.formId)
    switch(type){
      case "1":
        let index = e.currentTarget.dataset.index;
        let company = this.data.allCompanies[index];
        wx.navigateTo({
          url: `./map/map?companyName=${company.companyName}&region=${company.region}&address=${company.address}&phone=${company.phone}&longitude=${company.longitude}&latitude=${company.latitude}`,
        })
        break;
      case "2":
        wx.navigateTo({
          url: `./team/team?companyId=${companyId}`,        
        })
        break;
      case "3":
        wx.navigateTo({
          url: `./productDetail/productDetail?proIndex=${proIndex}`,
        })
        break;
      case "4":
        wx.navigateTo({
          url: `./memorabiliaDetail/memorabiliaDetail`,
        })
        break;
      default:
        break;
    }
  },
  /**
   *展开和收起公司介绍区域
   */
  toggleContent:function(e){
    var _this = this;
    var direction = e.currentTarget.dataset.direction
    if(direction == "down"){
      _this.setData({
          height: _this.data.height2
        })
    }else{
      _this.setData({
        height: 129
      })
    }
    _this.setData({
      showChevronDown: !_this.data.showChevronDown
    })    
  },
  /**
   * 获取模板消息推送码formId
   */
  getFormId:function(e){
    let formId = e.detail.formId
    console.log('home_formId2',formId)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let _this = this;
    let fansId = getApp().globalData.fansId
    return {
      title: _this.data.shareInfo.title,
      path: `/pages/home/home?shareFansId=${fansId}`,
      imageUrl:'/images/share-home.jpg',
      success: function (res) {
        // 转发成功
        //  console.log(res)
      },
      fail: function (res) {
        // 转发失败

      }
    }
  }
})