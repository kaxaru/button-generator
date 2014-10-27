(function(){

	var defaultButton = {
		defaults: {
			'borderRadius': 5,
			'borderSize': 2,
			'maxBrWidth': 10,
			'xPadding': 20,
			'max_xPadding': 50,
			'yPadding': 10,
			'max_yPadding': 50
		},

		calculate: function() {
			var def = this.defaults,
				heightSize = def.max_yPadding * 2 + def.maxBrWidth + $('#app-element').height();
				def.maxBr = parseInt(heightSize/2);
		},

		setDefaultsCss: function() {
			var def = this.defaults;
			$('#app-element').css({
				'border-radius':def.borderRadius,
				'border-width': def.borderSize,
				'padding-top': def.yPadding,
				'padding-bottom': def.yPadding,
				'padding-left': def.xPadding,
				'padding-right': def.xPadding
			});
		}
	};

defaultButton.calculate();
defaultButton.setDefaultsCss();


	var app = {
		obj: function() {
			return this;
		},

		initialize: function() {
			this.sliderSetup();
			this.events();
		},


		events: function() {
			$('#border-radius').on("slidechange", app.borderRadiusChange);
			$('#border-size').on("slidechange", app.borderSizeChange);
			$('#horisontal').on("slidechange", app.widthChange);
			$('#vertical').on("slidechange", app.heightChange);
			$('.ui-slider').on("slidechange", app.result);
			$('#buttonText').on("keyup", app.buttonText);
		},


			sliderSetup: function() {
			var def = defaultButton.defaults;

			$('#border-radius').slider({
				max:def.maxBr,
				value:def.borderRadius
			});

			$('#border-size').slider({
				max:def.maxBrWidth,
				value:def.borderSize,
			});

			$('#horisontal').slider({
				max:def.max_xPadding,
				value:def.xPadding
			});

			$('#vertical').slider({
				max:def.max_yPadding,
				value:def.yPadding
			});
		},

		borderRadiusChange: function(e, ui) {
			$('#app-element').css({
				'border-radius': ui.value,
			});
		},

		borderSizeChange: function(e, ui) {
			$('#app-element').css({
				'border-width': ui.value
			});
		},

		widthChange: function(e, ui) {
			$('#app-element').css({
				'padding-left': ui.value,
				'padding-right': ui.value
			});
		},

		heightChange: function(e, ui) {
			$('#app-element').css({
				'padding-top': ui.value,
				'padding-bottom': ui.value
			});
		},

		buttonText: function(e) {
			var input = e.currentTarget;
			var change = $(input).val();




			var button = $("#app-element");
			if(change.length > 30) change = change.slice(change.length - 30,change.length);
			$('#app-element').text(change);
			$(".app-resultHtml").text("<button id=\"" +button[0].id  +  "\">"+change+"</button>");
		},

		checkBrowser: function() {
			    var ua = navigator.userAgent;    
			    if (ua.search(/MSIE 8.0/) > 0) return 'ie8';
			    return 'another';
		},
		result: function() {
			var button = $("#app-element"),
				borderRadius = button.css('border-radius'),
				borderSize = button.css('border-width'),
				paddingTop = button.css('padding-top'),
				paddingLeft = button.css('padding-left');

				var change = $('#app-element').text(); 

				$(".app-resultHtml").text("<button id=\"" +button[0].id  +  "\">"+change+"</button>");

				$(".app-resultCss").text(
					'-moz-border-radius' + ':' + borderRadius + ';\n' + 
					'-webkit-border-radius' + ':' + borderRadius + ';\n' + 
					'-o-border-radius' + ':' + borderRadius + ';\n' + 
					'border-radius' + ':' + borderRadius + ';\n' + 
					'border-width' + ':' + borderSize + ';\n' + 
					'padding-top' + ':' + paddingTop + ';\n' + 
					'padding-bottom' + ':' + paddingTop + ';\n' + 
					'padding-left' + ':' + paddingLeft + ';\n' + 
					'padding-right' + ':' + paddingLeft + ';\n'
					);

				if(app.obj().checkBrowser() === "ie8")
				{
					$('#app-element').css({
					/*	'behavior': 'url(/dev/pie/PIE.php)'*/
					});
				}
		}
	}

app.initialize();

var form = $("#send");
form.submit(function(e){

	var arrayFormData = form.serializeArray();
	var dataSerialize = form.serialize();
	var validate = function (email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))%40((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

	if(dataSerialize.indexOf(form.serializeArray()[0].name) !== -1)
	{
		var mail = dataSerialize.slice(form.serializeArray()[0].name.length+1);
		

		if(validate(mail))
		{
			var result = {};
			result.css = $(".app-resultCss").text();
			result.html = $(".app-resultHtml").text();
			result.mail = mail;

			var dataJSON = JSON.stringify(result);
		}
	}

	if(typeof(dataJSON) !== "undefined")
	{
		$.ajax({
			url: form.attr('action'),
			type: form.attr('method'),
			data: {'json': dataJSON},
			success: function(data)
			{
				alert('ok');
			},
			error: function(xhr, status, error)
			{
				var err = eval("("+ xhr.responceText + ")");
				alert(err.Message);
			}
		});
	}
	e.preventDefault();
});


})();

