require.config({　　　　
    paths: {
        "jquery": "lib/jquery.min",
        "validate": "lib/jquery.validate.min.js",
        "messages": "lib/messages_zh.min.js"
    },
    shim: {
        'validate': {
            deps: ['jquery'],
            exports: "validate"
        },
        'messages': {
            deps: ['jquery', 'validate'],
            exports: "messages"
        }
    }　　
});
require(['jquery'], function($) {
    //改变placeholder内容
    var searchStr = [];
    var $searchForm = $('.search-form');
    var $placeholder = $(".placeholder");
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
        $sibPlaceholder.click(function(){
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
    })

})
