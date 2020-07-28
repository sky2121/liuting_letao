$(function () {

    var currentPage = 1;
    var currentPageSize = 2;
    var arrPic =[];
    console.log("arrpic"+arrPic)
    reader()
    function reader() {
        $.ajax({
            type:"GET",
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:currentPageSize,
            },
            datatype:"json",
            success:function (info) {
                console.log(info)
                var proTemp = template("proTel",info);
                $('tbody').html(proTemp);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    //总页数
                    totalPages:Math.ceil(info.total / info.size),
                    size:"large",
                    //设置按钮上的文字内容
                    itemTexts:function(type,page,current ){

                        //type类型：first、prev、page、next、last
                        switch (type) {
                            case "first":
                                return "首页"
                            break;
                            case "prev":
                                return "下一页"
                            break;
                            case "page":
                                return "第"+page+"页"
                                break;
                            case "next":
                                return "上一页"
                                break;
                            case "last":
                                return "尾页"
                                break;

                        }
                    },
                    //设置当鼠标悬浮在页码按钮上是的title信息
                    tooltipTitles:function(type,page,current ){

                        //type类型：first、prev、page、next、last
                        switch (type) {
                            case "first":
                                return "首页"
                                break;
                            case "prev":
                                return "下一页"
                                break;
                            case "page":
                                return "前往"+page+"页"
                                break;
                            case "next":
                                return "上一页"
                                break;
                            case "last":
                                return "尾页"
                                break;

                        }
                    },
                    //    当前页
                    currentPage:currentPage,
                    onPageClicked:function (a,b,c,page) {
                        currentPage = page;
                        reader()


                    }
                })
            },
            error:function (info) {
                console.log("请求出错")
            }
        })
    }


//    添加商品
//    点击添加商品分类跳出模态框
    $("#addproBtn").click(function () {
        $("#addProduct").modal("show");

        $.ajax({
            type: "GET",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:9999
            },
            datatype: "json",
            success:function (info) {
                console.log(info)
                var qufirst = template("qyfirst",info);
                $(".dropdown-menu").html(qufirst);


            }

        })

    })

//    点击选择的一级分类，然后button上的字显示选择的对应的一级分类
    $('.dropdown-menu').on("click","li a",function (e) {
        var bandName = $(this).text();
        $(".secondText").text(bandName);
        var brandId = $(this).data("id");
        $('[name="brandId"]').val(brandId);
        $("#form").data("bootstrapValidator").updateStatus("brandId","VALID")
    })
console.log("------------------------------------------------------")
//多文件上传
    $("#fileUploads").fileupload({
        datatype:"json",
        done:function (e,data) {
            arrPic.unshift(data.result)
            console.log(arrPic)

            $("#imgBox").prepend('<img  src="'+data.result.picAddr+'" width="100px" alt=""/>')

            if(arrPic.length > 3){
                arrPic.pop();
                $("#imgBox img").eq(-1).remove()
            }

        //    当上传三张照片之后修改验证状态
            if(arrPic.length === 3){
                $("#form").data("bootstrapValidator").updateStatus("proPic","VALID")
            }


        }
    })

// 5. 配置表单校验
$("#form").bootstrapValidator({
    //有隐藏域需要去验证
    excluded: [],
    //验证图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    //验证配置
    fields:{
        //    每个验证的规则
        brandId:{
            validators:{
                notEmpty:{
                    message:"请选择第二分类"
                }
            }
        },
        proName:{
            validators:{
                notEmpty:{
                    message:"输入商品名称"
                }
            }
        },
        proDesc:{
            validators:{
                notEmpty:{
                    message:"输入商品描述"
                }
            }
        },
        num:{
            validators:{
                notEmpty: {
                    message:"请输入商品库存"
                },
                //正则校验
                regexp: {
                    regexp: /^[1-9]\d*$/,
                    message: '商品库存格式为数字, 必须是非零开头的数字'
                }
            }
        },
        size:{
            validators:{
                notEmpty: {
                    message:"请输入商品尺码"
                },
                //正则校验
                regexp: {
                    regexp: /^\d{2}-\d{2}$/,
                    message: '尺码格式, 必须是 32-40'
                }
            }
        },
        oldPrice:{
            validators:{
                notEmpty: {
                    message:"请输入商品原价"
                },
                //正则校验
                regexp: {
                    regexp: /^[1-9]*$/,
                    message: '必须是数字'
                }
            }
        },
        price:{
            validators:{
                notEmpty: {
                    message:"请输入商品现价"
                },
                //正则校验
                regexp: {
                    regexp: /^[1-9]*$/,
                    message: '必须是数字'
                }
            }
        },
        proPic:{
            validators:{
                notEmpty: {
                    message:"请上传3张图片"
                },
            }
        }


    }
})

//    brandId=8&proName=%E7%99%BE%E5%88%A9%E6%9D%A5&proDesc=%E7%99%BE%E5%88%A9%E6%9D%A5%E7%99%BE%E5%B9%Bh&num=22&size=32-48&oldPrice=998&price=98&picStatus=statu=1
//    brandId=8&proName=%E4%B8%83%E5%8C%B9%E7%8B%BC&proDesc=%E7%99%BE%E5%B9%B4%E4%B8%83%E5%8C%B9%E7%8B%BC&num=23&size=23-25&oldPrice=998&price=998&proPic=&statu=1
//拼接参数
//    添加商品发送ajax
    $("#form").on("success.form.bv",function (e) {
        var productParma = $("form").serialize();
        productParma = productParma + "&picAddr1='"+arrPic[0].picAddr+"'&picName1='"+arrPic[0].picName+"'"
        productParma = productParma + "&picAddr1='"+arrPic[0].picAddr+"'&picName1='"+arrPic[0].picName+"'"
        productParma = productParma + "&picAddr1='"+arrPic[0].picAddr+"'&picName1='"+arrPic[0].picName+"'"
    //    阻止表单验证的默认提交时间，用ajax发送请求
        e.preventDefault();

        $.ajax({
            type:"POST",
            url:"/product/addProduct",
            data:productParma,
            datatype:"json",
            success:function (info) {
                if (info.success){
                    //关闭模态框
                    $("#addProduct").modal("hide");
                //    清空模态框form表单的数据
                    $("#form").data("bootstrapValidator").resetForm(true)
                    currentPage = 1;
                    reader()
                //    清除二级分类
                    $(".secondText").text("请选择二级分类")
                //    清除img标签
                    $("#imgBox img").remove()


                }

            }
        })

    })



})
