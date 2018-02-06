const config = require('./config.js')

App({
  onLaunch: function () {
    let _this = this
    // 登录
    wx.login({
      success: response => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (response.code){
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              wx.request({             
                url: config.host + '/account/smallRoutineLogin.do',
                method:"POST",
                header: {
                  "lversion": `${config.lversion}`,
                  "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                  appid:config.appId,
                  secret: config.appSecret,
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
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    fansId:'',
    companyId: "169359",   //正式：61(爱聚) 34530，测试：169359
    pageSize: "6"
  }
})