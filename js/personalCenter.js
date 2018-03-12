// 显示的购买课程
$(function() {
    var haveBoughtCourse = $("#haveBoughtCourse"),
        myClass = $("#myClass"),
        myCourse = $("#myCourse"),
        notHaveCourse = $("#notHaveCourse"),
        data = {
            'UserMail': $.cookie('username')
        }
    $.ajax({
        type: "POST",
        data: data,
        dataType: "json",
        url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=MyCourse',
        success: function(msg) {
            // console.log(msg.data[0])
            if (msg.data.length != 0) {
                myClass.removeClass("myClass")
                notHaveCourse.css("display", "none")
            }

            //课程购买码重复使用去重
            // var hash = {};
            // msg.data = msg.data.reduce(function(item, next) {
            //     hash[next.name] ? '' : hash[next.name] = true && item.push(next);
            //     return item
            // }, [])

            for (var i = 0; i < msg.data.length; i++) {
                haveBoughtCourse.append(
                    `
                        <div class="col-md-3 col-sm-6">
                            <div class="CourseContainer">
                                <a href="./detailClass.html?Id=${msg.data[i].Id}" target="_">
                                    <div class="Course Course-up">
                                        <img src="${msg.data[i].CoverImage}" alt="">
                                    </div>
                                </a>
                                <div class="CourseInfo">
                                    <p class="mtb5  oneline"><span class="CourseName">${msg.data[i].CourseName}</span></p>
                                    <p class="mtb5 twoline"><span class="CourseDesc" title="${msg.data[i].CourseDescription}">${msg.data[i].CourseDescription}</span></p>
                                </div>
                            </div>
                        </div>
                        `
                )

            }
        }
    })
})

//tab
$(function() {
    var aA = $("#myLable").children().children(),
        _index = 0,
        rightBox = $("#rightBox").children(),
        aLi = $("#myLable").children()
    aLi.on("click", function() {
            _index = $(this).index()
            $(this).children("a").addClass("active").parent().siblings().children("a").removeClass("active")
            rightBox.eq(_index).fadeIn(0).siblings().fadeOut(0)
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
    var args = getQueryStringArgs(),
        myLableIndex = decodeURIComponent(args['myLableIndex'])
        // console.log(courseCode)
    if (myLableIndex === "01") {
        aLi.eq(1).children("a").addClass("active").parent().siblings().children("a").removeClass("active")
        rightBox.eq(1).fadeIn(0).siblings().fadeOut(0)
    }
})

$(function() {
    var btn = $("#btn"),
        checkCode = 0,
        myDate = new Date(),
        nowDate = myDate.getDate(),
        checkDate = nowDate < 10 ? "0" + nowDate : nowDate

    function RandomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }


    btn.on("click", function() {
        var codeValue = $("#code").val(),
            checkCode = RandomNumBoth(17, 33),
            checkNum = checkCode + checkDate,
            data = {
                'code': codeValue,
                // 'sign': checkNum,
                'UserMail': $.cookie('username')
            }
        $.ajax({
            type: "get",
            // dataType: "json",
            data: data,
            url: 'http://' + changeUrl.address + '/Class_ActivationCode?whereFrom=courseCode',
            success: function(data) {
                if (data.code >= 0) {
                    $("#myAlertSuccess").fadeIn(200)
                    $("#myAlertError01").fadeOut(200)
                    $("#myAlertError02").fadeOut(200)
                } else {
                    $("#myAlertError01").fadeIn(200)
                    $("#myAlertSuccess").fadeOut(200)
                    $("#myAlertError02").fadeOut(200)
                }
            },
            error: function() {
                $("#myAlertError02").fadeIn(200)
                $("#myAlertError01").fadeOut(200)
                $("#myAlertSuccess").fadeOut(200)
            }
        })
    })
})