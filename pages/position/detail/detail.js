const network = require("../../../utils/network.js")
const WxParse = require('../../../wxParse/wxParse.js');
const app = getApp()
const companyId = app.globalData.companyId
const paramObj = { companyId: companyId, type: 2 }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options:null,
    positionInfo:null,
    positionDesc:'',
    companyInfo:null,
    shareInfo:null,
    peopleNum: [{
      value: 1,
      label: '0-50'
    }, {
      value: 2,
      label: '50-100'
    }, {
      value: 3,
      label: '100-500'
    }, {
      value: 4,
      label: '500-1000'
    }, {
      value: 5,
      label: '1000人以上'
    }],
    finance: [{
      value: 1,
      label: '天使轮'
    }, {
      value: 2,
      label: 'A轮'
    }, {
      value: 3,
      label: 'B轮'
    }, {
      value: 4,
      label: 'C轮'
    }, {
      value: 5,
      label: 'D轮'
    }, {
      value: 6,
      label: '上市'
    }, {
      value: 7,
      label: '未融资'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      options:{companyId:"169359",positionId:"4"}
    })
    this.getPositionInfo();
    this.getWzpIndexInfo();
    this.getShareTitleInfo();
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
  * 获取职位详情
  */
  getPositionInfo: function () {
    let _this = this;
    network.post("/api.do", {
      method: "promotionPage/positionInfo",
      param: JSON.stringify({id:_this.data.options.positionId})
    }, function (res) {
      if (res.code == "0" && res.data) {
        _this.setData({
          positionInfo: res.data.positionInfo,
          positionDesc: WxParse.wxParse('article', 'html', res.data.positionInfo.positionDesc, _this, 5)
        })
      } else {
        console.log(`promotionPage/positionInfo:${res.message}`)
      }
    })
  },
  /**
  * 获取公司信息
  */
  getWzpIndexInfo: function () {
    let _this = this;
    network.post("/api.do", {
      method: "wzpCompany/getWzpCompanyInfo",
      param: JSON.stringify(paramObj)
    }, function (res) {
      if (res.code == "0" && res.data) {
        _this.setData({
          companyInfo: res.data
        })
      } else {
        console.log(`wzpCompany/getWzpCompanyInfo:${res.message}`)
      }
    })
  },
  /**
  * 获取分享信息
  */
  getShareTitleInfo: function () {
    let _this = this;
    network.post("/api.do", {
      method: "positionRecommend/getShareTitleInfo",
      param: JSON.stringify({ reqType: 2, companyId: companyId, positionId: _this.data.options.positionId})
    }, function (res) {
      if (res.code == "0" && res.data) {
        _this.setData({
          shareInfo: res.data
        })
      } else {
        console.log(`positionRecommend/getShareTitleInfo:${res.message}`)
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
    
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})