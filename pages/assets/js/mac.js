$(function() {

    var tabCourseList = $("#tabCourseList")

    $.ajax({
        method: "get",
        url: changeUrl.address + "/Class_Course_api?whereFrom=Search_Course",
        success: function(msg) {
            // console.log(msg.data)
            tabCourseList.html('')
            var moreTemplate = '<li class="text-center moreBox" id="more"><span class="iconfont icon-shuangjiantou more"></span></li>'
            for (var i = 5; i < msg.data.length; i++) {
                var template = '<li>' +
                    '<a href="javascript:;" class="tabCurrent">' + (i + 1) + " " + msg.data[i].CourseName + '</a>' +
                    '</li>'
                tabCourseList.append(template)
            }
            tabCourseList.append(moreTemplate)

            $("#more").click(function() {
                $("#more").hide(0)
                tabCourseList.css("height", "auto")
                $.ajax({
                    method: "get",
                    url: changeUrl.address + "/Class_Course_api?whereFrom=Search_Course",
                    success: function(msg) {
                        // console.log(msg.data)
                        tabCourseList.html('')
                        for (var i = 0; i < msg.data.length; i++) {
                            var template = '<li>' +
                                '<a href="javascript:;" class="tabCurrent">' + (i + 1) + " " + msg.data[i].CourseName + '</a>' +
                                '</li>'
                            tabCourseList.append(template)
                        }
                    }
                })
            })
        }
    })
})