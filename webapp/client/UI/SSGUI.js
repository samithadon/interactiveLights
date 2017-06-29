function SSGUI(backend){
	SSGUI.proto = this;
	SSGUI.proto.be = backend;
	// console.log("UI");
}

SSGUI.prototype.bDayPopup = function(){
	$('.ui_mapBox3').fadeTo(10, 0.3);
	$('.ui_card').fadeIn();
	$('.ui_cardBack').fadeIn();
	$('.ui_cardBack').click(function(){
		$('.ui_card').fadeOut(10);
		$('.ui_mapBox3').fadeTo(20,1);
	});
};

SSGUI.prototype.init = function(){
	/* footer icon navigation */
	SSGUI.proto.be.onAddressResolve("UIAddrs", SSGUI.prototype.onAddressResolve);
	SSGUI.proto.be.onResult("UIStats", SSGUI.prototype.onStatReply);
	$('#ui_home').click(function(){
		window.location.href = '/';});

	/*changing colors */
	$('.ui_sg50').delay(10).fadeOut(10); // 2000
	$('#ui_projectName').delay(10).fadeOut(10);

	/*zipcode prompt*/
	// $('.ui_keyPad').delay(10).fadeIn(2000);
	$('.ui_keyPad').delay(10).fadeIn(10);

	/*keys change onclick*/
	$('.ui_blue').click(function(){
		$(this).addClass('ui_blueClicked');});
	$('.ui_blue').mouseout(function(){
		$(this).removeClass('ui_blueClicked');});

	$('.ui_green').click(function(){
		$(this).addClass('ui_greenClicked');});
	$('.ui_green').mouseout(function(){
		$(this).removeClass('ui_greenClicked');});

	$('.ui_orange').click(function(){
		$(this).addClass('ui_orangeClicked');});
	$('.ui_orange').mouseout(function(){
		$(this).removeClass('ui_orangeClicked');});

	$('.ui_pink').click(function(){
		$(this).addClass('ui_pinkClicked');});
	$('.ui_pink').mouseout(function(){
		$(this).removeClass('ui_pinkClicked');});

	$('.ui_gold').click(function(){
		$(this).addClass('ui_goldClicked');});
	$('.ui_gold').mouseout(function(){
		$(this).removeClass('ui_goldClicked');});


	function onNumbersClick(){
		var btn = $(this);
		var number = btn.attr("value");
		var heading = $('#ui_heading');
		var inittext = "Enter postcode";
		/*delete*/
		if(btn.attr("value") === "<-"){
			if (heading.text().length === 1) {
				heading.text(inittext);
			}
			else {
			heading.text(heading.text().substr(0, heading.text().length -1));
			}
			return false;
		}
		/*clear*/
		else if(btn.attr("value") === "X"){
			heading.text(inittext);
			// $write.empty();
			// heading.attr('style', 'color:#C0C0C0');
			return false;
		}
		else if(heading.text().length > 5) {
			heading.text(number);
			// if(heading.text() === inittext){
			// }
			return false;
		}
		/*write*/
		else {
			heading.text(heading.text() + number);
			if(heading.text().length === 6){
				SSGUI.proto.be.resolvePostalCode(heading.text());
			}
		}
	}

	/*typing*/
	$('button').click(onNumbersClick);
	$('#btnSendMsg').click(SSGUI.proto.onBtnSendMessage);
};


SSGUI.prototype.onAddressResolve = function(resp){
	if(resp.valid){
		// Valid response
		$( "#ui_keypad_container" ).toggleClass( "hidden" );
		$( "#ui_result_container" ).toggleClass( "hidden" );
	}else{
		$('#ui_heading').text("Postal Code Invalid");
	}
};

// Highlight the map
SSGUI.prototype.onMapLoaded = function(){
    var selG = document.getElementById("ui_mapSG").
      contentDocument.getElementById("district_".concat(SSGUI.proto.be.resp.district));
    selG.setAttribute('class', 'svg_select');
};


// Send the message
SSGUI.prototype.onBtnSendMessage = function(){
	$('#btnSendMsg').prop("disabled",true);
	$('#ui_send_msg').fadeOut(200, function()
		{$('#ui_wait_stats').fadeIn(200, function()
			{
				SSGUI.proto.be.sendMessage($('textarea#txt_bd_msg').val());
			}
		);}
	); // 2000
};

SSGUI.prototype.onStatReply = function(stat){
	console.log(stat);
	$('#ui_wait_stats').fadeOut(200, function()
		{$('#ui_stats').fadeIn(200);}
	); // 2000
	$(" #ui_data ").text(stat.count);
	$(" #ui_dataT ").text(stat.total);
	var perc = Math.round(stat.count * 100 / stat.total);
	$("#ui_rB").css({left : perc + "%"});
	$("#ui_bar_fill").css({width : perc + "%"});
	$("#ui_data").css({left : perc + "%"});

	// set text
	$(" #d_count ").text(stat.count);
	// $(" #d_count ").text(SSGUI.proto.be.ordinal_suffix_of(stat.count));
	$(" #t_count ").text(stat.total);
	// $(" #t_count ").text(SSGUI.proto.be.ordinal_suffix_of(stat.total));
	// console.log("Zone : " + stat.zone.x, stat.zone.y);
};


// Function to to animate UI
// @rate  rate of pulse
SSGUI.prototype.animateUI = function(rate, stat){
	var t = 1./rate;
	//alert("rate is " + rate + " and t is " + t);
	$('body').addClass("ui_bgAnimated_" + stat.zone);
	//  -webkit-animation-duration: 4s;
 //  -moz-animation-duration: 4s;
 //  -o-animation-duration: 4s;
 //  -ms-animation-duration: 4s;
	// animation-duration: 4s;
	$('body').css("-webkit-animation-duration", t + "s");
	$('body').css("-moz-animation-duration", t + "s");
	$('body').css("-o-animation-duration", t + "s");
	$('body').css("-ms-animation-duration", t + "s");
	$('body').css("animation-duration", t + "s");
};


module.exports = SSGUI;
