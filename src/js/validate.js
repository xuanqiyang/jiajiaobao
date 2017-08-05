require(['jquery', 'validator'], function($, validator) {
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
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                maxlength: 20,
                minlength: 6,
                checkPsw: true
            }
        },
        messages: {
            email: {
                required: "请输入邮箱地址",
                email: "输入正确的邮箱地址"
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
            email: {
                required: true,
                email: true
            },
            verifiCode: {
                required: true,
                number: true,
                minlength: 6,
                maxlength: 6
            },
            password: {
                required: true,
                maxlength: 20,
                minlength: 6,
                checkPsw: true
            },
            againpsw: {
                required: true,
                maxlength: 20,
                minlength: 6,
                equalTo: "#password",
                checkPsw: true
            },
            agree: {
                required: true
            }
        },
        messages: {
            email: {
                required: "请输入邮箱地址",
                isPhone: "请输入正确的邮箱"
            },
            verifiCode: {
                required: "请输入验证码",
                number: "请输入正确的验证码",
                minlength: "请输入正确的验证码",
                maxlength: "请输入正确的验证码"
            },
            password: {
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
            email: {
                required: true,
                email: true
            },
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
            email: {
                required: '请输入邮箱地址',
                email: '请输入正确的的邮箱'
            },
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
    $("#organinfo").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            username: {
                required: true,
                checkName: true
            },
            industry: {
                required: true
            },
            address: {
                required: true
            },
            subject: {
                required: true
            },
            phonenum: {
                require: true
            }
        },
        messages: {
            username: {
                required: "请输入您的用户昵称",
                checkName: "用户昵称由中英文、数字、_、-组成"
            },
            phonenum: {
                isPhone: "请输入正确的手机号码",
                required: "请输入联系电话"
            },
            subject: {
                required: "输入您的授课科目"
            },
            address: {
                required: "输入您的授课地址"
            },
            school: {
                require: "请输入毕业学校"
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
            phonenum: {
                isPhone: true,
                required: true
            },
            address: {
                required: true
            },
            subject: {
                required: true
            },

            school: {
                required: true
            }
        },
        messages: {
            username: {
                required: "请输入您的用户昵称",
                checkName: "用户昵称由中英文、数字、_、-组成"
            },
            phonenum: {
                isPhone: "请输入正确的手机号码",
                required: "请输入联系电话"
            },
            address: {
                required: "输入您的授课地址"
            },
            subject: {
                required: "输入您的授课科目"
            },

            school: {
                required: "请输入毕业学校"
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
            phonenum: {
                isPhone: true,
                required: true
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
            phonenum: {
                isPhone: "请输入正确的手机号码",
                required: "请输入联系电话"
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
    $("#uploadCourse").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            subject: {
                required: true
            },
            grade: {
                required: true
            },
            courseName: {
                required: true
            },
            price: {
                required: true
            }
        },
        messages: {
            subject: {
                required: "请填写教授科目"
            },
            grade: {
                required: "请填写教授年级"
            },
            courseName: {
                required: "请填写课程名称"
            },
            price: {
                required: "请填写课程收费"
            }
        }
    });
    $("#organId").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            realName: {
                required: true
            },
            idNum: {
                required: true
            }
        },
        messages: {
            realName: {
                required: '请填写真实姓名'
            },
            idNum: {
                required: '请填写身份证号码'
            }
        }
    });
    $("#teacherId").validate({
        errorPlacement: function(error, element) {
            $("#errorMesg").html(error);
        },
        rules: {
            realName: {
                required: true
            },
            idNum: {
                required: true
            }
        },
        messages: {
            realName: {
                required: '请填写真实姓名'
            },
            idNum: {
                required: '请填写身份证号码'
            }
        }
    });
});