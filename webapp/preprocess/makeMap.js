#!/usr/bin/env node

// var fs = require('fs'),
//  PNG = require('pngjs').PNG;

// // var myImage = new Image();
// //

// var myimage = new PNG('border.png');

// console.log(myimage.width);
// console.log(myimage.height);

// fs.readFile('border.jpg', function(err, data) {
//   console.log(data);
// });
//
//
var fs = require('fs'),
    PNG = require('pngjs').PNG;

var lightGrid = {
  "width": 52,
  "height": 30
};

var borders = [];


var png = new PNG({
        filterType: -1
    }),
    src = fs.createReadStream('border.png');

drawBorders = function(){
  for(var i = borders.length - 1; i >= 0 ; i--){
    var j = 0;
    var line = "";
    while(j < borders[i].s){
      line += " ";
      j++;
    }
    while(j < borders[i].e){
      line += "0";
      j++;
    }
    while(j < lightGrid.width){
      line += " ";
      j++;
    }

    console.log(line);

  }
};

getBorders = function(){
  var dw = Math.round(this.width / (lightGrid.width + 2));
  var dh = Math.round(this.height / (lightGrid.height + 2));

  // console.log("w : " + dw);
  // console.log("h : " + dh);

  // find the row borders
  for(var i=0; i < lightGrid.height; i++){
    borders[i] = {"s": 0, "e": 0};
    var y = (i + 1) * dh;
    var idx = 0;
    var j = 0;
    for(j=0; j < this.width; j++){
      idx = ((y * this.width) + j) * 4;
      if(this.data[idx + 3] > 0){
        // console.log(idx);
        // console.log("S: " + i + " , " + Math.round(j / dw)  + " : " + this.data[idx + 3]);
        borders[i].s = Math.round(j / dw);
        break;
      }
    }
    for(j=this.width - 1; j >= 0 ; j--){
      idx = ((y * this.width) + j) * 4;
      if(this.data[idx + 3] > 0){
        // console.log(idx);
        // console.log("E: " + i + " , " + Math.round(j / dw)  + " : " + this.data[idx + 3]);
        borders[i].e = Math.round(j / dw);
        break;
      }
    }
  }

  var strJson = JSON.stringify(borders, null, 2);
  fs.writeFileSync("borders.json",strJson);

  drawBorders();

};

png.on('parsed', getBorders);

src.pipe(png);
