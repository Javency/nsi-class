$(function() {

    var tabCourseList = $("#tabCourseList"),
        editorBox = $("#editorBox"),
        doHomework = $("#doHomework"),
        cancle = $("#cancle"),
        confirm = $("#confirm"),
        stuAnswer = $("#stuAnswer"),
        // 课程Id
        courseId = 10001,
        userName = $.cookie('User_TureName'),
        courseList = [],
        hasBought = false

    // 用户姓名头像
    $("#apply-name").text(userName)

    // 开启立即播放按钮
    if ($.cookie('username') !== undefined) {
        var sendData = {
            'UserMail': $.cookie('username'),
            'ClassId': 10001
        }
        $.ajax({
            type: "post",
            data: sendData,
            dataType: "json",
            url: changeUrl.address + '/Class_User_api?whereFrom=Verification',
            success: function(msg) {
                if (msg.msg > 0) {
                    hasBought = true
                    $("#toApply,.macInfo-price").css({ 'display': 'none' })
                    $("#toLiving").css({ 'display': 'inline-block' })
                } else if (msg.msg <= 0) {
                    hasBought = false
                }
            }
        })
    }

    // 获取课程列表
    $.ajax({
        method: "get",
        data: {
            'CourseSubject': 'hrc'
        },
        url: changeUrl.address + "/Class_Course_api?whereFrom=Search_Course",
        success: function(msg) {
            // console.log(msg.data)
            tabCourseList.html('')
            courseList = msg.data
            var moreTemplate = '<li class="text-center moreBox" id="more"><span class="iconfont icon-shuangjiantou more"></span></li>'
            for (var i = 0; i < 5; i++) {
                var template = '<li>' +
                    '<a href="javascript:;" class="tabCurrent" data-courseId=' + courseList[i].Id + '>' + (i + 1) + " " + courseList[i].CourseName + '</a>' +
                    '</li>'
                tabCourseList.append(template)
            }
            tabCourseList.append(moreTemplate)

            // 点击课程更换教师作业
            changeTeaHomework()

            // 点击课程更换作业列表
            changeHomeWorkList()

            $("#more").unbind('click').click(function() {
                $("#more").hide(0)
                tabCourseList.css("height", "auto")
                tabCourseList.html('')
                for (var i = 0; i < courseList.length; i++) {
                    var template = '<li>' +
                        '<a href="javascript:;" class="tabCurrent" data-courseId=' + msg.data[i].Id + '>' + (i + 1) + " " + msg.data[i].CourseName + '</a>' +
                        '</li>'
                    tabCourseList.append(template)
                }
                // 获取教师问题及学生作业列表
                changeTeaHomework()
                changeHomeWorkList()
            })
        }
    })

    // wangEditor 提交评论
    var E = window.wangEditor
    var editor = new E('#editor')

    // editor.customConfig.uploadImgServer = changeUrl.address + '/Admin_api?whereFrom=EditorUpImg'
    editor.customConfig.uploadImgServer = 'https://data.xinxueshuo.cn/nsi-1.0/Admin_api?whereFrom=EditorUpImg'
    editor.customConfig.customAlert = function(info) {
        // info 是需要提示的内容
        alert('图片上传失败：' + '请将图片压缩至5M内重试')
    }
    editor.create()

    //附件上传 
    var fileName = "",
        fileUrl = ""
    layui.use(['upload', 'jquery'], function() {
        var upload = layui.upload,
            $ = layui.jquery
            // 文件上传
        upload.render({
            elem: "#uploadFile",
            url: changeUrl.address + "/manager/resource/upfile.do",
            multiple: false,
            accept: 'file',
            before: function(obj) {
                //预读本地文件示例，不支持ie8
                layer.load(2);
                // console.log(obj)
            },
            done: function(res) {
                // console.log(res)
                fileName = res.data.uri
                fileUrl = changeUrl.address + "/manager/resource/download.do?fileName=" + fileName
                layer.closeAll('loading');
                layer.msg("上传成功", {
                    time: 1000
                })
            },
            error: function(index, upload) {
                layer.closeAll('loading');
            }
        })
    })

    //提交作业
    doHomework.click(function() {
        if ($.cookie('username') === undefined) {
            layer.msg("请先登录", { time: 1000 }, function() {
                window.location.href = "../login.html"
            })
        } else {
            editorBox.show(200)
        }
    })
    cancle.click(function() {
        editorBox.hide(200)
    })
    confirm.click(function() {
        getUserHomeWork()
    })

    function getUserHomeWork() {
        if (editor.txt.html() == "") {
            layer.msg("内容不能为空", function() {})
        } else {
            layer.msg("评论成功，审核通过后您的回复将展示在此")

            // 提交至后台
            sendUserWork()
        }
    }



    // 提交至后台
    function sendUserWork() {
        var userMail = $.cookie('username')
        UserHomeWork = editor.txt.html(),
            data = {
                'usermail': userMail,
                'courseId': courseId,
                'assignmentContent': UserHomeWork,
                'attachmentNameOne': fileName,
                'attachmentUrlOne': fileUrl
            }
        console.log(data)
        $.ajax({
            method: 'post',
            data: data,
            url: changeUrl.address + "/assignment/add.do",
            success: function(msg) {
                editorBox.hide(200)
            }
        })
    }

    //时间格式化
    function formatDate(time, option) {
        time = time
        const d = new Date(time);
        const now = Date.now();
        const diff = (now - d) / 1000;

        if (diff < 30) {
            return '刚刚'
        } else if (diff < 3600) { // less 1 hour
            return Math.ceil(diff / 60) + '分钟前'
        } else if (diff < 3600 * 24) {
            return Math.ceil(diff / 3600) + '小时前'
        } else if (diff < 3600 * 24 * 2) {
            return '1天前'
        }
        if (option) {
            return parseTime(time, option)
        } else {
            return d.getMonth() + 1 + '月' + d.getDate() + '日'
        }
    }

    // 点击更换教师作业
    function changeTeaHomework() {
        $(".tabCurrent").eq(0).addClass('activeTabCurrent')
        $(".tabCurrent").on('click', function() {
            $(this).addClass('activeTabCurrent').parent('li').siblings().children().removeClass('activeTabCurrent')
            $(".teaQuestion").text("讲师暂无布置作业")
            $(".teaName").text("老师")
            $(".teaQueTime").text("")
            $("#teaInfoPic").attr("src", "https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-class/image/default.png")
            $("#downLoadppt").attr('href', "javascript:;")
            courseId = $(this).attr("data-courseId")
            $.ajax({
                method: "post",
                url: changeUrl.address + "/assignment/get_teacher_assignment.do",
                data: {
                    'courseId': $(this).attr("data-courseId")
                },
                success: function(msg) {
                    $(".teaQuestion").html(msg.data.assignmentContent)
                    $(".teaName").text(msg.data.userName)
                    $(".teaQueTime").text(formatDate(msg.data.createTime))
                    $("#teaInfoPic").attr("src", msg.data.userPortrait)
                    if (hasBought) {
                        $("#downLoadppt").attr('href', msg.data.attachmentUrlOne)
                    } else {
                        $("#downLoadppt").unbind('click').on('click', function() {
                            $(this).attr("href", "javascript:;")
                            layer.alert('请先购买课程', {
                                skin: 'layui-layer-hei',
                                icon: 4,
                                closeBtn: 0
                            });
                        })
                    }
                }
            })
        })
    }

    // 默认第一节课
    function defalutClass() {
        $.ajax({
            method: "post",
            url: changeUrl.address + "/assignment/get_teacher_assignment.do",
            data: {
                'courseId': courseId
            },
            success: function(msg) {
                $(".teaQuestion").text(msg.data.assignmentContent)
                $(".teaName").text(msg.data.userName)
                $(".teaQueTime").text(formatDate(msg.data.createTime))
                $("#teaInfoPic").attr("src", msg.data.userPortrait)
                if (hasBought) {
                    $("#downLoadppt").attr('href', msg.data.attachmentUrlOne)
                } else {
                    $("#downLoadppt").unbind('click').on('click', function() {
                        $(this).attr("href", "javascript:;")
                        layer.alert('请先购买课程', {
                            skin: 'layui-layer-hei',
                            icon: 4,
                            closeBtn: 0
                        });
                    })
                }
            }
        })
    }
    defalutClass()

    // 点击更换学生作业列表
    function changeHomeWorkList() {
        $(".tabCurrent").on('click', function() {
            courseId = $(this).attr("data-courseId")
            $.ajax({
                method: "post",
                url: changeUrl.address + "/assignment/get_student_assignment.do",
                data: {
                    'courseId': $(this).attr("data-courseId")
                },
                success: function(msg) {
                    getStuHomework()
                }
            })
        })
    }

    // 获取学生作业列表
    function getStuHomework() {
        $.ajax({
            method: "post",
            url: changeUrl.address + "/assignment/get_student_assignment.do",
            data: {
                'courseId': courseId
            },
            success: function(msg) {
                stuAnswer.html("")
                    // console.log(msg.data)
                var _length = msg.data.length
                $(".personNum").text(_length)
                for (var i = 0; i < _length; i++) {
                    var template = '<div class="col-md-12 pt15 answerItem" data-uid=' + msg.data[i].id + '>' +
                        '<div class="row bottomLine">' +
                        '<div class="col-md-1">' +
                        '<img class="userHeadPic" src="' + msg.data[i].userPortrait + '" alt="" width="40">' +
                        '</div>' +
                        '<div class="col-md-11 pl0M15">' +
                        '<p><span class="stuName">' + msg.data[i].userName + '</span></p>' +
                        '<p class="stuAnswerContent">' + msg.data[i].assignmentContent + '</p>' +
                        '<p class="text-right stuAnswerTime"><span class="iconfont icon-huifu reply"></span>' + formatDate(msg.data[i].createTime) + '</p>' +
                        '<div class="replyBox">' +
                        '<div class="replayInputBox">' +
                        '<img src="https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-class/image/default.png" alt="" width="35" class="replyPic">' +
                        '<input type="text" class="txt">' +
                        '<a href="javascript:;" class="replyBtn" data-sendId=' + msg.data[i].id + '>回复</a>' +
                        '<span class="iconfont icon-guanbi closeBtn"></span>' +
                        '</div>' +
                        '<div class="replayList">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    if (msg.data[i].userPortrait = "") {
                        msg.data[i].userPortrait = "https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-class/image/default.png"
                    }
                    stuAnswer.append(template)
                }

                // 回复作业
                var reply = $(".reply"),
                    closeBtn = $(".closeBtn"),
                    replyBtn = $(".replyBtn"),
                    txt = $(".txt"),
                    replayInputBox = $(".replayInputBox")

                reply.each(function(i, e) {
                    $(this).on('click', function() {
                        if ($.cookie('username') === undefined) {
                            layer.msg("请先登录", { time: 1000 }, function() {
                                window.location.href = "../login.html"
                            })
                        } else {
                            replayInputBox.eq(i).show(200)
                        }
                    })
                })

                closeBtn.each(function(i, e) {
                    $(this).on('click', function() {
                        // console.log(i) unbind('click')
                        replayInputBox.eq(i).hide(200)
                    })
                })

                replyBtn.each(function(i, e) {
                    $(this).on('click', function() {
                        var userVal = txt.eq(i).val()
                        var objId = $(this).attr("data-sendId")
                        $.ajax({
                            method: "post",
                            data: {
                                objectid: objId,
                                content: userVal,
                                commentatormail: $.cookie('username'),
                                commentatorname: $.cookie('User_TureName'),
                                classify: "在线课堂",
                                thumbsUp: 0,
                                verifysign: 0,
                                identity: 0
                            },
                            url: changeUrl.address + "/Comment/add.do",
                            success: function(msg) {
                                replayInputBox.hide(200)
                                console.log(msg)
                                layer.msg("评论成功，审核通过后您的回复将展示在此")
                            }
                        })
                    })
                })

                // 获取作业评论列表
                var uidList = []
                $(".answerItem").each(function(i, e) {
                    uidList.push($(this).attr("data-uid"))
                })

                // console.log(replayList)
                var _loop = function _loop(k) {
                    $.ajax({
                        method: "get",
                        url: changeUrl.address + "/Comment/list.do",
                        data: {
                            CourseId: uidList[k]
                                // objectId: uidList[k]
                        },
                        success: function success(msg) {
                            // $(".replayList").html("")
                            // $(".replayList").append("123")
                            if (msg.data.length > 0) {
                                for (var j = 0; j < msg.data.length; j++) {
                                    var template = '<div class="row mb15">' + '<div class="col-md-1">' + '<img src="' + msg.data[j].commentatorportrait + '" alt="" width="35" class="replyPic">' + '</div>' + '<div class="col-md-11 pl0">' + '<p class="userReplayName">' + msg.data[j].commentatorname + '</p>' + '<p class="userReplayContent">' + msg.data[j].content + '</p>' + '</div>' + '</div>';
                                    // console.log(msg.data[i].commentatorportrait)
                                    // if (msg.data[j].commentatorportrait === "null") {
                                    //     msg.data[j].commentatorportrait = "https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-class/image/default.png"
                                    // }
                                    $(".replayList").eq(k).append(template);
                                }
                            }
                        }
                    });
                };

                for (var k = 0; k < uidList.length; k++) {
                    _loop(k);
                }
            }
        })
    }

    getStuHomework()

})