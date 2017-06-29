(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Geometry definitions
var SSGPC = require('./SSGPostalCodes.js');


function SSGBackEnd(geom){
  SSGBackEnd.proto = this;
  SSGBackEnd.proto.g = geom;
}

SSGBackEnd.geocoder = null;
SSGBackEnd.msg = {
  'set': false};

SSGBackEnd.sgb = {
  't': 1.469656,
  'b': 1.239866,
  'l': 103.606088,
  'r': 104.032235
};

SSGBackEnd.prototype.init = function() {
  // console.log('start: ' + $('#mainmap').width());
  // $( "#bdmsgbtn" ).click(SSGBackEnd.proto.sendMessage);
  socket = io(window.location.host + '/fromremote');
  SSGBackEnd.proto.statReplyFuncs = [];
  SSGBackEnd.proto.onAddressFuncs = [];
  SSGBackEnd.proto.resp = {'valid' : false};
  socket.on('stat_reply', SSGBackEnd.proto.statReply);
  // geocoder = new google.maps.Geocoder();

};

// Registering functions for stat reply and invoking them
SSGBackEnd.prototype.onResult = function(name, func) {
  SSGBackEnd.proto.statReplyFuncs[name] = func;
  // socket.on('stat_reply', func);
};

SSGBackEnd.prototype.statReply = function(stat){
  socket.disconnect();
  for(var key in SSGBackEnd.proto.statReplyFuncs){
    SSGBackEnd.proto.statReplyFuncs[key](stat);
  }

};


// Registering functions for adress resolving and invoking them
SSGBackEnd.prototype.onAddressResolve = function(name, func) {
  SSGBackEnd.proto.onAddressFuncs[name] = func;
};

SSGBackEnd.prototype.onAddress = function(){
  for(var key in SSGBackEnd.proto.onAddressFuncs){
    SSGBackEnd.proto.onAddressFuncs[key](SSGBackEnd.proto.resp);
  }
};

SSGBackEnd.prototype.ordinal_suffix_of = function(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
};


SSGBackEnd.prototype.resolvePostalCode = function(code){
  var district = SSGPC.codes[parseInt(code.substring(0, 2), 10)];
  if(district !== undefined){
    SSGBackEnd.proto.resp.valid = true;
    SSGBackEnd.proto.resp.code = code;
    SSGBackEnd.proto.resp.district = district;
    SSGBackEnd.proto.resp.txt = SSGPC.dstrcts[district].name;
  }
  console.log(SSGBackEnd.proto.resp);
  SSGBackEnd.proto.onAddress();
};


// Send the message to the server
SSGBackEnd.prototype.sendMessage = function(msg){
  SSGBackEnd.proto.resp.msg = msg;
  console.log(SSGBackEnd.proto.resp);
  if(SSGBackEnd.proto.resp.valid){
    // delete SSGBackEnd.proto.resp['txt'];
    socket.emit('bdmsg', SSGBackEnd.proto.resp);
    return true;
  }else{
    console.log("something wrong");
    return false;
  }

};

module.exports = SSGBackEnd;

},{"./SSGPostalCodes.js":3}],2:[function(require,module,exports){
/**
 * Geometry class for SonicSG
 * Degines all the dimensions and arrays, length
 * @author: Anusha Withana
 */

// Constructor
function SSGGeom(){
}

// SG borders in long,lat
SSGGeom.sgb = {
  't': 1.469656,
  'b': 1.239866,
  'l': 103.606088,
  'r': 104.032235
};

SSGGeom.googleRestoRatio = function(res){
  var r = {x: 0, y: 0};
  // console.log("---------------");
  r.x = (res.geometry.location.lng() - SSGGeom.sgb.l) * 100 / (SSGGeom.sgb.r - SSGGeom.sgb.l);
  r.y = (res.geometry.location.lat() - SSGGeom.sgb.b) * 100 / (SSGGeom.sgb.t - SSGGeom.sgb.b);
  // console.log(res);
  // console.log(r);
  // console.log("---------------");
  return r;
};



module.exports = SSGGeom;

},{}],3:[function(require,module,exports){
/**
 * Geometry class for SonicSG
 * Degines all the dimensions and arrays, length
 * @author: Anusha Withana
 */

// Constructor
function SSGPostalCodes(){
}

// SG postal codes to district
SSGPostalCodes.codes = [
// 01, 02, 03, 04, 05, 06
1,1,1,1,1,1,
// 07, 08
2,2,
// 14,15, 16
3,3,3,
// 09, 10
4,4,
// 11, 12, 13
5,5,5,
// 17
6,
// 18, 19
7,7,
// 20, 21
8,8,
// 22, 23
9,9,
// 24, 25, 26, 27
10,10,10,10,
// 28, 29, 30
11,11,11,
// 31, 32, 33
12,12,12,
// 34, 35, 36, 37
13,13,13,13,
// 38, 39, 40, 41
14,14,14,14,
// 42, 43, 44, 45
15,15,15,15,
// 46, 47, 48
16,16,16,
// 49, 50, 81
17,17,17,
// 51, 52
18,18,
// 53, 54, 55, 82
19,19,19,19,
// 56, 57
20,20,
// 58, 59
21,21,
// 60, 61, 62, 63, 64
22,22,22,22,22,
// 65, 66, 67, 68
23,23,23,23,
// 69, 70, 71
24,24,24,
// 72, 73
25,25,
// 77, 78
26,26,
// 75, 76
27,27,
// 79, 80
28,28
];


// SG distrcts and names
SSGPostalCodes.dstrcts = [
  {name: null}, // no district 0
  {name: 'Raffles Place, Cecil, Marina, People\'s Park'},
  {name: 'Anson, Tanjong Pagar'},
  {name: 'Queenstown, Tiong Bahru'},
  {name: 'Telok Blangah, Harbourfront'},
  {name: 'Pasir Panjang, Hong Leong Garden, Clementi New Town'},
  {name: 'High Street, Beach Road (part)'},
  {name: 'Middle Road, Golden Mile'},
  {name: 'Little India'},
  {name: 'Orchard, Cairnhill, River Valley'},
  {name: 'Ardmore, Bukit Timah, Holland Road, Tanglin'},
  {name: 'Watten Estate, Novena, Thomson'},
  {name: 'Balestier, Toa Payoh, Serangoon'},
  {name: 'Macpherson, Braddell'},
  {name: 'Geylang, Eunos'},
  {name: 'Katong, Joo Chiat, Amber Road'},
  {name: 'Bedok, Upper East Coast, Eastwood, Kew Drive'},
  {name: 'Loyang, Changi'},
  {name: 'Tampines, Pasir Ris'},
  {name: 'Serangoon Garden, Hougang, Ponggol'},
  {name: 'Bishan, Ang Mo Kio'},
  {name: 'Upper Bukit Timah, Clementi Park, Ulu Pandan'},
  {name: 'Jurong'},
  {name: 'Hillview, Dairy Farm, Bukit Panjang, Choa Chu Kang'},
  {name: 'Lim Chu Kang, Tengah'},
  {name: 'Kranji, Woodgrove'},
  {name: 'Upper Thomson, Springleaf'},
  {name: 'Yishun, Sembawang'},
  {name: 'Seletar'}
];

SSGPostalCodes.getDistrictByCode = function(code){
  var r = {code: 0, district: 0, name: ''};
  var plid = Math.floor(code / 10000);
  // console.log("---------------");
  r.x = (res.geometry.location.lng() - SSGPostalCodes.sgb.l) * 100 / (SSGPostalCodes.sgb.r - SSGPostalCodes.sgb.l);
  r.y = (res.geometry.location.lat() - SSGPostalCodes.sgb.b) * 100 / (SSGPostalCodes.sgb.t - SSGPostalCodes.sgb.b);
  // console.log(res);
  // console.log(r);
  // console.log("---------------");
  return r;
};



module.exports = SSGPostalCodes;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
/**
 * Main JS file for SonicSG client
 * @author: Anusha Withana
 */

// Geometry definitions
var SSGGeom = require('./BackEnd/SSGGeom.js');
// var ssggeom = new SSGGeom();

// Communication backend
// This object can used to communicate with the server
var SSGBackEnd = require('./BackEnd/SSGBackEnd.js');
ssgbe = new SSGBackEnd(SSGGeom);

// User Interface handling function
// UI will use the common instance of backend for communication
var SSGUI = require('./UI/SSGUI.js');
ssgui = new SSGUI(ssgbe);



// Initialization function
// All the functions that needs to be run at the start should be
// included in the start() function
// Other activities are run through event registrations
document.addEventListener('DOMContentLoaded', start, false);
function start(){
  // var selG = document.getElementById("ui_mapSG"); //.contentDocument; //.getElementById("district_14");

  // console.log(selG);

  // Initialize backend
  ssgbe.init();

  // Initialize UI
  ssgui.init();
  $('#ui_bDay').on('click', ssgui.bDayPopup);
  // console.log(window);

  // Do something for sounds
}

// highlights the map when it is loaded
document.startSVG = function(){
    ssgui.onMapLoaded();
};

// window.onload = function(){
//   // var selG = document.getElementById("ui_mapSG"); //.contentDocument; //.getElementById("district_14");
//   $('#ui_mapSG').ready(function(){
//     start();
//   });
// };

},{"./BackEnd/SSGBackEnd.js":1,"./BackEnd/SSGGeom.js":2,"./UI/SSGUI.js":4}]},{},[5]);
