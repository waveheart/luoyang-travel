// pages/arty-path/arty-path.js
var utils = require('../../utils/util.js')
var spots_data = require('../../data/spots.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loopImageUrls: [
      { name: 'longmen_grottoes', url: 'http://olzo3tk5t.bkt.clouddn.com/longmen.jpg' },
      { name: 'guanlin', url: 'http://olzo3tk5t.bkt.clouddn.com/guanlin.jpg' },
      { name: 'tumulus_museum', url: 'http://olzo3tk5t.bkt.clouddn.com/ancient_art_lib.jpg' },
      { name: 'luoyang_museum', url: 'http://olzo3tk5t.bkt.clouddn.com/jade_cup.jpg' },
      { name: '', url: 'http://olzo3tk5t.bkt.clouddn.com/mudan.jpg' },
      { name: 'emperor_carriage_museum', url: 'http://olzo3tk5t.bkt.clouddn.com/tianzijia6.jpg' },
      { name: 'white_horse_temple', url: 'http://olzo3tk5t.bkt.clouddn.com/white_horse_temple.jpg' }
    ],
    spots_data: {}
  },

  navToSpot(e) {
    let spot = e.currentTarget.dataset.spot
    utils.navToSpot(spot)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      spots_data: spots_data.spots_data
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

  to_map_location(e) {
    utils.openMap(e)
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