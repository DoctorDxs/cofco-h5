// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './api'
Vue.prototype.$axios = axios
// rem h5 适配
import 'amfe-flexible/index.js'

// axios.getSign().then(res => {
//   console.log(res.jsApiList)
//   wx.config({
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: res.appId, // 必填，公众号的唯一标识
//     timestamp: res.timestamp, // 必填，生成签名的时间戳
//     nonceStr: res.nonceStr, // 必填，生成签名的随机串
//     signature: res.signature,// 必填，签名
//     jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
//   });

//   wx.ready(function(){
//     wx.onMenuShareTimeline({
//       title: '555555', // 分享标题
//       link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//       imgUrl: '', // 分享图标
//       success: function () {
//       // 用户点击了分享后执行的回调函数
//       },
//     })

//     wx.onMenuShareAppMessage({
//       title: 'asdfffffffffff', // 分享标题
//       desc: 'sdddddddd', // 分享描述
//       link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//       imgUrl: '', // 分享图标
//       type: '', // 分享类型,music、video或link，不填默认为link
//       dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//       success: function () {
//       // 用户点击了分享后执行的回调函数
//       }
//     });

//   });

// })



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
