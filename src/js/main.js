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
require(['jquery'],function($){

})
