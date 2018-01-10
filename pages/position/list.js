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
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    console.log(e.detail.value)
    this.setData({
      inputVal: e.detail.value
    });
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