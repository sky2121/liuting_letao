$(function () {
    var currentPage = 1
    var currentPageSize = 5
    reader()
    function reader() {
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"GET",
            data:{
                page:currentPage,
                pageSize : currentPageSize,
            },
            dataType:"json",
            success:function (info) {
                console.log(info)
                var temp = template('secondtpl',info)
                $('tbody').html(temp)

                $('#paginator').bootstrapPaginator({
                    //    配置bootstrap版本
                    bootstrapMajorVersion : 3,
                    //    指定总页数
                    totalPages: Math.ceil(info.total / info.size),
                    //    当前页
                    currentPage : info.page,
                    //    给页码绑定点击事件 插件自带
                    onPageClicked:function (a,b,c,page) {
                        currentPage = page;
                        reader()
                    }

                })

            }
        })

    }

//点击添加弹出模态框
    $('#addBtn').click(function () {
        $('#addModal').modal('show')
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"GET",
            data:{
                page:1,
                pageSize : 9999,
            },
            dataType:"json",
            success:function (info) {
                console.log(info)
                var addTemp = template('secondtpltwo',info)
                $('.dropdown-menu').html(addTemp)

            }
        })

    })


//    给下来列表的a标签添加点击事件用 事件委托
    $('.dropdown-menu').on('click','li a',function () {
        //获取a标签内容
        var txt = $(this).text()
        // console.log($(this))
        //设置button标签内容
        $('#dropdownText').text(txt)

        //获取a标签上的data-id的值复制给 input框
        var valtxt = $(this).data('id')
        $('[name="categoryId"]').val(valtxt)
        $("form").data("bootstrapValidator").updateStatus("categoryId","VALID",)

    })


//    文件上传用的包
    $('#fileImg').fileupload({
        dataType:'json',
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        //done:上传完成后回调的函数
        done:function (e, data) {
            console.log(data);
            $('#yulanImg').attr('src',data.result.picAddr)
            $('[name="brandLogo"]').val(data.result.picAddr)
            $("form").data("bootstrapValidator").updateStatus("brandLogo","VALID",)
        }
    })


//    做表单校验
    $('#form').bootstrapValidator({
        excluded: [],
        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    // 校验成功
            invalid: 'glyphicon glyphicon-remove',  // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },

        fields:{
            categoryId:{
                //    配置校验规则
                validators:{
                    //    非空
                    notEmpty:{
                        message:"请选择一级分类"
                    },

                }


            },
            brandName:{
                //    配置校验规则
                validators:{
                    //    非空
                    notEmpty:{
                        message:"请输入二级分类"
                    },

                }
            },
            brandLogo:{
                //    配置校验规则
                validators:{
                    //    非空
                    notEmpty:{
                        message:"请选择图片"
                    },

                }
            }
        }
    })

$('#form').on("success.form.bv",function (e) {
    console.log($('#form').serialize())
    e.preventDefault();
    $.ajax({
        url:"/category/addSecondCategory",
        type:"post",
        data:$('#form').serialize(),
        datatype:"json",
        success:function (info) {
            //关闭模态框
            $('#addModal').modal('hide')
            reader()
        },
        error:function (info) {
            console.log(info)
        }

    })
})



})