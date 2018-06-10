var database = require('../../data/local-data.js')
var utils = require('../../utils/util.js')

let timer = 0 

Page({
  data: {
    toView: '',
    currentIndex: 1,
    item_width: 0,
    item_gap: 0,
    scroll_data: [],
    // map参数
    scale: 16,
    markers: []
  },

  markertap(e) {
    // console.log(e.markerId)
    let length = this.data.markers.length
    this.scaleToNormal()
    let index = (e.markerId - 1 + length) % length
    this.setData({
      toView: 'item' + index
    })
  },

  onLoad() {
    let data = database.local_database
    let scroll_data = []
    let markers = []
    Object.keys(data).forEach((item,index) => {
      let dataObj = {
        name: item,
        chs_name: data[item].name,
        img_url: data[item].header_loop_imgs[0],
        map_location: data[item].map_location
      }
      scroll_data.push(dataObj)
      
      let marker = {
        iconPath: "",
        id: index,
        latitude: data[item].map_location.latitude,
        longitude: data[item].map_location.longitude,
        width: 30,
        height: 30
      }
      markers.push(marker)
    })
    // console.log(scroll_data.length)
    // console.log(markers)
    this.setData({
      scroll_data: scroll_data,
      markers: markers
    })
  },

  test() {
    this.setData({
      toView: 'item0'
    })
  },

  upper(e) {
    let length = this.data.scroll_data.length
    // 注意这里的index并不是中间图片的index，而是最左的那个
    let toview = 'item' + (length - 2)
    setTimeout(() => {
      this.setData({
        toView: toview
      })
    },30)
    // console.log(this.data.currentIndex)
  },

  lower() {
    setTimeout(() => {
      this.setData({
        toView: 'start_blank1'
      })
    }, 30)
  },

  onReady () {
    this.setData({
      toView: 'start_blank1'
    })
    
  },

  scroll: function (e) {
    this.scaleToNormal()

    let left = e.detail.scrollLeft
    let length = this.data.scroll_data.length
    // console.log(left)


    if (!this.data.item_width) {
      this.setData({
        item_width: left - (left * (length + 4) - e.detail.scrollWidth),
        item_gap: left * (length + 4) - e.detail.scrollWidth
      })
    }
    // console.log(e)
    // console.log(this.data.item_width, this.data.item_gap)
    let item_sum_width = this.data.item_width + this.data.item_gap
    let index = Math.floor((left + item_sum_width + this.data.item_width / 2) / item_sum_width) - 2
    // console.log(left)

    index = (index + length) % length
    this.setData({
      currentIndex: index
    })
    // console.log(this.data.currentIndex)
  },

  navTo(e) {
    let spot = e.currentTarget.dataset.name
    utils.navToSpot(spot)
  },

  scaleToNormal() {
    if (this.scale != 16) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        this.setData({
          scale: 16
        })
      }, 500)
    }
  }

})