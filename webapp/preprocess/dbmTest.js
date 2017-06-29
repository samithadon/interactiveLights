#!/usr/bin/env node
var dbm = new require('../db/DBManager.js');

var stats = [];

var updateStats = function(dbsts){
  // console.log(dbsts.length);
  for(var i in dbsts){
    // console.log(dbsts[i]);
    stats[dbsts[i].district] = dbsts[i];
  }
  console.log(stats);
  dbm.close();
};

dbm.init();
dbm.connect(updateStats);



// for(var i = 0; i  < 1000; i++);

// dbm.close();

