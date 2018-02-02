const network = require("../../../utils/network.js")
const utils = require("../../../utils/util.js")
const app = getApp()
const companyId = app.globalData.companyId
const paramObj = { companyId: companyId, type: 2 }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fansId:'',
    wordNumber:0,
    model: { linkUrl: '', linkDescription:''}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
   *  输入框事件回调
   */
  operateInput:function(e){
    let event = e.currentTarget.dataset.event;
    switch(event){
      case 'input':
        this.setData({
          ['model.linkUrl']:e.detail.value.trim()
        })
        break;
      case 'clear':
        this.setData({
          ['model.linkUrl']: ''
        })
        break;
      default:
        break;
    }
  },
  /**
   * 文本域input事件
   */
  operateTextarea:function(e){
    this.setData({
      ['model.linkDescription']: e.detail.value.trim(),
      wordNumber: e.detail.value.length
    })
  },
  /**
   * 保存
   */
  save:function(){
   console.log(this.data.model)
  },
  /**
   * 删除
   */
  del:function(){
    
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