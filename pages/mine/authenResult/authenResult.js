// pages/mine/authenResult/authenResult.js

let utils = require("../../../utils/util.js")
let network = require("../../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
      options:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       options: options
     })
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
   * 已完成认证
   */
  verification:function(){
    let _this = this
    network.post("/api.do", {
      method: "smallProgram/haveFinishAuthSp",
      param: JSON.stringify({
        empId: this.data.options.empId
      })
    }, function (res) {
      // resCode - 1:表示邮件发送成功(待激活),2:表示已经认证成功
      if(res.code == 0 && res.data.resCode == 2){
        wx.navigateBack()
      } else if (res.message){
        utils.toggleToast(_this, res.message)
      }
    })     
  },
  /**
   * 重新发送邮件
   */
  retransmission:function(){
    let _this = this
    network.post("/api.do", {
      method: "smallProgram/sendEmailAgainSp",
      param: JSON.stringify({
        empId: this.data.options.empId
      })
    }, function (res) {
      if (res.code == 0 && res.data.resCode == 1) {
        utils.toggleToast(_this, '发送成功!请去邮箱查看')
      }
    })     
  },
  /**
   * 重新填写认证信息
   */
  goInterpolate:function(){
    wx.navigateBack()
  },
})