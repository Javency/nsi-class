$(function() {
    var sub = $("#sub")

    sub.on("click", function() {
        var job = "",
            hrYear = "",
            jobYear = "",
            afford = "",
            attr = "",
            personNum = "",
            whyJoin = "",
            interested = "",
            haveClass = "";
        $("input[name='job']:checked").each(function() {
            job = $(this).val()
        })
        $("input[name='hrYear']:checked").each(function() {
            hrYear = $(this).val()
        })
        $("input[name='jobYear']:checked").each(function() {
            jobYear = $(this).val()
        })
        $("input[name='afford']:checked").each(function() {
            afford = $(this).val()
        })
        $("input[name='attr']:checked").each(function() {
            attr = $(this).val()
        })
        $("input[name='personNum']:checked").each(function() {
            personNum = $(this).val()
        })
        $("input[name='whyJoin']:checked").each(function() {
            whyJoin = $(this).val()
        })
        $("input[name='interested']:checked").each(function() {
            interested += $(this).val() + "；"
        })
        $("input[name='haveClass']:checked").each(function() {
            haveClass += $(this).val() + "；"
        })
        if ($("#Title_input3").val() == "" || $("#Title_input4").val() == "" || $("#Title_input5").val() == "" || $("#Title_input11").val() == "" || job == "" || hrYear == "" || jobYear == "" || afford == "" || afford == "" || attr == "" || personNum == "" || whyJoin == "" || interested == "" || haveClass == "") {
            alert("请填写必填项")
        } else {
            var data = {
                'Title1': $("#activityTitle").text(),
                'Title2': $("#activityDescription").text(),
                'Title3': $("#Title3").text(),
                'Title4': $("#Title4").text(),
                'Title5': $("#Title5").text(),
                'Title6': $("#Title6").text(),
                'Title7': $("#Title7").text(),
                'Title8': $("#Title8").text(),
                'Title9': $("#Title9").text(),
                'Title10': $("#Title10").text(),
                'Title11': $("#Title11").text(),
                'Title12': $("#Title12").text(),
                'Title13': $("#Title13").text(),
                'Title14': $("#Title14").text(),
                'Title15': $("#Title15").text(),
                'Title16': $("#Title16").text(),
                'Title17': $("#Title17").text(),
                'Title18': $("#Title18").text(),

                'Content3': $("#Title_input3").val(),
                'Content4': $("#Title_input4").val(),
                'Content5': $("#Title_input5").val(),
                'Content6': job,
                'Content7': $("#Title_input7").val(),
                'Content8': hrYear,
                'Content9': jobYear,
                'Content10': afford,
                'Content11': $("#Title_input11").val(),
                'Content12': attr,
                'Content13': personNum,
                'Content14': whyJoin,
                'Content15': $("#Title_input15").val(),
                'Content16': $("#Title_input16").val(),
                'Content17': interested,
                'Content18': haveClass,
                'Deadline': $("#Deadline").text()
            }
            $.ajax({
                type: "post",
                dataType: "json",
                data: data,
                url: changeUrl.address + '/Class_activity?whereFrom=insert',
                success: function(msg) {
                    // console.log(msg.data)
                    alert("报名成功!我们将会有工作人员联系您")
                    location.reload()
                },
                error: function() {
                    console.log("error")
                }
            })
        }
    })
})