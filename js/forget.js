//初始加载阻止点击
function initPreventNext() {
    $('a[href="#tab02"]').on('show.bs.tab', function(e) {
        if ($('.initUse').hasClass('initNoUse')) {
            e.preventDefault();
        }
    });
}
initPreventNext();


//邮箱验证
var pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/

//点击验证码 （步骤一）
$('#sendVerifyCode').click(function() {
    // 一分钟后再次发送
    var _this = $(this),
        time = 60
    var data01 = $('#EmailID').val()
    if (pattern.test(data01) == true) {
        $.ajax({
            type :   "get",
            async: true,
            traditional: true,
            data: {
                'mail': data01
            }, //提交的参数
            url: 'http://' + changeUrl.address + '/User_api?whereFrom=forgetPW',
            dataType :   "jsonp", //数据类型为jsonp  
            jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
            success :   function(msg) {
                console.log(msg)

                _this.addClass("active")
                _this.attr('disabled', 'disabled')

                var timer = setInterval(function() {
                    time--
                    _this.text(time + "秒后再次发送")

                    if (time === 0) {
                        _this.removeClass("active")
                        _this.text("发送验证码")
                        clearInterval(timer)
                        time = 60
                        _this.removeAttr("disabled");
                    }
                }, 1000)

                $('.emailErr').css('visibility', 'hidden')
            },
            error: function() {
                alert('发生错误，请求数据失败！');
            }
        });
    } else {
        $('.emailErr').css('visibility', 'visible')
    }

})

//判断第一个下一步按钮是否可用
$('#verifyCode,#EmailID').blur(function() {
    if ($('#EmailID').val() !== '' && $('#verifyCode').val() !== '') {
        $('#nextStep01').removeClass('disabled')
    } else {
        $('#nextStep01').addClass('disabled')
    }
})

//第一个下一步 （步骤二，核实验证码）
$('#nextStep01').click(function() {
    var data01 = $('#EmailID').val()
    var data02 = $('#verifyCode').val()
    if (data02 !== '' && data01 !== '' && pattern.test(data01) == true && data02.length == 6) {
        $.ajax({
            type :   "get",
            async: true,
            traditional: true,
            data: {
                'mail': data01,
                'code': data02
            }, //提交的参数
            url: 'http://' + changeUrl.address + '/User_api?whereFrom=forgetPWverify',
            dataType :   "jsonp", //数据类型为jsonp  
            jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
            success :   function(msg) {
                if (msg.msg == 1) {
                    $('.initUse').removeClass('initNoUse')
                    initPreventNext();
                    $('#myTab li:eq(1) a').tab('show'); //自动跳到第二步
                    $('.verifyCodeErr').css('visibility', 'hidden')
                        //禁用第一步
                    $('#myTab li:eq(0)').addClass('disabled');
                    $('a[href="#tab01"]').on('show.bs.tab', function(e) {
                        e.preventDefault();
                    });
                } else {
                    $('.verifyCodeErr').css('visibility', 'visible')
                }

            },
            error: function() {
                alert('发生错误，请求数据失败！');
            }
        });
    } else {
        $('.emailErr').css('visibility', 'visible')
        $('.verifyCodeErr').css('visibility', 'visible')
    }
})


//判断密码长度必须大于等于6位
$('#writePassword').blur(function() {
        if ($('#writePassword').val().length < 6) {
            $('.pwdLengthErr').css('color', 'red')
            $('#nextStep02').addClass('disabled')
        } else {
            $('.pwdLengthErr').css('color', '#ccc')
        }
    })
    //两次输入的密码都不为空，则下一步按钮可以使用
$('#confirmPassword').blur(function() {
    if ($('#writePassword').val() !== '' && $('#confirmPassword').val() !== '') {
        $('#nextStep02').removeClass('disabled')
    } else {
        $('#nextStep02').addClass('disabled')
    }
})

//第二个下一步  （步骤三，修改密码）
$('#nextStep02').click(function() {
    var email = $('#EmailID').val()
    var writePwd = $('#writePassword').val()
    var confirmPwd = $('#confirmPassword').val()
    if (writePwd == confirmPwd && writePwd != '' && confirmPwd != '') {
        $.ajax({
            type :   "get",
            async: true,
            traditional: true,
            data: {
                'mail': email,
                'password': confirmPwd
            }, //提交的参数
            url: 'http://' + changeUrl.address + '/User_api?whereFrom=forgetPWAlter',
            dataType :   "jsonp", //数据类型为jsonp  
            jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
            success :   function(msg) {
                console.log(msg)
                if (msg.msg == 1) {
                    $('.pwdNotSameErr').css('visibility', 'hidden')
                    $('#myModal').modal({
                        keyboard: true
                    })
                    window.location.href = "./login.html"
                }
            },
            error: function() {
                alert('发生错误，请求数据失败！');
            }
        });
    } else {
        $('.pwdNotSameErr').css('visibility', 'visible')
    }
})