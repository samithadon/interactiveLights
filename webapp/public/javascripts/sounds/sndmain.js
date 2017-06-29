require.config({
    paths: {"jsaSound": "http://animatedsoundworks.com:8001"}
});

require(
  ["jsaSound/jsaModels/jsaMp3", "jsaSound/jsaModels/dongs", "jsaSound/jsaModels/SonicSGChirps"],
  function (clickFactory, dongFactory, chirpFactory) {
      var bar={};

      var snd; // will be set to either dongsnd or chrpsnd depending on the zone
      var dongsnd = dongFactory();
      var chirpsnd = chirpFactory();

      var clickSnd=clickFactory();
      clickSnd.on("resourceLoaded",  function(){
        console.log("click sound resources loaded");
      });
      clickSnd.setParam("Sound URL", "javascripts/sounds/resources/click.mp3");



      bar.play = function (){
          snd.setParamNorm("play", 1);
      };
      bar.stop = function() {
          snd.setParamNorm("play", 0);
      };

      // This function is registered to backend to be triggered when a new
      // stat reply come from server
      var zoneNum;
      var maxZoneNum=28;
      var maxToneZones=18;
      var noteNum=0;
      var gain=0;
      bar.onStatReply = function(stat){
        zoneNum=stat.zone % maxZoneNum;
        // console.log("setting zone number to " + zoneNum);
        if (zoneNum < maxToneZones){
          snd=dongsnd;
          console.log("dong");
          noteNum=Math.min(zoneNum, maxToneZones);  // note numbers in [0,17]
          gain = 6-4*Math.pow((noteNum)/17, .15); // decrease rapidly from the low tone
          snd.setParam("Gain", gain);
        } else {
          snd=chirpsnd;
          console.log("chirp");
          noteNum=Math.min(zoneNum-maxToneZones+3, 13); // note numbers in [3,13]
          gain = .3 + .3*((noteNum-18+3)/12); // increase gain from low chirp
          snd.setParam("Gain", gain);
        }

        snd.setParamNorm("play",  1);
        snd.setParam("Note Number", noteNum); // set to zone number in [0,17]
        var pRate = 0.2+0.2*stat.count/stat.total;
        snd.setParam("Rate", pRate); // set to a function of stat.count/stat.total
        //alert("set snd to rate " + pRate);
        ssgui.animateUI(pRate, stat);

      };

      ssgbe.onResult("SndStats", bar.onStatReply);

      // Register sounds functions with click. Event name clikc.snd used to
      // add class snd to the event name
      $(".ui_numpadbtn").on('click.snd', function(){
           console.log('button click');
           clickSnd.setParam("Gain", 1);
           clickSnd.setParam("play", 1);

       });

      $("#ui_heading").on('click.snd', function(){
           console.log('heading clicked');
       });

      return bar;
  }
);
