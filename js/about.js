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
    var args = getQueryStringArgs()
    console.log(args)
        // // connect = decodeURIComponent(args['connect']),
        // // feedback = decodeURIComponent(args['feedback'])
    switch (args.about) {
        case "rules":
            aLine.eq(1).find('span').css('color', '#c00').parent().siblings().find('span').css('color', '#787d82')
            aLine.eq(1).children('.line').css("display", "block").parent().siblings().children(".line").css("display", "none")
            aBox.eq(1).fadeIn(200).siblings().fadeOut(200)
            break;
        case "connect":
            aLine.eq(2).find('span').css('color', '#c00').parent().siblings().find('span').css('color', '#787d82')
            aLine.eq(2).children('.line').css("display", "block").parent().siblings().children(".line").css("display", "none")
            aBox.eq(2).fadeIn(200).siblings().fadeOut(200)
            break;
        case "feedback":
            aLine.eq(3).find('span').css('color', '#c00').parent().siblings().find('span').css('color', '#787d82')
            aLine.eq(3).children('.line').css("display", "block").parent().siblings().children(".line").css("display", "none")
            aBox.eq(3).fadeIn(200).siblings().fadeOut(200)
            break;
    }

    // 意见反馈
    send.click(function() {
        var checkboxVal = "",
            adviceVal = $("#advice").val(),
            connectVal = $("#connect").val(),
            username = $.cookie('username') == undefined ? 'undefinedUser' : $.cookie('username')
        if (username == 'undefinedUser') {
            layer.alert('请先登录', {
                skin: 'layui-layer-hei',
                icon: 0,
                closeBtn: 1
            }, function() {
                window.location.href = "./login.html"
            });
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
                    layer.msg("反馈成功，我们将会及时通知您问题处理的进展")
                },
                error: function() {
                    layer.msg("发生错误，服务器异常！")
                }
            })
        }
    })
})