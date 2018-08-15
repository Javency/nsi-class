$(function() {
    $('body').css("overflow-y", "hidden")
    var userPic = $("#userPic"),
        picBoxBg = $("#picBoxBg"),
        cancle = $(".closePicBox")

    // 打开上传图片
    userPic.click(function() {
        picBoxBg.fadeIn(200)
        $('body').css("overflow-y", "hidden")
    })

    // 关闭上传图片
    cancle.click(function() {
        picBoxBg.fadeOut(200)
        $('body').css("overflow-y", "auto")
    })

    // 裁图
    var $img = $("#inputImage")
    var dataurl = null;
    $img.cropper({
            aspectRatio: 1 / 1,
            crop: function(data) {
                // console.log(data)
                var $imgData = $img.cropper('getCroppedCanvas', {
                    width: 100,
                    height: 100
                })
                dataurl = $imgData.toDataURL('image/png');
                $(".previewPic").attr("src", dataurl);
                // $("#circularPic").attr("src", dataurl);
                // $("#squarePic").attr("src", dataurl);
            }
        })
        //  第一步，将base64转换成二进制图片（Blob）
    function dataURItoBlob(base64Data) {
        var byteString;
        if (base64Data.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(base64Data.split(',')[1]);
        else
            byteString = decodeURI(base64Data.split(',')[1]);
        var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }

})