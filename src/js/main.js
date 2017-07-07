require.config({
    baseUrl: 'js',　　　
    paths: {
        'jquery': 'lib/jquery',
        'validate': 'lib/jquery.validate.min',
        'messages': 'lib/messages_zh.min',
        'superSlide': 'lib/jquery.SuperSlide',
        'lazyload': 'lib/jquery.lazyload.min'
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
        'lazyload':{
            deps:['jquery'],
            exports:'lazyload'
        }
    }
});

require(['jquery', 'superSlide'], function() {
    jQuery('.focus').hover(function() { jQuery(this).find('.prev,.next').stop(true, true).fadeTo('show', 0.2) }, function() { jQuery(this).find('.prev,.next').fadeOut() });
    jQuery('.focus').slide({ mainCell: '.pic', effect: 'fold', autoPlay: true, delayTime: 600, trigger: 'click' });
});

require(['jquery','lazyload'],function(){
    $("img.lazy").lazyload({
        placeholder:"../images/loading.gif",
        effect: "fadeIn",
    });

});

require(['jquery'], function($) {
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
        })
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
    $(".menu li").mouseover(function() {
        var n = $(this).index();
        $(".menu li").removeClass("active");
        $(this).addClass("active");
        $(".sub-menu .sub-menu-content").hide();
        $(".sub-menu").show();
        $(".sub-menu .sub-menu-content").eq(n).show();
    })
    $(".menu-wrapper").mouseleave(function() {
        $(".sub-menu .sub-menu-content").hide();
        $(".sub-menu").hide();
        $(".menu li").removeClass("active");
    })
});

