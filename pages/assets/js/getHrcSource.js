$(function() {
    // 直播链接
    function getMacList() {
        var macList = [],
            section01 = $("#section01")

        function addZero(num) {
            return num < 10 ? ('0' + num) : num
        }

        $.ajax({
            method: "get",
            data: {
                'CourseSubject': 'hrc'
            },
            url: changeUrl.address + "/Class_Course_api?whereFrom=Search_Course",
            success: function(msg) {
                macList = msg.data
                    // console.log(macList)

                // 第一章
                $("#section01").append('<li class="title">第一章 国际学校人力资源规划与构建</li>')

                for (var i = 0; i < 3; i++) {
                    switch (macList[i].CourseState) {
                        case "备课中":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current prepare">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在直播":
                            var template = '<li>' +
                                '<a href="../macLive.html?Id=' + macList[i].Id + '" data-courseId="' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" data-courseId="' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "回放结束":
                            var template = '<li>' +
                                '<a href="javascript:;' + macList[i].Id + '" class="current ending">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                    }
                    $("#section01").append(template)
                }

                // 第二章
                $("#section02").append('<li class="title">第二章 外籍员工招聘与管理</li>')
                for (var i = 3; i < 8; i++) {
                    switch (macList[i].CourseState) {
                        case "备课中":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current prepare">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在直播":
                            var template = '<li>' +
                                '<a href="../macLive.html?Id=' + macList[i].Id + '" data-courseId="' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" data-courseId="' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "回放结束":
                            var template = '<li>' +
                                '<a href="javascript:;' + macList[i].Id + '" class="current ending">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                    }
                    $("#section02").append(template)
                }

                // 第三章
                $("#section03").append('<li class="title">第三章 薪酬福利与绩效</li>')
                for (var i = 8; i < 11; i++) {
                    switch (macList[i].CourseState) {
                        case "备课中":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current prepare">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在直播":
                            var template = '<li>' +
                                '<a href="../macLive.html?Id=' + macList[i].Id + '" data-courseId="' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" data-courseId="' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "回放结束":
                            var template = '<li>' +
                                '<a href="javascript:;' + macList[i].Id + '" class="current ending">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                    }
                    $("#section03").append(template)
                }

                // 第四章
                $("#section04").append('<li class="title">第四章 培训与发展</li>')
                for (var i = 11; i < 13; i++) {
                    switch (macList[i].CourseState) {
                        case "备课中":
                            var template = '<li>' +
                                '<a href="javascript:;" class="current prepare">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在直播":
                            var template = '<li>' +
                                '<a href="../macLive.html?Id=' + macList[i].Id + '" data-courseId="' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "正在回放":
                            var template = '<li>' +
                                '<a href="../recorded.html?Id=' + macList[i].Id + '" data-courseId="' + macList[i].Id + '" class="current living">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                        case "回放结束":
                            var template = '<li>' +
                                '<a href="javascript:;' + macList[i].Id + '" class="current ending">' + addZero((i + 1)) + '<span></span>' + macList[i].CourseName + '&nbsp;<span class="iconfont icon-iconbofang"></span></a>' +
                                '</li>'
                            break;
                    }
                    $("#section04").append(template)
                }

                // $.ajax({
                //     type: "POST",
                //     dataType: "json",
                //     data: '10001',
                //     async: true,
                //     url: changeUrl.address + '/Class_User_api?whereFrom=Verification',
                //     success: function(msg) {
                //         if (msg.msg <= 0) {
                //             $(".icon-iconbofang").removeClass('icon-iconbofang').addClass('icon-suo')
                //         }
                //     }
                // })

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