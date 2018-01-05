let config = require("../config.js")
let util = require("./util.js")

let network = {
  //post请求
  post:(url,params,success,fail) => {
    wx.request({
      url: `${config.host}${url}`,
      method: "POST",
      header: {
        "lversion": `${config.lversion}`,
        "content-type": "application/x-www-form-urlencoded"
      },
      data: params,
      success:res => {
        if(success){
          success(res.data)
          util.toast("服务器开小差了！")
        }
      },
      fail:() => {
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
    wx.request({
      url: `${config.host}${url}`,
      method: "GET",
      header: {
        "lversion": `${config.lversion}`,
        "content-type": "application/json"
      },
      data: params,
      success: res => {
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