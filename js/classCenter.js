$(function() {
    var CourseContainer = $("#CourseContainer")
    $.ajax({
        type: "get",
        async: false,
        data: "",
        dataType : "json",
        contentType: "application/json;charset=UTF-8",
        url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Search_Course',
        success: function(msg) {
            console.log(msg.data)
            for (var i = 0; i < 4; i++) {
                CourseContainer.append(`
                        <div class="col-md-3 col-sm-6">
                            <div class="CourseContainer">
                                <a href="javascript:;" target="_">
                                    <div class="Course Course-up">
                                        <img src="${msg.data[i].CoverImage}" alt="">
                                        <div class="state">${msg.data[i].CourseState}</div>
                                    </div>
                                    <div class="Course Course-mid"><img src="${msg.data[i].CoverImage}" alt=""></div>
                                    <div class="Course Course-down"><img src="${msg.data[i].CoverImage}" alt=""></div>
                                </a>
                                <div class="CourseInfo">
                                    <p class="mtb5 oneline"><span class="CourseName">${msg.data[i].CourseName}</span></p>
                                    <p class="mtb5 twoline"><span class="CourseDesc" title="${msg.data[i].CourseDescription}">${msg.data[i].CourseDescription}</span></p>
                                    <p class="mtb5">开课时间：<span class="CourseTime">${msg.data[i].ClassBegins}</span></p>
                                </div>
                            </div>
                        </div>
                    `)
            }
            var aState = $(".state")
            for (var i = 0; i < aState.length; i++) {
                switch (aState.eq(i).text()) {
                    case "查看回放":
                        aState.eq(i).addClass("viewBack")
                        break;
                    case "正在直播":
                        aState.eq(i).addClass("new animated tada infinite")
                        break;
                    case "备课中":
                        aState.eq(i).addClass("makepreparations")
                        aState.eq(i).parent().parent().click(function() {
                            _this = $(this)
                            layer.msg('课程备课中，敬请期待！', {
                                time: 1000
                            })
                            return false;
                        })
                        break;
                }
            }

            var aCourse = $("#CourseContainer").children()
            aCourse.on("click", function() {
                var courseId = msg.data[$(this).index()].Id
                window.location = "./detailClass.html?Id=" + courseId
            })

        },
        error: function(msg) {
            console.log("error:" + msg)
        }
    })
})