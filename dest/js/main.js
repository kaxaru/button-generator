(function(){var defaultButton={defaults:{borderRadius:5,borderSize:2,maxBrWidth:10,xPadding:20,max_xPadding:50,yPadding:10,max_yPadding:50},calculate:function(){var e=this.defaults,t=e.max_yPadding*2+e.maxBrWidth+$("#app-element").height();e.maxBr=parseInt(t/2)},setDefaultsCss:function(){var e=this.defaults;$("#app-element").css({"border-radius":e.borderRadius,"border-width":e.borderSize,"padding-top":e.yPadding,"padding-bottom":e.yPadding,"padding-left":e.xPadding,"padding-right":e.xPadding})}};defaultButton.calculate();defaultButton.setDefaultsCss();var app={obj:function(){return this},initialize:function(){this.sliderSetup();this.events()},events:function(){$("#border-radius").on("slidechange",app.borderRadiusChange);$("#border-size").on("slidechange",app.borderSizeChange);$("#horisontal").on("slidechange",app.widthChange);$("#vertical").on("slidechange",app.heightChange);$(".ui-slider").on("slidechange",app.result);$("#buttonText").on("keyup",app.buttonText)},sliderSetup:function(){var e=defaultButton.defaults;$("#border-radius").slider({max:e.maxBr,value:e.borderRadius});$("#border-size").slider({max:e.maxBrWidth,value:e.borderSize});$("#horisontal").slider({max:e.max_xPadding,value:e.xPadding});$("#vertical").slider({max:e.max_yPadding,value:e.yPadding})},borderRadiusChange:function(e,t){$("#app-element").css({"border-radius":t.value})},borderSizeChange:function(e,t){$("#app-element").css({"border-width":t.value})},widthChange:function(e,t){$("#app-element").css({"padding-left":t.value,"padding-right":t.value})},heightChange:function(e,t){$("#app-element").css({"padding-top":t.value,"padding-bottom":t.value})},buttonText:function(e){var t=e.currentTarget;var n=$(t).val();var r=$("#app-element");if(n.length>30)n=n.slice(n.length-30,n.length);$("#app-element").text(n);$(".app-resultHtml").text('<button id="'+r[0].id+'">'+n+"</button>")},checkBrowser:function(){var e=navigator.userAgent;if(e.search(/MSIE 8.0/)>0)return"ie8";return"another"},result:function(){var e=$("#app-element"),t=e.css("border-radius"),n=e.css("border-width"),r=e.css("padding-top"),i=e.css("padding-left");var s=$("#app-element").text();$(".app-resultHtml").text('<button id="'+e[0].id+'">'+s+"</button>");$(".app-resultCss").text("-moz-border-radius"+":"+t+";\n"+"-webkit-border-radius"+":"+t+";\n"+"-o-border-radius"+":"+t+";\n"+"border-radius"+":"+t+";\n"+"border-width"+":"+n+";\n"+"padding-top"+":"+r+";\n"+"padding-bottom"+":"+r+";\n"+"padding-left"+":"+i+";\n"+"padding-right"+":"+i+";\n");if(app.obj().checkBrowser()==="ie8"){$("#app-element").css({})}}};app.initialize();var form=$("#send");form.submit(function(e){var arrayFormData=form.serializeArray();var dataSerialize=form.serialize();var validate=function(e){var t=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))%40((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)};if(dataSerialize.indexOf(form.serializeArray()[0].name)!==-1){var mail=dataSerialize.slice(form.serializeArray()[0].name.length+1);if(validate(mail)){var result={};result.css=$(".app-resultCss").text();result.html=$(".app-resultHtml").text();result.mail=mail;var dataJSON=JSON.stringify(result)}}if(typeof dataJSON!=="undefined"){$.ajax({url:form.attr("action"),type:form.attr("method"),data:{json:dataJSON},success:function(e){alert("ok")},error:function(xhr,status,error){var err=eval("("+xhr.responceText+")");alert(err.Message)}})}e.preventDefault()})})()