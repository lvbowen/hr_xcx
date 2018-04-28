let commonApi = require("../../../utils/commonApi.js")
let utils = require("../../../utils/util.js")
let network = require("../../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options:null,
    verificationCode:'获取验证码',
    activeIndex:1,
    phoneNumber:'',
    email:'',
    name:'',
    telphone:'',
    vcode:'',
    isEmployeeCertification: 0,     //员工认证 （0：没有认证过，1:已经认证过）
    isNotEmployeeCertification: 0,  //求职者认证 （0：没有认证过，1:已经认证过）
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options,
      phoneNumber: getApp().globalData.phoneNumber
    })
    if (!this.data.phoneNumber){
      utils.wxLogin()
    }

    this.getWeixinPersonalInfo()
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
   * 获取认证信息
   */
  getWeixinPersonalInfo: function () {
    let _this = this;
    let param = {
      fansId: getApp().globalData.fansId,
      companyId: getApp().globalData.companyId
    }
    network.post("/api.do", {
      method: "wexinPersonalInfo/getWeixinPersonalInfo",
      param: JSON.stringify(param)
    }, function (res) {
      if (res.code == "0") {
        // _this.setData({
        //   isEmployeeCertification: res.data.weixinPersonalInfo.isEmployeeCertification,
        //   isNotEmployeeCertification: res.data.weixinPersonalInfo.isNotEmployeeCertification,
        // })
        if(_this.data.phoneNumber){    //测试用
            _this.setData({
              isNotEmployeeCertification:1
            })
        }
        _this.judgeCertification()
      } else {
        utils.toggleToast(_this, res.message)
      }
    })
  },
  /***
   * 判断显示对应tab
   */
  judgeCertification:function(){
    let authenType = this.data.options.authenType   //authenType:1-员工认证，2-求职者认证, 3-我要认证
    switch (authenType){
      case '1':
      case '2':
        this.setData({
          activeIndex: authenType
        })
        break;
      case '3':
        if (this.data.isEmployeeCertification == 1){
          this.setData({
            activeIndex: 2
          })
        }else{
          this.setData({
            activeIndex: 1
          })
        }
        break;
      default:
        break;
    }
  },
  /**
   * 切换tab
   */
  switchTab:function(e){
    let index = e.currentTarget.dataset.tabindex
    this.setData({
      activeIndex: Number(index)
    })
  },
  /**
   * 监听input事件
   */
  operateInput:function(e){
    let prop = e.currentTarget.dataset.prop
    let value = e.detail.value
    this.setData({
      [prop]:value
    })
  },
  /**
   * 清除input
   */
  clearInput: function (e) {
    let prop = e.currentTarget.dataset.prop
    this.setData({
      [prop]: ''
    })
  },
  /**
   * 手机号授权
   */
  getPhoneNumber:function(res){
    let _this = this
    commonApi.getSpFansPhone(res,function(){
      _this.setData({
        phoneNumber: getApp().globalData.phoneNumber,
        isNotEmployeeCertification:1              //待定
      })
    })
  },
  /**
   * 企业员工身份验证
   */
  verification:function(){
    let _this = this;
    let param = {
      fansId: getApp().globalData.fansId,
      companyId: getApp().globalData.companyId,
      empName: _this.data.name,
      empEmail: _this.data.email
    }
    network.post("/api.do", {
      method: "positionRecommend/innerEmpAuth",
      param: JSON.stringify(param)
    }, function (res) {
      console.log(res)
      if (res.code == "1") {
       wx.navigateTo({
         url: '../authenResult/authenResult',
       })
        
      } else {
        utils.toggleToast(_this, res.message)
      }
    })
  },
  /**
   * 发送验证码
   */
  sendCheckCode:function(){
    let t = 10;
    let _this = this
    if (this.data.verificationCode.indexOf('重') > -1){
       return;
    }
    let timer = setInterval(() => {
      if (t <= 0) {
        _this.setData({
          verificationCode:'获取验证码'
        })
        clearInterval(timer);
        return false;
      }
      _this.setData({
        verificationCode: t+'s后重获取'
      })
      t--;
    }, 1000);
  },
  /**
   * 求职者认证
   */
  notEmployeeCertification:function(){
   
    let reg = /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/;
    if (!reg.test(this.data.telphone)){
      utils.toggleToast(this, "请输入正确手机号")
    }
    console.log(this.data.telphone, this.data.vcode, '求职者认证')
    let _this = this;
    let param = {
      fansId: getApp().globalData.fansId,
      companyId: getApp().globalData.companyId,
      phone: _this.data.telphone,
      checkCode: _this.data.vcode
    }
    network.post("/api.do", {
      method: "weixin/finishCheck",
      param: JSON.stringify(param)
    }, function (res) {
      console.log(res)
      if (res.code == "0") {
        _this.data.isNotEmployeeCertification=1;

      } else {
        utils.toggleToast(_this, res.message)
      }
    })

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

})