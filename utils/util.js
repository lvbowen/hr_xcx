/** 全局工具方法（函数） **/

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

/**
 * 登录更新code
 */
const wxLogin = () => {
  wx.login({
    success: function (res) {
      if (res.code) {
        getApp().globalData.code = res.code
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  });
}

/**
 * 获取某节点的信息
 * @param {String} id - 节点的选择器，最好为id比较好
 * @param {Function} callback - 异步回调函数
 */
const getWxmlInfo = (id,callback) => {
  //创建节点选择器
  let query = wx.createSelectorQuery();
  //选择id
  query.select(id).boundingClientRect()
  setTimeout(()=>{
    query.exec(function (res) {   
      //res就是 标签元素的信息 的数组,回调函数是异步的(模拟器中有时拿不到res,故加个延迟)
      if (callback) {
        callback(res)
      }
    })
  },1000)
}

/**
 * 获取节点的信息
 * @param {String} selector - 节点的选择器
 * @param {Function} callback - 异步回调函数
 */
const getWxmlInfoAll = (selector, callback) => {
  //创建节点选择器
  let query = wx.createSelectorQuery();
  //选择id
  query.selectAll(selector).boundingClientRect()
  setTimeout(() => {
    query.exec(function (res) {
      //res就是 标签元素的信息 的数组,回调函数是异步的
      if (callback) {
        callback(res)
      }
    })
  }, 1000)
}


module.exports = {
  formatTime: formatTime,
  toast:toast,
  toggleToast: toggleToast,
  formatDate:formatDate,
  wxLogin: wxLogin,
  getWxmlInfo: getWxmlInfo,
  getWxmlInfoAll: getWxmlInfoAll
}
