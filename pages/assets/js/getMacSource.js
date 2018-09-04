$(function() {
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
                                '<a href="javascript:;" class="current prepare">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在直播":
                            var template = '<li>' +
                                '<a href="../live.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "回放结束":
                            var template = '<li>' +
                                '<a href="javascript:;' + macList[i].Id + '" class="current ending">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
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
                                '<a href="../live.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "回放结束":
                            var template = '<li>' +
                                '<a href="javascript:;' + macList[i].Id + '" class="current ending">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
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
                                '<a href="../live.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "回放结束":
                            var template = '<li>' +
                                '<a href="javascript:;' + macList[i].Id + '" class="current ending">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
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
                                '<a href="../live.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" class="current living">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "回放结束":
                            var template = '<li>' +
                                '<a href="javascript:;' + macList[i].Id + '" class="current ending">' + (i + 1) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                    }
                    $("#section04").append(template)
                }

                var prepareList = $(".prepare"),
                    endingList = $(".ending")
                prepareList.each(function(i, e) {
                    $(this).click(function() {
                        layer.alert("课程备课中", { icon: 0 })
                    })
                })
                endingList.each(function(i, e) {
                    $(this).click(function() {
                        layer.alert("课程已结束", { icon: 0 })
                    })
                })
            }
        })
    }
    getMacList()
})