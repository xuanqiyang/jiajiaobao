require.config({baseUrl:"js",paths:{jquery:"lib/jquery",validate:"lib/jquery.validate.min",messages:"lib/messages_zh.min",superSlide:"lib/jquery.SuperSlide",lazyload:"lib/jquery.lazyload.min"},shim:{validate:{deps:["jquery"],exports:"validate"},messages:{deps:["jquery","validate"],exports:"messages"},superSlide:{deps:["jquery"],exports:"superSlide"},lazyload:{deps:["jquery"],exports:"lazyload"}}}),require(["jquery","superSlide"],function(){jQuery(".focus").hover(function(){jQuery(this).find(".prev,.next").stop(!0,!0).fadeTo("show",.2)},function(){jQuery(this).find(".prev,.next").fadeOut()}),jQuery(".focus").slide({mainCell:".pic",effect:"fold",autoPlay:!0,delayTime:600,trigger:"click"})}),require(["jquery","lazyload"],function(){$("img.lazy").lazyload({placeholder:"../images/loading.gif",effect:"fadeIn"})}),require(["jquery"],function(e){var i=[],s=e(".search-form"),a=e(".placeholder"),u=e(".form-text");i.push(s.data("placeholder"),s.data("courseplaceholder"),s.data("orgplaceholder")),e(".search-tab .tab-item").click(function(){a.text(i[e(this).index()]),e(this).addClass("active").siblings(".tab-item").removeClass("active")}),u.each(function(){var i=e(this).siblings(".placeholder"),s=e(this);""!=e(this).val()?i.hide():i.show(),i.click(function(){s.trigger("focus")}),e(this).focus(function(){i.hide()}).blur(function(){""!=e(this).val()?i.hide():i.show()})}),e(".menu li").mouseover(function(){var i=e(this).index();e(".menu li").removeClass("active"),e(this).addClass("active"),e(".sub-menu .sub-menu-content").hide(),e(".sub-menu").show(),e(".sub-menu .sub-menu-content").eq(i).show()}),e(".menu-wrapper").mouseleave(function(){e(".sub-menu .sub-menu-content").hide(),e(".sub-menu").hide(),e(".menu li").removeClass("active")})});