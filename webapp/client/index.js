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
