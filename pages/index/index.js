//index.js
//获取应用实例
const app = getApp()
// 
// var utils = require('../../utils/util.js')

Page({
  data: {
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../arty-path/arty-path'
    })
  },
  bindViewTap1: function() {
    wx.navigateTo({
      url: '../overview/overview'
    })
  },

  navTo(e) {
    let page = e.currentTarget.dataset.name
    if (!page) {
      return
    }
    wx.navigateTo({
      url: '/pages/' + page + '/' + page ,
    })
  },

  onLoad: function () {
    
  }
  
})
