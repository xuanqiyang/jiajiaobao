define("starScore",["jquery"],function(e){return{scoreFun:function(t,n){function i(e,n){var i=parseInt(e)+1,s=f*i,a=l*i;o=p>5?options.types[parseInt(e)]:options.types[parseInt(e)+10],t.find("a").removeClass("clibg"),n.addClass("clibg"),n.css({width:s,left:"0"}),r.text(a),d.text(o)}var s={fen_d:22,ScoreGrade:5,types:["很不满意","差得离谱","不满意","描述严重不符,不满意","一般","质量一般","没卖家描述的那么好","满意","质量不错,还是挺满意的","非常满意","很差","差","一般","好","很好"],parent:"star-score",nameScore:"fenshu",attitude:"attitude"};options=e.extend({},s,n);var a,o,r=t.find("."+options.nameScore),c=t.find("."+options.parent),d=t.find("."+options.attitude),f=options.fen_d,p=options.ScoreGrade;if(c.length>0){c.width(f*p);for(var l=5/p,u=0;u<p;u++){var v=e("<a href='javascript:void(0)'></a>");v.css({left:0,width:f*(u+1),"z-index":p-u}),v.appendTo(c)}e("#option-menu li").click(function(){i(4,c.find("a"))}),c.find("a").each(function(t,n){e(this).click(function(){a=t,i(t,e(this))}),e(this).mouseenter(function(){i(t,e(this))}),e(this).mouseleave(function(){if(a>=0){var t=l*(parseInt(a)+1);c.find("a").removeClass("clibg"),c.find("a").eq(a).addClass("clibg");var n=f*(parseInt(a)+1);c.find("a").eq(a).css({width:n,left:"0"}),r&&(r.text(t),e(".score").val(t))}else c.find("a").removeClass("clibg"),r&&(r.text(""),e(".score").val(""))})})}}}});