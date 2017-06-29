var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	console.log("DIRNAME: " + __dirname);
  res.sendFile(__dirname + '/../about/index.html');
});


module.exports = router;
