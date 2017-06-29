#!/usr/bin/env node
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./led_orig.json', 'utf8'));
console.log(obj.length);
console.log(obj[0].length);
console.log(Object.keys(obj[0]).length);

var w = Object.keys(obj[0]).length;
var h = obj.length;
// fs.readFile('./led_orig.json', function (err, data) {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// });

var lights = [];

for(var i = 0; i < h; i++){
  lights[i] = [];
  for(var j = 0; j < w; j++){
    lights[i][j] = {
      'district': obj[i]['FIELD' + (j + 1)],
      'pt': {
        'x': j,
        'y': i
      }
    };
  }
}

console.log(lights);

var data = "window.lightJS = " + JSON.stringify(lights) + ";";

fs.writeFileSync('../public/javascripts/led.js', data, ['utf8', 'w']);
