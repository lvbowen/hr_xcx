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
    options:null,
    deToast:{isShow:false, content:""},
    //账号
    inputAccount:'', 
    //密码
    inputPass:'', 
    //邮箱
    inputEmail:'', 
    //手机号
    inputTel:'',      
    legalEmail:true,
    legalPhone:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    this.setData({
      options: options
    })
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
   * 设置(存储)输入框值
   */
  setInputVal:function(e,key){
    //input事件
    if (e.currentTarget.dataset.event === "input") {
      let val = e.detail.value 
      switch(key){
        case "inputEmail":
          let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;                
          this.setData({
            legalEmail: reg.test(val) || val.length == 0
          });
          break;
        case "inputTel":
          let regt = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
          this.setData({
            legalPhone: regt.test(val) || val.length == 0
          });
          break; 
      }    
      this.setData({
        [key]: e.detail.value
      });
    //点击清空按钮
    } else if (e.currentTarget.dataset.event === "clear") {
      this.setData({
        [key]: "",
        legalEmail:true,
        legalPhone:true,
      });
    }
    console.log(this.data)
  },
  /**
   * 显隐关闭icon和清空输入框内容
   */
  operateInput:function(e){
    let dataset = e.currentTarget.dataset;
    switch(dataset.type){
      case "1":
        this.setInputVal(e, "inputAccount")      
        break;
      case "2":
        this.setInputVal(e, "inputPass")  
        break;
      case "3":
        this.setInputVal(e, "inputEmail") 
        break;
      case "4":
        this.setInputVal(e, "inputTel") 
        break;
      default:
        break;
    }
  },
  /**
   * 检查数据合法性
   */
  checkForm:function(data){
    let platformType = this.data.options.type;
    console.log(platformType)
    for(let key in data){
      if(!data[key].trim()){
        switch(key){
          case "account":
            utils.toggleToast(this,"账号不能为空")
            return false;
          case "pwd":
            utils.toggleToast(this, "密码不能为空")
            return false;
          case "email":
            if (platformType == "2"){
              utils.toggleToast(this, "邮箱不能为空")
              return false;
            }
            break;
          case "phone":
            if (platformType == "2") {
              utils.toggleToast(this, "手机号不能为空")
              return false;
            }     
            break;
          default:
            break;
        }
      }
    }
    return true;
  },
  /**
   * 提交表单
   */
  formSubmit: function (e) {
    let data = e.detail.value
    if (this.checkForm(data)){
        console.log("输入框都有值")
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