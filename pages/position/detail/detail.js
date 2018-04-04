const network = require("../../../utils/network.js")
const WxParse = require('../../../wxParse/wxParse.js')
let commonApi = require("../../../utils/commonApi.js")
let utils = require("../../../utils/util.js")
const user = require("../../../utils/user.js")
const app = getApp()
let companyId = ''
let paramObj = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options:null,
    phoneNumber:'',
    positionInfo:null,
    positionDesc:'',
    companyInfo:null,
    shareInfo:null,
    shareMaskHidden:true,
    btnType:'',     //存储获取手机号的按钮是分享还是投递
    peopleNum: [{
      value: 1,
      label: '0-50'
    }, {
      value: 2,
      label: '50-100'
    }, {
      value: 3,
      label: '100-500'
    }, {
      value: 4,
      label: '500-1000'
    }, {
      value: 5,
      label: '1000人以上'
    }],
    finance: [{
      value: 1,
      label: '天使轮'
    }, {
      value: 2,
      label: 'A轮'
    }, {
      value: 3,
      label: 'B轮'
    }, {
      value: 4,
      label: 'C轮'
    }, {
      value: 5,
      label: 'D轮'
    }, {
      value: 6,
      label: '上市'
    }, {
      value: 7,
      label: '未融资'
    }],
    showShare: false,
    poster: {
      shTitle: 'gs/电子商务/天使轮/0-50人',
      shqrcode: 'http://121.199.182.2/hrm/upload/spqrcode201803161521179349660.jpg',
      spName: '爱聚招聘',
      posiDetail: {},
    },
    checkPosition:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let globalData = getApp().globalData
    companyId = globalData.companyId
    paramObj = { companyId: companyId, type: 2 }
    if(options.scene){
      var scene = decodeURIComponent(options.scene)
      var arr1=scene.split("&");
      var obj={};
      arr1.forEach(function(item){
        obj[item.split('=')[0]]=item.split('=')[1]
      })
      options.positionId=obj.pId;
      options.shareFansId = obj.sId
    }
    console.log('detail_options',options)
    this.setData({
      options: options,
      phoneNumber: globalData.phoneNumber
    })
    if (options.shareFansId){
      globalData.shareFansId = options.shareFansId
    }
    
    if (!this.data.phoneNumber) {
      utils.wxLogin()
    }
    let _this = this
    if (getApp().globalData.fansId) {
       //已登录
      this.getPositionInfo();
      this.checkCollection();
    }else{
      //未登录
      user.login(function () {
        console.log('detail_globalData', getApp().globalData)
        _this.getPositionInfo();
        _this.checkCollection();
      })
    }    
    
    this.getWzpIndexInfo();
    this.getShareTitleInfo();
    this.getPosterInfo();
   
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
  * 获取职位详情
  */
  getPositionInfo: function () {
    console.log(getApp().globalData);
    let _this = this;
    network.post("/api.do", {
      method: "promotionPage/positionInfo",
      param: JSON.stringify({ id: _this.data.options.positionId, companyId: companyId, fansId: '', spFansId: getApp().globalData.fansId, isRoutine:'1'})
    }, function (res) {
      if (res.code == "0" && res.data) {
        _this.setData({
          positionInfo: res.data.positionInfo,
          positionDesc: WxParse.wxParse('article', 'html', res.data.positionInfo.positionDesc, _this, 5)
        })
      } else {
        console.log(`promotionPage/positionInfo:${res.message}`)
      }
    })
  },
  /**
  * 获取公司信息
  */
  getWzpIndexInfo: function () {
    let _this = this;
    network.post("/api.do", {
      method: "wzpCompany/getWzpCompanyInfo",
      param: JSON.stringify(paramObj)
    }, function (res) {
      if (res.code == "0" && res.data) {
        _this.setData({
          companyInfo: res.data
        })
      } else {
        console.log(`wzpCompany/getWzpCompanyInfo:${res.message}`)
      }
    })
  },
  /**
  * 获取分享信息
  */
  getShareTitleInfo: function () {
    let _this = this;
    network.post("/api.do", {
      method: "positionRecommend/getShareTitleInfo",
      param: JSON.stringify({ reqType: 2, companyId: _this.data.options.companyId, positionId: _this.data.options.positionId})
    }, function (res) {
      if (res.code == "0" && res.data) {
        _this.setData({
          shareInfo: res.data
        })
      } else {
        console.log(`positionRecommend/getShareTitleInfo:${res.message}`)
      }
    })
  },
  //获取当前职位收藏状态
  checkCollection:function(){
    let _this=this;
    let method ="/smallProgramAudit/checkCollection.do",
        param={
          spFansId: getApp().globalData.fansId,
          companyId: _this.data.options.companyId,
          positionId: _this.data.options.positionId
        },
        successd=function(res){
          _this.setData({
            checkPosition:res.code=='2001'
          })
          console.log(_this.data.checkPosition)
        };
    network.post(method,param,successd);
  },
  //收藏职位或者取消收藏职位
  collectPosition:function(){
    let _this=this;
    let method;
    if (_this.data.checkPosition){
      method ="/smallProgramAudit/cancleCollectPosition.do";
    }else{
      method = "/smallProgramAudit/collectPosition.do";
    }
    let param={
          spFansId: getApp().globalData.fansId,
          companyId: _this.data.options.companyId,
          positionId: _this.data.options.positionId
        },
        successd=function(res){
          _this.checkCollection();
        };
    network.post(method,param,successd);
  },
  /**
   * 跳转
   */
  linkTo: function (e) {
    let dataset = e.currentTarget.dataset;
    let _data = this.data;
    let fansId = getApp().globalData.fansId
    switch(dataset.type){
      //重定向到职位详情页
      case "1":
        wx.redirectTo({
          url: `./detail?companyId=${_data.options.companyId}&positionId=${dataset.positionid}`,
        })
        break;
      //跳转到创建简历方式页
      case "2":
        wx.navigateTo({
          url: `../resume/resume?companyId=${_data.options.companyId}&positionId=${_data.options.positionId}&fansId=${fansId}&shareFansId=${_data.shareFansId}&recomType=${_data.recomType}`,
        })
        break;
      //回到首页
      case "3":
        wx.reLaunch({
          url: `../../home/home`,
        })
        break;
      default:
        break;
    }
  },
  /**
   * 显示隐藏
   */
  toggleShareMask:function(){
    this.setData({
      shareMaskHidden: !this.data.shareMaskHidden
    })
  },
  /*
  获取生成海报里的内容
  */
  getPosterInfo: function () {
    let _this = this;
    network.post("/api.do", {
      method: "positionRecommend/getSpSharePoster",
      param: JSON.stringify({ shareType: 3, companyId: companyId, positionId: _this.data.options.positionId, shareFansId: getApp().globalData.fansId })
    }, function (res) {
      
      if (res.code == "0" && res.data) {
        _this.setData({
          poster: res.data
        })
        _this.getCanvas();
      } else {
        console.log(`positionRecommend/getSpSharePoster:${res.message}`)
      }
    })
  },
  /*
    点击显示生成海报选择
  */
  openChange: function (res) {
    this.setData({
      showShare: true
    })
  },
  showShareFalse: function (res) {
    this.setData({
      showShare: false
    })
  },
  createPoster: function (res) {
    var _this=this;
    wx.canvasToTempFilePath({
      canvasId: 'thirdCanvas',
      fileType: 'jpg',
      quality: '1',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res2) {
            wx.showToast({
              title: '保存成功!',
              icon: 'success',
              duration: 2000
            })
          },
          fail(res2) {
            wx.showModal({
              title: '警告',
              content: '您点击了拒绝授权,将无法正常保存图片到本地,点击确定重新获取授权。',
              success:function(res2){
                if(res2.confirm){
                  wx.openSetting({
                    success:function(res3){
                      if (res3.authSetting['scope.writePhotosAlbum']){
                        _this.createPoster();
                      }
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  /**
   * 画canvas
   */
  getCanvas: function (res) {
    var _this = this;
    var context = wx.createCanvasContext('thirdCanvas');
    wx.downloadFile({
      url: _this.data.poster.shqrcode,
      success: function (res2) {
        context.drawImage(res2.tempFilePath, 210, 235, 328, 328);
        context.draw()
        wx.downloadFile({
          url: 'https://aijuhr.com/images/xcx/plist_share.png',
          success: function (res) {
            context.drawImage(res.tempFilePath, 0, 0, 750, 1334);
            context.setFontSize(48);
            context.setFillStyle("#ffffff");
            context.setTextAlign('center')
            context.fillText(_this.data.poster.spName, 375, 104);
            context.setFontSize(36);
            context.setFillStyle("#ffffff");
            context.setTextAlign('center')
            context.fillText(_this.data.poster.shTitle, 375, 164);
            console.log(_this.data.poster);
            context.setFillStyle("#333333");
            context.setFontSize(36);
            context.setTextAlign('left')
            context.fillText(_this.data.poster.posiDetail.posiName, 48,640);
            context.setFillStyle("#46BE8A");
            context.setFontSize(36);
            context.setTextAlign('right')
            context.fillText(_this.data.poster.posiDetail.salary, 700,644);
            context.setFillStyle("#B1B1B1");
            context.setFontSize(28);
            context.setTextAlign('left')
            context.fillText(_this.data.poster.posiDetail.workCity + ' | ' + _this.data.poster.posiDetail.workYear + ' | ' + _this.data.poster.posiDetail.xueli + ' | ' + _this.data.poster.posiDetail.workType, 48, 698);
            context.draw(true)
          }
        })
      }
    })
  },
  /**
   * 手机号授权
   */
  getPhoneNumber:function(res){
    let _this = this
    let _data = _this.data
    let fansId = getApp().globalData.fansId
    commonApi.getSpFansPhone(res,function(){
      _this.setData({
        phoneNumber: getApp().globalData.phoneNumber
      })
      console.log('btntype', _this.data.btnType)
      if(_this.data.btnType == "share"){
        _this.openChange()
      }else{
        wx.navigateTo({
          url: `../resume/resume?companyId=${_data.options.companyId}&positionId=${_data.options.positionId}&fansId=${fansId}&recomType=${_data.recomType}`,
        })
      }
      
    },function(){
      //分享不强制要求手机号授权
      if (_this.data.btnType == "share") {
        _this.openChange()
      } 
    })
  },
  /**
   * 点击获取手机号按钮（分享和投递）
   */
  clickPhoneNumer:function(e){
    let btnType = e.currentTarget.dataset.btntype
    this.setData({
      btnType: btnType
    })
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
  onShareAppMessage: function (result) {
    let _this = this;
    let fansId = getApp().globalData.fansId
    return {
      title: _this.data.shareInfo.title,
      path: `/pages/position/detail/detail?companyId=${companyId}&positionId=${_this.data.options.positionId}&shareFansId=${fansId}`,
      // imageUrl: _this.data.shareInfo.imgUrl,   //使用截图好看些
      success: function (res) {
        // 转发成功
        // console.log(res)
      },
      fail: function (res) {
        // 转发失败
        
      }
    }
  }
})