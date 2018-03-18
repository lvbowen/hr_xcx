// pages/mine/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
    // wx.drawCanvas({
    //   canvasId:'firstCanvas',
    //   reserve:true,
    // })
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext('context')
    wx.downloadFile({
      url:'https://aijuhr.com/images/xcx/company_share.png',
      success:function(res){
        console.log(res.tempFilePath);
        context.drawImage(res.tempFilePath,0,0,375,700);
        context.draw();
        context.setFontSize(20);
        context.setFillStyle('#ff0000');
        context.fillText('Hello', 20, 20);
        context.fillText('Hello', 20, 40);
        context.fillText('Hello', 20, 60);
        context.fillText('Hello', 20, 80);
        context.fillText('Hello', 20, 100);
        context.fillText('Mssssssssssssnnn \n asdsadsssssssssssssssssssssssssssssssssssssssssssssssINA', 100, 100);
        context.draw(true)
      }
    })
    
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
  clickShare:function(){
    wx.canvasToTempFilePath({
      canvasId: 'context',
      fileType:'jpg',
      quality:'1',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res2) {
            console.log(res2);
          },
          fail(res2){
            console.log(res2);
          }
        })
      }
    })
  }
})