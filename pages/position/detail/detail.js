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
    shareMaskHidden:true,
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
    console.log('detail', options)
    if (options.positionId){
      this.setData({
        options: options
      })
    }else{
      this.setData({
        options: { companyId: "169359", positionId: "4" }
      })
    }
   
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
      param: JSON.stringify({ id: _this.data.options.positionId, companyId: companyId, fansId:''})
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
   * 跳转
   */
  linkTo: function (e) {
    let dataset = e.currentTarget.dataset;
    let _data = this.data;
    switch(dataset.type){
      //重定向到职位详情页
      case "1":
        wx.redirectTo({
          url: `./detail?companyId=${companyId}&positionId=${dataset.positionid}`,
        })
        break;
      //跳转到创建简历方式页
      case "2":
        wx.navigateTo({
          url: `../resume/resume?companyId=${companyId}&positionId=${_data.options.positionId}&fansId=${_data.fansId}&shareFansId=${_data.shareFansId}&recomType=${_data.recomType}`,
        })
        break;
      //回到首页
      case "3":
        wx.reLaunch({
          url: `../../home/home`,
        })
        break;
      default:
        break;
    }
  },
  /**
   * 显示隐藏
   */
  toggleShareMask:function(){
    this.setData({
      shareMaskHidden: !this.data.shareMaskHidden
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
  onShareAppMessage: function (result) {
    let _this = this;
    return {
      title: _this.data.shareInfo.title,
      path: `/pages/position/detail/detail?companyId=${companyId}&positionId=${_this.data.options.positionId}`,
      imageUrl: _this.data.shareInfo.imgUrl,
      success: function (res) {
        // 转发成功
        // console.log(res)
      },
      fail: function (res) {
        // 转发失败
        
      }
    }
  }
})