// pages/position/resume/resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options:null,
    platforms:[
      { "type": 1, "platformName": "前程无忧（51job）", "logoUrl":"../../../images/resum_1.png"},
      { "type": 2, "platformName": "智联招聘", "logoUrl": "../../../images/resum_2.png" },
      { "type": 6, "platformName": "拉勾网", "logoUrl": "../../../images/resum_4.png" },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('resume', options)

    this.setData({
      options:options
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
   * 跳转
   */
  navigatorTo: function (e) {
    let dataset = e.currentTarget.dataset;
    let options = this.data.options;
    let queryStr = `companyId=${options.companyId}&positionId=${options.positionId}&fansId=${options.fansId}&shareFansId=${options.shareFansId}&recomType=${options.recomType}`
    switch (dataset.pagetype) {
      //go 创建微简历
      case "1":
        wx.navigateTo({
          url: `../addResume/addResume?${queryStr}`,
        })
        break;
      //跳转到第三方招聘平台登录
      case "2":
        wx.navigateTo({
          url: `../loginResume/loginResume?${queryStr}&type=${dataset.type}`,
        })
        break;
      //跳转到个人档案（预览编辑）
      case "3":
        wx.navigateTo({
          url: `../editPreview/editPreview?${queryStr}`,
        })
        break;
      default:
        break;
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})