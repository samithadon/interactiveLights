/**
 * Geometry class for SonicSG
 * Degines all the dimensions and arrays, length
 * @author: Anusha Withana
 */

// Constructor
function SSGPostalCodes(){
}

// SG postal codes to district
SSGPostalCodes.codes = [
// 01, 02, 03, 04, 05, 06
1,1,1,1,1,1,
// 07, 08
2,2,
// 14,15, 16
3,3,3,
// 09, 10
4,4,
// 11, 12, 13
5,5,5,
// 17
6,
// 18, 19
7,7,
// 20, 21
8,8,
// 22, 23
9,9,
// 24, 25, 26, 27
10,10,10,10,
// 28, 29, 30
11,11,11,
// 31, 32, 33
12,12,12,
// 34, 35, 36, 37
13,13,13,13,
// 38, 39, 40, 41
14,14,14,14,
// 42, 43, 44, 45
15,15,15,15,
// 46, 47, 48
16,16,16,
// 49, 50, 81
17,17,17,
// 51, 52
18,18,
// 53, 54, 55, 82
19,19,19,19,
// 56, 57
20,20,
// 58, 59
21,21,
// 60, 61, 62, 63, 64
22,22,22,22,22,
// 65, 66, 67, 68
23,23,23,23,
// 69, 70, 71
24,24,24,
// 72, 73
25,25,
// 77, 78
26,26,
// 75, 76
27,27,
// 79, 80
28,28
];


// SG distrcts and names
SSGPostalCodes.dstrcts = [
  {name: null}, // no district 0
  {name: 'Raffles Place, Cecil, Marina, People\'s Park'},
  {name: 'Anson, Tanjong Pagar'},
  {name: 'Queenstown, Tiong Bahru'},
  {name: 'Telok Blangah, Harbourfront'},
  {name: 'Pasir Panjang, Hong Leong Garden, Clementi New Town'},
  {name: 'High Street, Beach Road (part)'},
  {name: 'Middle Road, Golden Mile'},
  {name: 'Little India'},
  {name: 'Orchard, Cairnhill, River Valley'},
  {name: 'Ardmore, Bukit Timah, Holland Road, Tanglin'},
  {name: 'Watten Estate, Novena, Thomson'},
  {name: 'Balestier, Toa Payoh, Serangoon'},
  {name: 'Macpherson, Braddell'},
  {name: 'Geylang, Eunos'},
  {name: 'Katong, Joo Chiat, Amber Road'},
  {name: 'Bedok, Upper East Coast, Eastwood, Kew Drive'},
  {name: 'Loyang, Changi'},
  {name: 'Tampines, Pasir Ris'},
  {name: 'Serangoon Garden, Hougang, Ponggol'},
  {name: 'Bishan, Ang Mo Kio'},
  {name: 'Upper Bukit Timah, Clementi Park, Ulu Pandan'},
  {name: 'Jurong'},
  {name: 'Hillview, Dairy Farm, Bukit Panjang, Choa Chu Kang'},
  {name: 'Lim Chu Kang, Tengah'},
  {name: 'Kranji, Woodgrove'},
  {name: 'Upper Thomson, Springleaf'},
  {name: 'Yishun, Sembawang'},
  {name: 'Seletar'}
];

SSGPostalCodes.getDistrictByCode = function(code){
  var r = {code: 0, district: 0, name: ''};
  var plid = Math.floor(code / 10000);
  // console.log("---------------");
  r.x = (res.geometry.location.lng() - SSGPostalCodes.sgb.l) * 100 / (SSGPostalCodes.sgb.r - SSGPostalCodes.sgb.l);
  r.y = (res.geometry.location.lat() - SSGPostalCodes.sgb.b) * 100 / (SSGPostalCodes.sgb.t - SSGPostalCodes.sgb.b);
  // console.log(res);
  // console.log(r);
  // console.log("---------------");
  return r;
};



module.exports = SSGPostalCodes;
