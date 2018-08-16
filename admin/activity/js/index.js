var clientUrl = ""
$(function() {
    var sub = $("#sub"),
        address = $("#address")
        // sub.on("click", function() {
        //     console.log($("#editor p").html())
        // })
    sub.on("click", function() {
        $("#Title20").val($("#editor p").html())
            // console.log($("#editor p").html())
        var data = {
            'Title1': addEmpty($("#Title1").val()),
            'Title2': addEmpty($("#Title2").val()),
            'Title3': addEmpty($("#Title3").val()),
            'Title4': addEmpty($("#Title4").val()),
            'Title5': addEmpty($("#Title5").val()),
            'Title6': addEmpty($("#Title6").val()),
            'Title7': addEmpty($("#Title7").val()),
            'Title8': addEmpty($("#Title8").val()),
            'Title9': addEmpty($("#Title9").val()),
            'Title10': addEmpty($("#Title10").val()),
            'Title11': addEmpty($("#Title11").val()),
            'Title12': addEmpty($("#Title12").val()),
            'Title13': addEmpty($("#Title13").val()),
            'Title14': addEmpty($("#Title14").val()),
            'Title15': addEmpty($("#Title15").val()),
            'Title16': addEmpty($("#Title16").val()),
            'Title17': addEmpty($("#Title17").val()),
            'Title18': addEmpty($("#Title18").val()),
            'Title19': addEmpty($("#Title19").val()),
            'Title20': addEmpty($("#Title20").val()),
            'Deadline': addEmpty($("#Deadline").val())
        }
        $.ajax({
            type: "post",
            async: true,
            data: data,
            url: changeUrl.address + '/Class_activity?whereFrom=insertTitle',
            dataType: "json",
            success: function(msg) {
                address.val("http://" + changeUrl.imgAddress + "/nsi-class/admin/activity/clientWrite.html?Id=" + msg.data)
                clientUrl = "http://" + changeUrl.imgAddress + "/nsi-class/admin/activity/clientWrite.html?Id=" + msg.data
                console.log("success:" + msg.data)
            },
            error: function(msg) {
                console.log("error:" + msg)
            }
        })
    })

    function addEmpty(str) {
        var strFilter = null;
        return strFilter = (str === '') ? "未填写" : str;
    }
})
$(function() {
    var E = window.wangEditor
    var editor = new E('#editor')
        // 自定义菜单配置
    editor.customConfig.menus = [
        'image'
    ]
    editor.customConfig.uploadImgServer = changeUrl.address + '/Admin_api?whereFrom=EditorUpImg' // 上传图片到服务器
    editor.create()
})

$(function() {
    var copy = $("#copy"),
        address = $("#address"),
        qrcode = $("#qrcode")
    copy.on("click", function() {
        address.select();
        document.execCommand("Copy"); // 执行浏览器复制命令
        alert("已复制好，可贴粘。");
        // console.log(document.execCommand("Copy"))
    })
    qrcode.on("click", function() {
        window.open("https://cli.im/api/qrcode/code?text=" + clientUrl + "&mhid=vBOVDVnqn8khMHctLNVWMK4")
    })
})