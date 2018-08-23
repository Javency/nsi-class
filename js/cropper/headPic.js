$(function() {
    // $('body').css("overflow-y", "hidden")
    var userPic = $("#userPic"),
        picBoxBg = $("#picBoxBg"),
        cancle = $(".closePicBox"),
        changePic = $("#changePic")

    // 打开上传图片
    userPic.click(function() {
        picBoxBg.fadeIn(200)
        $('body').css({ "overflow-y": "hidden", "margin-right": "17px" })
    })

    // 关闭上传图片
    cancle.click(function() {
        picBoxBg.fadeOut(200)
        $('body').css({ "overflow-y": "auto", "margin-right": "0" })
    })

    // 随机图片
    var egImgList = ['https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-user/samplePic/eg01.png', 'https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-user/samplePic/eg02.png', 'https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-user/samplePic/eg03.png', 'https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-user/samplePic/eg04.png', 'https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-user/samplePic/eg06.png', 'https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-user/samplePic/eg07.png', 'https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-user/samplePic/eg08.png']

    function RandomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }
    changePic.click(function() {
        var randomUrl = egImgList[RandomNumBoth(0, 7)]
        $("#userPic").attr("src", randomUrl)
    })
})

$(function() {
    var $img = $("#image"),
        dataurl = null,
        confirm = $("#confirm")

    $img.cropper({
        aspectRatio: 1 / 1,
        crop: function(data) {
            // console.log(data)
            var $imgData = $img.cropper('getCroppedCanvas', {
                width: 200,
                height: 200
            })
            dataurl = $imgData.toDataURL('image/png');
            $(".previewPic").attr("src", dataurl);
        }
    })

    function submitImg(url) {
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: {
                "strImage": dataurl.split("base64,")[1]
            },
            success: function(data) {
                console.log(data)
            },
            error: function(msg) {

            }
        });

    }

    // 确认提交上传头像
    confirm.click(function() {
        $('body').css("overflow-y", "auto")
        var finalDataurl = dataurl,
            userPic = $("#userPic"),
            picBoxBg = $("#picBoxBg")

        picBoxBg.fadeOut(200)
        userPic.attr("src", finalDataurl)
        submitImg(changeUrl.address + '/manager/talent/get_base64_image.do?type=nsi-user/userPic/')
    })

})