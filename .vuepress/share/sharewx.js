function shareWeixin (params) {
  var url = encodeURIComponent(window.location.href.split('#')[0])
  // alert(window.location.href.split('#')[0])
  getWXSignature(url, params)
}

function shareContent (params) {
  var title = document.title || '前端学习圈'
  var desc = 'heny前端学习圈'
  var imgUrl = 'https://notecdn.heny.vip/weblearns.png'
  var linkUrl = window.location.href

  if (params) {
    title = params.title || title
    desc = params.desc || desc
    imgUrl = params.imgUrl || imgUrl
    linkUrl = params.linkUrl || linkUrl
  }

  window.wx.ready(function () {
    alert('ready')
    console.log('分享的内容#', params)
    //需在用户可能点击分享按钮前就先调用
    window.wx.updateAppMessageShareData({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户点击了分享后执行的回调函数
        console.log('成功分享给朋友')
      }
    })

    // 分享到朋友圈及qq空间
    window.wx.updateTimelineShareData({
      title: title, // 分享标题
      link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户点击了分享后执行的回调函数
        console.log('成功分享到朋友圈')
      }
    })
  })
  window.wx.error(function(){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    // alert('签名失败')
  });
}

function getWXSignature (url, params) {
  var xhr = new XMLHttpRequest()
  xhr.open('get', 'https://mpwx.heny.vip/getSignature?url=' + url, true)
  xhr.send()
  xhr.onload = function(){
    var res = JSON.parse(xhr.response)
    if(res.code === 1 && res.result){
      console.log('请求成功：' + xhr.response)
      initJSSDk(params, res.result)
    }
  }
  xhr.onerror = function(){
    // alert('请求出错了')
  }
}

function initJSSDk (params, data) {
  console.log(JSON.stringify(data, null, 2))
  window.wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxe3550d862292b3ad', // 必填，公众号的唯一标识（uat和生产环境不同）
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.noncestr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名
    jsApiList: [
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareTimeline',
      'onMenuShareAppMessage'
    ] // 必填，需要使用的JS接口列表
  })
  shareContent(params, data)
}
