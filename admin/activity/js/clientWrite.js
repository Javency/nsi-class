// 获取标题
var Id = "";
$(function() {
    var content = $("#content"),
        subBox = $(".subBox")

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
    Id = decodeURIComponent(args['Id'])
    console.log(Id)


    $.ajax({
        type: "post",
        async: true,
        dataType: "json",
        url: changeUrl.address + '/Class_activity?whereFrom=toResultTitle&Id=' + Id,
        success: function(msg) {
            var obj = msg.data[0],
                aTitle = [],
                Deadline = $("#Deadline"),
                activityTitle = $("#activityTitle"),
                activityDescription = $("#activityDescription"),
                activityPic = $("#activityPic"),
                title = $("title")
                // console.log(obj)
            Deadline.text(obj.Deadline)
            activityPic.append(obj.Title20)
            for (arr in obj) {
                if (obj[arr] !== "未填写" && obj[arr] !== "0" && arr !== "Id" && arr !== "Load_time" && arr !== "Deadline") {
                    aTitle.push(obj[arr])
                }
            }
            // console.log(aTitle)
            // $("#Title01").text(msg[0].Title01)
            activityTitle.text(aTitle[0])
            activityDescription.text(aTitle[1])
            title.html("新学说-" + activityTitle.text())
            for (var i = 2; i < aTitle.length - 1; i++) {
                subBox.before(`
                <div class="form-group">
                    <div class="row">
                        <label for="Title_input${i}" class="Title col-md-12 control-label" id="Title${i}">${(i-1)+"."+aTitle[i]}</label>
                        <div class="col-md-12">
                            <input type="text" id="Title_input${i}" class="Title_input">
                        </div>
                    </div>
                </div>
                `)
            }

            // 对比截止日期
            var formatDate = function(date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            };
            var date = formatDate(new Date())

            function toNum(date) {
                var arr = date.split("-"),
                    dateNum = 0;
                return dateNum = Number(arr.join(""))
            }

            toNum(date) > toNum(obj.Deadline) ? alert("该活动已结束，请到新学说官网关注最新活动。") : console.log("活动还在日期中")

        },
        error: function(msg) {
            console.log("error:获取标题失败" + msg)
        }
    })
})

// 提交表单
$(function() {
    var sub = $("#sub")
    sub.on("click", function() {
        var aInput = $("input[type=text]"),
            data = [],
            sendData = {}

        if (aInput.eq(0).val() == "") {
            alert("请填写第一项内容")
        } else {
            for (var i = 2; i < aInput.length + 2; i++) {
                sendData["Content" + (i + 1)] = addEmpty($("#Title_input" + i).val());
                sendData["Title" + (i + 1)] = $("#Title" + i).text();
                sendData["Deadline"] = $("#Deadline").text();
                sendData["Id"] = Id
            }
            sendData["Title1"] = $("#activityTitle").text();
            sendData["Title2"] = $("#activityDescription").text();

            console.log(sendData)
            $.ajax({
                type: "post",
                data: sendData,
                async: true,
                dataType: "json",
                url: changeUrl.address + '/Class_activity?whereFrom=insert',
                success: function(msg) {
                    console.log("success:提交表单成功" + msg)
                    alert("提交成功!将跳转至官网")
                    window.location.href = "http://www.xinxueshuo.cn/"
                },
                error: function(msg) {
                    console.log("error:提交表单失败" + msg)
                }
            })
        }
    })

    function addEmpty(str) {
        var strFilter = null;
        return strFilter = (str === '') ? "未填写" : str;
    }
})

// body高度
$(function() {
    var height = $(window).height()
    $(document.body).css("min-height", height)
})