
const network = require("../../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDeliverHistory()
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
  getDeliverHistory:function(){
    let _this = this;
    network.post("/smallProgramAudit/getSpDeliverHistory.do", {
      spFansId: getApp().globalData.fansId
    }, function (res) {
      if (res.code == "0") {
        //mock data
        // res.data = [
        //   {
        //     "positionApplyId": 247,          //职位申请id
        //     "positionName": "产品经理",      //职位名称
        //     "interviewerInfoId": 691,       //简历详情id
        //     "currentStatus": "简历提交成功", //当前状态
        //     "createTime": 1515415164000,    //申请时间
        //     "companyName": "小小科技",       //公司名称
        //     "updateTime": 1515415164000,
        //     "interviewerName": "测试q"
        //   },
        //   {
        //     "positionApplyId": 246,
        //     "positionName": "产品经理",
        //     "interviewerInfoId": 690,
        //     "currentStatus": "待面试",
        //     "createTime": 1515414492000,
        //     "companyName": "小小科技",
        //     "updateTime": 1515414491000,
        //     "interviewerName": "测试qqqq"
        //   },
        //   {
        //     "positionApplyId": 245,
        //     "positionName": "wdwdcwqd",
        //     "interviewerInfoId": 689,
        //     "currentStatus": "已淘汰",
        //     "createTime": 1515414409000,
        //     "companyName": "小小科技",
        //     "updateTime": 1515414408000,
        //     "interviewerName": "测试qqqq"
        //   },
        //   {
        //     "positionApplyId": 243,
        //     "positionName": "java",
        //     "interviewerInfoId": 687,
        //     "currentStatus": "简历提交成功",
        //     "createTime": 1515413381000,
        //     "companyName": "小小科技",
        //     "updateTime": 1515413380000,
        //     "interviewerName": "测试qqqq"
        //   },
        //   {
        //     "positionApplyId": 243,
        //     "positionName": "java",
        //     "interviewerInfoId": 687,
        //     "currentStatus": "简历提交成功",
        //     "createTime": 1515413381000,
        //     "companyName": "小小科技",
        //     "updateTime": 1515413380000,
        //     "interviewerName": "测试qqqq"
        //   },
        //    {
        //     "positionApplyId": 243,
        //     "positionName": "java",
        //     "interviewerInfoId": 687,
        //     "currentStatus": "简历提交成功",
        //     "createTime": 1515413381000,
        //     "companyName": "小小科技",
        //     "updateTime": 1515413380000,
        //     "interviewerName": "测试qqqq"
        //   },
        //    {
        //      "positionApplyId": 243,
        //      "positionName": "java",
        //      "interviewerInfoId": 687,
        //      "currentStatus": "简历提交成功",
        //      "createTime": 1515413381000,
        //      "companyName": "小小科技",
        //      "updateTime": 1515413380000,
        //      "interviewerName": "测试qqqq"
        //    },
        //   {
        //     "positionApplyId": 242,
        //     "positionName": "c++",
        //     "interviewerInfoId": 686,
        //     "currentStatus": "简历提交成功",
        //     "createTime": 1515413009000,
        //     "companyName": "小小科技",
        //     "updateTime": 1515413008000,
        //     "interviewerName": "景麒"
        //   }
        // ]
        _this.setData({
          recordList: res.data
        })
      } else {
        console.log(`weixin/getDeliverHistory:${res.message}`)
      }
    })
  },
  linkTo:function(e){
    let query = JSON.parse(e.currentTarget.dataset.query)
    wx.navigateTo({
      url: `../jobRecordDetail/jobRecordDetail?positionApplyId=${query.positionApplyId}&interviewerInfoId=${query.interviewerInfoId}`,
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
  
  }
})