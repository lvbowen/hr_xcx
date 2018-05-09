// pages/home/memorabiliaDetail/memorabiliaDetail.js

const network = require("../../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memorabilia:[],
    memorabiliaEmptyImg: false,     //false:发展历程项都有图片，true:有的没图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCompanyDetail();
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
  getCompanyDetail: function () {
    let _this = this
    network.post("/api.do", {
      method: "companyWeb/getCompanyDetailForApp",
      param: JSON.stringify({ id: getApp().globalData.weWebsiteId, type: 2}),

    }, function (res) {
      if (res.code == "0") {
        let bol = false
        if (res.data.CompanyMemorabilia && res.data.CompanyMemorabilia.length > 0) {
          bol = res.data.CompanyMemorabilia.some(function (item) {
            return item.imageUrl == "" || item.imageUrl == null;
          });
        }

        _this.setData({
          memorabilia: res.data.CompanyMemorabilia,
          memorabiliaEmptyImg: bol,
        })
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