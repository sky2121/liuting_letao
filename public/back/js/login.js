$(function () {
/*
* 1.表单校验配置
*   校验要求：
*   （1）用户名不能为空，长度为2-6位
*   （2）密码不能为空，长度6-12位
*
* */
$("#form").bootstrapValidator({

    // 配置校验图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',    // 校验成功
        invalid: 'glyphicon glyphicon-remove',  // 校验失败
        validating: 'glyphicon glyphicon-refresh' // 校验中
    },

    fields:{
        username:{
        //    配置校验规则
            validators:{
            //    非空
                notEmpty:{
                    message:"用户名 不能为空"
                },
            //    长度校验
                stringLength:{
                    min:2,
                    max:6,
                    message:"密码长度必须是2-6位"
                },
            //  专门用于配置回调提示的规则
            callback:{
               message:"用户名不存在"
            }
            }

        },
        password:{
            validators:{
            //    非空
                notempty:{
                    message:"密码不能为空"
                },
            //    长度校验
                stringLength: {
                    min:6,
                    max:12,
                    message:"密码长度必须是6-12位"
                },
                callback:{
                    message:"密码错误"
                }
            }
        }
    }
});

    /*
    * 2.登录功能
    *   表单校验插件会在提交表单时进行校验
    *   （1）校验成功：默认提交表单，会发生页面跳转，
    *       我们需要注册表单校验成功事件，阻止默认的提交，通过ajax进行发送请求
    *   （2）校验失败，不会提交表单，配置插件提示用户即可
    *
    * */

//    注册表单校验成功事件
    $("#form").on("success.form.bv",function (e) {
    //    阻止默认的表单提交
        e.preventDefault();

    //    通过ajax进行提交
        $.ajax({
            type:"post",
            url:"/employee/employeelogin",
            data:$("#form").serialize(),
            dataType:"json",
            success:function (info) {
                console.log(info);
                if(info.success){
                    location.href="index.html"
                }
                if(info.error === 1000){
                    //INVALID 失败 VALID  NOT_VALIDATED   VALIDATED
                    $("form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
                }
                if(info.error === 1001){
                    $("form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
                }

            }
        })

    });


    /*
   * 3.重置功能
   *
   * */
    $('[type="reset"]').click(function () {
    //    调用插件的方法，进行重置校验状态
    //     resetForm(boolean)
    //    true:重置内容以及校验状态
    //    false:只重置校验状态
        $("#form").data("bootstrapValidator").resetForm(true);
    });

})