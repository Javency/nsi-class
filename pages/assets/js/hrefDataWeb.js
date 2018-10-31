$(function() {
    var href = window.location.href
    var reg = new RegExp(/class.xinxueshuo.cn/)
    if (reg.test(href)) window.location.href = 'https://data.xinxueshuo.cn/nsi-class/index.html'
})