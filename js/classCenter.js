$(function() {
    //判断是否移动端
    var IsMobile = false;

    function browserRedirect() {
        //只读的字符串，声明了浏览器用于 HTTP 请求的用户代理头的值
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            IsMobile = true;
            // window.location.replace(url);
        }
    }

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
            for (var i = 0; i < msg.data.length; i++) {
                var courseTemplate = '<div class="col-md-3 col-sm-6 mb40">' +
                    '<div class="CourseContainer">' +
                    '<a href="./detailClass.html?Id=' + msg.data[i].Id + '" target="_blank">' +
                    '<div class="Course Course-up">' +
                    '<img src="' + msg.data[i].CoverImage + '" alt="">' +
                    '<div class="state">' + msg.data[i].CourseState + '</div>' +
                    '</div>' +
                    '<div class="Course Course-mid"><img src="' + msg.data[i].CoverImage + '" alt=""></div>' +
                    '<div class="Course Course-down"><img src="' + msg.data[i].CoverImage + '" alt=""></div>' +
                    '</a>' +
                    '<div class="CourseInfo">' +
                    '<p class="mtb5 oneline"><span class="CourseName" title="' + msg.data[i].CourseName + '">' + msg.data[i].CourseName + '</span></p>' +
                    '<p class="mtb5 twoline"><span class="CourseDesc" title="' + msg.data[i].CourseDescription + '">' + msg.data[i].CourseDescription + '</span></p>' +
                    '<p class="mtb5">开课时间：<span class="CourseTime">' + msg.data[i].ClassBegins + '</span></p>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                CourseContainer.append(courseTemplate)
            }
            var aState = $(".state")
            for (var i = 0; i < aState.length; i++) {
                switch (aState.eq(i).text()) {
                    case "查看回放":
                        aState.eq(i).addClass("viewBack")
                        browserRedirect()
                        if (IsMobile) {
                            $('.CourseInfo').click(function() {
                                if ($(this).siblings().children('.Course-up').children().hasClass('viewBack')) {
                                    console.log(1)
                                    var _href = $(this).siblings().attr('href')
                                    window.open(_href)
                                }
                            })
                        }
                        break;
                    case "正在直播":
                        aState.eq(i).addClass("new animated tada infinite")
                        browserRedirect()
                        if (IsMobile) {
                            $('.CourseInfo').click(function() {
                                if ($(this).siblings().children('.Course-up').children().hasClass('new')) {
                                    var _href = $(this).siblings().attr('href')
                                    window.open(_href)
                                }
                            })
                        }
                        break;
                    case "直播回放":
                        aState.eq(i).addClass("new animated tada infinite")
                        browserRedirect()
                        if (IsMobile) {
                            $('.CourseInfo').click(function() {
                                if ($(this).siblings().children('.Course-up').children().hasClass('new')) {
                                    var _href = $(this).siblings().attr('href')
                                    window.open(_href)
                                }
                            })
                        }
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
                    case "正在回放":
                        aState.eq(i).addClass("viewBack animated")
                        browserRedirect()
                        if (IsMobile) {
                            $('.CourseInfo').click(function() {
                                if ($(this).siblings().children('.Course-up').children().hasClass('new')) {
                                    var _href = $(this).siblings().attr('href')
                                    window.open(_href)
                                }
                            })
                        }
                        break;
                }
            }

            browserRedirect()
            if (IsMobile) {
                $('.Course-up').addClass('col-xs-5')
            } else {
                $('.Course-up').removeClass('col-xs-5')
            }

        },
        error: function(msg) {
            console.log("error:" + msg)
        }
    })
})