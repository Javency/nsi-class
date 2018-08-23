$(function() {

    var tabCourseList = $("#tabCourseList"),
        editorBox = $("#editorBox"),
        doHomework = $("#doHomework"),
        cancle = $("#cancle"),
        confirm = $("#confirm"),
        stuAnswer = $("#stuAnswer")

    $.ajax({
        method: "get",
        url: changeUrl.address + "/Class_Course_api?whereFrom=Search_Course",
        success: function(msg) {
            // console.log(msg.data)
            tabCourseList.html('')
            var moreTemplate = '<li class="text-center moreBox" id="more"><span class="iconfont icon-shuangjiantou more"></span></li>'
            for (var i = 5; i < msg.data.length; i++) {
                var template = '<li>' +
                    '<a href="javascript:;" class="tabCurrent">' + (i + 1) + " " + msg.data[i].CourseName + '</a>' +
                    '</li>'
                tabCourseList.append(template)
            }
            tabCourseList.append(moreTemplate)

            $("#more").click(function() {
                $("#more").hide(0)
                tabCourseList.css("height", "auto")
                $.ajax({
                    method: "get",
                    url: changeUrl.address + "/Class_Course_api?whereFrom=Search_Course",
                    success: function(msg) {
                        // console.log(msg.data)
                        tabCourseList.html('')
                        for (var i = 0; i < msg.data.length; i++) {
                            var template = '<li>' +
                                '<a href="javascript:;" class="tabCurrent">' + (i + 1) + " " + msg.data[i].CourseName + '</a>' +
                                '</li>'
                            tabCourseList.append(template)
                        }
                    }
                })
            })
        }
    })

    // wangEditor 提交评论
    var E = window.wangEditor
    var editor = new E('#editor')

    // editor.customConfig.uploadImgServer = changeUrl.address + '/Admin_api?whereFrom=EditorUpImg'
    editor.customConfig.uploadImgServer = 'http://data.xinxueshuo.cn:80/nsi-1.0/Admin_api?whereFrom=EditorUpImg'
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
        editorBox.show(200)
    })
    cancle.click(function() {
        editorBox.hide(200)
    })
    confirm.click(function() {
        getUserHomeWork()
    })

    function getUserHomeWork() {
        if (editor.txt.text() == "") {
            layer.msg("内容不能为空", function() {})
        } else {
            layer.msg("提交成功")

            // 提交至后台
            sendUserWork()
        }
    }

    // 提交至后台
    function sendUserWork() {
        var userMail = $.cookie('username'),
            courseId = 10001,
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

    // 获取学生作业列表
    // $.ajax({
    //     method: "post",
    //     url: changeUrl.address + "/assignment/get_student_assignment.do",
    //     data: {
    //         'courseId': 10001
    //     },
    //     success: function(msg) {
    //         stuAnswer.html("")
    //         console.log(msg.data)
    //         var _length = msg.data.length
    //         $(".personNum").text(_length)
    //         for (var i = 0; i < _length; i++) {
    //             var template =
    //                 '<div class="col-md-12 pt15">' +
    //                 '<div class="row bottomLine">' +
    //                 '<div class="col-md-1">' +
    //                 '<img src="../images/userPic/eg08.png" alt="" width="40">' +
    //                 '</div>' +
    //                 '<div class="col-md-11">' +
    //                 '<p><span class="stuName">' + msg.data[i].userName + '</span></p>' +
    //                 '<p class="stuAnswerContent">' + msg.data[i].assignmentContent + '</p>' +
    //                 '<p class="text-right stuAnswerTime">' + formatDate(msg.data[i].createTime) + '</p>' +
    //                 '</div>' +
    //                 '</div>' +
    //                 '</div>'
    //             stuAnswer.append(template)
    //         }
    //     }
    // })

    // 回复作业
    var reply = $("#reply"),
        closeBtn = $("#closeBtn"),
        replayInputBox = $("#replayInputBox"),
        replayList = $("#replayList")

    reply.click(function() {
        replayInputBox.show(200)
    })
    closeBtn.click(function() {
        replayInputBox.hide(200)
    })

    $.ajax({
        method: "get",
        url: changeUrl.address + "/Comment/list.do",
        data: {
            CourseId: 10001
        },
        success: function(msg) {
            replayList.html("")
            console.log(msg.data)
            for (var j = 0; j < msg.data.length; j++) {
                var template = '<div class="row mb15">' +
                    '<div class="col-md-1">' +
                    '<img src="../images/userPic/eg05.png" alt="" width="35" class="replyPic">' +
                    '</div>' +
                    '<div class="col-md-11 pl0">' +
                    '<p class="userReplayName">' + msg.data[j].commentatorname + '</p>' +
                    '<p class="userReplayContent">' + msg.data[j].content + '</p>' +
                    '</div>' +
                    '</div>'
                replayList.append(template)
            }
        }
    })
})