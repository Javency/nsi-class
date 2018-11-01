$(function() {
    // 随机数
    function MathRand() {
        var Num = "";
        for (var i = 0; i < 6; i++) {
            Num += Math.floor(Math.random() * 10);
        }
        return Num
    }

    // 直播链接
    function getMacList() {
        var macList = [],
            section01 = $("#section01")
        $.ajax({
            method: "get",
            data: {
                'CourseSubject': 'mac'
            },
            url: changeUrl.address + "/Class_Course_api?whereFrom=Search_Course",
            success: function(msg) {
                macList = msg.data
                    // console.log(macList)

                // 第一章
                $("#section01").append('<li class="title">第一章 市场分析</li>')
                for (var i = 0; i < 2; i++) {
                    switch (macList[i].CourseState) {
                        case "备课中":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current prepare">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></span><i class="buySingleClass">单课购买</i></a>' +
                                '</li>'
                            break;
                        case "正在直播":
                            var template = '<li>' +
                                '<a href="../macLive.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></span><i class="buySingleClass">单课购买</i></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></span><i class="buySingleClass">单课购买</i></a>' +
                                '</li>'
                            break;
                        case "查看回放":
                            var template = '<li>' +
                                '<a href="javascript:;" data-CourseId=' + macList[i].Id + ' class="current ending">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span><i class="buySingleClass">单课购买</i></a>' +
                                '</li>'
                            break;
                    }
                    $("#section01").append(template)
                }

                // 第二章
                $("#section02").append('<li class="title">第二章 品牌建设</li>')
                for (var i = 2; i < 5; i++) {
                    switch (macList[i].CourseState) {
                        case "备课中":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current prepare">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在直播":
                            var template = '<li>' +
                                '<a href="../macLive.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "查看回放":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current ending">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                    }
                    $("#section02").append(template)
                }

                // 第三章
                $("#section03").append('<li class="title">第三章 招生策略</li>')
                for (var i = 5; i < 10; i++) {
                    switch (macList[i].CourseState) {
                        case "备课中":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current prepare">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在直播":
                            var template = '<li>' +
                                '<a href="../macLive.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "查看回放":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current ending">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                    }
                    $("#section03").append(template)
                }

                // 第四章
                $("#section04").append('<li class="title">第四章 公共关系</li>')
                for (var i = 10; i < 14; i++) {
                    switch (macList[i].CourseState) {
                        case "备课中":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current prepare">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在直播":
                            var template = '<li>' +
                                '<a href="../macLive.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "查看回放":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current ending">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                    }
                    $("#section04").append(template)
                }

                var prepareList = $(".prepare"),
                    endingList = $(".ending"),
                    buySingleClassList = $(".buySingleClass")
                prepareList.each(function(i, e) {
                    $(this).click(function() {
                        layer.alert("课程备课中", { icon: 0 })
                    })
                })
                endingList.each(function(i, e) {
                    $(this).click(function() {
                        layer.alert("课程已结束，请联系课程班主任", { icon: 0 })
                    })
                })
                buySingleClassList.each(function(i, e) {
                    $(this).click(function(event) {
                        event.stopPropagation();
                        var courseId = $(this).parent().attr('data-CourseId'),
                            userMail = $.cookie('username'),
                            info = $(this).parent().text()
                        window.open('http://data.xinxueshuo.cn/pay/pay.html?paymail=' + userMail + '&payfee=0.01&groom=nop&payinfo=MAC-' + info + '&random=' + MathRand() + '&CallbackUrl=https://data.xinxueshuo.cn/nsi-class/pages/mac.html*success')
                    })
                })
            }
        })
    }
    getMacList()
})