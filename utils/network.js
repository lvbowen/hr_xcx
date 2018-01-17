let config = require("../config.js")
let util = require("./util.js")

let network = {
  //post请求
  post:(url,params,success,fail) => {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${config.host}${url}`,
      method: "POST",
      header: {
        "lversion": `${config.lversion}`,
        "content-type": "application/x-www-form-urlencoded"
      },
      data: params,
      success:res => {
        wx.hideLoading()
        if(success){
          success(res.data)
        }
      },
      fail:(error) => {
        console.log(error)
        if(fail){
          fail()
        }else{
          util.toast("服务器开小差了！")
        }
      }
    })
  },
  //get请求
  get: (url, params, success, fail) => {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${config.host}${url}`,
      method: "GET",
      header: {
        "lversion": `${config.lversion}`,
        "content-type": "application/json"
      },
      data: params,
      success: res => {
        wx.hideLoading()
        if (success) {
          success(res.data)
        }
      },
      fail: () => {
        if (fail) {
          fail()
        } else {
          util.toast("服务器开小差了！")
        }
      }
    })
  },
}

module.exports = network;