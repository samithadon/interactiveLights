#!/usr/bin/env node

var Svg = require('svgutils').Svg;
var _   = require('underscore');

var lightGrid = {
  "width": 44,
  "height": 26
};

console.log(lightGrid);

Svg.fromSvgDocument('pcsm.svg', function(err, svg){
  if(err){
      throw new Error('SVG file not found or invalid');
  }

  // applyMatrixAndSave(svg);
  ungroupAndAddID(svg);

  // transform="translate(0,-244)">
  // var matrix = new Svg.Matrix(1, 0, 0, 1, 0, 52);

});

ungroupAndAddID = function(svg){
  _.each(svg.elements, function (g) {
    if(g.childs[0] && g.childs[0].type === 'polygon'){
      console.log(g.childs[0].id);
    }
  });
};

applyMatrixAndSave = function(svg){
  svg.applyMatrix(null, function(newSvg){
      newSvg.save({ output : 'pcsm.svg' }, function(err, filename){
        if(err){
            console.log(err);
        }
    });
  });
};
