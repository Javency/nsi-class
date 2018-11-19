$(function() {
    // 随机数
    function MathRand() {
        var Num = "";
        for (var i = 0; i < 6; i++) {
            Num += Math.floor(Math.random() * 10);
        }
        return Num
    }

    function addZero(num) {
        return num < 10 ? ('0' + num) : num
    }

    // 直播链接
    function getMacList() {
        var macList = [],
            section01 = $("#section01"),
            section02 = $("#section02"),
            section03 = $("#section03"),
            section04 = $("#section04"),
            loading = $("#loading")
        $.ajax({
            type: "get",
            data: {
                'CourseSubject': 'mac'
            },
            url: changeUrl.address + "/Class_Course_api?whereFrom=Search_Course",
            success: function(msg) {
                macList = msg.data
                    // console.log(macList)

                // 第一章
                section01.append('<li class="title">第一章 市场分析</li>')
                for (var i = 0; i < 2; i++) {
                    switch (macList[i].CourseState) {
                        case "备课中":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current prepare">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                        case "正在直播":
                            var template = '<li>' +
                                '<a href="../macLive.html?Id=' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                        case "查看回放":
                            var template = '<li>' +
                                '<a href="javascript:;" data-CourseId=' + macList[i].Id + ' class="current ending">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                    }
                    section01.append(template)
                }

                // 第二章
                section02.append('<li class="title">第二章 品牌建设</li>')
                for (var i = 2; i < 5; i++) {
                    switch (macList[i].CourseState) {
                        case "备课中":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current prepare">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                        case "正在直播":
                            var template = '<li>' +
                                '<a href="../macLive.html?Id=' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                        case "查看回放":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current ending">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                    }
                    section02.append(template)
                }

                // 第三章
                section03.append('<li class="title">第三章 招生策略</li>')
                for (var i = 5; i < 10; i++) {
                    switch (macList[i].CourseState) {
                        case "备课中":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current prepare">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                        case "正在直播":
                            var template = '<li>' +
                                '<a href="../macLive.html?Id=' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                        case "查看回放":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current ending">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                    }
                    section03.append(template)
                }

                // 第四章
                section04.append('<li class="title">第四章 公共关系</li>')
                for (var i = 10; i < 14; i++) {
                    switch (macList[i].CourseState) {
                        case "备课中":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current prepare">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                        case "正在直播":
                            var template = '<li>' +
                                '<a href="../macLive.html?Id=' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                        case "查看回放":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current ending">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-suo"></span><i class="buySingleClass" id=' + macList[i].Id + '>单课购买</i></a>' +
                                '</li>'
                            break;
                    }
                    section04.append(template)
                }

                // 查询已购买课程
                var buySingleClassList = $(".buySingleClass")
                $.ajax({
                    type: "POST",
                    data: {
                        'UserMail': $.cookie('username'),
                    },
                    dataType: "json",
                    url: changeUrl.address + '/Class_Course_api?whereFrom=MyCourse',
                    success: function(msg) {

                        for (var i = 0; i < msg.data.length; i++) {
                            // 单节课程购买成功
                            $('#' + msg.data[i].Id).text('立即观看').removeClass('buySingleClass').addClass('allowWatch')
                            $('#' + msg.data[i].Id).siblings('.icon-suo').removeClass('icon-suo').addClass('icon-iconbofang')

                        }

                        // 未购买的单节课程列表
                        buySingleClassList = $(".buySingleClass")
                            // console.log(buySingleClassList)
                        buySingleClassList.each(function(i, e) {
                            $(this).click(function(event) {
                                event.stopPropagation();
                                layer.alert("购买单节课程，请联系课程班主任，</br>15010927730 微信同号", { icon: 0 })
                                return false;
                                // event.stopPropagation();
                                // var courseId = $(this).parent().attr('data-CourseId'),
                                //     userMail = $.cookie('username'),
                                //     info = $(this).parent().text()
                                // window.open('http://data.xinxueshuo.cn/pay/pay.html?paymail=' + userMail + '&payfee=399&groom=nop&payinfo=MAC-' + info + '&random=' + MathRand() + '&CallbackUrl=https://data.xinxueshuo.cn/nsi-class/pages/mac.html')
                                // return false;
                            })
                        })

                        var allowWatchList = $(".allowWatch")
                        allowWatchList.each(function(i, e) {
                            $(this).click(function() {
                                var _courseId = $(this).attr('id')
                                window.location.href = '../recorded.html?Id=' + _courseId
                            })
                        })

                        // loading结束
                        loading.fadeOut(200)

                        var suoList = $(".icon-suo")
                        suoList.each(function(i, e) {
                            $(this).parent().attr('href', 'javascript:;').unbind('click').click(function(event) {
                                event.stopPropagation()
                                layer.alert("您未购买该课程", { icon: 4 })
                                return false;
                            })
                        })
                    }
                })

                var prepareList = $(".prepare"),
                    endingList = $(".ending")
                    // buySingleClassList = $(".buySingleClass")
                    // console.log(buySingleClassList)

                prepareList.each(function(i, e) {
                    $(this).unbind('click').click(function(event) {
                        event.stopPropagation()
                        layer.alert("课程备课中", { icon: 0 })
                        return false;
                    })
                })
                endingList.each(function(i, e) {
                    $(this).click(function() {
                        layer.alert("课程已结束，请联系课程班主任", { icon: 0 })
                        return false;
                    })
                })

            }
        })
    }
    getMacList()
})