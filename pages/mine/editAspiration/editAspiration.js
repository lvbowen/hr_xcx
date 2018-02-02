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
    region: ['浙江省', '杭州市','西湖区'],    //设置初始化地址
    workTypes:[
      {name:'全职',value:1},
      { name: '兼职', value: 2 },
      { name: '实习', value: 3 },
    ],
    workTypeIndex:0,
    // salary:'请选择期望月薪范围',
    salaryRange: [[1, 2, 3], [2, 3,4,5]],
    // salaryIndex:[],
    model: {
      maxSalary: '',
      expectPosition: '',
      workType: '',
      minSalary: '',
      expectPlace: '请选择期望城市'
    }

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
   *  选择工作类型
   */
  bindWorkTypeChange: function (e) {
    this.setData({
      workTypeIndex: e.detail.value
    })
  },
  /**
   * 选择地址
   */
  bindRegionChange:function(e){    
    this.setData({
      region: e.detail.value,
      ['model.expectPlace']: e.detail.value.join(" ")
    })
    console.log(this.data.region,this.data.model)
  },
  /**
   * 
   */
  bindSalaryChange:function(e){
    let selectedVal = e.detail.value    //返回数组
    let salaryRange = this.data.salaryRange
    this.setData({
      ['model.minSalary']: salaryRange[0][selectedVal[0]],
      ['model.maxSalary']: salaryRange[1][selectedVal[1]],
    })
    console.log(this.data.model)
  },
  /**
   * 
   */
  columnchange:function(e){

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