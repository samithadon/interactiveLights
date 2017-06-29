fromRemotes = {};
dbStats =[];

// Data base manager
var DBM = new require('./../db/DBManager.js');

function SIOManager(io){
  // db.init();
  // db.connect(this.updateStats);
  fromRemotes = io.of('/fromremote');
  fromRemotes.on('connection', this.remoteConnect);
  // fromRemotes.on('bdmsg', this.remoteActionMessage);
  // fromRemotes.on('connection', function(socket){remoteConnect(socket);});
  toServers = io.of('/toservers');
  // toServers.on('connection', function(socket){serverConnect(socket);});
  toServers.on('connection', this.serverConnect);
  siom = this;
  // this.className = 'SIOManager';
}

SIOManager.prototype.className = 'SIOManager';


SIOManager.prototype.updateStats = function(dbsts){
  // console.log(this.constructor.toString());
  for(var i in dbsts){
    // console.log(dbsts[i]);
    dbStats[dbsts[i].district] = dbsts[i];
  }
  // db.printMessages();
  console.log("#############################");
  console.log("# Found Db Stat records: " + dbStats.length + " #");
  console.log("#############################");
};

SIOManager.prototype.remoteConnect = function(socket){
  // console.log('remote connected');
  socket.on('disconnect', function(){
    delete fromRemotes.connected[this.id];
    // console.log('remote disconnected');
  });
  socket.on('bdmsg', siom.remoteActionMessage);
};

SIOManager.prototype.serverConnect = function(socket){
  // sg50_serverNotConnected = false;
  toServers.emit('stats', dbStats);

  // console.log('server connected');
  socket.on('disconnect', function(){
    sg50_serverNotConnected = true;
    // console.log('server disconnected');
  });

  //  receive meta info from server
  socket.on('metainfo', function(msg){
    // console.log('server msg ' + msg);
    if (typeof fromRemotes.connected[msg.sockid] !== 'undefined') {
      fromRemotes.connected[msg.sockid].emit('stat_reply', msg);
    }
  });
};

SIOManager.prototype.remoteActionMessage = function(msg){
  console.log(msg);
    dbsts = DBM.getStats();
    for(var i in dbsts){
        // console.log(dbsts[i]);
        dbStats[dbsts[i].district] = dbsts[i];
    }
  //
  msg.sockid = this.id;

  // Update counters
  dbStats[0].count++;
  dbStats[msg.district].count++;
  msg.count = dbStats[msg.district].count;
  msg.total = dbStats[0].count;

    DBM.addMessage(msg, dbStats[msg.district], dbStats[0]);

  // console.log('Action Location :', msg.ratio.x, msg.ratio.y);
  // console.log(this);
  // msg.stats = dbStats;
  toServers.emit('bdmsg', msg);
  toServers.emit('stats', dbStats);
};

module.exports = SIOManager;
