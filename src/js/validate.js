$(function() {
    $.validator.addMethod("filetype", function(value, element, param) {
        var fileType = value.substring(value.lastIndexOf(".") + 1).toLowerCase();
        return this.optional(element) || $.inArray(fileType, param) != -1;
    });
    $.validator.addMethod("filesize", function(value, element, param) {
        var fileSize = element.files[0].size;
        var maxSize = param * 1024 * 1024;
        return this.optional(element) || fileSize < maxSize;
    });
    $.validator.addMethod("checkName", function(value, element, param) {
        var checkName = /^[\w\u4e00-\u9fa5]{1,20}$/g;
        return this.optional(element) || (checkName.test(value));
    });
    $.validator.addMethod("checkPsw", function(value, element, param) {
        var checkPsw = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,20}$/;
        return this.optional(element) || (checkPsw.test(value));
    });
    $.validator.addMethod("isPhone", function(value, element, param) {
        var length = value.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    });
    $("#login_form").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        onsubmit: true,
        rules: {
            cellphone: {
                required: true,
                isPhone: true
            },
            password: {
                required: true,
                maxlength: 20,
                minlength: 6,
                checkPsw: true
            }
        },
        messages: {
            cellphone: {
                required: "请输入手机号码",
                isPhone: "输入正确的手机号码"
            },
            password: {
                required: "请输入密码",
                maxlength: "密码最长20位",
                minlength: "密码最短6位",
                checkPsw: "密码为以英文开头包含数字的6-20位字符"
            }
        }
    });
    $("#reg_form").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        onsubmit: true,
        rules: {
            cellphone: {
                required: true,
                isPhone: true
            },
            verifiCode: {
                required: true,
                number: true,
                minlength: 6,
                maxlength: 6
            },
            regpsw: {
                required: true,
                maxlength: 20,
                minlength: 6,
                checkPsw: true
            },
            againpsw: {
                required: true,
                maxlength: 20,
                minlength: 6,
                equalTo: "#regpsw",
                checkPsw: true
            }
        },
        messages: {
            cellphone: {
                required: "请输入手机号码",
                isPhone: "请输入正确的手机号码"
            },
            verifiCode: {
                required: "请输入验证码",
                number: "请输入正确的验证码",
                minlength: "请输入正确的验证码",
                maxlength: "请输入正确的验证码"
            },
            regpsw: {
                required: "请输入密码",
                maxlength: "密码不能超过20位",
                minlength: "密码不能少于6位",
                checkPsw: "密码为以英文开头包含数字的6-20位字符"
            },
            againpsw: {
                required: "请确认密码",
                maxlength: "密码不能超过20位",
                minlength: "密码不能少于6位",
                equalTo: "两次密码输入不一致",
                checkPsw: "密码为以英文开头包含数字的6-20位字符"
            },
            agree: {
                required: "请同意我们的协议"
            }
        }
    });

    $("#changepsw").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            verifiCode: {
                required: true,
                number: true,
                minlength: 6,
                maxlength: 6
            },
            newpsw: {
                required: true,
                minlength: 6,
                maxlength: 20,
                checkPsw: true
            },
            againpsw: {
                required: true,
                minlength: 6,
                maxlength: 20,
                equalTo: "#newpsw",
                checkPsw: true
            }
        },
        messages: {
            verifiCode: {
                required: "请输入验证码",
                number: "请输入正确的验证码",
                minlength: "请输入正确的验证码",
                maxlength: "请输入正确的验证码"
            },
            newpsw: {
                required: "*请填写密码",
                minlength: "密码不能少于6位",
                maxlength: "密码不能超过20位",
                checkPsw: "密码为以英文开头包含数字的6-20位字符"
            },
            againpsw: {
                required: "*请确认密码",
                minlength: "密码不能少于6位",
                maxlength: "密码不能超过20位",
                equalTo: "两次密码输入不相同",
                checkPsw: "密码为以英文开头包含数字的6-20位字符"
            }
        }
    });
    $("#teacherinfo").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            username: {
                required: true,
                checkName: true
            },
            subject: {
                required: true
            },
            address: {
                required: true
            }
        },
        messages: {
            username: {
                required: "请输入您的用户昵称",
                checkName: "用户昵称由中英文、数字、_、-组成"
            },
            subject: {
                required: "输入您的授课科目"
            },
            address: {
                required: "输入您的授课地址"
            }
        }
    });
    $("#studentinfo").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            username: {
                required: true,
                checkName: true
            },
            subject: {
                required: true
            },
            address: {
                required: true
            },
            teatime: {
                required: true
            },
            fee: {
                required: true
            }
        },
        messages: {
            username: {
                required: "请输入您的用户昵称",
                checkName: "用户昵称由中英文、数字、_、-组成"
            },
            subject: {
                required: "输入您的求教科目"
            },
            address: {
                required: "输入您的授课地址"
            },
            teatime: {
                required: "输入您的授课时间段"
            },
            fee: {
                required: "输入您预计支付的课酬"
            }
        }
    });
    $("#portrait").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            portrait_fname: {
                required: true,
                filetype: ['jpg', 'png']
            }
        },
        messages: {
            portrait_fname: {
                required: "请上传你的头像",
                filetype: "图片只能是png,jpg"
            }
        }

    });
    $("#identi_work").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            work_fname: {
                required: true,
                filetype: ['jpg', 'png']
            }
        },
        messages: {
            work_fname: {
                required: "请上传图片",
                filetype: "图片只能是png,jpg"
            }
        }

    });
    $("#identi_teacherID").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            teacherID_fname: {
                required: true,
                filetype: ['jpg', 'png']
            }
        },
        messages: {
            teacherID_fname: {
                required: "请上传图片",
                filetype: "图片只能是png,jpg"
            }
        }

    });
    $("#identi_professor").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            professor_fname: {
                required: true,
                filetype: ['jpg', 'png']
            }
        },
        messages: {
            professor_fname: {
                required: "请上传图片",
                filetype: "图片只能是png,jpg"
            }
        }

    });
    $("#ask").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            ask_fname: {
                filetype: ['jpg', 'png']
            },
            ask_descript: {
                required: true
            }
        },
        messages: {
            ask_fname: {
                filetype: "图片只能是png,jpg"
            },
            ask_descript: {
                required: "请填写对问题的详细描述"
            }
        }
    });
    $("#course_info").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            course_fname: {
                filetype: ['jpg', 'png']
            },
            course_descript: {
                required: true
            }
        },
        messages: {
            course_fname: {
                filetype: "图片只能是png,jpg"
            },
            course_descript: {
                required: "请填写对课程的详细描述"
            }
        }
    });
    $("#example").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            example: {
                required: true
            }
        },
        messages: {
            example: {
                required: "未填写信息"
            }
        }
    });
    $("#join_rule").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            join_rule: {
                required: true
            }
        },
        messages: {
            join_rule: {
                required: "未填写信息"
            }
        }
    });
    $("#exit_rule").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            exit_rule: {
                required: true
            }
        },
        messages: {
            exit_rule: {
                required: "未填写信息"
            }
        }
    });
    $("#feedback").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            feedback: {
                required: true
            }
        },
        messages: {
            feedback: {
                required: "未填写信息"
            }
        }
    });
    $("#certificate").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            certificate: {
                required: true
            }
        },
        messages: {
            certificate: {
                required: "未填写信息"
            }
        }
    });
    $("#identi_education").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            identi_education: {
                required: true
            }
        },
        messages: {
            identi_education: {
                required: "未填写信息"
            }
        }
    });
    $("#introduce").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            introduce: {
                required: true
            }
        },
        messages: {
            introduce: {
                required: "未填写信息"
            }
        }
    });
    $("#identi_ID").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            identi_ID: {
                required: true
            }
        },
        messages: {
            identi_ID: {
                required: "未填写信息"
            }
        }
    });
    $("#other").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            other: {
                required: true
            }
        },
        messages: {
            other: {
                required: "未填写信息"
            }
        }
    });
    $("#itenti_professor").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            itenti_professor: {
                required: true
            }
        },
        messages: {
            itenti_professor: {
                required: "未填写信息"
            }
        }
    });
    $("#general").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            general: {
                required: true
            }
        },
        messages: {
            general: {
                required: "未填写信息"
            }
        }
    });

    function errorModal(valid_form) {
        var valid = valid_form.valid();
        if (!valid) {
            mui.alert("<div id='errorMesg'></div>")
        }
    }
    $(".btn-submit").click(function() {
        errorModal($("form"));
    })
    $("#save").click(function() {
        $('.btn-submit').trigger('click')
    });
});
