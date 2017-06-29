#!/usr/bin/env node
var dbm = new require('../db/DBManager.js');

dbm.init();
dbm.resetMessages();
dbm.resetStats();
