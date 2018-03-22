const utils = require("../../../utils/util.js")
const network = require("../../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxmlTabItems:[],
    tabListWidth:2000,
    signLeft:0,
    productList:[],
    proIndex:0,      //当前产品的索引
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      proIndex: options.proIndex
    })
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
  getCompanyDetail: function () {
    let _this = this
    network.post("/api.do", {
      method: "companyWeb/getCompanyDetail",
      param: JSON.stringify({
        companyId:getApp().globalData.companyId,
        type:2
      }),
    }, function (res) {
      if (res.code == "0") {
        if (res.data.CompanyWebsite){
          _this.setData({
            productList: res.data.CompanyWebsite.productIntroductionList
          })
          _this.setWidth(_this.data.proIndex)   //跳转进入
        }         
      } else {
        console.log(`companyWeb/getCompanyDetail:${res.message}`)
      }
    })
  },
  /**
   * 设置tab-list的宽度
   */
  setWidth: function (proIndex){
    let _this = this
    utils.getWxmlInfoAll('.tab-item', function (res) {
      let width = 0
      res[0].forEach(function (item, idx) {
        width += item.width
      })
      _this.setData({
        wxmlTabItems: res[0],
        tabListWidth: width
      })
      _this.switchTab(proIndex)   
      // console.log('wxmlTabItems1', _this.data.wxmlTabItems)
    })
  },
  /**
   * tab切换
   */
  switchTab:function(e){
    let proIndex;
    if (typeof e == 'string' || typeof e == 'number'){    //跳转进入
      proIndex = e
    }else{                       //点击tab切换
      proIndex = e.currentTarget.dataset.proindex
    }
    // console.log('wxmlTabItems2', this.data.wxmlTabItems)
    let offsetLeft = this.data.wxmlTabItems[proIndex].left + (this.data.wxmlTabItems[proIndex].width - 35)/2
    this.setData({
      proIndex: proIndex,
      signLeft: offsetLeft
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