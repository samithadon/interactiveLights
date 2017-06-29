/**
 * Geometry class for SonicSG
 * Degines all the dimensions and arrays, length
 * @author: Anusha Withana
 */

// Constructor
function SSGGeom(){
}

// SG borders in long,lat
SSGGeom.sgb = {
  't': 1.469656,
  'b': 1.239866,
  'l': 103.606088,
  'r': 104.032235
};

SSGGeom.googleRestoRatio = function(res){
  var r = {x: 0, y: 0};
  // console.log("---------------");
  r.x = (res.geometry.location.lng() - SSGGeom.sgb.l) * 100 / (SSGGeom.sgb.r - SSGGeom.sgb.l);
  r.y = (res.geometry.location.lat() - SSGGeom.sgb.b) * 100 / (SSGGeom.sgb.t - SSGGeom.sgb.b);
  // console.log(res);
  // console.log(r);
  // console.log("---------------");
  return r;
};



module.exports = SSGGeom;
