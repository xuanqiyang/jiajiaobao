require.config({
    paths: {
        'jquery': 'lib/jquery',
        'validate': 'lib/jquery.validate.min',
        'messages': 'lib/messages_zh.min',
        'superSlide': 'lib/jquery.SuperSlide',
        'lazyload': 'lib/jquery.lazyload.min',
        'art': 'lib/jquery.artDialog',
        'webuploader': 'webuploader'
    },
    shim: {
        'validate': {
            deps: ['jquery'],
            exports: 'validate'
        },
        'superSlide': {
            deps: ['jquery'],
            exports: 'superSlide'
        },
        'lazyload': {
            deps: ['jquery'],
            exports: 'lazyload'
        },
        'art': {
            deps: ['jquery'],
            exports: 'art'
        },
        'webuploader': {
            exports: 'webuploader'
        }
    }
});


require(['jquery', 'art', 'starScore'], function($, art, starScore) {

    starScore.scoreFun($(".stars"));
    $(".rated span").each(function(index, element) {
        var num = $(this).attr("tip");
        var www = num * 2 * 11;
        $(this).css("width", www);
    });
    var showServeTerms = document.getElementById("showServeTerms");
    var serveTermsDialog = document.getElementById("serveTermsDialog");
    var getCode = document.getElementById("getCode");
    var cellphone = document.getElementById("cellphone");
    var time = 60;
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var $formTab = $(".form-tab label");
    var $formBody = $(".form-body");
    var showUploader = document.getElementById("showUploader");
    var uploaderDialog = document.getElementById("uploaderDialog");
    $formTab.bind('click', function(event) {
        $(this).index() ? $formBody[0].action = "http://www.baidu.com/" : $formBody[0].action = "http://www.google.com/";
        $(this).addClass('active').siblings('label').removeClass('active');
    });
    var $option = $(".selector .option");
    $option.each(function() {
        var $selectorItem = $(this).find('dl dd a');
        $selectorItem.click(function() {
            $(this).addClass('active').siblings().removeClass('active');
        });
    });

    if (getCode) {
        getCode.onclick = function(e) {
            if (cellphone.value.length == 11 && mobile.test(cellphone.value)) {
                timer(this);
            } else {
                art.dialog({
                    title: "登录提示",
                    content: "请填写手机号码!",
                    lock: true,
                    fixed: true
                }).show();
            }
        };
    }
    if (showUploader) {
        showUploader.onclick = function() {
            art.dialog({
                title: "文件上传",
                lock: true,
                fixed: true,
                content: document.getElementById("uploaderDialog"),
                okVal: '保存',
                ok: function() {},
                cancelVal: '关闭',
                cancel: true
            }).show();
        }
    }
    if (showServeTerms) {
        showServeTerms.onclick = function() {
            art.dialog({
                title: "家教宝服务协议",
                lock: true,
                fixed: true,
                content: document.getElementById("serveTermsDialog"),
                okVal: '同意',
                ok: function() {
                    document.getElementById("agreeServeTerms").checked = 'checked';
                },
                cancelVal: '关闭',
                cancel: true
            }).show();
        };
    }

    function timer(o) {
        if (time == 0) {
            o.removeAttribute('disabled');
            o.innerText = "获取验证码";
            time = 60;
        } else {
            o.setAttribute("disabled", true);
            o.innerText = time;
            time--;
            setTimeout(function() {
                timer(o);
            }, 1000)
        }
    };
});
require(['upload'], function() {
    $(function() {
        $("#course_pct").powerWebUpload({
            auto: false,
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            formData: {
                uid: 'course_pct'
            },
            fileNumLimit: 10,
            fileSizeLimit: 10 * 1024 * 1024
        });
        $("#course_video").powerWebUpload({
            auto: false,
            accept: {
                title: 'Videos',
                extensions: 'mp4,avi,flv',
                mimeTypes: 'video/*'
            },
            formData: {
                uid: 'course_video'
            },
            fileNumLimit: 1,
            fileSizeLimit: 800 * 1024 * 1024
        });
        $("#organIdIdenti").powerWebUpload({
            // 选完文件后，是否自动上传。
            auto: false,
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            formData: {
                uid: 'idIdenti'
            },
            fileNumLimit: 2,
            fileSizeLimit: 5 * 1024 * 1024
        });
        $("#licenseIdenti").powerWebUpload({
            // 选完文件后，是否自动上传。
            auto: false,
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            formData: {
                uid: 'idIdenti'
            },
            fileNumLimit: 2,
            fileSizeLimit: 5 * 1024 * 1024
        });
        $("#teachIdIdenti").powerWebUpload({
            // 选完文件后，是否自动上传。
            auto: false,
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            formData: {
                uid: 'idIdenti'
            },
            fileNumLimit: 2,
            fileSizeLimit: 5 * 1024 * 1024
        });
        $("#eduIdenti").powerWebUpload({
            // 选完文件后，是否自动上传。
            auto: false,
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            formData: {
                uid: 'eduIdenti'
            },
            fileNumLimit: 5,
            fileSizeLimit: 5 * 1024 * 1024
        });
        $("#teachIdenti").powerWebUpload({
            // 选完文件后，是否自动上传。
            auto: false,
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            formData: {
                uid: 'teachIdenti'
            },
            fileNumLimit: 5,
            fileSizeLimit: 5 * 1024 * 1024
        });
        $("#profIdenti").powerWebUpload({
            // 选完文件后，是否自动上传。
            auto: false,
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            formData: {
                uid: 'profIdenti'
            },
            fileNumLimit: 5,
            fileSizeLimit: 5 * 1024 * 1024
        });
    })

})
require(['jquery', 'lazyload', 'superSlide'], function($) {
    jQuery('.focus').hover(function() { jQuery(this).find('.prev,.next').stop(true, true).fadeTo('show', 0.2) }, function() { jQuery(this).find('.prev,.next').fadeOut() });
    jQuery('.focus').slide({ mainCell: '.pic', effect: 'fold', autoPlay: true, delayTime: 600, trigger: 'click' });

    $("img.lazy").lazyload({
        placeholder: "../images/loading.gif",
        effect: "fadeIn",
    });
    //改变placeholder内容
    var searchStr = [];
    var $searchForm = $('.search-form');
    var $placeholder = $('.placeholder');
    var $formText = $('.form-text');
    searchStr.push($searchForm.data('placeholder'), $searchForm.data('courseplaceholder'), $searchForm.data('orgplaceholder'))
    $('.search-tab .tab-item').click(function() {
        $placeholder.text(searchStr[$(this).index()]);
        $(this).addClass('active').siblings('.tab-item').removeClass('active');
    });
    $formText.each(function() {
        var $sibPlaceholder = $(this).siblings('.placeholder');
        var $that = $(this);
        if ($(this).val() != '') {
            $sibPlaceholder.hide();
        } else {
            $sibPlaceholder.show();
        }
        $sibPlaceholder.click(function() {
            $that.trigger('focus');
        });
        $(this).focus(function() {
            $sibPlaceholder.hide();
        }).blur(function() {
            if ($(this).val() != '') {
                $sibPlaceholder.hide();
            } else {
                $sibPlaceholder.show();
            }
        });
    });
    var $menuLi = $(".menu li"),
        $menu = $(".menu"),
        $subMenu = $(".sub-menu"),
        $subMenuCnt = $(".sub-menu-content");
    if ($(".folder").length > 0) {
        $menu.css("display", "none");
        $(".menu-title").mouseover(function() {
            $(".menu").show();
        })
        $(".all-couser").mouseleave(function() {
            $(".menu").hide();
            $menuLi.removeClass("active");
        });
    }
    $menuLi.mouseover(function() {
        var n = $(this).index();
        $menuLi.removeClass("active");
        $(this).addClass("active");
        $subMenuCnt.hide();
        $subMenu.show();
        $subMenuCnt.eq(n).show();
    });
    $(".menu-wrapper").mouseleave(function() {
        $subMenuCnt.hide();
        $subMenu.hide();
        $menuLi.removeClass("active");
    });

});