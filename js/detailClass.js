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
            $login.parent().attr("href", "javascript:;")
            exit.parent().css("display", "inline-block")
        }
    }
    isLogin();
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
            success(msg) {
                // console.log(msg)
                $tab01.html(msg.data[0].Html01)
                $tab02.html(msg.data[0].Html02)
                $tab03.html(msg.data[0].Html03)
                $tab04.html(msg.data[0].Html04)
            }
        })
    }
    lessonDsec()
    $.ajax({
        type: "get",
        dataType: "json",
        data: { Id: Id },
        url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Search_Course',
        success: function(msg) {
            // console.log(msg.data[0])
            $("#CourseName").text(msg.data[0].CourseName);
            $("#ClassBegins").text(msg.data[0].ClassBegins);
            $("#CoursePrice").text(msg.data[0].CoursePrice)
        }
    })


    //立即购买

    function buy() {
        var buyNow = $("#buyNow"),
            courseCode = $("#courseCode")
        if ($.cookie('username') !== undefined) {
            buyNow.on("click", function() {
                // console.log($.cookie('username'))
                var data = {
                    'UserMail': $.cookie('username'),
                    'Id': Id
                }
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: data,
                    url: 'http://' + changeUrl.address + '/Payment_api?whereFrom=WeChatPayment',
                    success: function(msg) {
                        console.log(msg.CoursePrice)
                        $("#orderDesc-price").text(msg.CoursePrice)
                        $("#qrCode").css("background-image", "url(" + msg.data + ")")
                    },
                    error: function() {
                        console.log("error")
                    }
                })
            })
        } else {
            buyNow.on("click", function() {
                alert("请先登录")
                window.location.href = "./login.html"
                return false;
            })
            courseCode.on("click", function() {
                alert("请先登录")
                window.location.href = "./login.html"
                return false;
            })
        }

    }
    buy()


    //判断是否购买成功
    function checkPaymentState() {
        var buyNow = $("#buyNow"),
            myModal = $("#myModal"),
            data = {
                'UserMail': $.cookie('username'),
                'ClassId': Id
            }
            //先判断是否已购买该课程
        $.ajax({
            type: "POST",
            data: data,
            dataType: "json",
            url: 'http://' + changeUrl.address + '/Class_User_api?whereFrom=Verification',
            success: function(data) {
                if (data.msg > 0) {
                    buyNow.click(function() {
                        myModal.modal('hide')
                        alert("您已购买过该课程，请勿重复购买")
                        return false;
                    })
                } else {
                    buyNow.on("click", function() {
                        myModal.modal('show')
                        setTimeout(refresh, 3000)

                        function refresh() {
                            var timer = setInterval(paymentState, 3000),
                                cancle = $("#cancle")

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
                                            alert("支付成功")
                                            window.location.reload()
                                        } else {
                                            // alert("支付失败")
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
                        }
                    })
                }
            },
            error: function() {
                // console.log("支付失败")
            }
        })
    }

    checkPaymentState()

    // 立即观看
    function watchNow() {
        var $watchNow = $("#watchNow"),
            data = {
                'UserMail': $.cookie('username') ? $.cookie('username') : 0,
                'ClassId': Id
            }
        console.log(data)
        $.ajax({
            type: "post",
            data: data, //提交的参数
            url: 'http://' + changeUrl.address + '/Class_User_api?whereFrom=Verification',
            dataType: "json",
            success: function(msg) {
                console.log(msg.msg)
                if (msg.msg < 0) {
                    $watchNow.addClass("notAllow")
                    $watchNow.click(function() {
                        alert("请先购买该课程")
                    })
                } else {
                    $watchNow.addClass("allow")
                    $watchNow.click(function() {
                        window.location.href = "./live.html?Id=" + Id
                    })
                }
            },
            error: function() {
                console.log("error")
            }
        })

    }
    watchNow()
})