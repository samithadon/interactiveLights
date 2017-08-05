/*
* Read data from server and do apporiate actions when there is a network event
* @author Anusha Withana anusha@sutd.edu.sg
*/

import org.json.*;
import com.github.nkzawa.socketio.client.*;
import com.github.nkzawa.emitter.Emitter;




public class SocketHandle {
  String server = "http://drawall.herokuapp.com/toservers";
  //String server = "http://sonic.sg/toservers";
  Socket socket;
  //Animation animation;
  // org.json.JSONObject evnt;
  Table table;
  int eventCount =0;

  float id, count, activity;
  int eventBufferLen = 100;
  ServerEvent[] serverEvents = new ServerEvent[eventBufferLen];
  long unixTime = System.currentTimeMillis() / 1000L;
  long serverUpdate = 5;

  public SocketHandle(){
   // create event que
   for(int i=0; i < serverEvents.length; i++){
     serverEvents[i] = new ServerEvent();
   }


   try{
     socket = IO.socket(server);
     socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {

       @Override
       public void call(Object... args) {
         println("Connected!");
       }

     }).on("bdmsg", new Emitter.Listener() {

       @Override
       public void call(Object... args) {
         addMessageWithEvent(args);
         println("got message!");
         if(eventCount ==4){
           eventCount=0;
         }
         eventCount++;
          println(eventCount);
       }

     }).on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {

       @Override
       public void call(Object... args) {
         println("Disconnected!");
       }

     });
     socket.connect();
   }catch(Exception e){
     e.printStackTrace();
   }
 }

  /*
  * Add boids according to the events from server
  * @author Anusha Withana anusha@sutd.edu.sg
  */
  void addMessageWithEvent(Object... args){
    // println("msg");
    if(args.length <= 0)
      return;
    // println("args");

    org.json.JSONObject evnt = (org.json.JSONObject) args[0];
     //JSONObject evnt = (JSONObject) args[0];
    //org.json.JSONObject json = evnt;
    // try{
    //   println(evnt.toString(2));
    // }catch(Exception e){
    //   e.printStackTrace();
    // }

    if( evnt.has("csv") && evnt.has("user_description") && evnt.has("user_location") && evnt.has("timestamp")){
      println("in");
      try{
        //String sockid;
        //int count, total;
           String grid1 = "positions.csv";
           String grid2 = "positions1.csv";
           String grid3 = "positions2.csv";
           String grid4 = "positions3.csv";
           PrintWriter output=createWriter(grid1);
          // PrintWriter userFile;
           if(eventCount == 1){
            output = createWriter(grid1);
           }
           if(eventCount == 2){
            output = createWriter(grid1);
           }
           if(eventCount == 3){
             output = createWriter(grid1);
           }
           if(eventCount == 4){
            output = createWriter(grid1);
           }
       // String user_location;
       // String user_description;
       // String timestamp;
        String csv;
        String timeStamp = evnt.getString("timestamp");
        //println(timeStamp);
        PrintWriter fileWrite=createWriter("Data/" + timeStamp +".json");
       // saveJSONObject(evnt,"Data/" + timeStamp +".json");
      
        //saveJSONObject(evnt,"new.json");
        
        //sockid = evnt.optString("sockid", "");
        //count = evnt.optInt("count", 0);
       // total = evnt.optInt("total", 1);
        //message = evnt.getString("message", "");
        csv = evnt.optString("csv","");
        fileWrite.print(evnt.toString());
       // println(csv);
         output.print(csv);
         
          output.flush(); // Writes the remaining data to the file
  output.close(); // Finishes the file
  
  animation = new Animation(grid1,grid1, grid1, grid1, 100);
  
  //exit(); // Stops the program
  
        if(message != null){
          // println(sockid, ", ", count, ", ", total, ", ", district);
          //addToEventQue(sockid, count, message);
        }
      }catch(Exception je){
        println("JSON Exception");
        je.printStackTrace();
      }
    }
  }

 /* void calcIntensityRatio(Object... args){
    // println("msg");
    if(args.length <= 0)
      return;


    try{
      org.json.JSONArray evnt = (org.json.JSONArray) args[0];
      // println(evnt.lengtbh());
      if(evnt.length() == numOfDistricts + 1){
        float den = ((org.json.JSONObject) evnt.get(0)).optInt("count", 1);
        for(int i =0; i< numOfDistricts; i++){
          intensityRatio[i] = ((org.json.JSONObject) evnt.get(i + 1)).optInt("count", 1) / den;
          // println(i, " :", intensityRatio[i]);
        }
      }
      // println(evnt.toString(2));
    }catch(Exception e){
      e.printStackTrace();
    }
  }*/


  void addToEventQue(String sockid, int count, String message){
    for(int i=0; i < serverEvents.length; i++){
      if(!serverEvents[i].updated){
        serverEvents[i].updateEvent(sockid, count, message);
        return;
      }
    }
  }

  void sendReply(ServerEvent evnt){
    org.json.JSONObject reply = new org.json.JSONObject();
    try{
      reply.put("sockid", evnt.sockid);
      reply.put("count", evnt.count);
      //reply.put("total", evnt.total);
      reply.put("message", evnt.message);
      socket.emit("metainfo", reply);
    }catch(Exception je){
      println("JSON Exception");
      je.printStackTrace();
    }
  }


  /*void swapEventQue(Waves w){
  for(int i=0; i < serverEvents.length; i++){
    if(serverEvents[i].updated && !serverEvents[i].swaped){
      serverEvents[i].updated = false;
      serverEvents[i].swaped = true;
      sendReply(serverEvents[i]);
      w.add(serverEvents[i]);

      // socket.emit("metainfo", reply);

      // int[] senLoc = sensorLocations[serverEvents[i].id];

      // int act = serverEvents[i].activity * 2;

      // float ang = TWO_PI / float(act);

      // int x = senLoc[0];
      // int y = senLoc[1];

      // if(singleSensorMode){
      //   if(serverEvents[i].id == sensorID){
      //       // println("s: ", serverEvents[i].id, ", ", x, ", ",y, ", ", act);
      //       lastSensorActivity.updateEvent(serverEvents[i].id, serverEvents[i].count, serverEvents[i].activity);
      //       lastSensrX = x;
      //       lastSensrY = y;
      //   }else{
      //     return;
      //   }
      }


      // for(int a= 0; a < act; a++){
      //   PVector spd = new PVector(2 * sin(a * ang), cos(a * ang));
      //   spd.mult(0.01);
      //   // println(spd.x, ", ", spd.y);
      //   // println(x, ", ", y);
      //   // prt.add(new PVector(x, y), new PVector(random(0.1), random(0.1)),20);
      //   prt.add(new PVector(x, y), spd ,20);
      // }
      // }
    }
    //   // this.sendToRemotes();
  }*/

}
