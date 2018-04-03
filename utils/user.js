
const config = require("../config.js")

let user = {
  login: function (cb) {
    // 登录
    let _this = this;
    let globalData = getApp().globalData
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
                  appid: globalData.appId,
                  code: response.code,
                  userInfo: JSON.stringify(res.userInfo),
                },
                success: function (res) {
                  let _data = res.data
                  if (_data.code == "0") {
                    globalData.userInfo = _data.data
                    globalData.fansId = _data.data.id
                    wx.setStorageSync('userInfo', _data.data)
                    console.log(globalData.fansId, globalData.userInfo)
                    if(cb){
                      cb()
                    }
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
}

module.exports = user