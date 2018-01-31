
const network = require("../../../utils/network.js")
const utils = require("../../../utils/util.js")
const app = getApp()
const companyId = app.globalData.companyId
const paramObj = { companyId: companyId, type: 2 }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fansId:'',
    wordNumber:0,
    isWorking: 0,
    workStartDateStr: '请选择开始时间',
    workEndDateStr: '请选择结束时间',
    workCompany: '',
    position: '',
    workDepartment: '',
    descript: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  /**
  * 切换是否在职状态
  */
  toggleWorking: function () {
    if (this.data.isWorking) {
      this.setData({
        isWorking: 0,
        workEndDateStr: "请选择结束时间"
      })
    } else {
      this.setData({
        isWorking: 1,
        workEndDateStr: "至今"
      })
    }
  },
  /**
  * 文本域input事件
  */
  operateTextarea: function (e) {
    this.setData({
      descript: e.detail.value,
      wordNumber: e.detail.value.length
    })
  },
  /**
  * 检查工作经历合法性
  */
  checkExperienceForm: function () {
    let _data = this.data;
    if (_data.workStartDateStr.indexOf("请选择") > -1) {
      utils.toggleToast(this, "请选择开始时间")
      return false;
    }
    if (_data.isWorking == 0 && _data.workEndDateStr.indexOf("请选择") > -1) {
      utils.toggleToast(this, "请选择结束时间")
      return false;
    }
    if (!_data.workCompany || _data.workCompany == "") {
      utils.toggleToast(this, "请输入公司名称")
      return false;
    }
    if (!_data.position || _data.position == "") {
      utils.toggleToast(this, "请输入职位名称")
      return false;
    }
    return true;
  },
  /**
  * 完成保存
  */
  save: function () {
    if (this.checkExperienceForm()) {
      console.log(this.data)
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})