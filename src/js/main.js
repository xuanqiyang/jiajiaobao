require.config({
    paths: {
        'jquery': 'lib/jquery',
        'validator': 'lib/jquery.validate.min',
        'messages': 'lib/messages_zh.min',
        'superSlide': 'lib/jquery.SuperSlide',
        'lazyload': 'lib/jquery.lazyload.min',
        'art': 'lib/jquery.artDialog'
    },
    shim: {
        'validator': {
            deps: ['jquery'],
            exports: 'validator'
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
        }
    }
});

require(['jquery'], function($) {
    (function($) {
        $.fn.anchor = function(options) {
            var defaults = {
                ieFreshFix: true,
                anchorSmooth: true,
                anchortag: "anchor",
                animateTime: 400
            };
            var sets = $.extend({}, defaults, options || {});
            //修复IE下刷新锚点失效的问题
            if (sets.ieFreshFix) {
                var url = window.location.toString();
                var id = url.split("#")[1];
                if (id) {
                    var t = $("#" + id).offset().top;
                    $(window).scrollTop(t);
                }
            }
            //点击锚点跳转
            $(this).each(function() {
                $(this).click(function() {
                    var aim = $(this).attr(sets.anchortag).replace(/#/g, ""); //跳转对象id
                    var pos = $("#" + aim).offset().top;
                    if (sets.anchorSmooth) {
                        //平滑
                        $("html,body").animate({ scrollTop: pos }, sets.animateTime);
                    } else {
                        $(window).scrollTop(pos);
                    }
                    return false;
                });
            });
        };
    })(jQuery);
    $(".anchor-alphabet dd").anchor();
})
require(['jquery', 'art', 'starScore'], function($, art, starScore) {

    starScore.scoreFun($(".stars"));
    $(".rated span").each(function(index, element) {
        var num = $(this).attr("tip");
        var www = num * 2 * 11;
        $(this).css("width", www);
    });
    var showServeTerms = document.getElementById("showServeTerms");
    var serveTermsDialog = document.getElementById("serveTermsDialog");

    var $formTab = $(".form-tab label");
    var $formBody = $(".form-body");
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

});
require(['jquery', 'validate'], function($) {
    var getCode = document.getElementById("getCode");
    var email = document.getElementById("email");
    var time = 60;
    var emailRegex = /^[a-zA-Z0-9]+([\.-]*\w+)*@(\w+[-]*\w+\.)+\w+$/;
    if (getCode) {
        getCode.onclick = function(e) {
            if (emailRegex.test(email.value)) {
                timer(this);
            } else {
                art.dialog({
                    time:1.25,
                    title: "错误警告!",
                    content: "请填写邮箱地址!",
                    lock: true,
                    fixed: true
                }).show();
            }
        };
    }

    function errorModal(valid_form) {
        var valid = valid_form.valid();
        if (!valid) {
            art.dialog({
                id:'errorModal',
                title: "错误警告!",
                lock: true,
                fixed: true,
                width: 200,
                height: 60,
                time: 1.25,
                content: document.getElementById("errorMesg")
            })
        }
    }
    $(".submit-btn").click(function() {
        errorModal($("form"));
    })

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