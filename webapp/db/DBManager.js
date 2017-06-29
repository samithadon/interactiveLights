var mongo = require('mongodb');
var mongoose = require('mongoose');

//Lets load the mongoose module in our program
// var mongoose =

function DBManager(){
}

DBManager.prototype.className = 'DBManager';

DBManager.initModels = function(){
    // Make stats schema
    var statsSchema = mongoose.Schema({
        district: Number,
        count: Number
        // tags: { district: [Number], index: true } // field level
    });

    // Make message schema
    var messageSchema = mongoose.Schema({
        gid: String,
        postalcode: Number,
        district: Number,
        msg: String
        // tags: { district: [Number], index: true } // field level
    });

    // increment the votes methods
    statsSchema.methods.inc = function (callback) {
        this.count++;
        this.save(callback);
    };

    DBManager.Stats = mongoose.model('Stats', statsSchema);
    DBManager.Messages = mongoose.model('Messages', messageSchema);
    // Connect to the databse
    // Initialize the data structures
}

DBManager.init = function(){

  try
  {
    console.log("############ connecting to the database #############");
    DBManager.connected = false;
    mongoose.connect('mongodb://localhost:27017/SG50_db');
    DBManager.db = mongoose.connection;
    DBManager.db.on('error', console.error.bind(console, 'connection error:'));
    DBManager.db.once('open', function (arg) {
        // if(callback !== undefined)
        //   callback('connected');
        console.log("Connected!!");
        DBManager.loadStats(function(stats){

        });


        // DBManager.resetStats();

        // console.log(mongoose.connection.collections);
        // for (var col in mongoose.connection.collections){
        //   console.log(col);
        // }
        // console.log(mongoose.connection.collections);
    });
    console.log("############ connected to the database successfully #############");
  }
  catch(e)
  {
    console.log("############ error connecting to the database #############" + e);
  }
};


DBManager.close = function(){
  DBManager.db.close();
};

DBManager.printStats = function(){
  DBManager.Stats.find({}, null, {sort: {district: 1}}, function (err, msgs){
    if (err) return console.error(err);
    console.log(msgs);
  });
};


DBManager.printMessages = function(){
  DBManager.Messages.find({}, null, {sort: {district: 1}}, function (err, stats){
    if (err) return console.error(err);
    console.log(stats);
  });
};


DBManager.loadStats = function(callback){
  DBManager.Stats.find({}, null, {sort: {district: 1}}, function (err, stats){
    if (err) return console.error(err);
    // console.log(stats);
    DBManager.stats = stats;
    DBManager.connected = true;
    if(callback !== undefined)
      callback(stats);
  });
};


DBManager.resetStats = function(){
  DBManager.Stats.remove({}, function(err) {
     console.log('collection removed, and updating');
      var dStat = {};

      for(var i=0; i< 29; i++){

        dStat[i] = new DBManager.Stats({district: i, count: 0});
        dStat[i].save();
        // insertStat(i, 0);
      }

  });
};

DBManager.resetMessages = function(){
  DBManager.Messages.remove();
};

DBManager.getStats = function(){
    return DBManager.stats;
};


DBManager.addMessage = function(msg, dst, tst, callback){
  var dbmsg = new DBManager.Messages({gid: msg.sockid,
        postalcode: msg.code,
        district: msg.district,
        msg: msg.msg});
  dbmsg.save();
  // stat for total
  DBManager.Stats.findById(tst._id, function (err, stt){
    if (err) return console.error(err);
    stt.inc();
    stt.save();
  });

  DBManager.Stats.findById(dst._id, function (err, stt){
    if (err) return console.error(err);
    stt.inc();
    stt.save();
  });

};





module.exports = DBManager;
