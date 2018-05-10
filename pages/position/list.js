const network = require("../../utils/network.js")
const user = require("../../utils/user.js")
const commonApi = require("../../utils/commonApi.js")
const app = getApp()
let companyId = ''
let paramObj = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
      positionList:[],
      inputShowed: false,
      inputVal: "",
      showShare:false,
      poster: {
        shTitle: 'gs/电子商务/天使轮/0-50人',
        shqrcode: 'http://121.199.182.2/hrm/upload/spqrcode201803161521179349660.jpg',
        spName: '爱聚招聘',
        posiList:[],
      },
      showImg: false,
      showImgurl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    companyId = getApp().globalData.companyId
    paramObj = { companyId: companyId, type: 2 }
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
    if (getApp().globalData.fansId){
      //已登录
      this.getPosterInfo();
    }else{
      //未登录
      user.login(function () {
        _this.getPosterInfo();
      })
    }   
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
    this.getPositionList();
  },
  /**
   * 获取职位列表
   */
  getPositionList: function () {
    let _this = this;
    network.post("/api.do", {
      method: "companyWeb/getWeWebsitePositionByCategoryId",
      param: JSON.stringify({    
        id: getApp().globalData.weWebsiteId,
        type:2
      })
    }, function (res) {
      if (res.code == "0" && res.data) {
        _this.setData({
          positionList:res.data
        })
      } else {
        console.log(`companyWeb/getWeWebsitePositionByCategoryId:${res.message}`)
      }
    })
  },
  /**
   * 加载更多
   */  
  loadMore:function(){

  },
  /**
   * 跳转
   */
  saveFormId: function (e) {
    
    console.log('formId',e.detail.formId)
    commonApi.saveFormId({
      formId: e.detail.formId
    })    
  },
  //显示输入框
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  //隐藏输入框
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  //清楚输入框内容
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  /**
   * 搜索职位
   */
  goSearch:function(e){
    let value = e.detail.value.trim();
    let _this = this;
    let param = Object.assign({}, paramObj, { keyword:value})
    network.post("/api.do", {
      method: "companyWeb/searchWeWebsitePositionByKeyword",
      param: JSON.stringify(param)
    }, function (res) {
      if (res.code == "0" && res.data) {
        _this.setData({
          positionList: res.data,
          inputShowed: false,
          inputVal: "",
        })
      } else {
        console.log(`companyWeb/searchWeWebsitePositionByKeyword:${res.message}`)
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
      param: JSON.stringify({ shareType: 2, companyId: companyId, shareFansId: getApp().globalData.fansId})
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
    var self=this;
    wx.hideTabBar({
      success:function(){
        self.setData({
          showShare: true
        })
      }
    });
  },
  showShareFalse: function (res) {
    this.setData({
      showShare: false
    })
    wx.showTabBar();
  },
  createPoster: function (res) {
    var self=this;
    wx.canvasToTempFilePath({
      canvasId: 'secondCanvas',
      fileType: 'jpg',
      quality: '1',
      success: function (res) {
        console.log(res.tempFilePath);
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
  saveImg(res) {
    var _this = this;
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
        // wx.showToast({
        //   title: '保存成功!',
        //   icon: 'success',
        //   duration: 2000
        // })
      },
      fail(res2) {
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
  closeShowimg() {
    this.setData({
      showImg: false
    })
    wx.showTabBar();
  },
  /**
   * 画canvas
   */
  getCanvas: function (res) {
    var _this = this;
    var context = wx.createCanvasContext('secondCanvas')
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
            console.log(_this.data.poster.posiList);
            _this.data.poster.posiList.forEach(function(item,i){
              context.setFillStyle("#333333");
              context.setFontSize(36);
              context.setTextAlign('left')
              context.fillText(item.posiName, 48, 146*i+640);
              context.setFillStyle("#46BE8A");
              context.setFontSize(36);
              context.setTextAlign('right')
              context.fillText(item.salary, 700, 146 * i + 644);
              context.setFillStyle("#B1B1B1");
              context.setFontSize(28);
              context.setTextAlign('left')
              context.fillText(item.workCity + ' | '+item.workYear+' | '+item.xueli +' | '+item.workType, 48, 146 * i + 698);
            })
              context.draw(true)
          }
        })
      }
    })
  },
  /**
   * 获取模板消息推送码formId
   */
  getFormId: function (e) {
    let formId = e.detail.formId
    console.log('list_formId2', formId)
    commonApi.saveFormId({
      formId: formId
    })
  },
  /**
   * 保存用户信息
   */
  getUserInfo:function(e){
    let dataset = e.currentTarget.dataset;
    if(!getApp().globalData.userInfo){   
      //还未获取过用户信息
      network.post('/api.do', {
        method: 'smallProgram/updateUserInfoSp',
        param: JSON.stringify({
          spFansId: getApp().globalData.fansId,
          userInfo: e.detail.userInfo
        })
      }, (res) => {
        if (e.detail.errMsg == "getUserInfo:ok"){
          // 允许授权,若拒绝授权则 errMsg:"getUserInfo:fail auth deny"
          getApp().globalData.userInfo = e.detail.userInfo
          wx.setStorageSync('userInfo', e.detail.userInfo)
        }
        wx.navigateTo({
          url: `./detail/detail?companyId=${companyId}&positionId=${dataset.positionid}`,
        })
      })
    }else{
      wx.navigateTo({
        url: `./detail/detail?companyId=${companyId}&positionId=${dataset.positionid}`,
      })
    } 
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
    let fansId = getApp().globalData.fansId
    return {
      title: '职位列表',
      path: `/pages/position/list?shareFansId=${fansId}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败

      }
    }
  }
})