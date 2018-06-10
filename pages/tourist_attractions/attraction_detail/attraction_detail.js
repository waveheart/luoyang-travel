// pages/tourist_attractions/longmen/longmen.js
let utils = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scene_info: {},
    scene_transit: [],
    current_nav_item_id: 0,
    nav_items: [
      {
        item_type: 'attraction_summary',
        item_name: '景点简介',
        item_class: 'icon-image'
      }, 
      {
        item_type: 'restaurant_recommend',
        item_name: '饮食推荐',
        item_class: 'icon-filter'
      },
      {
        item_type: 'attraction_transportation',
        item_name: '公共交通',
        item_class: 'icon-line'
      },
      {
        item_type: 'attraction_main_site',
        item_name: '主要看点',
        item_class: 'icon-camera'
      },
      {
        item_type: 'attrction_location',
        item_name: '地图位置',
        item_class: 'icon-position'
      },
    ],
    loopImageUrls: []
  },

  navToAttractionInfo(e) {
    let nav_to_item_id = e.currentTarget.dataset.index
    this.setData({
      current_nav_item_id: nav_to_item_id
    })
  },

  to_map_location(e) {
    utils.openMap(e)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let database = require("../../../data/local-data.js")
    let place = options.place
    let data = database.local_database[place]
    wx.setNavigationBarTitle({
      title: data.name,
    })
    this.setData({
      loopImageUrls: data.header_loop_imgs,
      scene_info: data
    })
    this.setData({
      scene_transit: utils.place_transit(place)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.split = this.selectComponent("#split");
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
    // console.log('hide')
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