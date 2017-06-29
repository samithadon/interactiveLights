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
