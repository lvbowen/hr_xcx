
const network = require("../../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyId:'',
    teams:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      companyId:options.companyId
    })
    this.getWorkTeamInfo()
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
   * 获取我们的团队
   */
  getWorkTeamInfo: function () {
    let _this = this;
    network.post("/api.do", {
      method: "companyWeb/getCompanyDetailForApp",
      param: JSON.stringify({
        id: getApp().globalData.weWebsiteId,
        type: 2
      })
    }, function (res) {
      if (res.code == "0" && res.data) { 
        _this.setData({
          teams: res.data.WorkTeam
        })
      } else {
        console.log(`companyWeb/getCompanyDetailForApp:${res.message}`)
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
  // onShareAppMessage: function () {
  
  // }
})