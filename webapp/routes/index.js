var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'SonicSG', nZClient:true });
});

/* GET results page. */
router.get('/done', function(req, res) {
  res.render('results', { title: 'SonicSG', nZClient:true });
});


/* GET home page. */
router.get('/server', function(req, res) {
  if(sg50_serverNotConnected){
    res.render('server', { title: 'SonicSG', nZClient:false });
  }else{
    res.render('serverno', { title: 'SonicSG', nZClient:false });
  }
});

/* GET home page. */
router.get('/pixitest', function(req, res) {
  res.render('pixitest', { title: 'Pixi Test' });
});


/* GET view page. */
router.get('/view', function(req, res) {
  res.render('view', { title: 'Public View' });
});

/* GET users listing. */
// router.get('/about', function(req, res) {
//   res.render('about', { title: 'About SonicSG' });
// });



/* GET authors page. */
router.get('/authors', function(req, res) {
  var db = req.db;
  var collection = db.get('authors');
  collection.find({},{},function(e,docs){
    res.render('authors', { title: 'Author List',  'authors' : docs});
  });
});

module.exports = router;
