//实现第一个ajax发送的时候 开启进度条，在所有ajax结束的时候结束进度条
$(document).ajaxStart(function () {
    NProgress.start();//开启进度条
});
$(document).ajaxStop(function () {
    NProgress.done();
})

//登录拦截功能
if(location.href.indexOf("login.html") === -1){
$.ajax({
    url:"/employee/checkRootLogin",
    type:"GET",
    datatype:"json",
    success:function (info) {
        if(info.success){
        //    说明已经登录
        }
        if(info.error === 400){
        //    未登录，拦截到登录也
            location.href = "login.html"
        }

    }
})
}


//入口函数里面写
$(function(){
//1.    分类管理的切换功能
    $(".nav .category").click(function () {
        $(".nav .child").stop().slideToggle();
    })
//    2.
    $(".icon_menu").click(function () {
        $(".lt_aside").addClass("hidemenu");
        $(".lt_topbar").addClass("hidemenu");
        $(".it_main").addClass("hidemenu");
    })
//    3.点击topbar按钮退出模态框
    $(".icon_out").click(function () {
        $("#logoutModal").modal("show")

    })
//    4.点击模态框的退出按钮，实现退出功能
    $("#logoutBtn").click(function () {
    //    发送ajax请求，进行退出
        $.ajax({
            url:"/employee/employeeLogout",
            type:"GET",
            dataType:"json",
            success:function (info) {
                console.log(info);
                if (info.success){
                    location.href="login.html"
                }

            }

        })

    })


})