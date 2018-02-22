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
    var _index = 0,
        send = $("#send"),
        aBox = $(".details-box")
    aLine = $(".other-left li")
    aLine.click(function() {
        _index = $(this).index()
        $(this).find('span').css('color', '#c00').parent().siblings().find('span').css('color', '#787d82')
        $(this).children('.line').css("display", "block").parent().siblings().children(".line").css("display", "none")
        aBox.eq(_index).fadeIn(200).siblings().fadeOut(200)
    })
    send.click(function() {
        var checkboxVal = "",
            adviceVal = $("#advice").val(),
            connectVal = $("#connect").val(),
            username = $.cookie('username') == undefined ? 'undefinedUser' : $.cookie('username')
        if (username == 'undefinedUser') {
            alert("请您先登录")
            window.location.href = "./login.html"
        } else {
            $("input[name='qusetion']:checked").each(function() {
                checkboxVal += $(this).val() + ";"
            })
            $.ajax({
                type: "POST",
                url: 'http://' + changeUrl.address + '/User_api?whereFrom=feedback',
                dataType :   "jsonp", //数据类型为jsonp  
                jsonp:   "Callback", //服务端用于接收callback调用的function名的参数 
                data: {
                    'UserName': username,
                    'content': checkboxVal + adviceVal,
                    'Contact': connectVal
                }, //提交的参数
                success: function(msg) {
                    alert("反馈成功，我们将会及时通知您问题处理的进展")
                },
                error: function() {
                    alert("发生错误，服务器异常！")
                }
            })
        }
    })
})