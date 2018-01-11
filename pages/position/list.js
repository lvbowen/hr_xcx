const network = require("../../utils/network.js")
const app = getApp()
const companyId = app.globalData.companyId
const paramObj = { companyId: companyId, type: 2 }

Page({

  /**
   * 页面的初始数据
   */
  data: {
      positionList:[],
      inputShowed: false,
      inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPositionList()
    console.log(companyId)
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
  
  }
})