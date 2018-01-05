
const network = require("../../utils/network.js")
const app = getApp() 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    website: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getCompanyDetail()
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
    network.get("/weixin/getCompanyWebDetail.do", {
      companyId: app.globalData.companyId,
      code:''
    },function(res){
      console.log(res)
      if (res.codeUrl === ""){
          _this.setData({
            website: res.CompanyWebsite

          })
          console.log(_this.data.website)
          console.log('website')
      }else{
        console.log(`codeUrl:${res.codeUrl}`)
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