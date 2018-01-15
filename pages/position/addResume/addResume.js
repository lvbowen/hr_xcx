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
    headType:'2',
    fansId:'',
    birthday:'请选择出生年月',
    sex:"请选择性别",
    sexArr: [
      { name: '男', value: '1' },
      { name: '女', value: '2' }
    ],
    sexIndex:0,
    legalEmail: true,
    legalPhone: true,
    interviewResumeInfo: {
      // positionId: this.$route.query.id,
      resumeId: null,//简历文件id
      attachmentIds: null,//附件ids
      name: '',
      phone: '',
      email: '',
      sex: '',
      birthday: '',
      educationHistoryList: [],
      workHistoryList: []
    },
    
    professional: [[
      { name: '博士', value: '1' },
      { name: '研究生', value: '2' },
      { name: '本科', value: '3' },
      { name: '大专', value: '4' },
      { name: '其他', value: '5' }
    ]],
    professIndex:0,
    isReading:0,
    eduStartDateStr:'请选择开始时间',
    eduEndDateStr:'请选择结束时间',
    graduateSchool:'',
    educationLev:'请选择学历',
    major: '',
    inputAccount:"ceshi"
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
  setInputVal: function (e, key) {
    let property = `interviewResumeInfo.${key}`;
    //input事件
    if (e.currentTarget.dataset.event === "input") {
      let val = e.detail.value
      switch (key) {
        case "email":
          let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
          this.setData({
            legalEmail: reg.test(val) || val.length == 0
          });
          break;
        case "phone":
          let regt = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
          this.setData({
            legalPhone: regt.test(val) || val.length == 0
          });
          break;
      }
      this.setData({
        [property] : e.detail.value
      });
    //点击清空按钮
    } else if (e.currentTarget.dataset.event === "clear") {
      this.setData({
        [property]: "",
      });
      if (key == "email") {
        this.setData({
          legalEmail: true,
        });
      } else if (key == "phone") {
        this.setData({
          legalPhone: true,
        });
      }
    }
    console.log(this.data.interviewResumeInfo)
  },
  /**
   * 显隐关闭icon和清空输入框内容
   */
  operateInput: function (e) {
    let dataset = e.currentTarget.dataset;
    switch (dataset.type) {
      case "1":
        this.setInputVal(e, "name")
        break;
      case "2":
        this.setInputVal(e, "email")
        break;
      case "3":
        this.setInputVal(e, "phone")
        break;
      default:
        break;
    }
  },
  /**
   * 选择生日
   */
  bindBirthdayChange:function(e){
    this.setData({
      birthday:e.detail.value
    })
    console.log(this.data.birthday)
  },
  /**
   * 选择性别
   */
  bindSexChange:function(e){
    this.setData({
      sexIndex: e.detail.value,
      sex: this.data.sexArr[e.detail.value].name
    })
  },
  /**
   * 检查基本信息合法性
   */
  checkBaseForm:function(){

  },
  /**
   * 检查教育经历合法性
   */
  checkEducationForm: function () {
    
  },
  /**
   * 检查工作经历合法性
   */
  checkExperienceForm: function () {

  },
  /**
   * 切换表单页面
   */
  changeHeadType:function(e){
      let dataset = e.currentTarget.dataset;
      console.log(dataset.headtype, typeof dataset.headtype)
      

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