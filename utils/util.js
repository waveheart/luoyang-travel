const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const navToSpot = (spot) => {
  if (!spot) {
    wx.showModal({
      title: '暂无内容',
      content: '作者还没来得及添加这个景点的内容就饿死了，T_T',
      showCancel: false
    })
    return 
  }
  wx.navigateTo({
    url: '/pages/tourist_attractions/attraction_detail/attraction_detail?place=' + spot,
    success: function (res) { },
    fail: function (res) { 
      wx.navigateBack({
        url: '/pages/index'
      })
    },
    complete: function (res) { },
  })
}

const openMap = (e) => {
  if (!e.currentTarget.dataset.latitude || !e.currentTarget.dataset.longitude) {
    return 
  }
  wx.openLocation({
    latitude: e.currentTarget.dataset.latitude - 0,
    longitude: e.currentTarget.dataset.longitude - 0,
    scale: 20
  })
}

const TRANSLATE_PLACE = {
  luoyang_station: '洛阳火车站',
  tumulus_museum: '洛阳古代艺术博物馆',
  emperor_carriage_museum: "天子驾六博物馆",
  crossing_street: '丽景门景区',
  luoyang_museum: '洛阳博物馆',
  longmen_station: '洛阳龙门站',
  longmen_grottoes: '龙门石窟',
  guanlin: '关林',
  white_horse_temple: '白马寺'
}

const OTHER_TRANSLATE_PLACE = {
  
}

const PUBLIC_TRANSIT = [
  {
    name: "luoyang_station",
    terminal: {
      tumulus_museum: '83/926',
      emperor_carriage_museum: "41/33/55",
      crossing_street: '5/56',
      luoyang_museum: '77',
      longmen_station: '33/77',
      longmen_grottoes: '81',
      guanlin: '81',
      white_horse_temple: '56'
    }
  },
  {
    name: "tumulus_museum",
    terminal: {
      emperor_carriage_museum: '83',
      crossing_street: [926,56],
      luoyang_museum: [27,37],
      longmen_station: [926,77],
      longmen_grottoes: [926,81],
      guanlin: [926, 81],
      white_horse_temple: [926, 56]
    }
  },
  {
    name: "emperor_carriage_museum",
    terminal: {
      crossing_street: '4/5/56/9/22/101',
      luoyang_museum: '37/77',
      longmen_station: '77',
      longmen_grottoes: '81',
      guanlin: '81',
      white_horse_temple: '56'
    }
  },
  {
    name: "crossing_street",
    terminal: {
      luoyang_museum: [9,77],
      longmen_station: '49/76',
      longmen_grottoes: '53',
      guanlin: '58',
      white_horse_temple: '58/56'
    }
  },
  {
    name: "luoyang_museum",
    terminal: {
      longmen_station: '77',
      longmen_grottoes: [37,60],
      guanlin: '37',
      white_horse_temple: [49,56]
    }
  },
  {
    name: "longmen_station",
    terminal: {
      longmen_grottoes: '71',
      guanlin: '167环线/67环线',
      white_horse_temple: [76,58]
    }
  },
  {
    name: "longmen_grottoes",
    terminal: {
      guanlin: '99/53/60',
      white_horse_temple: [60, 58]
    }
  },
  {
    name: "guanlin",
    terminal: {
      white_horse_temple: '58'
    }
  }
]

const place_transit = (start) => {
  let arr = []
  for (let i = 0; i < PUBLIC_TRANSIT.length; i++ ) {
    let station = PUBLIC_TRANSIT[i]
    let terminal = station.terminal
    if (station.name === start) {
      Object.keys(terminal).forEach(destination => {
        if (typeof terminal[destination] === 'string' || typeof terminal[destination] === 'number' ) {
          arr.push(`${start}至${destination}: ${terminal[destination]}路`)
        } else {
          arr.push(`${start}至${destination}: ${terminal[destination][0]}路转${terminal[destination][1]}路`)
        }
      })
    } else {
      Object.keys(terminal).forEach(destination => {
        if (destination === start) {
          if (typeof terminal[destination] === 'string' || typeof terminal[destination] === 'number' ) {
            arr.push(`${start}至${station.name}:${terminal[destination]}路`)
          } else {
            arr.push(`${start}至${station.name}:${terminal[destination][1]}路转${terminal[destination][0]}路`)
          }
        }
      })
    }
  }
  TRANSLATE(arr)
  if (arr.length === 0) {
    arr.push('暂无数据，建议使用百度地图搜索')
  }
  return arr
}

const TRANSLATE = function(arr) {
  Object.keys(TRANSLATE_PLACE).forEach(key => {
    arr.forEach((item,index) => {
      arr[index] = item.replace(key, TRANSLATE_PLACE[key])
    })
  })
}

module.exports = {
  formatTime: formatTime,
  navToSpot,
  place_transit,
  openMap
}
