
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
    console.log(options)
    this.data.companyId = options.companyId;
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
      method: "companyWeb/getWorkTeamInfo",
      param: JSON.stringify({ "companyId": _this.data.companyId})
    }, function (res) {
      if (res.code == "0" && res.data) { 
        _this.setData({
          teams:res.data
        })
      } else {
        console.log(`companyWeb/getWorkTeamInfo:${res.message}`)
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