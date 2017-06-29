#!/usr/bin/env node
var fs = require('fs');
// var Color = require("color");

var numTotalZone = 28;
var h, s, l;
colorString = "";
animString = "";
colorDeck = [];

//
//   .svg_select
//      *
//        fill yellow
// make colors
for(var zoneNumber = 0; zoneNumber < numTotalZone; zoneNumber++){
  colorDeck[zoneNumber] = {};
  colorDeck[zoneNumber].h = Math.round(zoneNumber * 360/numTotalZone);
  colorDeck[zoneNumber].s = Math.round((0.25 + 0.7*Math.random()) * 100);
  colorDeck[zoneNumber].l = Math.round((0.4 + 0.5* Math.random()) * 100);
  colorString += "#district_" + (zoneNumber + 1) + ".svg_select\n";
  colorString += "  *\n";
  colorString += "    fill hsl(" + colorDeck[zoneNumber].h + ", " + colorDeck[zoneNumber].s + ", " + colorDeck[zoneNumber].l + ")\n";
}

// make color string
for(var zoneNumber = 0; zoneNumber < numTotalZone; zoneNumber++){
  colorString += "#district_" + (zoneNumber + 1) + ".svg_select\n";
  colorString += "  *\n";
  colorString += "    fill hsl(" + colorDeck[zoneNumber].h + ", " + colorDeck[zoneNumber].s + ", " + colorDeck[zoneNumber].l + ")\n";
}

console.log(colorDeck);
// save colors
fs.writeFileSync(__dirname +  '/../stylus/stylesheets/highlights.styl', colorString, ['utf8', 'w']);



// /* Animation */
// @keyframes ui_sAnimated {
//   0%   {color: #7CFC00;}
//   16%  {color: #FF1493;}
//   32%  {color: #00BFFF;}
//   48%  {color: #FF3300;}
//   64%  {color: #DA70D6;}
//   80% {color: #FFD700;}
//   100% {color: #7CFC00;}
// }
//
// div {
//   animation-name: example;
//   animation-duration: 5s;
//   animation-timing-function: linear;
//   animation-delay: 2s;
//   animation-iteration-count: infinite;
//   animation-direction: alternate;
// }
// make animations

/*
  1 - 40
  0 - 20% BLACK
  20 - 11 CHANGE
  25 - 75 COLOR
  29 - 31 CHANGE
  75 - 100 BLACK
 */
animString = "@import 'nib'\n\n";


for(var zoneNumber = 0; zoneNumber < numTotalZone; zoneNumber++){
  var i;
  animString += "@keyframes ui_bgAnimatedKF_" + (zoneNumber + 1) + " {\n";
  animString += "  0% {background-color: #000;}\n";
  animString += "  15% {background-color: #000;}\n";
  animString += "  35% {background-color: hsl(" + colorDeck[zoneNumber].h + ", " + colorDeck[zoneNumber].s + ", " + colorDeck[zoneNumber].l + ");}\n";
  animString += "  65% {background-color: hsl(" + colorDeck[zoneNumber].h + ", " + colorDeck[zoneNumber].s + ", " + colorDeck[zoneNumber].l + ");}\n";
  animString += "  85% {background-color: #000;}\n";
  animString += "  100% {background-color: #000;}\n";
  animString += "}\n\n";

  animString += ".ui_bgAnimated_" + (zoneNumber + 1) + "\n";
  animString += "  animation-name ui_bgAnimatedKF_" + (zoneNumber + 1) + "\n";
  animString += "  animation-duration 4s\n";
  // animString += "  animation-delay 4s\n";
  animString += "  animation-iteration-count infinite\n";
  animString += "  animation-direction alternate\n\n";
}


fs.writeFileSync(__dirname +  '/../stylus/stylesheets/animations.styl', animString, ['utf8', 'w']);

