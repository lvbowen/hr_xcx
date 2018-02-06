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
    introContent:'',
    wordNumber:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllResume()
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
 * 获取个人档案
 */
  getAllResume: function () {
    let _this = this;
    let param = {
      fansId: 121,    //假数据
    }
    network.post("/api.do", {
      method: "resume/getAllResume",
      param: JSON.stringify(param)
    }, function (res) {
      if (res.code == "0") {
        _this.setData({
          introContent: res.data.myEvaluation.myEvaluation,
        })
      } else {
        utils.toggleToast(_this, res.message)
      }
    })
  }, 
  /**
   * 文本域input事件
   */
  operateTextarea: function (e) {
    this.setData({
      introContent: e.detail.value.trim(),
      wordNumber: e.detail.value.trim().length
    })
  },
  /**
   * 完成保存
   */
  save: function () {
    let _this = this;
    let param = {
      fansId: 121,    //假数据
      route: 'description',
      model: { 'myEvaluation': _this.data.introContent }
    }
    network.post("/api.do", {
      method: "resume/updateResumeInfo",
      param: JSON.stringify(param)
    }, function (res) {
      if (res.code == "0") {
        wx.navigateBack({
          delta: 1
        })
      } else {
        utils.toggleToast(_this, res.message)
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