const network = require("../../utils/network.js")
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
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    companyId = getApp().globalData.companyId
    paramObj = { companyId: companyId, type: 2 }
    this.getPositionList();
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
   * 获取职位列表
   */
  getPositionList: function () {
    let _this = this;
    network.post("/api.do", {
      method: "companyWeb/getWeWebsitePositionByCategoryId",
      param: JSON.stringify(paramObj)
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
  navigatorTo: function (e) {
    let dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: `./detail/detail?companyId=${companyId}&positionId=${dataset.positionid}`,
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
      param: JSON.stringify({ shareType: 2, companyId: companyId })
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
    wx.canvasToTempFilePath({
      canvasId: 'secondCanvas',
      fileType: 'jpg',
      quality: '1',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res2) {
            console.log(res2);
          },
          fail(res2) {
            console.log(res2);
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
    return {
      title: '职位列表',
      path: `/pages/position/list`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败

      }
    }
  }
})