var Color = require("color");

document.addEventListener('DOMContentLoaded', start, false);

var lightGrid = {
  "w": 54,
  "h": 30
};

var clock = new THREE.Clock();

var actionStack = [];
var currentAnimation = {};
currentAnimation.on = false;

border = [
  {
    "s": 23,
    "e": 29
  },
  {
    "s": 22,
    "e": 31
  },
  {
    "s": 13,
    "e": 32
  },
  {
    "s": 11,
    "e": 33
  },
  {
    "s": 10,
    "e": 34
  },
  {
    "s": 8,
    "e": 36
  },
  {
    "s": 7,
    "e": 39
  },
  {
    "s": 7,
    "e": 40
  },
  {
    "s": 6,
    "e": 41
  },
  {
    "s": 6,
    "e": 42
  },
  {
    "s": 6,
    "e": 50
  },
  {
    "s": 5,
    "e": 51
  },
  {
    "s": 4,
    "e": 52
  },
  {
    "s": 4,
    "e": 52
  },
  {
    "s": 3,
    "e": 53
  },
  {
    "s": 3,
    "e": 53
  },
  {
    "s": 2,
    "e": 53
  },
  {
    "s": 2,
    "e": 52
  },
  {
    "s": 2,
    "e": 52
  },
  {
    "s": 1,
    "e": 51
  },
  {
    "s": 1,
    "e": 51
  },
  {
    "s": 1,
    "e": 49
  },
  {
    "s": 0,
    "e": 46
  },
  {
    "s": 0,
    "e": 42
  },
  {
    "s": 1,
    "e": 39
  },
  {
    "s": 18,
    "e": 35
  },
  {
    "s": 19,
    "e": 33
  },
  {
    "s": 21,
    "e": 31
  },
  {
    "s": 22,
    "e": 31
  },
  {
    "s": 26,
    "e": 30
  }
];


DtoP = [
{'x': 0 , 'y': 0},
// 1
{'x': 27 , 'y': 26},
// 2
{'x': 23 , 'y': 28},
// 3
{'x': 22 , 'y': 26},
// 4
{'x': 27 , 'y': 28},
// 5
{'x': 16 , 'y': 23},
// 6
{'x': 24 , 'y': 26},
// 7
{'x': 25 , 'y': 25},
// 8
{'x': 25 , 'y': 23},
// 9
{'x': 23 , 'y': 23},
// 10
{'x': 19 , 'y': 22},
// 11
{'x': 21 , 'y': 20},
// 12
{'x': 25 , 'y': 20},
// 13
{'x': 28 , 'y': 22},
// 14
{'x': 31 , 'y': 21},
// 15
{'x': 32 , 'y': 23},
// 16
{'x': 37 , 'y': 20},
// 17
{'x': 40 , 'y': 17},
// 18
{'x': 35 , 'y': 17},
// 19
{'x': 30 , 'y': 15},
// 20
{'x': 23 , 'y': 15},
// 21
{'x': 13 , 'y': 17},
// 22
{'x': 7 , 'y': 19},
// 23
{'x': 15 , 'y': 14},
// 24
{'x': 9 , 'y': 12},
// 25
{'x': 15 , 'y':11},
// 26
{'x': 20 , 'y': 12},
// 27
{'x':22 , 'y': 7},
// 28
{'x': 28 , 'y': 12}
];

lights = {};

lw = {};
lwt = 1;
lwm = 1;

graphics = {};

socket = {};

stats = {};

function start() {
  socket = io(window.location.host + '/toservers');

  socket.on('bdmsg', remoteActionMessage);
  socket.on('stats', remoteStatMessage);


  graphics.renderer = new THREE.WebGLRenderer();
  graphics.renderer.setPixelRatio( window.devicePixelRatio );

  graphics.w = 1000;
  graphics.h = 580;

  graphics.dw = graphics.w / lightGrid.w;
  graphics.dh = graphics.h / lightGrid.h;


  graphics.renderer.setSize( graphics.w, graphics.h );
  $("#renderthree").append( graphics.renderer.domElement );

  graphics.cam = new THREE.PerspectiveCamera( 70,
  graphics.w / graphics.h / 2, -300, 200 );
  graphics.cam.position.set(0, 1000, 600);
  graphics.cam.lookAt(new THREE.Vector3(0, 0, 0 ));

  graphics.scene = new THREE.Scene();

  graphics.controls = new THREE.TrackballControls(  graphics.cam );
  graphics.controls.target.set( 0, 0, 0 );

  graphics.controls.rotateSpeed = 0.5;
  graphics.controls.zoomSpeed = 0.5;
  graphics.controls.panSpeed = 0.5;

  graphics.controls.noZoom = false;
  graphics.controls.noPan = false;

  graphics.controls.staticMoving = false;
  graphics.controls.dynamicDampingFactor = 0.15;

  graphics.controls.keys = [ 65, 83, 68 ];

  makeLights();
  animate();
  setInterval( function() {
    requestAnimationFrame( animate );
  }, 1000 / 30 );

}

function makeLights(){
  var sphere = new THREE.SphereGeometry( 2, 8, 8 );
  for(var y= 0; y < lightJS.length; y++){
    lights[y] = {};
    lw[y] = {};
    for(var x= 0; x < lightJS[0].length; x++){
      lw[y][x] = 0;
      lights[y][x] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[y][x].position.set( Math.round(x -  lightGrid.w / 2) * graphics.dw, 0, -600 + y * graphics.dh );
      var msh = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) ;
      lights[y][x].userData = lights[y][x].children.length;
      lights[y][x].add( msh );
      graphics.scene.add( lights[y][x] );
    }
  }
}


function calcIntenseRatio(stat){
  for(var y= 0; y < lightJS.length; y++){
    for(var x= 0; x < lightJS[0].length; x++){
      if(lightJS[y][x].district === 0 ){
        lw[y][x] = 0;
      }else{
        lw[y][x] = (stat[lightJS[y][x].district].count / (stat[0].count + 0.1)) + 0.2;
      }
      makeLightSelfIntensity(x, y);
    }
  }
}


function makeLightSelfIntensity(x, y){
  var hue, sat, bright;

  if(lw[y][x] < 0.5){
    // blue
      hue = map (lw[y][x], 0.0, 1.0, 1.0, 0.5);
      sat = map (lw[y][x], 0.0, 1.0, 1.0, 1.0);
      bright = map (lw[y][x], 0.0, 1.0, 0.2, 1.0);
  }else{
    // red
      hue = map (lw[y][x], 0.0, 1.0, 0.625, 0.125);
      sat = map (lw[y][x], 0.0, 1.0, 1.0, 1.0);
      bright = map (lw[y][x], 0.0, 1.0, 0.2, 1.0);
  }

  var hsbColor = Color().hsv(hue * 360, sat * 100, bright * 100);
  var rgb = (hsbColor.red() << 16) + (hsbColor.green() << 8) + hsbColor.blue();

  lights[y][x].children[lights[y][x].userData].material.color.setHex(rgb);
}



function makeLightIntensity(x, y, intns){
  var hue, sat, bright;
  if(intns < 0.5){
    // blue
      hue = map (intns, 0.0, 1.0, 1.0, 0.5);
      sat = map (intns, 0.0, 1.0, 1.0, 1.0);
      bright = map (intns, 0.0, 1.0, 0.2, 1.0);
  }else{
    // red
      hue = map (intns, 0.0, 1.0, 0.625, 0.125);
      sat = map (intns, 0.0, 1.0, 1.0, 1.0);
      bright = map (intns, 0.0, 1.0, 0.2, 1.0);
  }

  var hsbColor = Color().hsv(hue * 360, sat * 100, bright * 100);
  var rgb = (hsbColor.red() << 16) + (hsbColor.green() << 8) + hsbColor.blue();

  lights[y][x].children[lights[y][x].userData].material.color.setHex(rgb);
}

function map(v, f, t, min, max){
  return (v * (max - min) / (t - f)) + min;
}

function constrain(v, min, max){
  return Math.max(min, Math.min(v, max));
}

function animate() {
  // requestAnimationFrame( animate );
  render();
}

function remoteActionMessage(msg){
  actionStack.push(msg);
}


function remoteStatMessage(stat){
  calcIntenseRatio(stat);
}

function createAnimation(x, y){
  var anim = {};
  anim.x = x;
  anim.y = y;
  anim.r = 1;
  anim.rMax = 50;
  anim.rd = 5;
  anim.sprkl = {
    'iter': 5,
    'dur': 10,
    'parts' : {}
  };
  return anim;
}

function drawHeat(){
  for(var y= 0; y < lightJS.length; y++){
    for(var x= 0; x < lightJS[0].length; x++){
      makeLightSelfIntensity(x, y);
    }
  }

}

function doAnimation(){

  var x, y;
  if(currentAnimation.anim.r ++ > currentAnimation.anim.rMax){
    currentAnimation.on = false;
    drawHeat();
    return;
  }else{
    drawHeat();
    var r  = currentAnimation.anim.r;
    for(var t = 0; t < 360; t++){
      x = Math.round(currentAnimation.anim.x + r * Math.cos(t * Math.PI / 180));
      y = Math.round(currentAnimation.anim.y + r * Math.sin(t * Math.PI / 180));
      if(y >= 0 && y < lightJS.length){
        if(x >= 0 && x < lightJS[0].length){
          makeLightIntensity(x, y, 1);
        }
      }
    }
  }
}


function doAnimationSparkle(){
  var x, y;
  if(currentAnimation.anim.r ++ > currentAnimation.anim.rMax){
    currentAnimation.on = false;
    return;
  }else{
    var r  = currentAnimation.anim.r;
    for(var t = 0; t < 360; t++){
      x = Math.round(currentAnimation.anim.x + r * Math.cos(t * Math.PI / 180));
      y = Math.round(currentAnimation.anim.y + r * Math.sin(t * Math.PI / 180));
      if(y >= 0 && y < lightGrid.h){
        if(x >= border[y].s && x <= border[y].e){
          makeLightIntensity(x, y, 1);
        }
      }
    }
  }
}


function processRemoteMessage(msg){

  var loc = DtoP[msg.district];

  var reply = {
    'sockid': msg.sockid,
    'count': msg.count,
    'total': msg.total,
    'zone': msg.district
  };
  socket.emit('metainfo', reply);
  currentAnimation.on = true;
  currentAnimation.anim = createAnimation(loc.x, loc.y);

}


function renderActions(){
  if(currentAnimation.on){
    doAnimation();
  }
  else if(actionStack.length > 0){
    processRemoteMessage(actionStack.shift());
  }
}

function render() {
  renderActions();
  graphics.controls.update( clock.getDelta() );
  graphics.renderer.render( graphics.scene, graphics.cam );
}
