$(function () {
//一进入页面就发送ajax请求，请求一级分类数据，进行页面渲染

    var currentPage = 1;
    var currentPagesize = 5;
    reader()
   function  reader() {
       $.ajax({
           url:"/category/queryTopCategoryPaging",
           type:"get",
           data:{
               page:currentPage,
               pageSize:currentPagesize,
           },
           dataType:"json",
           success:function (info) {
               console.log(info);
               var templates = template('fristTel',info)
               $("tbody").html(templates);
               //    分页代码
               $("#paginator").bootstrapPaginator({
                   //    配置bootstrap版本
                   bootstrapMajorVersion:3,
                   //    指定总页数
                   totalPages:Math.ceil(info.total / info.size),
                   //    当前页
                   currentPage:currentPage,
                   //    给页码绑定点击事件 插件自带
                   onPageClicked:function (a,b,c,page) {
                       currentPage = page;
                       reader();

                   }


               })


           }

       })

   }


//2.点击添加分类按钮，显示添加模态框
    $("#addBtn").click(function () {
        $("#addModal").modal('show')

    })


//3.添加表单校验功能
$("#form").bootstrapValidator({

    // 配置校验图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',    // 校验成功
        invalid: 'glyphicon glyphicon-remove',  // 校验失败
        validating: 'glyphicon glyphicon-refresh' // 校验中
    },

    fields : {
        categoryName: {
            //配置校验规则
            validators : {
                //非空
                notEmpty : {
                    message : "请输入一级分类名称"
                }
            }
        }
    }

})



//    4.添加表单数据
    $("#form").on("success.form.bv",function (e) {
        e.preventDefault();
        $.ajax({
            url:" /category/addTopCategory",
            type:"POST",
            data: $('form').serialize(),
            dataType: 'json',
            success : function (info) {
                if (info.success){
                    $("#addModal").modal('hide')
                    currentPage = 1
                    reader()
                    $('form').data('bootstrapValidator').resetForm(true)
                }else {
                    alert("添加失败")
                }
            }
        })

    })

})