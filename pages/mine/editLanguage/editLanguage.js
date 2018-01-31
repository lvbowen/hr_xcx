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
    langLevels:[
      { name:"初级(入门)",value:1},
      { name: "中级(日常会话)", value: 2 },
      { name: "中高级(商务会话)", value: 3 },
      { name: "高级(无障碍商务沟通)", value: 4 },
    ],
    model: [],   //levelIndex: 数组langLevels的索引值
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
   * 显隐关闭icon和清空输入框内容
   */
  operateInput:function(e){
    let index = e.currentTarget.dataset.index;
    let event = e.currentTarget.dataset.event;
    switch(event){
      case 'input':
        this.setData({
          ['model[' + index + '].languageSkill']: e.detail.value
        }) 
        break;
      case 'clear':
        this.setData({
          ['model[' + index + '].languageSkill']:''
        })
        break;
      default:
        break;
    }
    console.log(this.data.model)
  },
  /**
  * 选择熟练程度
  */
  bindLevelChange: function (e) {
    let index = e.currentTarget.dataset.index;    //number 类型
    let levelIndex = parseInt(e.detail.value);    //e.detail.value值是string类型（不转换也不会出错）
    this.setData({
      ['model[' + index + '].levelIndex']: levelIndex
    })
    console.log(this.data.model)
  },
  /**
   * 删除某一项
   */
  del:function(e){
    let index = e.currentTarget.dataset.index;
    this.data.model.splice(index,1);
    this.setData({
      model:this.data.model
    })
    console.log(this.data.model)
  },
  /**
   * 新增一项
   */
  add:function(){
    let model = this.data.model
    model.push({
      languageSkill:'',
      levelIndex:0
    })
    this.setData({
      model: model
    })
    console.log(this.data.model)
  },
  /**
   * 完成保存
   */
  save:function(){
    let _this = this
    let defineModel = this.data.model, model = [], isLegal = true;
    defineModel.forEach((item,index) => {
      if (!item.languageSkill){
        utils.toggleToast(_this, "请完成语言信息")
        isLegal = false
        return
      }else{
        model.push({ languageSkill: item.languageSkill, languageLevel: _this.data.langLevels[item.levelIndex].name})
      }
    })
    if(isLegal){
      //network request


      console.log('请求参数model', model)
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