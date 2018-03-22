const network = require("../../../utils/network.js");
const app = getApp()
console.log(app)
// pages/mine/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection:{},
    companyId: getApp().globalData.companyId
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyPositionCollection();
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
  
  },
  //获取收藏职位列表
  getMyPositionCollection:function(){
    var _this=this;
    console.log(getApp().globalData.fansId);
    var method ="/smallProgramAudit/getMyPositionCollection.do",
        params={spFansId:getApp().globalData.fansId},
        successd=function(res){
          _this.setData({
            collection:res.data
          })
        };
    network.post(method,params,successd);
  },
  //取消收藏
  cancelCollect:function(e){
    var _this=this;
    wx.showModal({
      title: '警告',
      content: '确定取消收藏此职位?',
      success:(res)=>{
        if(res.confirm){
          var method ="/smallProgramAudit/cancleCollectPosition.do",
              param={
                spFansId: getApp().globalData.fansId,
                companyId: _this.data.companyId,
                positionId: e.target.dataset.id
              },
              successd=function(res2){
                wx.showToast({
                  title: '取消收藏成功',
                })
                _this.getMyPositionCollection();
              };
          network.post(method, param, successd);
        }
      }
    })
  }
  
})