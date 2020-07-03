$(function () {
//一进入页面就发送ajax请求，获取用户列表数据，通过模板引擎渲染数据
    var currentPage = 1;
    var currentPagesize = 5;
    var currentId;
    var currentIsdelete;

    reader()
    function  reader() {
        $.ajax({
            url:"/user/queryUser",
            type:"get",
            data:{
                page:currentPage,
                pageSize:currentPagesize,
            },
            datatype: "json",
            success:function (info) {
                console.log(info)
                //template(模板id，数据对象)
                //在模板中可以任意使用数据对象中的属性
                var htmlStr = template('tpl',info);
                $('tbody').html(htmlStr);

                //    分页初始化
                $("#paginator").bootstrapPaginator({
                    //    配置bootstrap版本
                    bootstrapMajorVersion:3,
                    //    指定总页数
                    totalPages:Math.ceil(info.total / info.size),
                    //    当前页
                    currentPage:info.page,

                //    给页码绑定点击事件 插件自带
                    onPageClicked:function (a,b,c,page) {
                        currentPage = page;
                        reader()

                    }


                })

            }
        })

    }

//2.启用禁用按钮，显示模态框，通过事件委托绑定事件
    $("table").on("click",".btn",function (event) {
        $("#userModal").modal("show");
        currentId = $(this).parent().data("id");
        // currentIsdelete = $(this).parent().data("isdelete");
        console.log($(this).hasClass("btn-danger"))
    //    简单方法
        currentIsdelete = $(this).hasClass("btn-danger") ? 0 : 1;

    })
    //点击确认，发送ajax请求，修改对应用户专题需要两个参数id和idDelete的用户状态
    $("#submitBtn").click(function () {
        console.log("用户id"+currentId)

        // var currentIsdeletes = currentIsdelete === 0 ? 1 : 0;
        $.ajax({
            url:"/user/updateUser",
            type: "POST",
            datatype: "json",
            data:{
                id:currentId,
                isDelete: currentIsdelete,
            },
            success:function (info) {
                if(info.success){
                    $("#userModal").modal("hide");
                    reader();
                }

            }
        })

    })
})