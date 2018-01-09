
const network = require("../../utils/network.js")
const app = getApp() 
const companyId = app.globalData.companyId
const paramObj = { companyId: companyId, type: 2 }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memorabilia:null,
    website: null,
    workEnvironment:null,
    workTeam:null,
    allCompanies:[],
    headCompany:null,
    branchCompanies:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getCompanyDetail();
      this.getCompanyInfo();
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
   * 获取公司详情
   */
  getCompanyDetail:function(){
    let _this = this
    network.post("/api.do", {
      method:"companyWeb/getCompanyDetail",
      param: JSON.stringify(paramObj)
    },function(res){
      if (res.code == "0"){
          _this.setData({
            memorabilia: res.data.CompanyMemorabilia,
            website: res.data.CompanyWebsite,
            workEnvironment: res.data.WorkEnvironment,
            workTeam: res.data.WorkTeam
            
          })
      }else{
        console.log(`companyWeb/getCompanyDetail:${res.message}`)
      }
    })
  },
  /**
   * 获取总公司信息
   */
  getCompanyInfo:function(){
    let _this = this;
    network.post("/api.do", {
      method: "user/getCompanyInfo",
      param: JSON.stringify(paramObj)
    }, function (res) {
      if (res.code == "0") {
        _this.getBranchCompanyInfo()
        res.data.companyId = res.data.id
        _this.data.allCompanies.push(res.data)
        _this.setData({
          headCompany:res.data
        })
      } else {
        console.log(`user/getCompanyInfo:${res.message}`)
      }
    })
  },
  /**
   * 获取分公司列表
   */
  getBranchCompanyInfo:function(){
    let _this = this;
    network.post("/api.do", {
      method: "user/getBranchCompanyInfo",
      param: JSON.stringify(paramObj)
    }, function (res) {
      if (res.code == "0" && res.data) {
        let arr = _this.data.allCompanies.concat(res.data)
        _this.setData({
          allCompanies: arr,
          branchCompanies:res.data
        })
      } else {
        console.log(`user/getBranchCompanyInfo:${res.message}`) 
      }
    })
  },  
  /**
   * 跳转
   */
  navigatorTo:function(e){
    let type = e.currentTarget.dataset.type;
    switch(type){
      case "1":
        let index = e.currentTarget.dataset.index;
        let company = this.data.allCompanies[index];
        wx.navigateTo({
          url: `./map/map?companyName=${company.companyName}&region=${company.region}&address=${company.address}&phone=${company.phone}&longitude=${company.longitude}&latitude=${company.latitude}`,
        })
        break;
      case "2":
        wx.navigateTo({
          url: `./team/team?companyId=${companyId}`,
        })
        break;
      default:
        break;
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