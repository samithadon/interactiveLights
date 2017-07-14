public class ServerEvent{
  public String sockid;
  public int count;
  public String message;
  boolean swaped, updated;
  public ServerEvent(){
    sockid = "";
    count = 0;
    //total = 0;
    //district = 0;
    message = "";
    swaped = true;
    updated = false;
  }

  public void updateEvent(String sockid, int count, String message){
    this.sockid =  sockid;
    this.count =  count;
   // this.total =  total;
    //this.district =  district;
    this.message = message;
    this.swaped = false;
    this.updated = true;
  }

  public void clone(ServerEvent evnt){
    this.sockid =  evnt.sockid;
    this.count =  evnt.count;
   // this.total =  evnt.total;
    this.message= evnt.message;
    //this.district =  evnt.district;
    this.swaped = evnt.swaped;
    this.updated = evnt.updated;
  }

}
