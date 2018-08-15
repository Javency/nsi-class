$(function() {
    // $('body').css("overflow-y", "hidden")
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

})

$(function() {
    var $img = $("#image")
    var dataurl = null;
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

    function submitImg(url, success) {
        //            第二步，构建formData
        var blob = dataURItoBlob(dataurl); // 上一步中的函数
        console.log(blob)
        var fd = new FormData();
        fd.append("file", blob, 'image.png');

        //  第三步，使用AJAX提交
        $.ajax({
            // url:  changeUrl.address + '/Admin_api?whereFrom=OosUpImg',
            // url:  changeUrl.address + '/manager/talent/upload.do?type='+type+'/',
            url: url,
            method: 'POST',
            processData: false, //  不会将 data 参数序列化字符串
            contentType: false, //  根据表单 input 提交的数据使用其默认的 contentType
            dataType: 'json',
            data: fd,
            success: function(data) {
                console.log(data)
                alert('上传成功')
                success(data)
            }
        });
    }


    //上传网站头像
    $('#upLoad-WebsiteLogo').on('click', function() {
        if (dataurl === null) {
            alert('请选择图片')
        } else {
            function successUpLoadResumeLogo(data) {
                $('#userLogo01,#userLogo02').attr('src', data.data.url)
                $.ajax({
                    type: 'post',
                    url: changeUrl.address + '/user/update_user_information.do',
                    data: {
                        id: $.cookie('userId'),
                        userPortrait: data.data.url
                    },
                    success: function(msg) {
                        // alert(1)
                        // console.log(msg)
                    }
                })
            }
            // submitImg(changeUrl.address + '/manager/talent/upload.do?type=UserPortrait/', successUpLoadResumeLogo)
        }
    })

    //(初次发布时)上传简历头像
    $('#upLoad-ResumeLogo').on('click', function() {
        if (dataurl === null) {
            alert('请选择图片')
        } else {
            function successUpLoadResumeLogo(data) {
                $('#resumeLogo').attr('src', data.data.url)
                $('#ResumeImage').val(data.data.url)
            }
            // submitImg(changeUrl.address + '/manager/talent/upload.do?type=ResumePortrait/', successUpLoadResumeLogo)
        }
    })

    //(修改时)上传简历头像
    $('#upLoad-ResumeLogo02').on('click', function() {
        if (dataurl === null) {
            alert('请选择图片')
        } else {
            function successUpLoadResumeLogo(data) {
                $('#resumeLogo').attr('src', data.data.url)
                $.ajax({
                    type: 'post',
                    url: changeUrl.address + '/manager/talent/update.do',
                    data: {
                        userMail: $.cookie('username'),
                        image: data.data.url
                    },
                    success: function(msg) {
                        console.log(msg)
                    }
                })
            }
            // submitImg(changeUrl.address + '/manager/talent/upload.do?type=ResumePortrait/', successUpLoadResumeLogo)
        }
    })

    //招聘单位发布公司LOGO
    $('#startUpload').click(function() {
        if (dataurl === null) {
            alert('请选择图片')
        } else {
            function successUpLoadCompanyLogo(data) {
                $('#Logo').val(data.data[0])
                $('#imgLogo').attr('src', data.data[0])
            }
            // submitImg(changeUrl.address + '/Admin_api?whereFrom=OosUpImg', successUpLoadCompanyLogo)
        }
    })

})