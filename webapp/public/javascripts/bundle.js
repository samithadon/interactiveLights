(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var appClasses = [
  require('./apps/default/defaultapp.js'),
  require('./apps/app2/appmain.js')
];
var appList = [];
function LightApps(){
  // this.location = location;
  // this.strandID = strandID;
  // this.positionID = positionID;
  // location, strandID, positionID
  // appClasses.forEach(function (element, index, array) {
  //   appList.push(new element());
  //   // appList[index].logInfo();
  // });
}


LightApps.prototype = {
  constructor: LightApps,
  appList: appList,
  appClasses: appClasses,

  logInfo:function ()  {
    console.log("Application loader for Light Apps");
  },

  getName:function ()  {
    console.log("Application loader");
  },


};

module.exports = LightApps;

},{"./apps/app2/appmain.js":2,"./apps/default/defaultapp.js":4}],2:[function(require,module,exports){
var stage;
var geometri;
var mouseDown = false;


function LightApp(stg, gmtr){
  stage = stg;
  geometri = gmtr;
  init();
  // this.location = location;
  // this.strandID = strandID;
  // this.positionID = positionID;
  // location, strandID, positionID
}

function init(){
  console.log('init');
  stage.touchstart = onMStart;
  stage.mousedown = onMStart;

  stage.touchmove = onMMove;
  stage.mousemove = onMMove;

  stage.touchend = onMEnd;
  stage.mouseup = onMEnd;
}

function kill(){
  stage.touchstart = null;
  stage.mousedown = null;

  stage.touchmove = null;
  stage.mousemove = null;

  stage.touchend = null;
  stage.mouseup = null;
  stage = null;
  geometri = null;
}


LightApp.prototype = {
  constructor: LightApp,

  init: init,
  kill: kill,

  logInfo:function ()  {
    console.log("Info of LightApp 1" + document['gameParam']);
  },

  getName:function ()  {
    console.log("Info of LightApp 1");
  }
};

function onMStart(data){
  mouseDown = true;
  console.log("start 1");
  // this.alpha = 1;
}

function onMEnd(data){
  mouseDown = false;
  for (var i = 0; i < geometri.locs.length; i++){
    geometri.locs[i].alpha = 0.5;
  }
  console.log("out 1");
  // this.alpha = 0.5;
}

function onMMove(data){
  var pxl = geometri.getPixelByLocation(data.getLocalPosition(this));
  if(pxl && mouseDown){
    pxl.alpha = 1;
  }
  // console.log("Mouse move : " + );
}

module.exports = LightApp;

},{}],3:[function(require,module,exports){
function Boid(loc, type){
  //Swarm Settings
  // this.sepRad = 50.0;
  // this.aliRad = 75.0;
  // this.cohRad = 100.0;

  // this.huntRad = 100.0;
  // this.eatRad = 15;
  // this.fleeRad = 125.0;

  // this.sepF = 1.25;
  // this.aliF = 1.0;
  // this.cohF = 0.75;
  // this.borF = 0.75;
  // this.fleeF = 1.75;
  // this.huntF = 0.75;
  // this.perF = 0.05;

  // //Speed Limits
  // this.maxspeed = 2 * factorK;
  // this.maxforce = 0.1 * factorK;

  // //Boid
  // Location of the boid
  this.loc = loc;

  // temporary location
  this.lt = loc;
  // this.velocity = vel.normalize(vel);
  // this.velocity.mult (this.maxspeed);
  // this.acceleration = acc.normalize(acc);
  // this.acceleration.mult (this.maxforce);

  //Drawing Options
  this.drawRadius = 5;
  // this.drawTriangle = true;

  //Predator Prey
  if (type == "none") {
    this.isPrey = false;
    this.isPred = false;
  }
  else if (type == "prey") {
    this.isPrey = true;
    this.isPred = false;
  }
  else if (type == "predator") {
    this.isPrey = false;
    this.isPred = true;
    }

}

Boid.prototype.setLocation = function(loc){
  this.lt = loc;
};


module.exports = Boid;

},{}],4:[function(require,module,exports){
var Boid = require('./boid.js');
var NZButton = require('../../nzbutton.js');
var NZLabels = require('../../nzlabels.js');
var Intro = require('../../intro.js');

function LightApp(stag, gmtr){
  stg = stag;
  g = gmtr;
  g.t.mouseDown = false;
  this.init();
  g.t.t = false;

  // array of boids
  g.t.boids = false;
  g.t.bType = false;
  g.t.c = 2;

  g.t.isIntro = false;

  socket = io(window.location.host + '/fromremote');
  socket.on('metainfo', this.onMetaMessage);
  if(nZClient){
    // console.log('remote');
  }
  else{
    serverSock = io(window.location.host + '/toservers');
    // console.log('server');
    serverSock.on('acmsg', this.onServerMessage);
  }

  g.t.btns = [];
  this.intro = false;
  this.makeIntro();

  // g.t.intro = new Intro();
  // g.t.intro.init(g.strand.ls.x - (1.5 * g.gap), g.strand.ls.y - g.gap,
  //   g.w, g.h, g.gap, this.makeIntro());
  // // g.t.tmp = this.makeIntro1();

  // // g.t.intro.sprt.position = {x:0, y:0};



  // stg.addChild(g.t.intro.sprt);
  // console.log(g.t.intro.sprt);

}

LightApp.prototype.update = function(){
  g.unSetAllPixelTexture();
  if(g.t.boids){
    // if(g.t.boids.loc !== g.t.boids.lt){
      // location has been changed
    g.t.boids.loc = g.t.boids.lt;
    var reg = g.getPixelRegionByRadius(g.t.boids.loc, g.t.boids.drawRadius);
    // console.log(reg.sx, reg.sy, reg.ex, reg.ey);
    var disti = -1;
    var inte = 0;
    for(var i = reg.sx; i < reg.ex; i++){
      for(var j = reg.sy; j < reg.ey; j++){
        disti = g.t.boids.drawRadius - Math.sqrt(Math.pow(i - g.t.boids.loc.x, 2) +
          Math.pow(j - g.t.boids.loc.y, 2)) - 0.001;
        if(disti >= 0){
          inte = Math.floor(disti * g.iLevels / g.t.boids.drawRadius);
          g.setPixelTexture({x:i, y:j}, {c:g.t.c, i:inte});
        }
      }
    }

    // }
  }

  for (var key in g.t.btns) {
    g.t.btns[key].update();
  }
};

LightApp.prototype.init = function(){
  stg.touchstart = this.onMStart;
  // stg.mousedown = this.onMStart;

  stg.touchmove = this.onMMove;
  stg.mousemove = this.onMMove;

  stg.touchend = this.onMEnd;
  stg.mouseup = this.onMEnd;
};

LightApp.prototype.kill = function(){
  stg.touchstart = null;
  stg.mousedown = null;

  stg.touchmove = null;
  stg.mousemove = null;

  stg.touchend = null;
  stg.mouseup = null;
  stg = null;
  g = null;
};

LightApp.prototype.resize = function(){
  this.addButtons();
  this.makeIntro();
  // g.t.intro.init(g.strand.ls.x, g.strand.ls.y, g.w, g.h, g.gap, this.makeIntro());
};


LightApp.prototype.onMStart = function(data){
  // console.log(data.getLocalPosition(this), data);
  // console.log(data);
  // g.t.mouseDown = true;
  // g.t.boids = new Boid(g.getPixelByLoc(data.getLocalPosition(this)), g.t.bType);
  // g.t.boids = new Boid({x:0,y:0}, g.t.bType);
};

LightApp.prototype.onMEnd = function(data){
  if(!g.t.mouseDown)
    return;

  g.t.mouseDown = false;
  if(g.t.bType){
    g.t.btns[0].unclicked();
  }else{
    g.t.btns[1].unclicked();
  }

  // Google analytics code
  // if(g.t.c === 1){
  //   ga('send', 'event', 'buttonnew', 'pred',
  //     (g.t.btns[0].activity * 100000000) + (g.t.boids.loc.x * 1000) + g.t.boids.loc.y);
  // }else if(g.t.c === 2){
  //   ga('send', 'event', 'buttonnew', 'prey',
  //     (g.t.btns[1].activity * 100000000) + (g.t.boids.loc.x * 1000) + g.t.boids.loc.y);
  // }
  // Google analytics

  socket.emit('acmsg', {loc:g.getPixelLocationRatio(g.t.boids.loc), type: g.t.c});
  // console.log(g.t.boids.loc.x, g.t.boids.loc.y);
  // console.log(data.getLocalPosition(this));
  g.t.boids = false;
  // g.t.intro.init(g.w, g.h, g.gap, g.t.tmp);

  // stg.removeChild(g.t.intro.sprt);
};

LightApp.prototype.onMMove = function(data){
  if(!g.t.mouseDown)
    return;
  if(g.t.boids)
    g.t.boids.setLocation(g.getPixelByLoc(data.getLocalPosition(this)));

};


LightApp.onPreyClick = function(data){
  btnPrey.alpha = 0.5;
  btnPred.alpha = 1.0;
  g.t.bType = false;
  g.t.c = 2;
  // console.log('onPreyClick');
};

LightApp.prototype.onPredClick = function(data){
  btnPred.alpha = 0.5;
  btnPrey.alpha = 1.0;
  g.t.bType = true;
  g.t.c = 1;
  // console.log('onPredClick');
};

/*
 * Receiver a message from server
 * Only valud for server instances
 * @author Anusha Withana wdanusha@gmail.com
 */
LightApp.prototype.onServerMessage = function(msg){
  // console.log('Action Location :', msg.loc.x, msg.loc.y, msg.type);
};


/*
 * Receiver a meta message from server
 * @author Anusha Withana wdanusha@gmail.com
 */
LightApp.prototype.onMetaMessage = function(str){
  // console.log('Action msg :', str);
  var msg = jQuery.parseJSON(str);
  g.t.btns[0].activity = msg.py;
  g.t.btns[1].activity = msg.pd;
  g.t.lbls[0].setText(msg.pd);
  g.t.lbls[1].setText(msg.py);
  // ga('send', 'event', 'data', 'pred', msg.pd);


  // console.log('Action Location :', msg.pd);
};


/*
 * Generate texture from a given color
 * @author Anusha Withana wdanusha@gmail.com
 */
LightApp.prototype.addLabels = function(){
  var btn = new PIXI.Sprite(g.drawCircleTexture(clr, r));
  btn.interactive = true;
  btn.buttonMode = true;
  btn.anchor.x = 0.5;
  btn.anchor.y = 0.5;
  btn.position.x = x;
  btn.position.y = y;
  return btn;
};


/*
 * Add buttons for game
 * @author Anusha Withana wdanusha@gmail.com
 */
LightApp.prototype.addButtons = function(){
  var r = Math.round(g.uxArea.b.h * 0.5);
  var rd = Math.round(g.uxArea.b.h * 0.5);
  // console.log(r);
  g.t.btns = [];
  g.t.lbls = [];
  // g.t.btns.btnPred = this.drawButton(g.strand.ls.x + rd, g.strand.le.y + rd,
  //   r, 0x0033CC);
  //   x, y, rMin, rMaj, clr, meta
  g.t.btns[0] = new NZButton(g.strand.ls.x + rd, g.strand.le.y + rd,
    g.gap * g.gapToR, r, g.colorArray[1], 0);

  g.t.lbls[0] = new NZLabels(g.strand.ls.x + (2 * rd), g.strand.le.y + rd,
    0, g.colorArray[1], rd * 0.4, false);
  // g.t.btns[0].type = true;
  // g.t.btns[0].btn.tap = g.t.btns[0].btn.click = this.clickButton;
  g.t.btns[0].btn.touchstart = g.t.btns[0].btn.mousedown = this.dragButton;
  stg.addChild(g.t.btns[0].btn);
  stg.addChild(g.t.lbls[0].txtArea);

  // g.t.btns.btnPrey = this.drawButton(g.strand.le.x - rd - g.gap,
  //   g.strand.le.y + rd, r, 0x66CC00);
  g.t.btns[1] = new NZButton(g.strand.le.x - rd - g.gap,
    g.strand.le.y + rd, g.gap * g.gapToR, r, g.colorArray[2], 1);

  g.t.lbls[1] = new NZLabels(g.strand.le.x - (2 * rd) - g.gap, g.strand.le.y + rd,
    0, g.colorArray[2], rd * 0.4, true);
  // g.t.btns[1].type = false;
  // g.t.btns[1].btn.tap = g.t.btns[1].btn.click = this.clickButton;
  g.t.btns[1].btn.touchstart = g.t.btns[1].btn.mousedown = this.dragButton;

  stg.addChild(g.t.btns[1].btn);
  stg.addChild(g.t.lbls[1].txtArea);
};


/*
 * Click buttons
 * @author Anusha Withana wdanusha@gmail.com
 */
LightApp.prototype.clickButton = function(data){
  if(this.meta === 1){
    g.t.bType = true;
    g.t.c = 1;
  }else{
    g.t.bType = false;
    g.t.c = 2;
  }
};

/*
 * Drag buttons
 * @author Anusha Withana wdanusha@gmail.com
 */
LightApp.prototype.dragButton = function(data){
  g.t.btns[this.meta].clicked();
  // console.log(this.meta);
  if(this.meta === 0){
    g.t.bType = true;
    g.t.c = 1;
  }else{
    g.t.bType = false;
    g.t.c = 2;
  }
  g.t.mouseDown = true;
  g.t.boids = new Boid(g.getPixelByLoc(data.getLocalPosition(this)), g.t.bType);
};


/*
 * Get the UX boundary of the game
 * Atatic method
 * @author Anusha Withana wdanusha@gmail.com
 */
LightApp.getUXArea = function(){
  // width and herights are given as percentages
  return {
    l:{
      x: 0,
      y: 0,
      w: 0,
      wg: 0,
      h: 1,
    },
    r:{
      x: 0,
      y: 0,
      w: 0,
      wg: 0,
      h: 1,
    },
    t:{
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      hg: 0
    },
    b:{
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      hg: 8
    },
  };
};



LightApp.prototype.makeIntro = function(){
  // console.log('makeIntro', this.intro);
  this.intro = new Intro();
  this.intro.addStep('Keepers & Bees',
    'Meet the Keepers & the Bees!',
    'Next', []
    );

  var btnhiglight = [];
  for(var key in g.t.btns){
    btnhiglight.push({
      element:'div',
      attr:{
        class:'btnhighlight',
        style:"top:" + (g.t.btns[key].pos.y - g.t.btns[key].rMaj) + "px;" +
        "left:" + (g.t.btns[key].pos.x - g.t.btns[0].pos.x) + "px;" +
        "width:" + (g.t.btns[key].rMaj * 2) + "px;" +
        "height:" + (g.t.btns[key].rMaj * 2) + "px;"
      },
      value:''
    });
  }
  this.intro.addStep('Keepers & Bees',
    'The blue Keepers chase the green Bees.',
    // '</br></br>The sizes of the buttons show the propotion of blue creatures and green creatures.',
    'Next',
    btnhiglight
    );

  btnhiglight = [];
  for(key in g.t.lbls){
    btnhiglight.push({
      element:'div',
      attr:{
        class:'btnperchighlight',
        style:"top:" + (g.t.lbls[key].pos.y - g.t.lbls[key].txtArea.height) + "px;" +
        "left:" + (g.t.lbls[key].getLeft() - g.t.lbls[0].getLeft() + (6 * g.gap)) +
        "px;" +
        "width:" + (g.t.lbls[key].txtArea.width * 2) + "px;" +
        "height:" + (g.t.lbls[key].txtArea.height * 2) + "px;"
      },
      value:''
    });
  }
  this.intro.addStep('Keepers & Bees',
    'The percentages show the proportions of blue Keepers and green Bees respectively.',
    'Next',
    btnhiglight
    );


  var btnaction = [];
  for(key in g.t.btns){
    btnaction.push({
      element:'div',
      attr:{
        class:'btnaction btntype' + key ,
        style:"top:" + (g.t.btns[key].pos.y - g.t.btns[key].rMaj / 2) + "px;" +
        "left:" + (g.t.btns[key].pos.x - g.t.btns[0].pos.x + g.t.btns[key].rMaj / 2) + "px;" +
        "width:" + (g.t.btns[key].rMaj) + "px;" +
        "height:" + (g.t.btns[key].rMaj) + "px;"
      },
      value:''
    });
  }
  this.intro.addStep('Keepers & Bees',
    'To support Keepers or Bees, ' +
    'drag a button and send them on their way by releasing the button.',
    'Start',
    btnaction
    );

};

module.exports = LightApp;

},{"../../intro.js":6,"../../nzbutton.js":8,"../../nzlabels.js":10,"./boid.js":3}],5:[function(require,module,exports){
/*
 * Handles Geomtri of drawing objecs and calculating distances
 * @author Anusha Withana wdanusha@gmail.com
 */

var Pixel = require('./pixel.js');
var Color = require("color");


function Geometri(isRemote){
  // Page width and height
  this.w = 1024;
  this.h = 768;

  //  Maargins
  this.margin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
  // this.margin.y
  this.margin.y = this.margin.top + this.margin.bottom;
  // this.margin.x
  this.margin.x = this.margin.left + this.margin.right;



  // Strand definitions
  this.strand = {
    // all strand width and heigh including non light, but inside margins
    aw: 36,
    ah: 52,

    // all strand start and end position [)
    as: {x:0, y:0},
    ae: {x:36, y:64},

    // light strand width and heigh
    lw: 26,
    lh: 50,

    // light strand start and end position [)
    ls: {x:10, y:8},
    le: {x:26, y:56}
  };

  // all strand points
  this.strand.at = this.strand.aw * this.strand.ah;
  // light strand light points
  this.strand.lt = this.strand.lw * this.strand.lh;

  //  Check if it is remote
  this.isRemote = typeof isRemote !== 'undefined' ? isRemote : true;

  // if the canvas is rendered landscap
  this.isLandscape = false;

  // ratio of gap between pixels to the radius of a pixel
  this.gapToR = 0.2;

  // this.locs = [];
  this.pixels = [];

  // other textures : used to change colors and so on
  this.textureArray = [];
  this.textureArray[0] = [];
  this.colorArray = [];
  this.colorArray[0] = [];



  // default texture: defined at initGraphics
  this.textureArray[0][0] = null;

  // Different texture intensity levels
  this.iLevels = 10;

  // User Interaction area from stage
  this.uxArea = {
    l:{
      x: 0,
      y: 0,
      w: 0,
      wg: 0,
      h: 0,
    },
    r:{
      x: 0,
      y: 0,
      w: 0,
      wg: 0,
      h: 0,
    },
    t:{
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      hg: 0
    },
    b:{
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      hg: 0
    },
  };

  // temporary place holder to store game data
  this.t = [];

}

Geometri.prototype.init = function(){
  // console.log('init');
};

/*
 * re-calibrate graphics when window size changes
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.resize = function(uxarea){

  this.w = $('#rendermain').width();
  this.h = $('#rendermain').height();

  // if UX boundary is given, set the boundaries
  if(typeof uxarea !== 'undefined'){
    this.uxArea =  uxarea;
  }

  // // convert widths from % to pixels
  // for(var key in this.uxArea){
  //   this.uxArea[key].w = Math.round(this.uxArea[key].wr * this.w);
  //   this.uxArea[key].h = Math.round(this.uxArea[key].hr * this.h);
  //   // console.log(key + '( ' + this.uxArea[key].w + ', ' + this.uxArea[key].h + ')');
  // }




  if(this.isRemote){
    // In the remote app
    // if(this.w > this.h){
    //   this.isLandscape = true;
    //   this.setGeometriLandscape();
    //   this.setLocations = this.setLocationsLandscape;
    //   this.getPixelByLoc = this.getPixelByLocationLandscape;
    // }else{
      this.isLandscape = false;
      this.setGeometriPortrait();
      this.setLocations = this.setLocationsPortrait;
      this.getPixelByLoc = this.getPixelByLocationPortrait;
    // }
  }
  else{
    // in browser
    this.setGeometriLandscape();
    this.setLocations = this.setLocationsLandscape;
    this.getPixelByLoc = this.getPixelByLocationLandscape;
  }
  this.setRegionWidth();
  this.setTextures();
  this.initGraphics();
  this.setLocations();
  renderer.resize(this.w, this.h);

  // for(var key in this.uxArea){
  //   console.log(key + '( ' + this.uxArea[key].w + ', ' + this.uxArea[key].h + ')');
  // }
  // for(var key in this.strand){
  //   console.log(key + '( ' + this.strand[key].x + ', ' + this.strand[key].y + ')');
  // }
};

/*
 * Set the dimensions for portrait allignment (in Portrait)
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.setGeometriPortrait = function(){
  //  - this.uxArea.l.w - this.uxArea.r.w
  //  - this.uxArea.l.h - this.uxArea.r.h
  this.gap = Math.min(Math.round(this.w /
    (this.strand.aw + this.uxArea.l.wg + this.uxArea.r.wg)),
    Math.round(this.h/
    (this.strand.ah + this.uxArea.t.hg + this.uxArea.b.hg)));

  //  calculate overall dimensions
  var bw = this.gap * (this.strand.aw + this.uxArea.l.wg + this.uxArea.r.wg);
  var bh = this.gap * (this.strand.ah + this.uxArea.t.hg + this.uxArea.b.hg);

  // set ux area widths
  for(var key in this.uxArea){
    if(key === 'l' || key === 'r'){
      this.uxArea[key].w = this.uxArea[key].wg * this.gap;
      this.uxArea[key].h = this.gap * this.strand.ah;
    }else{
      this.uxArea[key].w = this.gap * this.strand.aw;
      this.uxArea[key].h = this.uxArea[key].hg * this.gap;
    }
    // console.log(key + '( ' + this.uxArea[key].w + ', ' + this.uxArea[key].h + ')');
  }


  // boundary geometri
  this.uxArea.t.x = Math.round((this.w -bw) / 2);
  this.uxArea.t.y = Math.round((this.h -bh) / 2);

  this.uxArea.l.x = this.uxArea.b.x = this.uxArea.t.x;
  this.strand.as.x = this.uxArea.l.x + this.uxArea.l.w;
  this.strand.ae.x = this.uxArea.r.x = this.uxArea.t.x + bw - this.uxArea.r.w;

  this.uxArea.l.y = this.uxArea.r.y = this.strand.as.y = this.uxArea.t.y +
    this.uxArea.t.h;
  this.uxArea.b.y = this.strand.ae.y = this.uxArea.t.y + bh - this.uxArea.b.h;


  // light geometri
  this.strand.ls.x = Math.round(this.gap * (this.strand.aw - this.strand.lw) / 2) +
    this.strand.as.x;
  this.strand.ls.y = Math.round(this.gap * (this.strand.ah - this.strand.lh) / 2) +
    this.strand.as.y;

  this.strand.le.x = (this.strand.ls.x + this.gap * this.strand.lw);
  this.strand.le.y = (this.strand.ls.y + this.gap * this.strand.lh);

};

/*
 * Set the dimensions for portrait allignment (in Landscape)
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.setGeometriLandscape = function(){
  // this.gap = Math.min(Math.round((this.w - this.uxArea.l.w - this.uxArea.r.w) /
  //   this.strand.ah),
  //   Math.round((this.h - this.uxArea.t.h - this.uxArea.b.h)/
  //   this.strand.aw));

  this.gap = Math.min(Math.round(this.w /
    (this.strand.ah + this.uxArea.l.wg + this.uxArea.r.wg)),
    Math.round(this.h/
    (this.strand.aw + this.uxArea.t.hg + this.uxArea.b.hg)));

  //  calculate overall geometry
  // var bw = (this.gap * this.strand.ah) + this.uxArea.l.w + this.uxArea.r.w;
  // var bh = (this.gap * this.strand.aw) + this.uxArea.t.h + this.uxArea.b.h;

  //  calculate overall dimensions
  var bw = this.gap * (this.strand.ah + this.uxArea.l.wg + this.uxArea.r.wg);
  var bh = this.gap * (this.strand.aw + this.uxArea.t.hg + this.uxArea.b.hg);

  // set ux area widths
  for(var key in this.uxArea){
    if(key === 'l' || key === 'r'){
      this.uxArea[key].w = this.uxArea[key].wg * this.gap;
      this.uxArea[key].h = this.gap * this.strand.aw;
    }else{
      this.uxArea[key].w = this.gap * this.strand.ah;
      this.uxArea[key].h = this.uxArea[key].hg * this.gap;
    }
    // console.log(key + '( ' + this.uxArea[key].w + ', ' + this.uxArea[key].h + ')');
  }


  // boundary geometri
  this.uxArea.t.x = Math.round((this.w -bw) / 2);
  this.uxArea.t.y = Math.round((this.h -bh) / 2);

  this.uxArea.l.x = this.uxArea.b.x = this.uxArea.t.x;
  this.strand.as.x = this.uxArea.l.x + this.uxArea.l.w;
  this.strand.ae.x = this.uxArea.r.x = this.uxArea.t.x + bw - this.uxArea.r.w;

  this.uxArea.l.y = this.uxArea.r.y = this.strand.as.y = this.uxArea.t.y +
    this.uxArea.t.h;
  this.uxArea.b.y = this.strand.ae.y = this.uxArea.t.y + bh - this.uxArea.b.h;


  // light geometri
  this.strand.ls.x = Math.round(this.gap * (this.strand.ah - this.strand.lh) / 2) +
    this.strand.as.x;
  this.strand.ls.y = Math.round(this.gap * (this.strand.aw - this.strand.lw) / 2) +
    this.strand.as.y;

  this.strand.le.x = (this.strand.ls.x + this.gap * this.strand.lh);
  this.strand.le.y = (this.strand.ls.y + this.gap * this.strand.lw);

};


/*
 * Get a pixel indexes by stage location (in Portrait)
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.getPixelByLocationPortrait = function(pos){
  var i = Math.round((pos.x - this.strand.ls.x) / this.gap);
  var j = Math.round((this.strand.le.y - pos.y + ((i % 2) * this.gap / 2)) /
    this.gap);
  // console.log(i, j);
  if(0 <= i && i < this.strand.lw && 0 <= j && j < this.strand.lh){
    // return this.pixels[i][j];
    return {x:i, y:j};
  }
  else
    return false;
};

/*
 * Get a pixel indexes by stage location (in Landscape)
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.getPixelByLocationLandscape = function(pos){
  var j = Math.round((pos.y - this.strand.ls.y) / this.gap);
  var i = Math.round((pos.x - ((j % 2) * this.gap / 2) - this.strand.ls.x) /
    this.gap);
  // console.log(i, j);
  if(0 <= i && i < this.strand.lh && 0 <= j && j < this.strand.lw){
    // return this.pixels[j][i];
    return {x:j, y:i};
  }
  else
    return false;
};

/*
 * Get a region of pixels by pixel indexes location and radius (in Landscape)
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.getPixelRegionByRadius = function(pos, r){
  return {
    sx: Math.max(0, pos.x - r),
    sy: Math.max(0, pos.y - r),
    ex: Math.min(this.strand.lw, pos.x + r),
    ey: Math.min(this.strand.lh, pos.y + r)
  };
};


/*
 * Get a region of pixels by pixel indexes location and radius (in Landscape)
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.getPixelLocationRatio = function(pos){
  return {
    x: Math.round( pos.x * 100 / this.strand.lw ) / 100,
    y: Math.round( pos.y * 100 / this.strand.lh ) / 100
  };
};

/*
 * Initalize graphi objects such as pixels and add to stage
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.initGraphics = function(){
  var i, j;

  while(stage.children.length > 0){
    stage.removeChildAt(0);
  }

  // Set default texture
  this.textureArray[0][0] = this.drawCircleTexture(0x333333, this.gapToR * this.gap);


  // Add pixels
  for (i = 0; i < this.strand.lw; i++){
    this.pixels[i] = [];
    for (j = 0; j < this.strand.lh; j++){
      this.pixels[i][j] = new Pixel(this.textureArray[0][0], {c:0, i:0});
      stage.addChild(this.pixels[i][j].g);
    }
  }
};

/*
 * Generate all the textures at the begining
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.setTextures = function(){
  var hue, sat, bright, intensity, rgb;
  var i;
  var hsbColor;

  //  create red color tecture variant
  this.textureArray[1] = [];
  this.colorArray[1] = [];
  for(i = 0; i < this.iLevels; i++){
    intensity = this.map (i, 0, this.iLevels -1, 0.1, 1.0);
    intensity = this.exponentialEasing (intensity, 0.4);
    hue = this.map (intensity, 0.0, 1.0, 360, 180);
    sat = 100;
    bright = this.map (intensity, 0.0, 1.0, 20, 100);
    hsbColor = Color().hsv(hue, sat, bright);
    // console.log(1, i, hsbColor.hexString());
    rgb = (hsbColor.red() << 16) + (hsbColor.green() << 8) + hsbColor.blue();
    this.colorArray[1][i] = rgb;
    this.textureArray[1][i] = this.drawCircleTexture(rgb, this.gapToR * this.gap);
  }


  //  create green color tecture variant
  this.textureArray[2] = [];
  this.colorArray[2] = [];
  for(i = 0; i < this.iLevels; i++){
    intensity = this.map (i, 0, this.iLevels -1, 0.1, 1.0);
    intensity = this.exponentialEasing (intensity, 0.4);
    hue = this.map (intensity, 0.0, 1.0, 225, 45);
    sat = 100;
    bright = this.map (intensity, 0.0, 1.0, 20, 100);
    hsbColor = Color().hsv(hue, sat, bright);
    // console.log(2, i, hsbColor.hexString());
    rgb = (hsbColor.red() << 16) + (hsbColor.green() << 8) + hsbColor.blue();
    this.colorArray[2][i] = rgb;
    this.textureArray[2][i] = this.drawCircleTexture(rgb, this.gapToR * this.gap);
  }
};


/*
 * Update all changed pixels to new in animation update
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.update= function(){
  for(var i=0; i < this.strand.lw; i++){
    for(var j=0; j < this.strand.lh; j++){
      if(this.pixels[i][j].c !== this.pixels[i][j].tc){
        // pixel has been updated
        this.pixels[i][j].c = this.pixels[i][j].tc;
        this.pixels[i][j].setTexture(
          this.textureArray[this.pixels[i][j].c.c][this.pixels[i][j].c.i]);
        // stage.removeChild(this.pixels[i][j].g);
        // this.pixels[i][j].setSprite(
        //   new PIXI.Sprite(
        //     this.textureArray[this.pixels[i][j].c.c][this.pixels[i][j].c.i]));
        // stage.addChild(this.pixels[i][j].g);
      }
    }
  }
};

/*
 * Set pixel texture as given
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.setPixelTexture= function(loc, clr){
  // console.log(loc.x, loc.y);
  if(this.pixels[loc.x][loc.y].tc !== clr){
    this.pixels[loc.x][loc.y].tc = clr;
  }
};

// /*
//  * Set pixel intensity as given
//  * @author Anusha Withana wdanusha@gmail.com
//  */
// Geometri.prototype.setPixelIntensity= function(loc, clr){
//   if(this.pixels[loc.x][loc.y].tc !== clr){
//     this.pixels[loc.x][loc.y].tc = clr;
//   }
// };

/*
 * Reset pixel texture to default
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.unSetPixelTexture= function(loc){
  this.pixels[loc.x][loc.y].tc = {c:0, i:0};
};

/*
 * Reset pixel texture to default
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.unSetAllPixelTexture= function(){
  for(var i=0; i < this.strand.lw; i++){
    for(var j=0; j < this.strand.lh; j++){
      this.unSetPixelTexture({x:i, y:j});
    }
  }
};


/*
 * Decrease the intensity of the pixel
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.decPixelTexture= function(loc){
  if(this.pixels[loc.x][loc.y].tc.i <= 0){
    this.unSetPixelTexture(loc);
  }else{
    this.setPixelTexture(loc, {c:this.pixels[loc.x][loc.y].tc.c,
      i:(this.pixels[loc.x][loc.y].tc.i - 1)});
  }
};

/*
 * Increase the intensity of the pixel
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.incPixelTexture= function(loc, cc){
  if(this.pixels[loc.x][loc.y].tc.c === 0){
    // turned off, turn on with the new texture
    // check if a color pointer given
    cc = typeof cc !== 'undefined' ? cc : 1;

    this.setPixelTexture(loc, {c:cc, i:0});

  }else if(this.pixels[loc.x][loc.y].tc.i + 1 < this.iLevels){
    // just increase
    this.setPixelTexture(loc, {c:this.pixels[loc.x][loc.y].tc.c,
      i:(this.pixels[loc.x][loc.y].tc.i + 1)});
  }
};


/*
 * Generate texture from a given color
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.drawCircleTexture = function(fillClr, r){
  // var r = Math.ceil(this.gapToR * this.gap);
  var g = new PIXI.Graphics();
  g.lineStyle(0, 0xffffff, 1);
  g.beginFill(fillClr, 1);
  g.drawCircle(0, 0, r);
  g.endFill();
  return g.generateTexture();
};


/*
 * Set pixel locations in portrait mode
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.setLocationsPortrait = function(){
  // Add pixel location
  for (var i = 0; i < this.strand.lw; i++){
    for (var j = 0; j < this.strand.lh; j++){
      this.pixels[i][j].g.position.x = this.strand.ls.x + i * this.gap;
      this.pixels[i][j].g.position.y = (this.strand.le.y - (i % 2) * this.gap / 2) -
        (j * this.gap);
    }
  }
};

/*
 * Set pixel locations in landscape mode
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.setLocationsLandscape = function(){
  // Add pixel location
  for (var i = 0; i < this.strand.lw; i++){
    for (var j = 0; j < this.strand.lh; j++){
      this.pixels[i][j].g.position.x = (this.strand.ls.x + (i % 2) * this.gap / 2) +
        (j * this.gap);
      this.pixels[i][j].g.position.y = this.strand.ls.y + i * this.gap;
    }
  }
};

/*
 * Mathematical mapping function
 * TODO: Remove this by adapating original ranges
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.map = function(v, f, t, min, max){
  return min + (v * (max - min) / (t - f));
};

/*
 * Mathematical constrain function
 * TODO: Remove this by adapating original ranges
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.constrain = function(v, min, max){
  return Math.max(min, Math.min(v, max));
};

/*
 * Shaping function for color intensity
 * @author Anusha Withana wdanusha@gmail.com
 * @author Thomas Wortmann thomas_wortmann@mymail.sutd.edu.sg
 */
Geometri.prototype.exponentialEasing = function(x, a) {
  var epsilon = 0.00001;
  var min_param_a = 0.0 + epsilon;
  var max_param_a = 1.0 - epsilon;
  var y = 0;
  a = Math.max(min_param_a, Math.min(max_param_a, a));

  if (a < 0.5) {
    // emphasis
    a = 2.0*(a);
    return Math.pow(x, a);
    // return y;
  }
  else {
    // de-emphasis
    a = 2.0*(a-0.5);
    return Math.pow(x, 1.0/(1-a));
    // return y;
  }
};


/*
 * Set region width to the array width
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.setRegionWidth = function ()  {
  $('.regionfixw').css("width", this.strand.ae.x - this.strand.as.x + "px");
};


/*
 * Support function to generate a game button
 * @author Anusha Withana wdanusha@gmail.com
 */
Geometri.prototype.makeGameButton = function (id, value, text, classes)  {
  return '<div class="gameBtnOuter"><div class="gameBtn '+ classes +
    '" id="' + id +
    '" value="' + value + '">' +
    text + '</div></div>';
};


Geometri.prototype.logInfo = function ()  {
  console.log("Info of Geometri 1");
};

Geometri.prototype.getName = function ()  {
  console.log("Geometri");
};

module.exports = Geometri;

},{"./pixel.js":11,"color":12}],6:[function(require,module,exports){
var NZGraphics = require('./nzgraphics.js');


function Intro(){
  // this.stg = stg;
  // this.g = gmtry;
  // console.log('stepList');
  // console.log(stepList);
  this.stepList = [];
  this.stepList.push(false);

  this.step = 0;
}

Intro.prototype.resize= function(gmtr){
  this.left = gmtr.strand.ls.x;
  this.width = gmtr.strand.le.x - gmtr.strand.ls.x -gmtr.gap;

  this.base = "<div id='intro' style='left: " + this.left + "px; " +
    "width: " + this.width + "px;'></div>";
};

Intro.prototype.update= function(){
  this.breath();
};

Intro.prototype.addStep= function(ttl, txt, btn, extra){
  // console.log(extra);
  this.stepList.push({
    title: ttl,
    text: txt,
    btn: btn,
    extra: extra
  });
};

Intro.prototype.initStep= function(){
  // console.log('initStep', this.step, this.stepList.length);
  //
  this.step++;
  if(this.step == this.stepList.length){
    this.step = 0;
    $('#intro').css("display", "none");
  }else{
    $('#intro #intro_box .title').html(this.stepList[this.step].title);
    $('#intro #intro_box .msg p').html(this.stepList[this.step].text);
    $('#intro #intro_box .msg #intronext').html(this.stepList[this.step].btn);
    $('#intro').show( "slide", { direction: "right" }, "slow" );
    if(typeof(this.stepList[this.step].extra) !== 'undefined'){
      var html = Intro.renderElement(this.stepList[this.step].extra);
      $('#intro .extras').html(html);
      // console.log(html);
    }else{
      $('#intro .extras').html('');
    }
  }
  // $('#intro #intro_box .title').html(this.stepList[this.step].title);
};

Intro.renderElement= function(obj){
  var html = "";
  for(var ok in obj){
    // console.log(ok, obj[ok]);
    html = html + "<" + obj[ok].element + " ";
    for(var key in obj[ok].attr){
      // console.log(key, obj[ok].attr[key]);
       html += key;
       html += "='" + obj[ok].attr[key] + "' ";

    }
    html += "> " + obj[ok].value;
    html += "</" + obj[ok].element + "> ";
  }
  return html;
};


Intro.prototype.renderObject= function(obj){
  // console.log(obj);
  switch(obj.type){
    case 'text':
      this.addText(obj);
      break;
    case 'box':
      this.addBox(obj);
      break;
    case 'ellipse':
      this.addEllipse(obj);
      break;
    case 'circle':
      this.addCircle(obj);
      break;
    case 'button':
      this.addButtonArea(obj);
      break;
    default:
      // do nothing
  }
};



Intro.prototype.breath= function(){
  if(!this.isClicked && ((new Date()).getTime() - this.breathed) > this.breathTime){
    var sRng = (1 - this.defaultScale) * this.activity;
    // var scl = Math.random() * this.activity * (sRng) + 1 - sRng;
    // var pRng = this.rMaj * 0.2 * this.activity;
    // var pos = Math.random() * this.activity * (pRng);
    // var dir = Math.random() * this.activity * 2 * Math.PI;
    // this.btn.position = new PIXI.Point(this.pos.x +
    //   (pos * Math.cos(dir)), this.pos.y + (pos * Math.sin(dir)));
    // var sy = Math.random() * this.activity * (0.5);
    this.btn.scale = new PIXI.Point(this.defaultScale + sRng, this.defaultScale + sRng);
    // this.btn.scale = new PIXI.Point(scl, scl);
    // console.log('breath', s);
    // this.setLevel(l);
    this.breathed = (new Date()).getTime();
  }
  // var l = (this.curLvl + 1) % this.nTxt;
  // this.setLevel(l);
};

module.exports = Intro;

},{"./nzgraphics.js":9}],7:[function(require,module,exports){
/*
 * Client view for the LUX iSwarm
 * @author Anusha Withana wdanusha@gmail.com
 */

// var Light = require('./light.js');
var LightApps = require('./apps.js');
var Geometri = require('./geometri.js');
// var Intro = require('./intro.js');
var Color = require("color");
// var fs = require('fs');

var geometri = new Geometri(nZClient);
// var stage;

$(window).resize(resize);
window.onorientationchange = resize;

document.addEventListener('DOMContentLoaded', start, false);

document.addEventListener('keydown', keyDown);

document['gameParam'] = [];

var interactive = true;

// // Page width and height
var w = 1024;
var h = 768;

//  measure frame rate
var meter;

// Game settings
var gameIndex = 0;
var game = false;

// Apps
var apps;


//  Game parameters
var gameParams = [];


function start() {

  //  Start pixi renderer
  // renderer = PIXI.autoDetectRenderer(w, h);
  // //  Set background
  // var color = Color({r: 255, g: 255, b: 255});
  // //  Make interactive
  // stage = new PIXI.Stage(0x000000, interactive);
  // // Add renderer to the page
  // $("#rendermain").append(renderer.view);

  // loadGames();
  // geometri.resize(apps.appClasses[gameIndex].getUXArea());
  // initGame();
  // game.resize();
  // setupIntro();
  // $('.introbtn').on('click', introNext);
  // game.intro.initStep();

  // // setTimeout(nextObject, 2000);
  // // meter.tick();
  // requestAnimationFrame(update);




  // setupIntro();
  // console.log(game);
  // intro = new Intro(geometri.w, geometri.h, game.intro);
  // intro.initStep();
  // stage.addChild(intro);
}

function loadGames(){
  apps = new LightApps();
  // for(var i=0; i<apps.appList.length; i++){
  //   apps.appList[i].logInfo();
  // }
}

function initGame(){
  if(game)
    game.kill();
  game = new apps.appClasses[gameIndex](stage, geometri);
  // apps.appList[gameIndex].init();
}


function update()
{

  // meter.tick();
  renderer.render(stage);
  game.update();
  geometri.update();
  requestAnimationFrame(update);
}


function keyDown(event){
  console.log("key pressed");
  if(event.keyCode == 37) {
    gameIndex = Math.max(0, --gameIndex);
    console.log('Left was pressed gameIndex: ' + gameIndex);
    initGame();
  }else if(event.keyCode == 39){
    gameIndex = Math.min(apps.appClasses.length - 1, ++gameIndex);
    console.log('Rigt was pressed gameIndex: ' + gameIndex);
    initGame();
  }
}

function resize(event){
  geometri.resize();
  game.resize();
  setupIntro();
}

function setupIntro(){
  // console.log('setupIntro');
  var wd = geometri.strand.le.x - geometri.strand.ls.x -geometri.gap;
  var ht = geometri.strand.ae.y - geometri.strand.as.y -geometri.gap;
  $("#intro").css("left", geometri.strand.ls.x + "px");
  $("#intro").css("width", wd + "px");

}


function introNext(event){
  // console.log(event.target.id);
  $('#intro').hide( "slide", { direction: "left" }, "slow", introHideDone);
}

function introHideDone(event){
  game.intro.initStep();
  // console.log('message');
  // console.log(this);
  // $('#intro').show( "slide", { direction: "right" }, "slow" );
}


},{"./apps.js":1,"./geometri.js":5,"color":12}],8:[function(require,module,exports){
// var Geometri = require('./geometri.js');


function NZButton(x, y, rMin, rMaj, clr, meta){
  this.pos = {
    x: x,
    y: y
  };

  this.rMin = rMin;
  this.rMaj = rMaj;

  this.dotArcs = 6;
  this.dotLvls = clr.length;
  this.nTxtr = 10;

  this.isClicked = false;


  // this.txtr = [];


  // for (var i = 0; i < this.nTxtr; i++) {
  //   this.txtr[i] = this.makeTexturePad(clr, i);
  // }

  // this.minDot = new PIXI.Sprite(Geometri.drawCircleTexture(clr, r));

  this.curLvl = 0;
  this.btn = new PIXI.Sprite(this.makeTexturePad(clr));
  this.btn.interactive = true;
  this.btn.buttonMode = true;
  this.btn.anchor.x = 0.5;
  this.btn.anchor.y = 0.5;
  this.btn.position = this.pos;
  // this.btn.position.y = y;
  this.btn.meta = meta;
  // this.c.i = clr.i;
  //

  this.defaultScale = 0.4;
  this.activity = 0;
  this.unclicked();
  this.breathTime = 200;
  this.breathed = (new Date()).getTime();
}

// NZButton.prototype.makeTexturePad= function(clr, r, level){
//   var g = new PIXI.Graphics();
//   g.lineStyle(0, 0xffffff, 1);
//   g.beginFill(clr[clr.length - 1], 0.6);
//   g.blendMode = PIXI.blendModes.ADD;
//   g.drawCircle(0, 0, r);

//   var rGap = Math.round(((this.rMaj / 2) +
//       (level * this.rMaj / (2 * this.nTxtr))) / this.nTxtr);

//   // var fac = 2;
//   // var bound = ((2 * this.rMaj / 3) + (this.rMaj / 3) *
//   //   (Math.pow(fac, level) / Math.pow(fac, this.nTxtr))) /
//   //   Math.pow(fac, this.dotLvls);


//   // var rGap = Math.round((
//       // (level * 2 * this.rMaj / (3 * this.nTxtr))) / this.nTxtr);


//   var aGap = 2 * Math.PI / this.dotArcs;

//   // console.log(level, rGap, aGap);

//   var t, numJ, a, ci;
//   for (var i = 1; i <= this.dotLvls; i++) {
//     t = rGap * i;
//     // t = bound * Math.pow(fac, i);
//     a = aGap / i;
//     ci = Math.ceil(i * clr.length / this.dotLvls);
//     g.beginFill(clr[clr.length - ci]);
//     numJ = this.dotArcs * i;
//     for (var j = 0; j < numJ; j++) {
//       g.drawCircle(t * Math.sin((j + (i % 2) / 2) * a), t * Math.cos((j + (i % 2) / 2) * a), r);
//     }
//   }

//   g.endFill();
//   return g.generateTexture();
// };


NZButton.prototype.update= function(){
  this.breath();
};

NZButton.prototype.makeTexturePad= function(clr){
  var g = new PIXI.Graphics();
  g.lineStyle(0, 0xffffff, 1);

  var fac = 0.5;
  var facM = Math.pow(10, fac);
  var bound = (this.rMaj) / facM;


  // var rGap = Math.round((
      // (level * 2 * this.rMaj / (3 * this.nTxtr))) / this.nTxtr);


  // var aGap = 2 * Math.PI / this.dotArcs;

  // console.log(level, rGap, aGap);

  var t, lFac, a, ci;
  for (var i = this.dotLvls; i > 0; i--) {
    // t = rGap * i;
    // t = (bound / fac) +
    //   (fac - 1) * bound / Math.pow(fac, this.dotLvls + 1 - i);
    // console.log(i, this.dotLvls + 1 - i, t);
    lFac = Math.pow(i, fac);
    t = bound * lFac;
    // a = aGap / i;
    ci = Math.floor(i * clr.length / this.dotLvls);
    // console.log(i, clr.length, clr.length - ci, 1.2 - lFac / facM);
    g.beginFill(clr[clr.length - ci], 1.2 - lFac / facM);
    // numJ = this.dotArcs * i;
    g.drawCircle(0, 0, t);
    // for (var j = 0; j < numJ; j++) {
    //   g.drawCircle(t * Math.sin((j + (i % 2) / 2) * a), t * Math.cos((j + (i % 2) / 2) * a), r);
    // }
  }

  g.endFill();
  return g.generateTexture();
};


NZButton.prototype.clicked= function(){
  this.isClicked = true;
  this.btn.scale = new PIXI.Point(1, 1);
  // this.setLevel(this.nTxtr - 1);
};

NZButton.prototype.unclicked= function(){
  // this.setLevel(0);
  this.btn.position = this.pos;
  // this.btn.position.y = y;
  this.btn.scale = new PIXI.Point(this.defaultScale, this.defaultScale);
  this.isClicked = false;
};

NZButton.prototype.setLevel= function(lvl){
  this.btn.setTexture(this.txtr[lvl]);
  this.curLvl = lvl;
};

NZButton.prototype.breath= function(){
  if(!this.isClicked && ((new Date()).getTime() - this.breathed) > this.breathTime){
    var sRng = (1 - this.defaultScale) * this.activity;
    // var scl = Math.random() * this.activity * (sRng) + 1 - sRng;
    // var pRng = this.rMaj * 0.2 * this.activity;
    // var pos = Math.random() * this.activity * (pRng);
    // var dir = Math.random() * this.activity * 2 * Math.PI;
    // this.btn.position = new PIXI.Point(this.pos.x +
    //   (pos * Math.cos(dir)), this.pos.y + (pos * Math.sin(dir)));
    // var sy = Math.random() * this.activity * (0.5);
    this.btn.scale = new PIXI.Point(this.defaultScale + sRng, this.defaultScale + sRng);
    // this.btn.scale = new PIXI.Point(scl, scl);
    // console.log('breath', s);
    // this.setLevel(l);
    this.breathed = (new Date()).getTime();
  }
  // var l = (this.curLvl + 1) % this.nTxt;
  // this.setLevel(l);
};

module.exports = NZButton;

},{}],9:[function(require,module,exports){
// var Geometri = require('./geometri.js');


function NZGraphics(){

}


NZGraphics.makeText= function(txt, size, w, clr, algn){
    return new PIXI.Text(txt,
      {font: size + "px Arial", fill: NZGraphics.getColor(clr),
        wordWrap:true, wordWrapWidth:w, align: algn}
    );
};

NZGraphics.makeBox= function(w, h, lw, clrL, aL, clrF, aF){
  var g = this.getGraphics(lw, clrL, aL, clrF, aF);
  g.drawRect(0, 0, w, h);
  g.endFill();
  return new PIXI.Sprite(g.generateTexture());
};

NZGraphics.makeElipse= function(w, h, lw, clrL, aL, clrF, aF){
  var g = this.getGraphics(lw, clrL, aL, clrF, aF);
  g.drawEllipse(0, 0, w, h);
  g.endFill();
  return new PIXI.Sprite(g.generateTexture());
};

NZGraphics.makeCircle= function(r, lw, clrL, aL, clrF, aF){
  var g = this.getGraphics(lw, clrL, aL, clrF, aF);
  g.drawCircle(0, 0, r);
  g.endFill();
  return new PIXI.Sprite(g.generateTexture());
};

NZGraphics.getGraphics = function(lw, clrL, aL, clrF, aF){
  var g = new PIXI.Graphics();
  g.lineStyle(lw, clrL, aL);
  g.beginFill(clrF, aF);
  return g;
};

NZGraphics.getSpriteAnchor= function(alg){
  // console.log(alg);
  var a = [];
  switch(alg.substr(0, 1)){
    case 'l':
      a.x = 0;
      break;
    case 'r':
      a.x = 1;
      break;
    default:
      a.x = 0.5;
      break;
  }
  switch(alg.substr(-1)){
    case 't':
      a.y = 0;
      break;
    case 'b':
      a.y = 1;
      break;
    default:
      a.y = 0.5;
      break;
  }
  return a;
};

NZGraphics.getColor= function(clr){
  return "#" + ("000000" + clr.toString(16)).substr(-6);
};

module.exports = NZGraphics;

},{}],10:[function(require,module,exports){
// var Geometri = require('./geometri.js');


function NZLabels(x, y, act, clr, size, isRighted){
  this.pos = {
    x: x,
    y: y
  };

  this.clr = clr;

  this.dotArcs = 6;
  this.dotLvls = clr.length;
  this.nTxtr = 10;
  this.isRighted = isRighted;



  // this.txtr = [];


  // for (var i = 0; i < this.nTxtr; i++) {
  //   this.txtr[i] = this.makeTexturePad(clr, i);
  // }

  // this.minDot = new PIXI.Sprite(Geometri.drawCircleTexture(clr, r));

  // this.btn.position.y = y;
  // this.btn.meta = meta;
  // this.c.i = clr.i;
  //

  // text etst
  // var color = "#" + ("000000" + this.clr[9].toString(16)).substr(-6);
  // console.log('color', color);
  this.txtArea = new PIXI.Text(this.actToTxt(act),
    {font: size + "px Arial", fill: this.getColor(this.clr[9]),
      align: "center"}
    );

  this.txtArea.position = this.pos;
  if(this.isRighted){
    this.txtArea.anchor.x = 1;
  }else{
    this.txtArea.anchor.x = 0;
  }
  this.txtArea.anchor.y = 0.5;

  this.activity = 0;
  this.breathTime = 200;
  this.breathed = (new Date()).getTime();


}


NZLabels.prototype.update= function(){
  this.breath();
};

NZLabels.prototype.setText= function(act){
  if(this.activity == act)
    return;

  this.txtArea.setText(this.actToTxt(act));
};

NZLabels.prototype.getLeft= function(){
  return this.pos.x - (this.txtArea.anchor.x * this.txtArea.width);
};

NZLabels.prototype.getCenter= function(){
  return {
    x:this.pos.x + 0.5 * (this.txtArea.anchor.x) * this.txtArea.width,
    y:this.pos.y
  };
};


NZLabels.prototype.actToTxt= function(act){
  this.activity = act;
  return Math.round(act * 100) + "%";
};

NZLabels.prototype.getColor= function(clr){
  return "#" + ("000000" + clr.toString(16)).substr(-6);
};

NZLabels.prototype.setLevel= function(lvl){
  this.btn.setTexture(this.txtr[lvl]);
  this.curLvl = lvl;
};

NZLabels.prototype.breath= function(){
  if(!this.isClicked && ((new Date()).getTime() - this.breathed) > this.breathTime){
    var sRng = (1 - this.defaultScale) * this.activity;
    // var scl = Math.random() * this.activity * (sRng) + 1 - sRng;
    // var pRng = this.rMaj * 0.2 * this.activity;
    // var pos = Math.random() * this.activity * (pRng);
    // var dir = Math.random() * this.activity * 2 * Math.PI;
    // this.btn.position = new PIXI.Point(this.pos.x +
    //   (pos * Math.cos(dir)), this.pos.y + (pos * Math.sin(dir)));
    // var sy = Math.random() * this.activity * (0.5);
    this.btn.scale = new PIXI.Point(this.defaultScale + sRng, this.defaultScale + sRng);
    // this.btn.scale = new PIXI.Point(scl, scl);
    // console.log('breath', s);
    // this.setLevel(l);
    this.breathed = (new Date()).getTime();
  }
  // var l = (this.curLvl + 1) % this.nTxt;
  // this.setLevel(l);
};

module.exports = NZLabels;

},{}],11:[function(require,module,exports){
function Pixel(txtr, clr){
  this.g = new PIXI.Sprite(txtr);
  this.g.anchor.x = 0.5;
  this.g.anchor.y = 0.5;
  this.c = {c:clr.c, i:clr.i};
  // temporary holder
  this.tc = {c:clr.c, i:clr.i};
  // this.c.i = clr.i;
}



Pixel.prototype.setSprite= function(sprite){
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  sprite.position = this.g.position;
  this.g = sprite;
};


Pixel.prototype.setTexture= function(txtr){
  this.g.setTexture(txtr);
};

module.exports = Pixel;

},{}],12:[function(require,module,exports){
/* MIT license */
var convert = require("color-convert"),
    string = require("color-string");

var Color = function(obj) {
  if (obj instanceof Color) return obj;
  if (! (this instanceof Color)) return new Color(obj);

   this.values = {
      rgb: [0, 0, 0],
      hsl: [0, 0, 0],
      hsv: [0, 0, 0],
      hwb: [0, 0, 0],
      cmyk: [0, 0, 0, 0],
      alpha: 1
   }

   // parse Color() argument
   if (typeof obj == "string") {
      var vals = string.getRgba(obj);
      if (vals) {
         this.setValues("rgb", vals);
      }
      else if(vals = string.getHsla(obj)) {
         this.setValues("hsl", vals);
      }
      else if(vals = string.getHwb(obj)) {
         this.setValues("hwb", vals);
      }
      else {
        throw new Error("Unable to parse color from string \"" + obj + "\"");
      }
   }
   else if (typeof obj == "object") {
      var vals = obj;
      if(vals["r"] !== undefined || vals["red"] !== undefined) {
         this.setValues("rgb", vals)
      }
      else if(vals["l"] !== undefined || vals["lightness"] !== undefined) {
         this.setValues("hsl", vals)
      }
      else if(vals["v"] !== undefined || vals["value"] !== undefined) {
         this.setValues("hsv", vals)
      }
      else if(vals["w"] !== undefined || vals["whiteness"] !== undefined) {
         this.setValues("hwb", vals)
      }
      else if(vals["c"] !== undefined || vals["cyan"] !== undefined) {
         this.setValues("cmyk", vals)
      }
      else {
        throw new Error("Unable to parse color from object " + JSON.stringify(obj));
      }
   }
}

Color.prototype = {
   rgb: function (vals) {
      return this.setSpace("rgb", arguments);
   },
   hsl: function(vals) {
      return this.setSpace("hsl", arguments);
   },
   hsv: function(vals) {
      return this.setSpace("hsv", arguments);
   },
   hwb: function(vals) {
      return this.setSpace("hwb", arguments);
   },
   cmyk: function(vals) {
      return this.setSpace("cmyk", arguments);
   },

   rgbArray: function() {
      return this.values.rgb;
   },
   hslArray: function() {
      return this.values.hsl;
   },
   hsvArray: function() {
      return this.values.hsv;
   },
   hwbArray: function() {
      if (this.values.alpha !== 1) {
        return this.values.hwb.concat([this.values.alpha])
      }
      return this.values.hwb;
   },
   cmykArray: function() {
      return this.values.cmyk;
   },
   rgbaArray: function() {
      var rgb = this.values.rgb;
      return rgb.concat([this.values.alpha]);
   },
   hslaArray: function() {
      var hsl = this.values.hsl;
      return hsl.concat([this.values.alpha]);
   },
   alpha: function(val) {
      if (val === undefined) {
         return this.values.alpha;
      }
      this.setValues("alpha", val);
      return this;
   },

   red: function(val) {
      return this.setChannel("rgb", 0, val);
   },
   green: function(val) {
      return this.setChannel("rgb", 1, val);
   },
   blue: function(val) {
      return this.setChannel("rgb", 2, val);
   },
   hue: function(val) {
      return this.setChannel("hsl", 0, val);
   },
   saturation: function(val) {
      return this.setChannel("hsl", 1, val);
   },
   lightness: function(val) {
      return this.setChannel("hsl", 2, val);
   },
   saturationv: function(val) {
      return this.setChannel("hsv", 1, val);
   },
   whiteness: function(val) {
      return this.setChannel("hwb", 1, val);
   },
   blackness: function(val) {
      return this.setChannel("hwb", 2, val);
   },
   value: function(val) {
      return this.setChannel("hsv", 2, val);
   },
   cyan: function(val) {
      return this.setChannel("cmyk", 0, val);
   },
   magenta: function(val) {
      return this.setChannel("cmyk", 1, val);
   },
   yellow: function(val) {
      return this.setChannel("cmyk", 2, val);
   },
   black: function(val) {
      return this.setChannel("cmyk", 3, val);
   },

   hexString: function() {
      return string.hexString(this.values.rgb);
   },
   rgbString: function() {
      return string.rgbString(this.values.rgb, this.values.alpha);
   },
   rgbaString: function() {
      return string.rgbaString(this.values.rgb, this.values.alpha);
   },
   percentString: function() {
      return string.percentString(this.values.rgb, this.values.alpha);
   },
   hslString: function() {
      return string.hslString(this.values.hsl, this.values.alpha);
   },
   hslaString: function() {
      return string.hslaString(this.values.hsl, this.values.alpha);
   },
   hwbString: function() {
      return string.hwbString(this.values.hwb, this.values.alpha);
   },
   keyword: function() {
      return string.keyword(this.values.rgb, this.values.alpha);
   },

   rgbNumber: function() {
      return (this.values.rgb[0] << 16) | (this.values.rgb[1] << 8) | this.values.rgb[2];
   },

   luminosity: function() {
      // http://www.w3.org/TR/WCAG20/#relativeluminancedef
      var rgb = this.values.rgb;
      var lum = [];
      for (var i = 0; i < rgb.length; i++) {
         var chan = rgb[i] / 255;
         lum[i] = (chan <= 0.03928) ? chan / 12.92
                  : Math.pow(((chan + 0.055) / 1.055), 2.4)
      }
      return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
   },

   contrast: function(color2) {
      // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
      var lum1 = this.luminosity();
      var lum2 = color2.luminosity();
      if (lum1 > lum2) {
         return (lum1 + 0.05) / (lum2 + 0.05)
      };
      return (lum2 + 0.05) / (lum1 + 0.05);
   },

   level: function(color2) {
     var contrastRatio = this.contrast(color2);
     return (contrastRatio >= 7.1)
       ? 'AAA'
       : (contrastRatio >= 4.5)
        ? 'AA'
        : '';
   },

   dark: function() {
      // YIQ equation from http://24ways.org/2010/calculating-color-contrast
      var rgb = this.values.rgb,
          yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
      return yiq < 128;
   },

   light: function() {
      return !this.dark();
   },

   negate: function() {
      var rgb = []
      for (var i = 0; i < 3; i++) {
         rgb[i] = 255 - this.values.rgb[i];
      }
      this.setValues("rgb", rgb);
      return this;
   },

   lighten: function(ratio) {
      this.values.hsl[2] += this.values.hsl[2] * ratio;
      this.setValues("hsl", this.values.hsl);
      return this;
   },

   darken: function(ratio) {
      this.values.hsl[2] -= this.values.hsl[2] * ratio;
      this.setValues("hsl", this.values.hsl);
      return this;
   },

   saturate: function(ratio) {
      this.values.hsl[1] += this.values.hsl[1] * ratio;
      this.setValues("hsl", this.values.hsl);
      return this;
   },

   desaturate: function(ratio) {
      this.values.hsl[1] -= this.values.hsl[1] * ratio;
      this.setValues("hsl", this.values.hsl);
      return this;
   },

   whiten: function(ratio) {
      this.values.hwb[1] += this.values.hwb[1] * ratio;
      this.setValues("hwb", this.values.hwb);
      return this;
   },

   blacken: function(ratio) {
      this.values.hwb[2] += this.values.hwb[2] * ratio;
      this.setValues("hwb", this.values.hwb);
      return this;
   },

   greyscale: function() {
      var rgb = this.values.rgb;
      // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
      var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
      this.setValues("rgb", [val, val, val]);
      return this;
   },

   clearer: function(ratio) {
      this.setValues("alpha", this.values.alpha - (this.values.alpha * ratio));
      return this;
   },

   opaquer: function(ratio) {
      this.setValues("alpha", this.values.alpha + (this.values.alpha * ratio));
      return this;
   },

   rotate: function(degrees) {
      var hue = this.values.hsl[0];
      hue = (hue + degrees) % 360;
      hue = hue < 0 ? 360 + hue : hue;
      this.values.hsl[0] = hue;
      this.setValues("hsl", this.values.hsl);
      return this;
   },

   mix: function(color2, weight) {
      weight = 1 - (weight == null ? 0.5 : weight);

      // algorithm from Sass's mix(). Ratio of first color in mix is
      // determined by the alphas of both colors and the weight
      var t1 = weight * 2 - 1,
          d = this.alpha() - color2.alpha();

      var weight1 = (((t1 * d == -1) ? t1 : (t1 + d) / (1 + t1 * d)) + 1) / 2;
      var weight2 = 1 - weight1;

      var rgb = this.rgbArray();
      var rgb2 = color2.rgbArray();

      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = rgb[i] * weight1 + rgb2[i] * weight2;
      }
      this.setValues("rgb", rgb);

      var alpha = this.alpha() * weight + color2.alpha() * (1 - weight);
      this.setValues("alpha", alpha);

      return this;
   },

   toJSON: function() {
     return this.rgb();
   },

   clone: function() {
     return new Color(this.rgb());
   }
}


Color.prototype.getValues = function(space) {
   var vals = {};
   for (var i = 0; i < space.length; i++) {
      vals[space.charAt(i)] = this.values[space][i];
   }
   if (this.values.alpha != 1) {
      vals["a"] = this.values.alpha;
   }
   // {r: 255, g: 255, b: 255, a: 0.4}
   return vals;
}

Color.prototype.setValues = function(space, vals) {
   var spaces = {
      "rgb": ["red", "green", "blue"],
      "hsl": ["hue", "saturation", "lightness"],
      "hsv": ["hue", "saturation", "value"],
      "hwb": ["hue", "whiteness", "blackness"],
      "cmyk": ["cyan", "magenta", "yellow", "black"]
   };

   var maxes = {
      "rgb": [255, 255, 255],
      "hsl": [360, 100, 100],
      "hsv": [360, 100, 100],
      "hwb": [360, 100, 100],
      "cmyk": [100, 100, 100, 100]
   };

   var alpha = 1;
   if (space == "alpha") {
      alpha = vals;
   }
   else if (vals.length) {
      // [10, 10, 10]
      this.values[space] = vals.slice(0, space.length);
      alpha = vals[space.length];
   }
   else if (vals[space.charAt(0)] !== undefined) {
      // {r: 10, g: 10, b: 10}
      for (var i = 0; i < space.length; i++) {
        this.values[space][i] = vals[space.charAt(i)];
      }
      alpha = vals.a;
   }
   else if (vals[spaces[space][0]] !== undefined) {
      // {red: 10, green: 10, blue: 10}
      var chans = spaces[space];
      for (var i = 0; i < space.length; i++) {
        this.values[space][i] = vals[chans[i]];
      }
      alpha = vals.alpha;
   }
   this.values.alpha = Math.max(0, Math.min(1, (alpha !== undefined ? alpha : this.values.alpha) ));
   if (space == "alpha") {
      return;
   }

   // cap values of the space prior converting all values
   for (var i = 0; i < space.length; i++) {
      var capped = Math.max(0, Math.min(maxes[space][i], this.values[space][i]));
      this.values[space][i] = Math.round(capped);
   }

   // convert to all the other color spaces
   for (var sname in spaces) {
      if (sname != space) {
         this.values[sname] = convert[space][sname](this.values[space])
      }

      // cap values
      for (var i = 0; i < sname.length; i++) {
         var capped = Math.max(0, Math.min(maxes[sname][i], this.values[sname][i]));
         this.values[sname][i] = Math.round(capped);
      }
   }
   return true;
}

Color.prototype.setSpace = function(space, args) {
   var vals = args[0];
   if (vals === undefined) {
      // color.rgb()
      return this.getValues(space);
   }
   // color.rgb(10, 10, 10)
   if (typeof vals == "number") {
      vals = Array.prototype.slice.call(args);
   }
   this.setValues(space, vals);
   return this;
}

Color.prototype.setChannel = function(space, index, val) {
   if (val === undefined) {
      // color.red()
      return this.values[space][index];
   }
   // color.red(100)
   this.values[space][index] = val;
   this.setValues(space, this.values[space]);
   return this;
}

module.exports = Color;

},{"color-convert":14,"color-string":15}],13:[function(require,module,exports){
/* MIT license */

module.exports = {
  rgb2hsl: rgb2hsl,
  rgb2hsv: rgb2hsv,
  rgb2hwb: rgb2hwb,
  rgb2cmyk: rgb2cmyk,
  rgb2keyword: rgb2keyword,
  rgb2xyz: rgb2xyz,
  rgb2lab: rgb2lab,
  rgb2lch: rgb2lch,

  hsl2rgb: hsl2rgb,
  hsl2hsv: hsl2hsv,
  hsl2hwb: hsl2hwb,
  hsl2cmyk: hsl2cmyk,
  hsl2keyword: hsl2keyword,

  hsv2rgb: hsv2rgb,
  hsv2hsl: hsv2hsl,
  hsv2hwb: hsv2hwb,
  hsv2cmyk: hsv2cmyk,
  hsv2keyword: hsv2keyword,

  hwb2rgb: hwb2rgb,
  hwb2hsl: hwb2hsl,
  hwb2hsv: hwb2hsv,
  hwb2cmyk: hwb2cmyk,
  hwb2keyword: hwb2keyword,

  cmyk2rgb: cmyk2rgb,
  cmyk2hsl: cmyk2hsl,
  cmyk2hsv: cmyk2hsv,
  cmyk2hwb: cmyk2hwb,
  cmyk2keyword: cmyk2keyword,

  keyword2rgb: keyword2rgb,
  keyword2hsl: keyword2hsl,
  keyword2hsv: keyword2hsv,
  keyword2hwb: keyword2hwb,
  keyword2cmyk: keyword2cmyk,
  keyword2lab: keyword2lab,
  keyword2xyz: keyword2xyz,

  xyz2rgb: xyz2rgb,
  xyz2lab: xyz2lab,
  xyz2lch: xyz2lch,

  lab2xyz: lab2xyz,
  lab2rgb: lab2rgb,
  lab2lch: lab2lch,

  lch2lab: lch2lab,
  lch2xyz: lch2xyz,
  lch2rgb: lch2rgb
}


function rgb2hsl(rgb) {
  var r = rgb[0]/255,
      g = rgb[1]/255,
      b = rgb[2]/255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, l;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g)/ delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  l = (min + max) / 2;

  if (max == min)
    s = 0;
  else if (l <= 0.5)
    s = delta / (max + min);
  else
    s = delta / (2 - max - min);

  return [h, s * 100, l * 100];
}

function rgb2hsv(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, v;

  if (max == 0)
    s = 0;
  else
    s = (delta/max * 1000)/10;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g) / delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  v = ((max / 255) * 1000) / 10;

  return [h, s, v];
}

function rgb2hwb(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      h = rgb2hsl(rgb)[0],
      w = 1/255 * Math.min(r, Math.min(g, b)),
      b = 1 - 1/255 * Math.max(r, Math.max(g, b));

  return [h, w * 100, b * 100];
}

function rgb2cmyk(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      c, m, y, k;

  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
}

function rgb2keyword(rgb) {
  return reverseKeywords[JSON.stringify(rgb)];
}

function rgb2xyz(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}

function rgb2lab(rgb) {
  var xyz = rgb2xyz(rgb),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function rgb2lch(args) {
  return lab2lch(rgb2lab(args));
}

function hsl2rgb(hsl) {
  var h = hsl[0] / 360,
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      t1, t2, t3, rgb, val;

  if (s == 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5)
    t2 = l * (1 + s);
  else
    t2 = l + s - l * s;
  t1 = 2 * l - t2;

  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * - (i - 1);
    t3 < 0 && t3++;
    t3 > 1 && t3--;

    if (6 * t3 < 1)
      val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1)
      val = t2;
    else if (3 * t3 < 2)
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else
      val = t1;

    rgb[i] = val * 255;
  }

  return rgb;
}

function hsl2hsv(hsl) {
  var h = hsl[0],
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      sv, v;

  if(l === 0) {
      // no need to do calc on black
      // also avoids divide by 0 error
      return [0, 0, 0];
  }

  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  sv = (2 * s) / (l + s);
  return [h, sv * 100, v * 100];
}

function hsl2hwb(args) {
  return rgb2hwb(hsl2rgb(args));
}

function hsl2cmyk(args) {
  return rgb2cmyk(hsl2rgb(args));
}

function hsl2keyword(args) {
  return rgb2keyword(hsl2rgb(args));
}


function hsv2rgb(hsv) {
  var h = hsv[0] / 60,
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      hi = Math.floor(h) % 6;

  var f = h - Math.floor(h),
      p = 255 * v * (1 - s),
      q = 255 * v * (1 - (s * f)),
      t = 255 * v * (1 - (s * (1 - f))),
      v = 255 * v;

  switch(hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
}

function hsv2hsl(hsv) {
  var h = hsv[0],
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      sl, l;

  l = (2 - s) * v;
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function hsv2hwb(args) {
  return rgb2hwb(hsv2rgb(args))
}

function hsv2cmyk(args) {
  return rgb2cmyk(hsv2rgb(args));
}

function hsv2keyword(args) {
  return rgb2keyword(hsv2rgb(args));
}

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
function hwb2rgb(hwb) {
  var h = hwb[0] / 360,
      wh = hwb[1] / 100,
      bl = hwb[2] / 100,
      ratio = wh + bl,
      i, v, f, n;

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;
  if ((i & 0x01) != 0) {
    f = 1 - f;
  }
  n = wh + f * (v - wh);  // linear interpolation

  switch (i) {
    default:
    case 6:
    case 0: r = v; g = n; b = wh; break;
    case 1: r = n; g = v; b = wh; break;
    case 2: r = wh; g = v; b = n; break;
    case 3: r = wh; g = n; b = v; break;
    case 4: r = n; g = wh; b = v; break;
    case 5: r = v; g = wh; b = n; break;
  }

  return [r * 255, g * 255, b * 255];
}

function hwb2hsl(args) {
  return rgb2hsl(hwb2rgb(args));
}

function hwb2hsv(args) {
  return rgb2hsv(hwb2rgb(args));
}

function hwb2cmyk(args) {
  return rgb2cmyk(hwb2rgb(args));
}

function hwb2keyword(args) {
  return rgb2keyword(hwb2rgb(args));
}

function cmyk2rgb(cmyk) {
  var c = cmyk[0] / 100,
      m = cmyk[1] / 100,
      y = cmyk[2] / 100,
      k = cmyk[3] / 100,
      r, g, b;

  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
}

function cmyk2hsl(args) {
  return rgb2hsl(cmyk2rgb(args));
}

function cmyk2hsv(args) {
  return rgb2hsv(cmyk2rgb(args));
}

function cmyk2hwb(args) {
  return rgb2hwb(cmyk2rgb(args));
}

function cmyk2keyword(args) {
  return rgb2keyword(cmyk2rgb(args));
}


function xyz2rgb(xyz) {
  var x = xyz[0] / 100,
      y = xyz[1] / 100,
      z = xyz[2] / 100,
      r, g, b;

  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r = (r * 12.92);

  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g = (g * 12.92);

  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b = (b * 12.92);

  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);

  return [r * 255, g * 255, b * 255];
}

function xyz2lab(xyz) {
  var x = xyz[0],
      y = xyz[1],
      z = xyz[2],
      l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function xyz2lch(args) {
  return lab2lch(xyz2lab(args));
}

function lab2xyz(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      x, y, z, y2;

  if (l <= 8) {
    y = (l * 100) / 903.3;
    y2 = (7.787 * (y / 100)) + (16 / 116);
  } else {
    y = 100 * Math.pow((l + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1/3);
  }

  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);

  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);

  return [x, y, z];
}

function lab2lch(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      hr, h, c;

  hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  c = Math.sqrt(a * a + b * b);
  return [l, c, h];
}

function lab2rgb(args) {
  return xyz2rgb(lab2xyz(args));
}

function lch2lab(lch) {
  var l = lch[0],
      c = lch[1],
      h = lch[2],
      a, b, hr;

  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
}

function lch2xyz(args) {
  return lab2xyz(lch2lab(args));
}

function lch2rgb(args) {
  return lab2rgb(lch2lab(args));
}

function keyword2rgb(keyword) {
  return cssKeywords[keyword];
}

function keyword2hsl(args) {
  return rgb2hsl(keyword2rgb(args));
}

function keyword2hsv(args) {
  return rgb2hsv(keyword2rgb(args));
}

function keyword2hwb(args) {
  return rgb2hwb(keyword2rgb(args));
}

function keyword2cmyk(args) {
  return rgb2cmyk(keyword2rgb(args));
}

function keyword2lab(args) {
  return rgb2lab(keyword2rgb(args));
}

function keyword2xyz(args) {
  return rgb2xyz(keyword2rgb(args));
}

var cssKeywords = {
  aliceblue:  [240,248,255],
  antiquewhite: [250,235,215],
  aqua: [0,255,255],
  aquamarine: [127,255,212],
  azure:  [240,255,255],
  beige:  [245,245,220],
  bisque: [255,228,196],
  black:  [0,0,0],
  blanchedalmond: [255,235,205],
  blue: [0,0,255],
  blueviolet: [138,43,226],
  brown:  [165,42,42],
  burlywood:  [222,184,135],
  cadetblue:  [95,158,160],
  chartreuse: [127,255,0],
  chocolate:  [210,105,30],
  coral:  [255,127,80],
  cornflowerblue: [100,149,237],
  cornsilk: [255,248,220],
  crimson:  [220,20,60],
  cyan: [0,255,255],
  darkblue: [0,0,139],
  darkcyan: [0,139,139],
  darkgoldenrod:  [184,134,11],
  darkgray: [169,169,169],
  darkgreen:  [0,100,0],
  darkgrey: [169,169,169],
  darkkhaki:  [189,183,107],
  darkmagenta:  [139,0,139],
  darkolivegreen: [85,107,47],
  darkorange: [255,140,0],
  darkorchid: [153,50,204],
  darkred:  [139,0,0],
  darksalmon: [233,150,122],
  darkseagreen: [143,188,143],
  darkslateblue:  [72,61,139],
  darkslategray:  [47,79,79],
  darkslategrey:  [47,79,79],
  darkturquoise:  [0,206,209],
  darkviolet: [148,0,211],
  deeppink: [255,20,147],
  deepskyblue:  [0,191,255],
  dimgray:  [105,105,105],
  dimgrey:  [105,105,105],
  dodgerblue: [30,144,255],
  firebrick:  [178,34,34],
  floralwhite:  [255,250,240],
  forestgreen:  [34,139,34],
  fuchsia:  [255,0,255],
  gainsboro:  [220,220,220],
  ghostwhite: [248,248,255],
  gold: [255,215,0],
  goldenrod:  [218,165,32],
  gray: [128,128,128],
  green:  [0,128,0],
  greenyellow:  [173,255,47],
  grey: [128,128,128],
  honeydew: [240,255,240],
  hotpink:  [255,105,180],
  indianred:  [205,92,92],
  indigo: [75,0,130],
  ivory:  [255,255,240],
  khaki:  [240,230,140],
  lavender: [230,230,250],
  lavenderblush:  [255,240,245],
  lawngreen:  [124,252,0],
  lemonchiffon: [255,250,205],
  lightblue:  [173,216,230],
  lightcoral: [240,128,128],
  lightcyan:  [224,255,255],
  lightgoldenrodyellow: [250,250,210],
  lightgray:  [211,211,211],
  lightgreen: [144,238,144],
  lightgrey:  [211,211,211],
  lightpink:  [255,182,193],
  lightsalmon:  [255,160,122],
  lightseagreen:  [32,178,170],
  lightskyblue: [135,206,250],
  lightslategray: [119,136,153],
  lightslategrey: [119,136,153],
  lightsteelblue: [176,196,222],
  lightyellow:  [255,255,224],
  lime: [0,255,0],
  limegreen:  [50,205,50],
  linen:  [250,240,230],
  magenta:  [255,0,255],
  maroon: [128,0,0],
  mediumaquamarine: [102,205,170],
  mediumblue: [0,0,205],
  mediumorchid: [186,85,211],
  mediumpurple: [147,112,219],
  mediumseagreen: [60,179,113],
  mediumslateblue:  [123,104,238],
  mediumspringgreen:  [0,250,154],
  mediumturquoise:  [72,209,204],
  mediumvioletred:  [199,21,133],
  midnightblue: [25,25,112],
  mintcream:  [245,255,250],
  mistyrose:  [255,228,225],
  moccasin: [255,228,181],
  navajowhite:  [255,222,173],
  navy: [0,0,128],
  oldlace:  [253,245,230],
  olive:  [128,128,0],
  olivedrab:  [107,142,35],
  orange: [255,165,0],
  orangered:  [255,69,0],
  orchid: [218,112,214],
  palegoldenrod:  [238,232,170],
  palegreen:  [152,251,152],
  paleturquoise:  [175,238,238],
  palevioletred:  [219,112,147],
  papayawhip: [255,239,213],
  peachpuff:  [255,218,185],
  peru: [205,133,63],
  pink: [255,192,203],
  plum: [221,160,221],
  powderblue: [176,224,230],
  purple: [128,0,128],
  rebeccapurple: [102, 51, 153],
  red:  [255,0,0],
  rosybrown:  [188,143,143],
  royalblue:  [65,105,225],
  saddlebrown:  [139,69,19],
  salmon: [250,128,114],
  sandybrown: [244,164,96],
  seagreen: [46,139,87],
  seashell: [255,245,238],
  sienna: [160,82,45],
  silver: [192,192,192],
  skyblue:  [135,206,235],
  slateblue:  [106,90,205],
  slategray:  [112,128,144],
  slategrey:  [112,128,144],
  snow: [255,250,250],
  springgreen:  [0,255,127],
  steelblue:  [70,130,180],
  tan:  [210,180,140],
  teal: [0,128,128],
  thistle:  [216,191,216],
  tomato: [255,99,71],
  turquoise:  [64,224,208],
  violet: [238,130,238],
  wheat:  [245,222,179],
  white:  [255,255,255],
  whitesmoke: [245,245,245],
  yellow: [255,255,0],
  yellowgreen:  [154,205,50]
};

var reverseKeywords = {};
for (var key in cssKeywords) {
  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
}

},{}],14:[function(require,module,exports){
var conversions = require("./conversions");

var convert = function() {
   return new Converter();
}

for (var func in conversions) {
  // export Raw versions
  convert[func + "Raw"] =  (function(func) {
    // accept array or plain args
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      return conversions[func](arg);
    }
  })(func);

  var pair = /(\w+)2(\w+)/.exec(func),
      from = pair[1],
      to = pair[2];

  // export rgb2hsl and ["rgb"]["hsl"]
  convert[from] = convert[from] || {};

  convert[from][to] = convert[func] = (function(func) { 
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      
      var val = conversions[func](arg);
      if (typeof val == "string" || val === undefined)
        return val; // keyword

      for (var i = 0; i < val.length; i++)
        val[i] = Math.round(val[i]);
      return val;
    }
  })(func);
}


/* Converter does lazy conversion and caching */
var Converter = function() {
   this.convs = {};
};

/* Either get the values for a space or
  set the values for a space, depending on args */
Converter.prototype.routeSpace = function(space, args) {
   var values = args[0];
   if (values === undefined) {
      // color.rgb()
      return this.getValues(space);
   }
   // color.rgb(10, 10, 10)
   if (typeof values == "number") {
      values = Array.prototype.slice.call(args);        
   }

   return this.setValues(space, values);
};
  
/* Set the values for a space, invalidating cache */
Converter.prototype.setValues = function(space, values) {
   this.space = space;
   this.convs = {};
   this.convs[space] = values;
   return this;
};

/* Get the values for a space. If there's already
  a conversion for the space, fetch it, otherwise
  compute it */
Converter.prototype.getValues = function(space) {
   var vals = this.convs[space];
   if (!vals) {
      var fspace = this.space,
          from = this.convs[fspace];
      vals = convert[fspace][space](from);

      this.convs[space] = vals;
   }
  return vals;
};

["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
   Converter.prototype[space] = function(vals) {
      return this.routeSpace(space, arguments);
   }
});

module.exports = convert;
},{"./conversions":13}],15:[function(require,module,exports){
/* MIT license */
var colorNames = require('color-name');

module.exports = {
   getRgba: getRgba,
   getHsla: getHsla,
   getRgb: getRgb,
   getHsl: getHsl,
   getHwb: getHwb,
   getAlpha: getAlpha,

   hexString: hexString,
   rgbString: rgbString,
   rgbaString: rgbaString,
   percentString: percentString,
   percentaString: percentaString,
   hslString: hslString,
   hslaString: hslaString,
   hwbString: hwbString,
   keyword: keyword
}

function getRgba(string) {
   if (!string) {
      return;
   }
   var abbr =  /^#([a-fA-F0-9]{3})$/,
       hex =  /^#([a-fA-F0-9]{6})$/,
       rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
       per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
       keyword = /(\D+)/;

   var rgb = [0, 0, 0],
       a = 1,
       match = string.match(abbr);
   if (match) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i] + match[i], 16);
      }
   }
   else if (match = string.match(hex)) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
      }
   }
   else if (match = string.match(rgba)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i + 1]);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(per)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(keyword)) {
      if (match[1] == "transparent") {
         return [0, 0, 0, 0];
      }
      rgb = colorNames[match[1]];
      if (!rgb) {
         return;
      }
   }

   for (var i = 0; i < rgb.length; i++) {
      rgb[i] = scale(rgb[i], 0, 255);
   }
   if (!a && a != 0) {
      a = 1;
   }
   else {
      a = scale(a, 0, 1);
   }
   rgb[3] = a;
   return rgb;
}

function getHsla(string) {
   if (!string) {
      return;
   }
   var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hsl);
   if (match) {
      var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
          s = scale(parseFloat(match[2]), 0, 100),
          l = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, s, l, a];
   }
}

function getHwb(string) {
   if (!string) {
      return;
   }
   var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hwb);
   if (match) {
    var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
          w = scale(parseFloat(match[2]), 0, 100),
          b = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, w, b, a];
   }
}

function getRgb(string) {
   var rgba = getRgba(string);
   return rgba && rgba.slice(0, 3);
}

function getHsl(string) {
  var hsla = getHsla(string);
  return hsla && hsla.slice(0, 3);
}

function getAlpha(string) {
   var vals = getRgba(string);
   if (vals) {
      return vals[3];
   }
   else if (vals = getHsla(string)) {
      return vals[3];
   }
   else if (vals = getHwb(string)) {
      return vals[3];
   }
}

// generators
function hexString(rgb) {
   return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1])
              + hexDouble(rgb[2]);
}

function rgbString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return rgbaString(rgba, alpha);
   }
   return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
}

function rgbaString(rgba, alpha) {
   if (alpha === undefined) {
      alpha = (rgba[3] !== undefined ? rgba[3] : 1);
   }
   return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2]
           + ", " + alpha + ")";
}

function percentString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return percentaString(rgba, alpha);
   }
   var r = Math.round(rgba[0]/255 * 100),
       g = Math.round(rgba[1]/255 * 100),
       b = Math.round(rgba[2]/255 * 100);

   return "rgb(" + r + "%, " + g + "%, " + b + "%)";
}

function percentaString(rgba, alpha) {
   var r = Math.round(rgba[0]/255 * 100),
       g = Math.round(rgba[1]/255 * 100),
       b = Math.round(rgba[2]/255 * 100);
   return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
}

function hslString(hsla, alpha) {
   if (alpha < 1 || (hsla[3] && hsla[3] < 1)) {
      return hslaString(hsla, alpha);
   }
   return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
}

function hslaString(hsla, alpha) {
   if (alpha === undefined) {
      alpha = (hsla[3] !== undefined ? hsla[3] : 1);
   }
   return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, "
           + alpha + ")";
}

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
function hwbString(hwb, alpha) {
   if (alpha === undefined) {
      alpha = (hwb[3] !== undefined ? hwb[3] : 1);
   }
   return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%"
           + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
}

function keyword(rgb) {
  return reverseNames[rgb.slice(0, 3)];
}

// helpers
function scale(num, min, max) {
   return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
  var str = num.toString(16).toUpperCase();
  return (str.length < 2) ? "0" + str : str;
}


//create a list of reverse color names
var reverseNames = {};
for (var name in colorNames) {
   reverseNames[colorNames[name]] = name;
}

},{"color-name":16}],16:[function(require,module,exports){
module.exports={
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
}
},{}]},{},[7]);
