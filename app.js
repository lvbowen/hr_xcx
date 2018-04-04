const config = require('./config.js')

App({
  onLaunch: function () {
    let _this = this
    console.log(wx.getExtConfigSync())
    _this.globalData.companyId = wx.getExtConfigSync().companyId
    _this.globalData.appId = wx.getExtConfigSync().appId
    
  },
  globalData: {
    appId:'',       //授权用户的小程序appid
    userInfo: null,
    fansId:'',
    shareFansId:'',
    companyId: "",   //正式：61(爱聚) 34530，测试：169359 
    pageSize: "6"
  }
})