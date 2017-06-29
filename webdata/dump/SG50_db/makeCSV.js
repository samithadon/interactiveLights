#!/usr/bin/env node
// var fs = require('fs'), readline = require('readline');
// var json = fs.readFileSync('./messages.json', 'utf8');
// console.log(json);


var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('./messages.json'),
    output: process.stdout,
    terminal: false
});

var l =0;
var csvline =  "number, postalcode, district, msg\n";
fs.writeFileSync('./messages.csv', csvline, ['utf8']);
rd.on('line', function(line) {
    l++;
    console.log("LINE- "  + l + " : ");
    var obj = JSON.parse(line);
    obj.msg = obj.msg.replace(/\r\n/g, "</br>");
    obj.msg = obj.msg.replace(/\r/g, "</br>");
    obj.msg = obj.msg.replace(/\n/g, "</br>");
    csvline =l + ", " + obj.postalcode + ", " + obj.district + ", \"" + obj.msg + "\"\n";
    fs.appendFileSync('./messages.csv', csvline, ['utf8']);
    console.log(csvline);
});

// var obj = JSON.parse();
// console.log(obj.length);
// console.log(obj[0].length);
// console.log(Object.keys(obj[0]).length);

// var w = Object.keys(obj[0]).length;
// var h = obj.length;
// // fs.readFile('./led_orig.json', function (err, data) {
// //   if (err) {
// //     throw err;
// //   }
// //   console.log(data);
// // });

// var lights = [];

// for(var i = 0; i < h; i++){
//   lights[i] = [];
//   for(var j = 0; j < w; j++){
//     lights[i][j] = {
//       'district': obj[i]['FIELD' + (j + 1)],
//       'pt': {
//         'x': j,
//         'y': i
//       }
//     };
//   }
// }

// console.log(lights);

// var data = "window.lightJS = " + JSON.stringify(lights) + ";";

// fs.writeFileSync('../public/javascripts/led.js', data, ['utf8', 'w']);
