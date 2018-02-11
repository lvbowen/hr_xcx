const config = require('./config.js')

App({
  onLaunch: function () {
    let _this = this
    console.log(wx.getExtConfigSync())
    _this.globalData.companyId = wx.getExtConfigSync().companyId

    // if (wx.getExtConfig) {
    //   wx.getExtConfig({
    //     success: function (res) {
    //       _this.globalData.companyId = res.extConfig.companyId
    //       console.log('extConfig',res.extConfig)
    //     }
    //   })
    // }
    this.login()
    // let _this = this
    // wx.request({
    //   url: config.host + '/account/smallProgramOpenid.do',
    //   method: "POST",
    //   header: {
    //     "lversion": `${config.lversion}`,
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   data: {},
    //   success: function (res) {
    //     console.log(res)
    //     if(res.data.code == 0){
    //       setTimeout(() => {
    //         // _this.login()
    //         wx.request({
    //           url: res.data.data,
    //           method: "GET",
    //           header: {
    //             "lversion": `${config.lversion}`,
    //             "content-type": "application/json"
    //           },
    //           data: {},
    //           success: function (res) {
    //                 console.log(res) 
    //           }
    //         }
    //       )
    //       },1000)
    //     }
    //   }
    // })
    
  },
  login:function(){
    // 登录
    var _this = this;
    console.log("登录登录")
    wx.login({
      success: response => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (response.code) {
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
                  appid: config.appId,
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
  },
  globalData: {
    userInfo: null,
    fansId:'',
    companyId: "",   //正式：61(爱聚) 34530，测试：169359 
    pageSize: "6"
  }
})