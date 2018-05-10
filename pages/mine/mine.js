const network = require("../../utils/network.js")
const utils = require("../../utils/util.js")
let commonApi = require("../../utils/commonApi.js")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    fansId:'',
    companyId:'',
    isEmployeeCertification: 0,     //员工认证 （0：没有认证过，1:已经认证过）
    isNotEmployeeCertification: 0,  //求职者认证 （0：没有认证过，1:已经认证过）
    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('userInfo'))
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
    let globalData = getApp().globalData
    this.setData({
      fansId: globalData.fansId,
      companyId: globalData.companyId,
      userInfo: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : {}
    })
    if (getApp().globalData.phoneNumber) {
      this.setData({
        isNotEmployeeCertification: 1
      })
    }
    
    this.getPersonalInfoSp()
  },
  /**
   * 获取认证信息
   */
  getPersonalInfoSp:function(){
    let _this = this;
    let param = {
      spFansId: _this.data.fansId,
      companyId:_this.data.companyId
    }
    network.post("/api.do", {
      method: "smallProgram/getPersonalInfoSp",
      param: JSON.stringify(param)
    }, function (res) {
      if (res.code == "0" && res.data) {
          _this.setData({
            isEmployeeCertification: res.data.empAuth,
            isNotEmployeeCertification: res.data.applicantAuth,
          })
      } else {
        utils.toggleToast(_this, res.message)
      }
    })
  },
  /**
   * 跳转至认证页面
   */
  goAuthentification:function(e){

    let authenType = e.currentTarget.dataset.authentype
    wx.navigateTo({
      url: `./authentication/authentication?authenType=${authenType}`,
    })
  },
  /**
   * 手机号授权
   */
  // getPhoneNumber: function (res) {
  //   let _this = this
  //   commonApi.getSpFansPhone(res, function () {
  //     _this.setData({
  //       phoneNumber: getApp().globalData.phoneNumber,
  //       isNotEmployeeCertification:1
  //     })
  //   })
  // },
  /**
   *  跳转页面的同时收集formId
   */
  getFormId:function(e){
     let formId = e.detail.formId
     let url = e.currentTarget.dataset.url
     commonApi.saveFormId({
       formId: formId
     })
     if(url){
       wx.navigateTo({
         url: url,
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
  
  }
})