require.config({
    baseUrl: 'js',
    paths: {
        'jquery': 'lib/jquery',
        'validate': 'lib/jquery.validate.min',
        'messages': 'lib/messages_zh.min',
        'superSlide': 'lib/jquery.SuperSlide',
        'lazyload': 'lib/jquery.lazyload.min',
        'art': 'jquery.artDialog'
    },
    shim: {
        'validate': {
            deps: ['jquery'],
            exports: 'validate'
        },
        'messages': {
            deps: ['jquery', 'validate'],
            exports: 'messages'
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

define("starScore", ['jquery'], function($){
    return {
        scoreFun:function(object, opts){
            var defaults = {
                fen_d: 22,
                ScoreGrade: 5,

                types: ["很不满意",
                    "差得离谱",
                    "不满意",
                    "描述严重不符,不满意",
                    "一般",
                    "质量一般",
                    "没卖家描述的那么好",
                    "满意",
                    "质量不错,还是挺满意的",
                    "非常满意",
                    "很差",
                    "差",
                    "一般",
                    "好",
                    "很好"
                ],

                parent: "star-score",
                nameScore: "fenshu",
                attitude: "attitude"
            };

            options = $.extend({}, defaults, opts);
            var countScore = object.find("." + options.nameScore);
            var startParent = object.find("." + options.parent);
            var atti = object.find("." + options.attitude);
            var now_cli;
            var fen_cli;
            var atu;
            var fen_d = options.fen_d;
            var len = options.ScoreGrade;
            if(startParent.length>0){
                startParent.width(fen_d * len);
                var preA = (5 / len);
                for (var i = 0; i < len; i++) {
                    var newSpan = $("<a href='javascript:void(0)'></a>");
                    newSpan.css({ "left": 0, "width": fen_d * (i + 1), "z-index": len - i });
                    newSpan.appendTo(startParent);
                }
                var $options = $("#option-menu li");
                $options.click(function() {
                    var that = startParent.find("a");
                    show(4, that);
                });
                startParent.find("a").each(
                    function(index, element) {
                        $(this).click(function() {
                            now_cli = index;
                            show(index, $(this))
                        });
                        $(this).mouseenter(function() {
                            show(index, $(this))

                        });

                        $(this).mouseleave(function() {
                            if (now_cli >= 0) {
                                var scor = preA * (parseInt(now_cli) + 1);
                                startParent.find("a").removeClass("clibg");
                                startParent.find("a").eq(now_cli).addClass("clibg");
                                var ww = fen_d * (parseInt(now_cli) + 1);
                                startParent.find("a").eq(now_cli).css({ "width": ww, "left": "0" });
                                if (countScore) {
                                    countScore.text(scor); //数字分数
                                    $(".score").val(scor);
                                }
                            } else {
                                startParent.find("a").removeClass("clibg");
                                if (countScore) {
                                    countScore.text("");
                                    $(".score").val("");
                                }
                            }
                        });
                });
                function show(num, obj) {
                    var n = parseInt(num) + 1;
                    var lefta = num * fen_d;
                    var ww = fen_d * n; //星星宽度
                    var scor = preA * n; //数字
                    (len > 5) ? (atu = options.types[parseInt(num)]) : (atu = options.types[parseInt(num) + 10]); //五星和三星
                    object.find("a").removeClass("clibg");
                    obj.addClass("clibg");
                    obj.css({ "width": ww, "left": "0" });
                    countScore.text(scor);
                    atti.text(atu);
                };
            }
        }
    };
});

require(['jquery', 'art','starScore'], function($, art, starScore) {
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

    $formTab.bind('click', function(event) {
        $(this).index() ? $formBody[0].action = "http://www.baidu.com/" : $formBody[0].action = "http://www.google.com/";
        $(this).addClass('active').siblings('label').removeClass('active');
    });
    var $option = $(".selector .option");
    $option.each(function(){
    	var $selectorItem = $(this).find('dl dd a');
    	$selectorItem.click(function(){
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
