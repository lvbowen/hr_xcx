
const network = require("../../utils/network.js")
const utils = require("../../utils/util.js")
const app = getApp() 
let companyId = ''
let paramObj = null

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
    duration: 1000,
    height:125,
    showChevron: false,   //是否显示箭头
    showChevronDown:true,   //是否显示下箭头
    productListWidth:0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    companyId = getApp().globalData.companyId
    paramObj = { companyId: companyId, type: 2,}
    this.getCompanyDetail();
    this.getCompanyInfo();
    this.getShareInfo()    
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
      param: JSON.stringify(paramObj),
      
    },function(res){
      if (res.code == "0"){
          _this.setData({
            memorabilia: res.data.CompanyMemorabilia,
            website: res.data.CompanyWebsite,
            workEnvironment: res.data.WorkEnvironment,
            workTeam: res.data.WorkTeam,
            productListWidth: 279 * res.data.CompanyWebsite.productIntroductionList.length - 35
          })
          if (res.data.CompanyWebsite && res.data.CompanyWebsite.companyIntroduction){
            utils.getWxmlInfo("#introContent", function (res) {
              //公司介绍内容高度超过125px，才显示箭头
              let height = res[0].height
              if (height >= 125) {
                _this.setData({
                  showChevron: true
                })
              }
            })  
           }    
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
   * 获取分享信息
   */  
  getShareInfo:function(){
    let _this = this;
    network.post("/api.do", {
      method: "positionRecommend/getShareTitleInfo",
      param: JSON.stringify({ reqType: 3, companyId: companyId })
    }, function (res) {
      if (res.code == "0" && res.data) {
        wx.setNavigationBarTitle({
          title: res.data.companyName || '公司'
        })
        _this.setData({
          shareInfo: res.data
        })
       
      } else {
        console.log(`positionRecommend/getShareTitleInfo:${res.message}`)
      }
    })
  },
  /**
   * 跳转
   */
  navigatorTo:function(e){
    let type = e.currentTarget.dataset.type;
    let proIndex = e.currentTarget.dataset.proindex;
    console.log(e.currentTarget.dataset)
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
      case "3":
        wx.navigateTo({
          url: `./productDetail/productDetail?proIndex=${proIndex}`,
        })
        break;
      default:
        break;
    }
  },
  /**
   *展开和收起公司介绍区域
   */
  toggleContent:function(e){
    var _this = this;
    var direction = e.currentTarget.dataset.direction
    if(direction == "down"){
      utils.getWxmlInfo("#introContent", function (res) {
        _this.setData({
          height: res[0].height
        })
      })
    }else{
      _this.setData({
        height: 125
      })
    }
    _this.setData({
      showChevronDown: !_this.data.showChevronDown
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let _this = this;
    return {
      title: _this.data.shareInfo.title,
      path: `/pages/home/home`,
      success: function (res) {
        // 转发成功
        //  console.log(res)
      },
      fail: function (res) {
        // 转发失败

      }
    }
  }
})