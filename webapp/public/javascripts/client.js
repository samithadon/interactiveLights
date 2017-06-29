/*
 * Client view for the LUX iSwarm
 * @author Anusha Withana wdanusha@gmail.com
 */

$(window).resize(resize);
window.onorientationchange = resize;

document.addEventListener('DOMContentLoaded', start, false);


var interactive = true;

// Page width and height
var w = 1024;
var h = 768;

//  Margins
var mTop = 100;
var mBottom = 20;
var mY = mTop + mBottom;
var mLeft = 20;
var mRight = 20;
var mX = mLeft + mRight;



// X. Y grid of LEDs x along string, y string number.
var nLStr = 50;
var nStr = 16;
var nLED = nLStr * nStr;

var gap = Math.min(Math.round(w / nStr), Math.round(h / nLStr));
var dx = (w - gap * nStr) / 2;
var dy = (h - gap * nLStr) / 2;

var leds = [];
var locs = [];

var n = 2000;
var d = 1;
var current = 1;
var objs = 17;
var vx = 0;
var vy = 0;
var vz = 0;
var points1 = [];
var points2 = [];
var points3 = [];
var tpoint1 = [];
var tpoint2 = [];
var tpoint3 = [];
var balls = [];

var mouseDown = false;

function start() {

  var ballTexture = new PIXI.Texture.fromImage("images/pixel.png");

  renderer = PIXI.autoDetectRenderer(w, h);

  stage = new PIXI.Stage(0x000000, interactive);

  stage.touchstart = onMStart;
  stage.mousedown = onMStart;

  stage.touchmove = onMMove;
  stage.mousemove = onMMove;

  stage.touchend = onMEnd;
  stage.mouseup = onMEnd;

  document.body.appendChild(renderer.view);

  for (var i = 0; i < nLED; i++){
    var tempLED = new PIXI.Sprite(ballTexture);
    tempLED.anchor.x = 0.5;
    tempLED.anchor.y = 0.5;
    tempLED.alpha = 0.5;
    tempLED.setInteractive(interactive);
    // tempLED.interactive = interactive;
    // tempLED.touchmove = onMHover;

    // Actions
    // tempLED.mouseover = tempLED.touchmove = onMHover;
    // tempLED.touchstart  = onMOut; // tempLED.touchend

    leds[i] = tempLED;

    stage.addChild(tempLED);
  }

  resize();

  // setTimeout(nextObject, 2000);

  requestAnimFrame(update);

}

function resize(){
  w = $(window).width();
  h = $(window).height();

  gap = Math.min(Math.round((w - mX) / nStr), Math.round((h - mY)/ nLStr));
  dx = Math.round((w - gap * nStr) / 2) + mLeft;
  dy = Math.round((h - gap * nLStr) / 2) + mRight;

  console.log(w, h, gap, dx, dy);

  setLocations();
  renderer.resize(w, h);
}

function setLocations(){
  for (var i = 0; i < nLED; i++){
    leds[i].position.x = Math.round((i % nStr) * gap + dx);
    leds[i].position.y = Math.round(Math.floor(i / nStr) * gap + dy);
    leds[i].width = 5;
    leds[i].height = 5;
    // console.log(i, leds[i].position.x,  leds[i].position.y);
  }
}

function update()
{
  renderer.render(stage);
  requestAnimFrame(update);
}

function onMStart(data){
  mouseDown = true;
  // console.log("start");
  // this.alpha = 1;
}

function onMEnd(data){
  mouseDown = false;
  for (var i = 0; i < leds.length; i++){
    leds[i].alpha = 0.5;
  }
  // console.log("out");
  // this.alpha = 0.5;
}

function onMMove(data){
  var pxl = getPixelByLocation(data.getLocalPosition(this));
  if(pxl && mouseDown){
    pxl.alpha = 1;
  }
  // console.log("Mouse move : " + );
}


function getPixelByLocation(pos){
  var i = Math.round((pos.x - dx) / gap);
  var j = Math.round((pos.y - dy) / gap);
  // console.log(i, j);
  if(0 <= i && i < nStr && 0 <= j && j < nLStr){
    return leds[i + (j * nStr)];
  }
  else
    return false;
}
