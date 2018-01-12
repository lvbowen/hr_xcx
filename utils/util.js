const config = require("../config.js")

/**
 * 格式化标准时间
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 消息提示框toast
 */
const toast = title => {
  wx.showToast({
    title: title,
    image:"",
    duration:1500
  });
}

/**
 * 显示自定义消息提示框toast
 */
const toggleToast = (that, content) => {
  that.setData({
    deToast: { isShow: true, content: content }
  })
  setTimeout(function () {
    that.setData({
      deToast: { isShow: false, content: '' }
    })
  }, 2000)
}

module.exports = {
  formatTime: formatTime,
  toast:toast,
  toggleToast: toggleToast,
}
