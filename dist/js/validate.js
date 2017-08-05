require(["jquery","validator"],function(e,r){e.validator.addMethod("filetype",function(r,i,a){var u=r.substring(r.lastIndexOf(".")+1).toLowerCase();return this.optional(i)||-1!=e.inArray(u,a)}),e.validator.addMethod("filesize",function(e,r,i){var a=r.files[0].size,u=1024*i*1024;return this.optional(r)||a<u}),e.validator.addMethod("checkName",function(e,r,i){var a=/^[\w\u4e00-\u9fa5]{1,20}$/g;return this.optional(r)||a.test(e)}),e.validator.addMethod("checkPsw",function(e,r,i){var a=/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,20}$/;return this.optional(r)||a.test(e)}),e.validator.addMethod("isPhone",function(e,r,i){var a=e.length,u=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;return this.optional(r)||11==a&&u.test(e)}),e("#login_form").validate({errorPlacement:function(r,i){e("#errorMesg").html(r)},onsubmit:!0,rules:{email:{required:!0,email:!0},password:{required:!0,maxlength:20,minlength:6,checkPsw:!0}},messages:{email:{required:"请输入邮箱地址",email:"输入正确的邮箱地址"},password:{required:"请输入密码",maxlength:"密码最长20位",minlength:"密码最短6位",checkPsw:"密码为以英文开头包含数字的6-20位字符"}}}),e("#reg_form").validate({errorPlacement:function(r,i){e("#errorMesg").html(r)},onsubmit:!0,rules:{email:{required:!0,email:!0},verifiCode:{required:!0,number:!0,minlength:6,maxlength:6},password:{required:!0,maxlength:20,minlength:6,checkPsw:!0},againpsw:{required:!0,maxlength:20,minlength:6,equalTo:"#password",checkPsw:!0},agree:{required:!0}},messages:{email:{required:"请输入邮箱地址",isPhone:"请输入正确的邮箱"},verifiCode:{required:"请输入验证码",number:"请输入正确的验证码",minlength:"请输入正确的验证码",maxlength:"请输入正确的验证码"},password:{required:"请输入密码",maxlength:"密码不能超过20位",minlength:"密码不能少于6位",checkPsw:"密码为以英文开头包含数字的6-20位字符"},againpsw:{required:"请确认密码",maxlength:"密码不能超过20位",minlength:"密码不能少于6位",equalTo:"两次密码输入不一致",checkPsw:"密码为以英文开头包含数字的6-20位字符"},agree:{required:"请同意我们的协议"}}}),e("#changepsw").validate({errorPlacement:function(r,i){e("#errorMesg").html(r)},rules:{email:{required:!0,email:!0},verifiCode:{required:!0,number:!0,minlength:6,maxlength:6},newpsw:{required:!0,minlength:6,maxlength:20,checkPsw:!0},againpsw:{required:!0,minlength:6,maxlength:20,equalTo:"#newpsw",checkPsw:!0}},messages:{email:{required:"请输入邮箱地址",email:"请输入正确的的邮箱"},verifiCode:{required:"请输入验证码",number:"请输入正确的验证码",minlength:"请输入正确的验证码",maxlength:"请输入正确的验证码"},newpsw:{required:"*请填写密码",minlength:"密码不能少于6位",maxlength:"密码不能超过20位",checkPsw:"密码为以英文开头包含数字的6-20位字符"},againpsw:{required:"*请确认密码",minlength:"密码不能少于6位",maxlength:"密码不能超过20位",equalTo:"两次密码输入不相同",checkPsw:"密码为以英文开头包含数字的6-20位字符"}}}),e("#organinfo").validate({errorPlacement:function(r,i){e("#errorMesg").html(r)},rules:{username:{required:!0,checkName:!0},industry:{required:!0},address:{required:!0},subject:{required:!0},phonenum:{require:!0}},messages:{username:{required:"请输入您的用户昵称",checkName:"用户昵称由中英文、数字、_、-组成"},phonenum:{isPhone:"请输入正确的手机号码",required:"请输入联系电话"},subject:{required:"输入您的授课科目"},address:{required:"输入您的授课地址"},school:{require:"请输入毕业学校"}}}),e("#teacherinfo").validate({errorPlacement:function(r,i){e("#errorMesg").html(r)},rules:{username:{required:!0,checkName:!0},phonenum:{isPhone:!0,required:!0},address:{required:!0},subject:{required:!0},school:{required:!0}},messages:{username:{required:"请输入您的用户昵称",checkName:"用户昵称由中英文、数字、_、-组成"},phonenum:{isPhone:"请输入正确的手机号码",required:"请输入联系电话"},address:{required:"输入您的授课地址"},subject:{required:"输入您的授课科目"},school:{required:"请输入毕业学校"}}}),e("#studentinfo").validate({errorPlacement:function(r,i){e("#errorMesg").html(r)},rules:{username:{required:!0,checkName:!0},phonenum:{isPhone:!0,required:!0},subject:{required:!0},address:{required:!0},teatime:{required:!0},fee:{required:!0}},messages:{username:{required:"请输入您的用户昵称",checkName:"用户昵称由中英文、数字、_、-组成"},phonenum:{isPhone:"请输入正确的手机号码",required:"请输入联系电话"},subject:{required:"输入您的求教科目"},address:{required:"输入您的授课地址"},teatime:{required:"输入您的授课时间段"},fee:{required:"输入您预计支付的课酬"}}}),e("#uploadCourse").validate({errorPlacement:function(r,i){e("#errorMesg").html(r)},rules:{subject:{required:!0},grade:{required:!0},courseName:{required:!0},price:{required:!0}},messages:{subject:{required:"请填写教授科目"},grade:{required:"请填写教授年级"},courseName:{required:"请填写课程名称"},price:{required:"请填写课程收费"}}}),e("#organId").validate({errorPlacement:function(r,i){e("#errorMesg").html(r)},rules:{realName:{required:!0},idNum:{required:!0}},messages:{realName:{required:"请填写真实姓名"},idNum:{required:"请填写身份证号码"}}}),e("#teacherId").validate({errorPlacement:function(r,i){e("#errorMesg").html(r)},rules:{realName:{required:!0},idNum:{required:!0}},messages:{realName:{required:"请填写真实姓名"},idNum:{required:"请填写身份证号码"}}})});