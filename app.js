const config = require('./config.js')

App({
  onLaunch: function () {
    let _this = this

    console.log(wx.getExtConfigSync())
    _this.globalData.companyId = wx.getExtConfigSync().companyId
    _this.globalData.appId = wx.getExtConfigSync().appId
    _this.globalData.componentAppid = wx.getExtConfigSync().componentAppid
    _this.login()
    
  },
  login:function(){
    // 登录
    var _this = this;
    wx.login({
      success: response => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (response.code) {
          console.log(response.code)
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              wx.request({
                url: config.host + '/account/smallProgramLogin.do',
                method: "POST",
                header: {
                  "lversion": `${config.lversion}`,
                  "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                  appid: _this.globalData.appId,
                  code: response.code,
                  userInfo: JSON.stringify(res.userInfo),
                },
                success: function (res) {
                  let _data = res.data
                  if (_data.code == "0") {
                    _this.globalData.userInfo = _data.data
                    _this.globalData.fansId = _data.data.id
                    wx.setStorageSync('userInfo', _data.data)
                    console.log(_this.globalData.fansId, _this.globalData.userInfo)
                  }
                }
              })
            },
            fail: function () {
              wx.showModal({
                title: "温馨提示",
                content: '您已经拒绝微信授权，请删除小程序重新进入授权。',
                showCancel: false
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    appId:'wx910dfda74307078f',       //授权用户的小程序appid
    componentAppid:'',    //第三方平台的appid
    userInfo: null,
    fansId:'',
    companyId: "61",   //正式：61(爱聚) 34530，测试：169359 
    pageSize: "6"
  }
})