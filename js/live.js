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
        Id = decodeURIComponent(args['Id']),
        data = {
            'UserMail': $.cookie('username'),
            'ClassId': Id
        }
    var screenWidth = $(window).width()
    var screenHeight = $(window).height()
    if (screenWidth < 768) {
        $('#mobileHeight').attr('height', screenHeight)
        $('.mobile').removeClass('bg-wrap container row col-lg-12 col-md-12 col-sm-12 Pd150')
        $('.mbHide').addClass('hide')
    }

    // 加载层
    var loading = $("#loading")
    loading.width($(document).width())
    loading.height($(document).height())
        // loading.css("lineHeight", loading.height() / 4 + "px")

    $.ajax({
        type: "POST",
        dataType: "json",
        data: data,
        async: true,
        url: 'http://' + changeUrl.address + '/Class_User_api?whereFrom=Verification',
        success: function(msg) {
            if ($.cookie('username') === undefined) {
                layer.alert('请先登录', { icon: 0, closeBtn: 0 },
                    function() {
                        window.location.href = "./login.html"
                    }
                );
            } else {
                if (msg.msg <= 0) {
                    layer.alert('请先购买课程', {
                            skin: 'layui-layer-hei',
                            icon: 4,
                            closeBtn: 0
                        },
                        function() {
                            window.location.href = "./detailClass.html?Id=" + Id
                        }
                    );
                } else {
                    var obj = $("#mobileHeight"),
                        mobile = $("#mobile"),
                        loadFlag = null,
                        data01 = {
                            'userid': $.cookie('username'),
                            'CourseId': Id
                        }
                    $.ajax({
                        type: "post",
                        data: data01,
                        dataType: "json",
                        async: false,
                        url: 'http://' + changeUrl.address + '/Class_User_api?whereFrom=getLiveUrl',
                        success: function(msg) {
                            // console.log(msg)
                            var vendors=navigator.vendor
                        //    console.log(vendors)
                            if(vendors.indexOf("Apple Computer, Inc.")>=0){
                                window.location.href=msg.msg
                            }else{
                                obj.attr("src", msg.msg)
                            }
                            mobile.attr("href", msg.msg)
                                // layer.close(loadFlag)
                            loading.fadeOut(1000)
                        },
                        error: function() {
                            console.log("error")
                        }
                    })
                }
            }
        },
        error: function() {
            console.log("error")
        }
    })

})
$(function() {
    var quit = $("#quit")

    function exitLogin() {
        $.cookie('member_sign', null, { expires: -1, path: '/' });
        $.cookie('username', null, { expires: -1, path: '/' });
        $.cookie('User_TureName', null, { expires: -1, path: '/' });
        $.cookie('userVerifyCode', null, { expires: -1, path: '/' });
        window.location.href = './index.html'
    }

    quit.on("click", function() {
        exitLogin()
    })
})