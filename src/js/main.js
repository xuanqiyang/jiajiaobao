require.config({　　　　
    paths: {
        'jquery': 'lib/jquery',
        'validate': 'lib/jquery.validate.min',
        'messages': 'lib/messages_zh.min',
        'superSlide': 'lib/jquery.SuperSlide'
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
        }
    }　　
});


require(['jquery', 'superSlide'], function() {
    jQuery('.focus').hover(function() { jQuery(this).find('.prev,.next').stop(true, true).fadeTo('show', 0.2) }, function() { jQuery(this).find('.prev,.next').fadeOut() });
    jQuery('.focus').slide({ mainCell: '.pic', effect: 'fold', autoPlay: true, delayTime: 600, trigger: 'click' });
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
        // var sub = $('.sub-menu');
        // var activeRow;
        // var activeMenu;
        // var timer;
        // var mouseInSub = false;
        // sub.on('mouseenter',function(e){
        //             mouseInSub = true;
        //         }).on('mouseleave',function(){
        //             mouseInSub = false;
        //         })
        // $('.menu-wrapper')
        // .on('mouseenter',function(e){
        //     sub.removeClass('hide');
        // })
        // .on('mouseleave',function(e){
        //     sub.addClass('hide');
        //     if(activeRow){
        //         activeRow.removeClass('active');
        //         activeRow = null;
        //     }
        //     if(activeMenu){
        //         activeMenu.addClass('hide');
        //         activeMenu = null;
        //     }
        // })
        // .on('mouseenter','li',function(e){
        //     // alert(e.target);
        //     if(!activeRow){
        //         activeRow = $(e.target);
        //         activeRow.addClass('active');
        //         activeMenu = $('#' + activeRow.data('id'));
        //         activeMenu.removeClass('hide');
        //         return;
        //     }
        //     if(timer){
        //         clearTimeout(timer);
        //     }
        //     activeRow.removeClass('active');
        //     activeMenu.addClass('hide');
        //     activeRow = $(e.target);
        //     activeRow.addClass('active');
        //     activeMenu = $('e', activeRow.data('id'));
        //     activeMenu.removeClass('hide');
        // })
        // timer = setTimeout(function(){
        //     if(mouseInSub){
        //         return;
        //     }
        //     activeRow.removeClass('active');
        //     activeMenu.addClass('hide');
        //     activeRow = $(e.target);
        //     activeRow.addClass('active');
        //     activeMenu = $('#' + activeRow.data('id'));
        //     activeMenu.removeClass('hide');
        //     timer = null;
        // },300)
});
