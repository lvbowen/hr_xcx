const config = require("../config.js")

/**
 * 格式化标准时间
 * @param {Number} date - 时间戳
 * return {String} eg : 2018/01/02 12:12:12
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
 * @param {Object} that - 调用该方法时所在页面的page实例对象，如this
 * @param {String} content - 消息内容
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
  return false;
}

/**
 * 格式化日期
 * @param {Number} date - 时间戳
 * @param {String} type - 格式化类型，如month、time
 */
const formatDate = (date,type) => {
  if (date == "" || date == null) {
    return;
  } else {
    var d = new Date(date);
    var newdate = "";
    if (type == "month") {
      newdate = d.getFullYear() + "-" + (d.getMonth() > 8 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1));
    } else if (type == "time") {
      newdate = d.getFullYear() + '-'
        + (d.getMonth() > 8 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) + '-'
        + (d.getDate() > 9 ? d.getDate() : "0" + (d.getDate()))
        + " " + (d.getHours() > 9 ? d.getHours() : "0" + d.getHours()) + ":"
        + (d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes()) + ":"
        + (d.getSeconds() > 9 ? d.getMinutes() : "0" + d.getMinutes());
    } else {
      newdate = d.getFullYear() + '-'
        + (d.getMonth() > 8 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) + '-'
        + (d.getDate() > 9 ? d.getDate() : "0" + (d.getDate()));
    }
    return newdate
  }
}

module.exports = {
  formatTime: formatTime,
  toast:toast,
  toggleToast: toggleToast,
  formatDate:formatDate,
}
