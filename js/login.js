// 登录
$(function() {
    function userLogin() {
        var username = $('#username').val()
        var password = $('#password').val()
        var data = {
            'username': username,
            'pwd': password
        }
        $.ajax({
            type: "get",
            async: false,
            traditional: true,
            data: data, //提交的参数
            url: changeUrl.address + '/User_api?whereFrom=login',
            dataType :   "jsonp", //数据类型为jsonp  
            jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
            success :   function(msg) {
                console.log(msg);
                var tips = $("#tipsTxt"),
                    error_tips = $("#error_tips")
                if (msg.member_sign > 0) {
                    $.cookie('member_sign', msg.member_sign, { expires: 1, path: '/' });
                    $.cookie('username', msg.username, { expires: 1, path: '/' });
                    $.cookie('User_TureName', msg.User_TureName, { expires: 1, path: '/' });
                    $.cookie('userVerifyCode', msg.UserVerifyCode, { expires: 1, path: '/' });
                    console.log($.cookie('member_sign'))
                    console.log($.cookie('username')) //邮箱地址
                    console.log($.cookie('userVerifyCode'))
                    console.log($.cookie('User_TureName')) //真实姓名
                    window.location.href = "index.html";
                } else if (msg.member_sign == -2) {
                    error_tips.animate({ "opacity": 1 }, 100)
                    tips.text("您填写的账号或密码错误")
                } else if (msg.member_sign == -1) {
                    error_tips.animate({ "opacity": 1 }, 100)
                    tips.text("邮箱未激活")
                    $("#userMailCode01").fadeIn(200)
                    $(".userInputMail").text(username)
                    $('body').css({ "overflow-y": "hidden", "margin-right": "17px" })
                    $("#confirmCode01").click(function() {
                        layer.load(2);
                        var inputCodeVal = $("#inputCode01").val()
                        var data = {
                            Usermail: username,
                            VerifyCode: inputCodeVal,
                        }
                        $.ajax({
                            type: "post",
                            data: data,
                            url: changeUrl.address + "/user/UsermailVerify.do",
                            success: function(msg) {
                                // console.log(msg)
                                // $("#currentCode").text(msg.msg)

                                if (msg.code == "0") {
                                    layer.closeAll('loading');
                                    $("#userMailCode01").fadeOut(200)
                                    layer.alert(msg.msg, function() {
                                        window.location.reload()
                                    })
                                } else {
                                    layer.msg("邮箱验证码有误，请重新输入", function() {
                                        layer.closeAll('loading');
                                    })
                                }
                            }
                        })
                    })
                } else if (msg.member_sign == 0) {
                    error_tips.animate({ "opacity": 1 }, 100)
                    tips.text("账号未审核")
                }
                // window.location.href("http://class.xinxueshuo.cn");

            },
            error: function() {
                layer.msg('用户名或密码错误，请求数据失败！');
            }
        });
    }
    $("#username").click(function() {
        $("#mpanel").fadeIn(200)
    })

    var codeFlag = false;
    // 验证码
    $("#mpanel").slideVerify({
        type: 2,
        imgName: ['CourseImage09.jpg', 'CourseImage10.jpg', 'CourseImage11.jpg', 'CourseImage12.jpg', 'CourseImage13.jpg'],
        imgSize: {
            width: '395px',
            height: '150px'
        },
        success: function() {
            codeFlag = true;
            userLogin()
        }
    })


    $('#loginButton').click(function() {
        var tips = $("#tipsTxt"),
            error_tips = $("#error_tips")
        if (codeFlag) {
            userLogin()
        } else {
            $("#mpanel").fadeIn(200)
            error_tips.animate({ "opacity": 1 }, 100)
            tips.text("请滑动完成验证码")
        }
    })

    $('#password').keydown(function() {
        $("#mpanel").fadeIn(200)
        var tips = $("#tipsTxt"),
            error_tips = $("#error_tips")
        if (event.keyCode == 13) {
            if (codeFlag) {
                userLogin()
            } else {
                $("#mpanel").fadeIn(200)
                error_tips.animate({ "opacity": 1 }, 100)
                tips.text("请滑动完成验证码")
            }
        }
    })

    //判断浏览器是否支持cookie
    $(function() {
        // console.log('Cookies启用：' + navigator.cookieEnabled);
        if (navigator.cookieEnabled == false) {
            $('#isCookie').show()
        } else {
            $('#isCookie').hide()
        }
    })
})

$(function() {
    var registerNewAccount = $("#registerNewAccount"),
        login = $("#login"),
        loginBox = $("#loginBox"),
        registerBox = $("#registerBox")

    login.on("click", function() {
        registerBox.fadeOut(200)
        loginBox.fadeIn(200)
    })

    registerNewAccount.on("click", function() {
        loginBox.fadeOut(200)
        registerBox.fadeIn(200)
    })

})

// 注册

$(function() {
    var btn = $("#registerLoginButton"),
        registerError = $("#registerError"),
        registerTips = $("#registerTips"),

        // 错误提示
        emialError = $("#emialError"),
        nameError = $("#nameError"),
        compError = $("#compError"),
        jobError = $("#jobError"),
        phoneError = $("#phoneError"),
        pwdError = $("#pwdError"),
        pwd2Error = $("#pwd2Error"),
        // 错误提示end

        emailFlag = false,
        nameFlag = false,
        instutionFlag = false,
        jobFlag = false,
        telFlag = false,
        pwdFlag = false,
        confirmPwdFlag = false,
        // 验证码
        slideVerifyFlag = false,
        // 头像
        userPicFlag = false

    // 邮箱注册
    function mailCheck() {
        var pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            emailValue = $("#registerEmail").val()
        if (pattern.test(emailValue) === true) {
            // emailFlag = true;
            // console.log("ok");
            $.ajax({
                url: changeUrl.address + "/User_api?whereFrom=checkMail",
                type: 'post',
                dataType: 'jsonp',
                jsonp:   "Callback",
                async: true,
                data: { checkMail: emailValue },
                success: function(msg) {
                    if (msg.msg < 0) {
                        // registerError.animate({ "opacity": 1 }, 100)
                        // registerTips.text("邮箱已注册过，可直接登录")
                        emialError.fadeIn(200, function() {
                            $(this).text("邮箱已注册过，可直接登录")
                        })

                        emailFlag = false;
                    } else {
                        // 邮箱格式正确且未被注册
                        emailFlag = true
                            // registerError.animate({ "opacity": 0 }, 100)
                        emialError.fadeOut(200)
                    }
                }
            })
        } else {
            emailFlag = false;
            // registerError.animate({ "opacity": 1 }, 100)
            // registerTips.text("您填写的邮箱格式不正确")
            emialError.fadeIn(200)
            emialError.text("邮箱格式错误")
        }
    }

    //邮箱验证码
    var closeCodeBtn = $("#closeCodeBtn"),
        confirmCode = $("#confirmCode"),
        userMailCode = $("#userMailCode")

    closeCodeBtn.click(function() {
        userMailCode.fadeOut(200)
    })

    //姓名验证
    function nameCheck() {
        var nameValue = $("#registerName").val()
        if (nameValue != '') {
            nameFlag = true
                // registerError.animate({ "opacity": 0 }, 100)
            nameError.fadeOut(200)
        } else {
            nameFlag = false
                // registerError.animate({ "opacity": 1 }, 100)
                // registerTips.text("请填写姓名")
            nameError.fadeIn(200)
            nameError.text("请填写姓名")
        }
    }

    //机构验证
    function instutionCheck() {
        var instutionValue = $('#registerInstution').val()
        if (instutionValue != "") {
            instutionFlag = true
                // registerError.animate({ "opacity": 0 }, 100)
            compError.fadeOut(200)

        } else {
            instutionFlag = false
                // registerError.animate({ "opacity": 1 }, 100)
                // registerTips.text("请填写机构名")
            compError.fadeIn(200)
            compError.text("请填写机构名")
        }
    }

    //职位验证
    function jobCheck() {
        var jobValue = $("#registerJob").val()
        if (jobValue != "") {
            jobFlag = true
                // registerError.animate({ "opacity": 0 }, 100)
            jobError.fadeOut(200)
        } else {
            jobFlag = false
                // registerError.animate({ "opacity": 1 }, 100)
                // registerTips.text("请填写职位名称")
            jobError.fadeIn(200)
            jobError.text("请填写职位名称")
        }
    }

    //验证手机号
    function telCheck() {
        var telPattern = /^1[0123456789]\d{9}$/,
            phoneValue = $("#registerPhone").val()
        if (telPattern.test(phoneValue)) {
            telFlag = true
                // registerError.animate({ "opacity": 0 }, 100)
            phoneError.fadeOut(200)
        } else {
            telFlag = false
                // registerError.animate({ "opacity": 1 }, 100)
                // registerTips.text("手机号格式不正确")
            phoneError.fadeIn(200)
            phoneError.text("手机号格式不正确")
        }
    }

    //验证密码(至少为6位)
    function pwdCheck() {
        var len = $("#registerPassword").val().length
        if (len >= 6) {
            pwdFlag = true
                // registerError.animate({ "opacity": 0 }, 100)
            pwdError.fadeOut(200)
        } else {
            pwdFlag = false
                // registerError.animate({ "opacity": 1 }, 100)
                // registerTips.text("密码不少于6位")
            pwdError.fadeIn(200)
            pwdError.text("密码不少于6位")
        }
    }

    //验证确认密码
    function confirmPwdCheck() {
        var pwdValue01 = $("#registerPassword").val(),
            pwdValue02 = $("#registerConfirmPassword").val()
        if (pwdValue01 === pwdValue02) {
            confirmPwdFlag = true
                // registerError.animate({ "opacity": 0 }, 100)
            pwd2Error.fadeOut(200)
        } else {
            confirmPwdFlag = false
                // registerError.animate({ "opacity": 1 }, 100)
                // registerTips.text("您填写的密码不一致")
            pwd2Error.fadeIn(200)
            pwd2Error.text("密码不一致")
        }
    }

    // 头像验证
    function confirmUserPicCheck() {
        var userPic = $("#userPic")
        if (userPic.attr("src")) {
            userPicFlag = true
            registerError.animate({ "opacity": 0 }, 100)
        } else {
            userPicFlag = false
            registerError.animate({ "opacity": 1 }, 100)
            registerTips.text("请上传头像")
        }
    }

    //失焦
    var registerEmail = $("#registerEmail"),
        registerName = $("#registerName"),
        registerInstution = $("#registerInstution"),
        registerJob = $("#registerJob"),
        registerPhone = $("#registerPhone"),
        registerPassword = $("#registerPassword"),
        registerConfirmPassword = $("#registerConfirmPassword")

    registerEmail.blur(function() {
        mailCheck()
    })
    registerEmail.click(function() {
        emialError.fadeOut(200)
    })
    registerName.blur(function() {
        nameCheck()
    })

    registerInstution.blur(function() {
        instutionCheck()
    })

    registerJob.blur(function() {
        jobCheck()
    })

    registerPhone.blur(function() {
        telCheck()
    })

    registerPassword.blur(function() {
        pwdCheck()
    })

    registerConfirmPassword.blur(function() {
        confirmPwdCheck()
    })

    //验证码注册
    $("#mpanel1").slideVerify({
        type: 2,
        imgName: ['CourseImage09.jpg', 'CourseImage10.jpg', 'CourseImage11.jpg', 'CourseImage12.jpg', 'CourseImage13.jpg'],
        imgSize: {
            width: '395px',
            height: '150px'
        },
        success: function() {
            slideVerifyFlag = true

            // 用户头像验证
            // confirmUserPicCheck()

            var emailValue = $("#registerEmail").val(),
                nameValue = $("#registerName").val(),
                instutionValue = $("#registerInstution").val(),
                jobValue = $("#registerJob").val(),
                phoneValue = $("#registerPhone").val(),
                pwdValue01 = $("#registerPassword").val(),
                pwdValue02 = $("#registerConfirmPassword").val(),
                data = {
                    'username': emailValue,
                    'password': pwdValue02,
                    'userTurename': nameValue,
                    'userOrganization': instutionValue,
                    'userPosition': jobValue,
                    'userPhone': phoneValue,
                    // 头像
                    'userPortrait': $("#userPic").attr("src"),
                    'registerType': "在线课堂"
                },
                hash = {
                    'qq.com': 'https://mail.qq.com',
                    'gmail.com': 'https://mail.google.com',
                    'sina.com': 'https://mail.sina.com.cn',
                    '163.com': 'https://mail.163.com',
                    '126.com': 'https://mail.126.com',
                    'yeah.net': 'https://www.yeah.net/',
                    'sohu.com': 'https://mail.sohu.com/',
                    'tom.com': 'https://mail.tom.com/',
                    'sogou.com': 'https://mail.sogou.com/',
                    '139.com': 'https://mail.10086.cn/',
                    'hotmail.com': 'https://www.hotmail.com',
                    'live.com': 'https://login.live.com/',
                    'live.cn': 'https://login.live.cn/',
                    'live.com.cn': 'https://login.live.com.cn',
                    '189.com': 'https://webmail16.189.cn/webmail/',
                    'yahoo.com.cn': 'https://mail.cn.yahoo.com/',
                    'yahoo.cn': 'https://mail.cn.yahoo.com/',
                    'eyou.com': 'https://www.eyou.com/',
                    '21cn.com': 'https://mail.21cn.com/',
                    '188.com': 'https://www.188.com/',
                    'foxmail.coom': 'https://www.foxmail.com'
                };
            $("#userInputMail").text(emailValue)
            if (emailFlag && nameFlag && instutionFlag && jobFlag && telFlag && pwdFlag && confirmPwdFlag && slideVerifyFlag) {
                layer.load(2);
                $.ajax({
                        type: "post",
                        data: data,
                        url: changeUrl.address + '/user/register.do',
                        success: function(msg) {
                            layer.closeAll('loading');
                            $.each(hash, function(index, value) {
                                var email = $('#registerEmail').val()
                                var suffix = email.split('@')[1]
                                if (index == suffix) {
                                    // console.log(index, value)
                                    // $('#toVerify').attr('href', value)
                                    //window.location.href = value
                                    // window.open(value, "_blank")
                                }
                            })

                            // 发送邮箱验证码
                            userMailCode.fadeIn(200)
                            $('body').css({ "overflow-y": "hidden", "margin-right": "17px" })
                            $("#confirmCode").click(function() {
                                layer.load(2);
                                var inputCodeVal = $("#inputCode").val()
                                var data = {
                                    Usermail: emailValue,
                                    VerifyCode: inputCodeVal,
                                }
                                $.ajax({
                                    type: "post",
                                    data: data,
                                    url: changeUrl.address + "/user/UsermailVerify.do",
                                    success: function(msg) {
                                        // console.log(msg)
                                        // $("#currentCode").text(msg.msg)

                                        if (msg.code == "0") {
                                            layer.closeAll('loading');
                                            userMailCode.fadeOut(200)
                                            layer.alert(msg.msg, function() {
                                                window.location.reload()
                                            })
                                        } else {
                                            layer.msg("邮箱验证码有误，请重新输入", function() {
                                                layer.closeAll('loading');
                                            })
                                        }
                                    }
                                })
                            })
                        },
                        error: function() {
                            console.log("error")
                        }
                    })
                    // alert("ok")

            } else {
                // console.log("注册失败")
                // alert("false")
            }
        }
    })
    btn.on("click", function() {

        var emailValue = $("#registerEmail").val(),
            nameValue = $("#registerName").val(),
            instutionValue = $("#registerInstution").val(),
            jobValue = $("#registerJob").val(),
            phoneValue = $("#registerPhone").val(),
            pwdValue01 = $("#registerPassword").val(),
            pwdValue02 = $("#registerConfirmPassword").val(),
            data = {
                'username': emailValue,
                'password': pwdValue02,
                'userTurename': nameValue,
                'userOrganization': instutionValue,
                'userPosition': jobValue,
                'userPhone': phoneValue,
                // 头像
                'userPortrait': $("#userPic").attr("src"),
                'registerType': "在线课堂"
            },
            hash = {
                'qq.com': 'https://mail.qq.com',
                'gmail.com': 'https://mail.google.com',
                'sina.com': 'https://mail.sina.com.cn',
                '163.com': 'https://mail.163.com',
                '126.com': 'https://mail.126.com',
                'yeah.net': 'https://www.yeah.net/',
                'sohu.com': 'https://mail.sohu.com/',
                'tom.com': 'https://mail.tom.com/',
                'sogou.com': 'https://mail.sogou.com/',
                '139.com': 'https://mail.10086.cn/',
                'hotmail.com': 'https://www.hotmail.com',
                'live.com': 'https://login.live.com/',
                'live.cn': 'https://login.live.cn/',
                'live.com.cn': 'https://login.live.com.cn',
                '189.com': 'https://webmail16.189.cn/webmail/',
                'yahoo.com.cn': 'https://mail.cn.yahoo.com/',
                'yahoo.cn': 'https://mail.cn.yahoo.com/',
                'eyou.com': 'https://www.eyou.com/',
                '21cn.com': 'https://mail.21cn.com/',
                '188.com': 'https://www.188.com/',
                'foxmail.coom': 'https://www.foxmail.com'
            };
        $("#userInputMail").text(emailValue)
        if (emailFlag && nameFlag && instutionFlag && jobFlag && telFlag && pwdFlag && confirmPwdFlag && slideVerifyFlag) {
            btn.attr("disabled", "disabled")
            btn.css({ "cursor": "not-allowed", "opacity": .65 })
            $.ajax({
                type: "post",
                data: data,
                url: changeUrl.address + '/user/register.do',
                success: function(msg) {
                    $.each(hash, function(index, value) {
                        var email = $('#registerEmail').val()
                        var suffix = email.split('@')[1]
                        if (index == suffix) {
                            // console.log(index, value)
                            // $('#toVerify').attr('href', value)
                            // window.location.href = value
                            // window.open(value, "_blank")
                        }
                    })

                    // 发送邮箱验证码
                    userMailCode.fadeIn(200)
                    $("#confirmCode").click(function() {
                        var inputCodeVal = $("#inputCode").val()
                        var data = {
                            Usermail: emailValue,
                            VerifyCode: inputCodeVal,
                        }
                        $.ajax({
                            type: "post",
                            data: data,
                            url: changeUrl.address + "/user/UsermailVerify.do",
                            success: function(msg) {
                                userMailCode.fadeOut(200)
                                layer.alert(msg.msg, function() {
                                    window.location.reload()
                                })
                            }
                        })
                    })

                },
                error: function() {
                    console.log("error")
                }
            })

        } else {
            // console.log("注册失败")
        }
    })
})