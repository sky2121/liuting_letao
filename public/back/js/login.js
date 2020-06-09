$(function () {
/*
* 1.表单校验配置
*   校验要求：
*   （1）用户名不能为空，长度为2-6位
*   （2）密码不能为空，长度6-12位
*
* */
$("#form").bootstrapValidator({
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
                }
            }
        }
    }
})

})