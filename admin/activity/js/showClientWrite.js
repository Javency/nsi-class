// body高度
$(function() {
    var height = $(window).height()
    $(document.body).css("min-height", height)
})

$(function() {
    var activityList = $("#activityListDesc_container"),
        activeTitleList = $("#activeTitle"),
        activeTitle = $("#activeTitle")
    $.ajax({
        type: "post",
        dataType: "json",
        url: 'http://' + changeUrl.address + '/Class_activity?whereFrom=searchActivity',
        success: function(msg) {
            var title = [],
                theNewest = msg.data[0],
                cloneTitle = $("#cloneTitle")
            for (var i = 0; i < msg.data.length; i++) {
                activityList.append('<li class="oneline" title=' + msg.data[i].Title1 + '>' + msg.data[i].Title1 + '</li>')
            }
            for (var arr in theNewest) {
                if (theNewest[arr] !== "未填写" && theNewest[arr] !== "0" && arr !== "Id" && arr !== "Title20" && arr !== "Title1" && arr !== "Title2" && arr !== "Deadline" && arr !== "Load_time") {
                    title.push(theNewest[arr])
                }
            }
            for (var i = 0; i < title.length; i++) {
                activeTitleList.append('<th>' + title[i] + '</th>')
            }
            activeTitleList.append('<th>报名时间</th>')
            cloneTitle.append('<th>' + msg.data[0].Title3 + '</th>')

            //点击显示对应活动详情列表
            var aLi = activityList.children()
            aLi.on("click", function() {
                var data = $(this).text(),
                    _index = $(this).index()
                $(this).css({ "background": "rgb(253, 185, 140)", "color": "#FFF" }).siblings().css({ "background": "#FFF", "color": "#000" })
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: { "Title1": data },
                    url: 'http://' + changeUrl.address + '/Class_activity?whereFrom=searchActivity',
                    success: function(msg) {
                        // console.log(msg.data[_index])
                        var arrTitle = [],
                            acquireTitle = msg.data[_index]
                        for (var arr in acquireTitle) {
                            if (acquireTitle[arr] !== "未填写" && acquireTitle[arr] !== "0" && arr !== "Id" && arr !== "Title20" && arr !== "Title1" && arr !== "Title2" && arr !== "Deadline" && arr !== "Load_time") {
                                arrTitle.push(acquireTitle[arr])
                            }
                        }
                        activeTitleList.html("")
                        for (var i = 0; i < arrTitle.length; i++) {
                            activeTitleList.append('<th>' + arrTitle[i] + '</th>')
                        }
                        activeTitleList.append('<th>报名时间</th>')
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            data: { "Title1": data },
                            url: 'http://' + changeUrl.address + '/Class_activity?whereFrom=searchInformation',
                            success: function(msg) {
                                // console.log(msg.data)
                                var activeContent = $("#activeContent"),
                                    cloneTbody = $("#cloneTbody")
                                activeContent.html("")
                                cloneTbody.html("")
                                for (var i = 0; i < msg.data.length; i++) {
                                    activeContent.append('<tr></tr>')
                                    for (var j = 0; j < arrTitle.length; j++) {
                                        activeContent.children("tr").eq(i).append('<td>' + eval("msg.data[i].Content" + (j + 3)) + '</td>')
                                    }
                                    activeContent.children("tr").eq(i).append('<td>' + msg.data[i].Load_time + '</td>')
                                }
                                //报名总人数
                                $(".total").text(msg.data.length)

                                // 固定列
                                for (var i = 0; i < msg.data.length; i++) {
                                    cloneTbody.append('<tr><td>' + msg.data[i].Content3 + '<span class="paid">✔</span></td></tr>')
                                    if (msg.data[i].Content20 === "已支付") {
                                        $(".paid").eq(i).css("display", "inline-block")
                                    }
                                }
                                cloneTitle.children("th").width(activeTitle.children("th").first().width())
                                cloneTbody.children("tr").width(activeTitle.children("th").first().width())
                                cloneTbody.find("td").width(activeTitle.children("th").first().width())
                            },
                            error: function() {
                                console.log("error")
                            }
                        })
                    },
                    error: function() {
                        console.log("error")
                    }
                })

            })

            // 默认显示最新活动
            $.ajax({
                type: "post",
                dataType: "json",
                data: { "Title1": theNewest.Title1 },
                url: 'http://' + changeUrl.address + '/Class_activity?whereFrom=searchInformation',
                success: function(msg) {
                    var activeContent = $("#activeContent"),
                        cloneTbody = $("#cloneTbody")
                        // console.log(msg.data)
                    for (var i = 0; i < msg.data.length; i++) {
                        activeContent.append(`<tr></tr>`)
                        for (var j = 0; j < title.length; j++) {
                            activeContent.children("tr").eq(i).append('<td>' + eval("msg.data[i].Content" + (j + 3)) + '</td>')
                        }
                        // 报名时间
                        activeContent.children("tr").eq(i).append('<td>' + msg.data[i].Load_time + '</td>')
                    }
                    // 报名总人数
                    $(".total").text(msg.data.length)

                    // 固定列
                    for (var i = 0; i < msg.data.length; i++) {
                        cloneTbody.append('<tr><td>' + msg.data[i].Content3 + '<span class="paid">✔</span></td></tr>')
                        if (msg.data[i].Content20 === "已支付") {
                            $(".paid").eq(i).css("display", "inline-block")
                        }
                    }
                    // 标题等宽
                    // cloneTitle.width(cloneTbody.width())
                    cloneTitle.children("th").width(activeTitle.children("th").first().width())
                    cloneTbody.children("tr").width(activeTitle.children("th").first().width())
                    cloneTbody.find("td").width(activeTitle.children("th").first().width())
                },
                error: function(msg) {
                    console.log("error")
                }
            })
        },
        error: function(msg) {
            console.log("error:" + msg)
        }
    })
})

// 活动列表
$(function() {
    var hideList = $("#hideList"),
        tohide = $("#tohide"),
        activityBox = $("#activityBox")
    hideList.click(function() {
        $(this).addClass("bounceOutUp")
        activityBox.css("display", "block")
        activityBox.removeClass("bounceOutUp").addClass("bounceInDown")
    })
    tohide.click(function() {
        activityBox.removeClass("bounceInDown").addClass("bounceOutUp")
        hideList.removeClass("bounceOutUp").addClass("bounceInDown")
    })
})