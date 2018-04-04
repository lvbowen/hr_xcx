// pages/mine/recommendDetail/recommendDetail.js

const network = require("../../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: null,
    data: null,
    stepName: ['推荐成功', '面试', '入职'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    })
    this.getResumeHistory()
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
  getResumeHistory: function () {
    let _this = this;
    network.post("/weixin/getResumeHistory.do", {
      // positionApplyId: _this.data.options.positionApplyId,
      interviewerInfoId: _this.data.options.interviewerInfoId
    }, function (res) {
      if (res.code == "0") {
      /*  res.data = {
          "positionName": "前端",   //职位名
          "interviewerInfoId": 666,
          "zpRecord": [
            {
              "id": 701,
              "interviewerId": 666,
              "operateStatus": 4,          //简历流转状态，0:简历提交成功 2:HR将移入备选库 3:HR发送面试邀约 4:HR发送offer 5:HR将移入爽约库 6:HR录用 7:HR将简历移入淘汰库 8:HR将移入人才储备库 9:HR重新发送面试邀约 10:HR下载简历(查看完整简历) 11:HR将移入新简历库 12：HR查看了简历13：HR确认该offer到岗
              "interviewTime": null,
              "interviewAddress": null,
              "operateId": 9095315,
              "operateName": "java",
              "operateTime": 1513848234000,  //记录时间
              "interviewCount": null
            },
            {
              "id": 700,
              "interviewerId": 666,
              "operateStatus": 3,
              "interviewTime": 1513934603000,
              "interviewAddress": "123",
              "operateId": 9095315,
              "operateName": "java",
              "operateTime": 1513848217000,
              "interviewCount": 1
            },
            {
              "id": 699,
              "interviewerId": 666,
              "operateStatus": 1,
              "interviewTime": null,
              "interviewAddress": null,
              "operateId": 9095315,
              "operateName": "java",
              "operateTime": 1513848114000,
              "interviewCount": null
            }
          ],
          "currentStatus": "hr直接操作录用",  //当前状态
          "resumeProgress": 2,               //简历进度 1：成功， 2.面试， 3.入职，0：简历还没有进度
          "companyName": "java公司",         //公司名
          "interviewerName": "韩汉均",
          "updateTime": 1514947503000        //更新时间
        }*/
        console.log('getResumeHistory_data',res.data)
        _this.setData({
          data: res.data
        })
      } else {
        console.log(`weixin/getResumeHistory:${res.message}`)
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

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // }
})