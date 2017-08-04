define("starScore", ['jquery'], function($) {
    return {
        scoreFun: function(object, opts) {
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
            if (startParent.length > 0) {
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