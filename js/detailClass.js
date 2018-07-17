//判断是否移动端，如果是则跳转到指定的URL地址
var IsMobile = false;

function browserRedirect(url) {
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

    // 正在直播地址
    var living = $("#living")
    $.ajax({
        type: "POST",
        dataType: "json",
        url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=showInformation',
        success: function(msg) {
            living.attr("href", "./live.html?Id=" + msg.data1[0].Id)
        }
    })
})

$(function() {
    //获取url地址问号后面部分
    function getQueryStringArgs() {
        var qs = location.search.length > 0 ? location.search.substring(1) : '',
            args = {},
            items = qs.length ? qs.split('&') : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            name = item[0];
            value = item[1];

            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    }
    var args = getQueryStringArgs(),
        Id = decodeURIComponent(args['Id'])

    $.ajax({
        type: "get",
        dataType: "json",
        data: { Id: Id },
        url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Search_Course',
        success: function(msg) {
            // console.log(msg.data[0])
            $("title").html(msg.data[0].CourseName + "-新学说国际教育研究院")
            $("#CourseName").text(msg.data[0].CourseName);
            $("#ClassBegins").text(msg.data[0].ClassBegins);
            $("#CoursePrice").text(msg.data[0].CoursePrice);
        }
    })


    //立即购买

    function buy() {
        var buyNow = $("#buyNow"),
            courseCode = $("#courseCode"),
            myModal = $("#myModal")
        if ($.cookie('username') !== undefined) {
            buyNow.on("click", function() {
                // 登录状态下判断是否已购买
                var sendData = {
                    'UserMail': $.cookie('username'),
                    'ClassId': Id
                }
                $.ajax({
                    type: "POST",
                    data: sendData,
                    dataType: "json",
                    url: 'http://' + changeUrl.address + '/Class_User_api?whereFrom=Verification',
                    success: function(data) {
                        // 已购买
                        if (data.msg > 0) {
                            myModal.modal('hide')
                            layer.msg("您已购买过该课程，请勿重复购买")
                            return false;
                        } else {
                            // 未购买
                            var data = {
                                'UserMail': $.cookie('username'),
                                'Id': Id
                            }
                            browserRedirect()
                                // console.log(IsMobile)
                                // http://192.168.0.159:8080/nsi-0.9/Payment_api?whereFrom=WeChatHtml5Payment&Id=10001&UserMail=237450257@qq.com
                            if (IsMobile) {
                                $.ajax({
                                    type: "post",
                                    dataType: "json",
                                    data: data,
                                    url: 'http://' + changeUrl.address + '/Payment_api?whereFrom=WeChatHtml5Payment',
                                    success: function(msg) {
                                        // console.log(msg.CoursePrice)
                                        // $("#orderDesc-price").text(msg.CoursePrice)
                                        // $("#qrCode").css("background-image", "url(" + msg.data + ")")
                                        window.location.href = msg.data
                                    },
                                    error: function() {
                                        console.log("error")
                                    }
                                })
                            } else {
                                $.ajax({
                                    type: "post",
                                    dataType: "json",
                                    data: data,
                                    url: 'http://' + changeUrl.address + '/Payment_api?whereFrom=WeChatPayment',
                                    success: function(msg) {
                                        // console.log(msg.CoursePrice)
                                        if (msg.data == "http://qr.liantu.com/api.php?text=null") {
                                            layer.alert("支付出错，请稍后再试或联系新学说客服", { icon: 2 })
                                        } else {
                                            $("#orderDesc-price").text(msg.CoursePrice)
                                            $("#qrCode").css("background-image", "url(" + msg.data + ")")
                                        }
                                    },
                                    error: function() {
                                        console.log("error")
                                    }
                                })
                                myModal.modal('show')
                                setTimeout(refresh, 3000)
                            }

                        }
                    },
                    error: function() {
                        // console.log("支付失败")
                    }
                })
            })
        } else {
            // 未登录状态下
            buyNow.on("click", function() {
                myModal.modal('hide')
                layer.msg('请先登录', {
                        time: 1000
                    },
                    function() {
                        window.location.href = "./login.html"

                    });
                return false;
            })
            courseCode.on("click", function() {
                layer.msg("请先登录",
                    function() {
                        window.location.href = "./login.html"

                    })
                return false;
            })
        }
    }
    buy()

    // 立即观看
    function watchNow() {
        var $watchNow = $("#watchNow"),
            $buyNow = $("#buyNow"),
            data = {
                'UserMail': $.cookie('username') ? $.cookie('username') : 0,
                'ClassId': Id
            }
            // console.log(data)
        $.ajax({
            type: "post",
            data: data, //提交的参数
            url: 'http://' + changeUrl.address + '/Class_User_api?whereFrom=Verification',
            dataType: "json",
            success: function(msg) {
                // console.log(msg.msg)
                if (msg.msg < 0) {
                    $watchNow.addClass("notAllow")
                    $watchNow.click(function() {
                        layer.msg("请先购买课程")
                    })
                } else {
                    $buyNow.html('<span class="iconfont icon-gouwuche3"></span>已购买').css("background", "#b3b5b5")
                        // 判断该课程是否已结束
                    $.ajax({
                        type: "get",
                        dataType: "json",
                        data: { Id: Id },
                        url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Search_Course',
                        success: function(msg) {
                            var courseState = msg.data[0].CourseState
                            switch (courseState) {
                                case "查看回放":
                                    $watchNow.html('<span class = "iconfont icon-bofang1"></span>查看回放').addClass("allow").click(function() {
                                        layer.alert("该课程已结束，请联系助教获取回放链接", { icon: 0 })
                                    })
                                    break;
                                case "正在回放":
                                    $watchNow.html('<span class = "iconfont icon-bofang1"></span>立即观看').addClass("allow").click(function() {
                                        // layer.alert("该课程已结束，请联系助教获取回放链接", { icon: 0 })
                                        window.location.href = "./recorded.html?Id=" + Id
                                    })
                                    break;
                                default:
                                    $watchNow.html('<span class = "iconfont icon-bofang1"></span>立即观看').addClass("allow").click(function() {
                                        window.location.href = "./live.html?Id=" + Id
                                    })
                                    break;
                            }
                        }
                    })

                }
            },
            error: function() {
                console.log("error")
            }
        })

    }
    watchNow()


    // 刷新判断是否完成购买
    var timer = null;

    function refresh() {
        clearInterval(timer)
        var cancle = $(".cancle")
        timer = setInterval(paymentState, 3000)

        function paymentState() {
            var data = {
                'UserMail': $.cookie('username'),
                'ClassId': Id
            }
            $.ajax({
                type: "POST",
                data: data,
                dataType: "json",
                url: 'http://' + changeUrl.address + '/Class_User_api?whereFrom=Verification',
                success: function(data) {
                    if (data.msg > 0) {
                        clearInterval(timer)
                        layer.alert("支付成功", { icon: 1, closeBtn: 0 }, function() {
                            window.location.reload()
                        })
                    } else {
                        // http://qr.liantu.com/api.php?text=null
                    }
                },
                error: function() {
                    // console.log("支付失败")
                }
            })
        }
        cancle.on("click", function() {
            clearInterval(timer)
        })

        // 模态框隐藏关闭判断api
        $('#myModal').on('hide.bs.modal',
            function() {
                clearInterval(timer)
            })
    }

    // 课程介绍 html展示
    function lessonDsec() {
        var $tab01 = $("#tab01"),
            $tab02 = $("#tab02"),
            $tab03 = $("#tab03"),
            $tab04 = $("#tab04")
        $.ajax({
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            data: {
                "Id": Id
            },
            url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Course_GetHtml',
            success: function(msg) {
                // console.log(msg)
                $tab01.html(msg.data[0].Html01)
                $tab02.html(msg.data[0].Html02)
                $tab03.html(msg.data[0].Html03)
                $tab04.html(msg.data[0].Html04)
            }
        })
    }


    lessonDsec()
})

// tab activeColor
$(function() {
    aLi = $("#myTab").children()
    aLi.click(function() {
        $(this).addClass("activeColor").siblings().removeClass("activeColor")
    })
})