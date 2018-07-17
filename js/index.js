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


// 导航条部分
$(function() {
    function isLogin() {
        var $login = $("#login"),
            personalClass = $("#personalClass"),
            exit = $("#exit")
        if ($.cookie('username') === undefined) {
            $login.text("登录 / 注册")
            $login.parent().attr("href", "./login.html")
            personalClass.parent().css("display", "none")
            exit.parent().css("display", "none")
        } else {
            $login.text($.cookie('User_TureName'))
            $login.parent().attr("href", "./personalCenter.html")
            exit.parent().css("display", "inline-block")
        }
    }
    isLogin();
})

// 轮播部分
$(function() {
    var swiper = new Swiper('.swiper-container', {
        autoplay: {
            disableOnInteraction: false,
        },
        loop: true,
        spaceBetween: 30,
        effect: 'fade',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
})

// 回到顶部
$(function() {
    var backtoTop = $("#backtoTop")
    $(window).scroll(function() {
        var sc = $(window).scrollTop();
        if (sc > 0) {
            backtoTop.fadeIn(200)
        } else {
            backtoTop.fadeOut(200)
        }
    })

    backtoTop.on("click", function() {
        $('body,html').animate({ scrollTop: 0 }, 500);
    })
})

//退出登录
$(function() {
    var exit = $("#exit")

    function exitLogin() {
        $.cookie('member_sign', null, { expires: -1, path: '/' });
        $.cookie('username', null, { expires: -1, path: '/' });
        $.cookie('User_TureName', null, { expires: -1, path: '/' });
        $.cookie('userVerifyCode', null, { expires: -1, path: '/' });
        window.location.href = './index.html'
    }

    exit.on("click", function() {
        exitLogin()
    })
})


//正在直播部分
$(function() {
    // 直播标题
    var playVideo_title = $("#playVideo_title"),
        // 课堂时间
        classTime = $("#classTime"),
        // 讲师姓名
        teacherName = $("#teacherName"),
        // 主讲课程
        majorCourse = $("#majorCourse"),
        // 讲师简介
        teacherNow = $("#teacherNow"),
        // 讲师图片
        teacherImg = $("#teacherImg"),
        // 直播地址
        enterVideo = $("#enterVideo"),
        //导航条正在直播
        living = $("#living")
    $.ajax({
        type: "POST",
        dataType: "json",
        url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=showInformation',
        success: function(msg) {
            // console.log(msg.data1)
            living.attr("href", "./live.html?Id=" + msg.data1[0].Id)
            enterVideo.attr("href", "./live.html?Id=" + msg.data1[0].Id)
            teacherImg.attr("src", msg.data2[0].TeacherImage)
            playVideo_title.text(msg.data1[0].CourseName)
            playVideo_title.attr("title", msg.data1[0].CourseName)
            classTime.text(msg.data1[0].ClassBegins)
            teacherName.text(msg.data2[0].TeacherName)
            majorCourse.text(msg.data2[0].TeacherCourse)
            majorCourse.attr("title", msg.data2[0].TeacherCourse)
            teacherNow.text(msg.data2[0].TeacherDescription)
            teacherNow.attr("title", msg.data2[0].TeacherDescription)
        }
    })
})

// 课程列表部分
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
            // console.log(msg.data)
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
                    case "备课中":
                        aState.eq(i).addClass("makepreparations")
                        aState.eq(i).parent().parent().parent().click(function() {
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
                                if ($(this).siblings().children('.Course-up').children().hasClass('viewBack')) {
                                    var _href = $(this).siblings().attr('href')
                                    window.open(_href)
                                }
                            })
                        }
                        break;
                }
            }

            // 移动端样式
            // browserRedirect()
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

// 大课程备课中
$(function() {
    var classStatusPrepare = $(".classStatus-prepare").parent().parent().parent().find(".CourseContainer")
    var aLi = classStatusPrepare
    aLi.click(function() {
        layer.msg('课程备课中，敬请期待！', {
            time: 1000
        })
    })
})

// 教师列表
$(function() {
    var teacherList = $("#teacherList")
    $.ajax({
        data: "",
        url: 'http://' + changeUrl.address + '/Class_Teacher_api?whereFrom=search',
        success: function(msg) {
            // console.log(msg.data)
            // 默认加载
            var arr = msg.data,
                arrNew = arr.splice(0, 4)
            for (var i = 0; i < arrNew.length; i++) {
                arr.push(arrNew[i])
            }
            autoShow(arrNew)
            var timer = setInterval(autoUp, 5000)

            function autoUp() {
                arrNew = []
                arrNew = arr.splice(0, 4)
                for (var i = 0; i < arrNew.length; i++) {
                    arr.push(arrNew[i])
                }
                autoShow(arrNew)
                var aBox = $(".lecturer")
                    // for (var i = 0; i < aBox.length; i++) {
                    //     // aBox.eq(i).css("visibility", "visible")
                    //     aBox.eq(i).removeClass("animated fadeOutDown").css("animation-delay", i / 5 + "s").addClass("animated fadeInUp")
                    // }
                aBox.each(function(i, e) {
                    $(this).removeClass("animated fadeOutDown").css("animation-delay", i / 20 + "s").addClass("animated fadeInUp")
                })
                arrNew = []
            }


            //讲师层样式
            var flag = true,
                aBox = $(".lecturer"),
                scrollTop = $("#teacherList").offset().top - 900
            $(window).scroll(function() {
                if (flag) {
                    var sc = $(window).scrollTop();
                    if (sc >= scrollTop) {
                        for (var i = 0; i < aBox.length; i++) {
                            aBox.eq(i).css("visibility", "visible")
                            aBox.eq(i).css("animation-delay", i / 20 + "s").addClass("animated fadeInUp")
                        }
                        flag = false;
                    }
                }
            })

            function autoShow(arr) {
                teacherList.html("")
                for (var i = 0; i < arr.length; i++) {
                    var teacherTemplate = ' <div class="col-md-3 col-sm-6 col-xs-12">' +
                        '<div class="lecturer mb40">' +
                        '<div class="teacherBox lecturerBox">' +
                        '<div class="teacherHeadPortrait">' +
                        '<div class="teacherPic">' +
                        '<img src="' + msg.data[i].TeacherImage + '" alt="">' +
                        '</div>' +
                        '</div>' +
                        '<h4 class="text-center mt20 textShadow lecturerName"><span class="teacherName">' + msg.data[i].TeacherName + '</span></h4>' +
                        '<p class="teacherContent  mt20  multiline multiline3 textShadow lecturerDesc">主讲课程：<span class="majorCourse" title="' + msg.data[i].TeacherCourse + '">' + msg.data[i].TeacherCourse + '</span></p>' +
                        '<p class="teacherContent  mt20  multiline multiline4 textShadow lecturerDesc lecturerNow"><span class="teacherNow" title="' + msg.data[i].TeacherDescription + '">' + msg.data[i].TeacherDescription + '</span></p>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    teacherList.append(teacherTemplate)
                }
                var aBox = $(".lecturer")
                    // console.log(aBox)
                aBox.hover(function() {
                    clearInterval(timer)
                }, function() {
                    clearInterval(timer)
                    timer = setInterval(autoUp, 5000)
                })
                browserRedirect()
                if (IsMobile) {
                    clearInterval(timer)
                    $(".teacherHeadPortrait").addClass("col-xs-5")
                } else {
                    $(".teacherHeadPortrait").removeClass("col-xs-5")
                }
            }

        },
        error: function() {
            console.log("error")
        }
    })
})