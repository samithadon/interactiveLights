import CK.*;
import java.awt.Color;
import processing.serial.*;
P5_KiNET PDS;

int i, mod;
PFont f;

String lightsCSV = "fireworks/0.csv";
String lightsCSV1 = "fireworks/1.csv";
String lightsCSV2 = "fireworks/2.csv";
String lightsCSV3 = "fireworks/3.csv";
String lightsCSV4 = "fireworks/4.csv";
String lightsCSV5 = "fireworks/5.csv";
String lightsCSV6 = "fireworks/6.csv";
String lightsCSV7 = "fireworks/7.csv";
String lightsCSV8 = "fireworks/8.csv";
String lightsCSV9 = "fireworks/9.csv";
String lightsCSV10 = "fireworks/10.csv";
String lightsCSV11 = "fireworks/11.csv";
String lightsCSV12 = "fireworks/12.csv";
String lightsCSV13 = "fireworks/13.csv";
String lightsCSV14 = "fireworks/14.csv";
String lightsCSV15 = "fireworks/15.csv";
String lightsCSV16 = "fireworks/16.csv";
String lightsCSV17 = "fireworks/17.csv";
float xyScale = 0.05;
float xOffset = 50;
float yOffset = 50;
float dx = 30;//30
float dy = 12; //12
float r = 5;
Lights lights;
Lights lights2;

int numOfDistricts = 28;
int disIndx = 0;
int[][] districtCenters;
float[] intensityRatio = new float[numOfDistricts];


//Variables
int fps = 10;
int radius = 5;   // LED Rad
int radiusR = 50;   //45 number of LEDs per animal (use pi*r*r)
float factorK = 2.0;  // speed
int sensorRadius = 10;

// light stripes
int numPDS = 5;
int numOfLines = 36;
int numOfPos = 44;

// test
int testBG = 0;
float kickSize, snareSize, hatSize;
int sensorID = 0;
boolean singleSensorMode = false;
//ServerEvent lastSensorActivity;
int lastSensrX = 0, lastSensrY = 0;
int countWave=0;


String[] ipPDSs = {"10.0.38.109", "10.3.100.102", "10.3.100.103", "10.3.100.104", "10.3.100.105"};
int[] pdsCap = {8, 8, 8, 8, 4};
// String ipPDS2 = "10.3.100.101";

// socket handler for server communication
//SocketHandle serverHandler;

float[] sndWave;

// Sound processing
// SoundProcess snd;

// waves
//Wave wave;
//int waveIndex = 0;
// SoundWave sw;

// fishes
// Fishes fishes;
// int waveIndex = 0;


// Particles particles;

Color[] pdsColorsSend;

long ticker = 0, lastWave = 0, dWave = 1;

boolean start = true, dance = true;

int scanLineIndex = 0;
boolean autoScanLine = true;

int vertLineIndex = 0;
boolean autoVertLine = true;

String  message;
int count=0;

Serial dataPort;

void setup() {
  
  
  
  //PDS
  PDS = new P5_KiNET(this);

  pdsColorsSend = new Color[numOfPos];

  frameRate(fps);
  size(int(680) , 680);
  // JSONObject ligtLoc;
  
   //dataPort = new Serial(this, Serial.list()[2], 9600);
   dataPort = new Serial(this, Serial.list()[2], 115200);
  dataPort.bufferUntil('\n');

  //lights = new Lights(lightsCSV, xOffset, yOffset, xyScale);
  //lights2= new Lights(lightsCSV2, xOffset, yOffset, xyScale);
 // wave = new Wave();
  // sw = new SoundWave();
  // fishes = new Fishes();
  // particles = new Particles();

  //serverHandler = new SocketHandle();

  // lastSensorActivity = new ServerEvent();

//  districtCenters = new int[numOfDistricts][2];
//  Table dcTable;
//   dcTable = loadTable("dc.csv", "header");
//
//   for (TableRow row : dcTable.rows()) {
//     districtCenters[row.getInt("district")][0]=row.getInt("x");
//     districtCenters[row.getInt("district")][1]=row.getInt("y");
//   }
//
//  for(int i=0; i<numOfDistricts; i++){
//    int xmax = 0, ymax = 0, xmin = numOfPos - 1, ymin = numOfLines - 1;
//    for(int j=0; j < numOfLines; j++){
//      for(int k=0; k< numOfPos; k++){
//        if(lights.lights[j][k].district == i + 1){
//          xmin = xmin > k ? k : xmin;
//          ymin = ymin > j ? j : ymin;
//          xmax = xmax < k ? k : xmax;
//          ymax = ymax < j ? j : ymax;
//        }
//      }
//    }
//    districtCenters[i][0] = (xmin + xmax) / 2;
//    println(districtCenters[i][0]);
//    districtCenters[i][1] = (ymin + ymax) / 2;
//    println(districtCenters[i][1]);
//  }

 // f = createFont("Arial",16,true); // Arial, 16 point, anti-aliasing on

}

void draw () {
  
  
  ticker++;
  drawImage();

  //background(0);
  //lights.clearLights();
  //
  // Scan lines
  // if(autoScanLine){
  //   scanLineIndex = (++scanLineIndex % numOfPos);
  // }
  // lights.makeScanLineIndex(scanLineIndex);





  // if(autoVertLine){
  //   vertLineIndex = (++vertLineIndex % numOfLines);
  // }
  // lights.makeVerticalLineIndex(vertLineIndex);
  // lights.makeScanLine();
  //
  //
  // snd.drawBeats();
  // snd.drawWave();

  // Handle waves
  // if(snd.isWave()){
  //   dWave = ticker - lastWave;
  //   lastWave = ticker;
  //   waveIndex += 60;
  //   waves.add((waveIndex % numOfPos), 30, int(dWave));
  // }

  // if(testBG++ % 20 == 0){

  //   disIndx = (disIndx + 1) % numOfDistricts;
  // }
  // lights.drawDistrcit(disIndx + 1, 0.5);
  // lights.drawLight(districtCenters[disIndx][0], districtCenters[disIndx][1], 1.0);

  // waves.add(80, 30,20);

  // if(snd.isFish()){
  //   fishes.add(new PVector(int(random(numOfPos)), int(random(numOfLines - 1))), new PVector(0.05, 0),20, 20);
  // }

  // if(testBG++ % 50 == 0){
  //   float ang = TWO_PI / float(20);
  //   for(int a= 0; a < 20; a++){
  //     PVector spd = new PVector(2 * sin(a * ang), cos(a * ang));
  //     spd.mult(0.01);
  //     // println(spd.x, ", ", spd.y);
  //     // println(x, ", ", y);
  //     // prt.add(new PVector(x, y), new PVector(random(0.1), random(0.1)),20);
  //     particles.add(new PVector(int(random(36)), int(random(44))), spd ,20);
  //   }
  // }


  // if(snd.isFishBoost()){
  //   // fishes.boost();

  // }


  // sndWave = snd.getSoundArray();
  // fishes.makeDance(sndWave);
  // sw.dance(sndWave);


 /* if(start){
    // if(testBG++ % 20 == 0)
    lights.animateBackground();
    
    lights.drawMap();
    //wave.render(lights);
    readMessage();
    
   // waves.render(lights);
    //lights.highlightMap();
    // lights.drawDistrcit(disIndx + 1, 0.8);
    // lights.drawLight(districtCenters[disIndx][0], districtCenters[disIndx][1], 1.0);
    // fishes.render(lights);
    // particles.render(lights);
    // sw.render(lights);
    // s
  }else{
    //turnLEDOff();
   //lights = new Lights(lightsCSV2, xOffset, yOffset, xyScale);
     lights.animateBackground();
     lights.drawMap();
     if(countWave<50){
     wave.render(lights);
     countWave++;
     //count++;
     }else{
       
       countWave=0;
       start=true;
     }
     
     //count++;
     //for(int i=1000; i>0; i--){
     //wave.render(lights);
     //}
     //if(count>50){
     //start=true;
     //count=0;
    // }
     
   
    //lights.drawMap();
    
     //readMessage();
  }*/

  // fishes.tick();
  // particles.tick();
  // s

  //lights.drawLights();
  //lights2.drawLights();
  //sendToPDS();
  // drawText();
  //serverHandler.swapEventQue(waves);

}

void keyPressed() {

  if (key == ' ') start = !start;
  else if (key == 'm') dance = !dance;
  else if (key == 's') singleSensorMode = !singleSensorMode;
  else if (key == 'k'){
    sensorID = (++sensorID % 13);
    // println("sid: ", sensorID + 1);
  }

  else if (key == 'd') disIndx = ((++disIndx) % numOfDistricts);
  else if (key == 'l'){
    autoScanLine = !autoScanLine;
  }else if (key == 'i'){
    scanLineIndex = (++scanLineIndex % numOfPos);
  }

  else if (key == 'v'){
    autoVertLine = !autoVertLine;
  }else if (key == 'b'){
    vertLineIndex = (++vertLineIndex % numOfLines);
    println(vertLineIndex);
  }

}


void drawImage(){
  
  mod = i%34;
  
  
  Table table;
  if(mod==0){
  table = loadTable( lightsCSV, "header");
  
  for (TableRow row : table.rows()) {
    color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      fill(c);
      ellipse(x,y,10,10);
      
  }
  
  }
  
  if(mod==1){
  table = loadTable( lightsCSV1, "header");
  for (TableRow row : table.rows()) {
      color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
 
  }
  
  if(mod==2){
  table = loadTable( lightsCSV1, "header");
  for (TableRow row : table.rows()) {
      color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
 
  }
  
  
  
   if(mod==3){
  table = loadTable( lightsCSV2, "header");
  for (TableRow row : table.rows()) {
      color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==4){
  table = loadTable( lightsCSV2, "header");
  for (TableRow row : table.rows()) {
     color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==5){
  table = loadTable( lightsCSV3, "header");
  for (TableRow row : table.rows()) {
      color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==6){
  table = loadTable( lightsCSV3, "header");
  for (TableRow row : table.rows()) {
      color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
   if(mod==7){
  table = loadTable( lightsCSV4, "header");
  for (TableRow row : table.rows()) {
     color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  if(mod==8){
  table = loadTable( lightsCSV4, "header");
  for (TableRow row : table.rows()) {
     color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  
   if(mod==9){
  table = loadTable( lightsCSV5, "header");
  for (TableRow row : table.rows()) {
      color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==10){
  table = loadTable( lightsCSV5, "header");
  for (TableRow row : table.rows()) {
      color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
   if(mod==11){
  table = loadTable( lightsCSV6, "header");
  for (TableRow row : table.rows()) {
     color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==12){
  table = loadTable( lightsCSV6, "header");
  for (TableRow row : table.rows()) {
     color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==13){
  table = loadTable( lightsCSV7, "header");
  for (TableRow row : table.rows()) {
      color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
   if(mod==14){
  table = loadTable( lightsCSV7, "header");
  for (TableRow row : table.rows()) {
     color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==15){
  table = loadTable( lightsCSV8, "header");
  for (TableRow row : table.rows()) {
      color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==16){
  table = loadTable( lightsCSV8, "header");
  for (TableRow row : table.rows()) {
      color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==17){
  table = loadTable( lightsCSV9, "header");
  for (TableRow row : table.rows()) {
      color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==18){
  table = loadTable( lightsCSV9, "header");
  for (TableRow row : table.rows()) {
     color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==19){
  table = loadTable( lightsCSV10, "header");
  for (TableRow row : table.rows()) {
      color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==20){
  table = loadTable( lightsCSV10, "header");
  for (TableRow row : table.rows()) {
      color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==21){
  table = loadTable( lightsCSV11, "header");
  for (TableRow row : table.rows()) {
    color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==22){
  table = loadTable( lightsCSV11, "header");
  for (TableRow row : table.rows()) {
    color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==23){
  table = loadTable( lightsCSV12, "header");
  for (TableRow row : table.rows()) {
      color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==24){
  table = loadTable( lightsCSV12, "header");
  for (TableRow row : table.rows()) {
     color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==25){
  table = loadTable( lightsCSV13, "header");
  for (TableRow row : table.rows()) {
      color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==26){
  table = loadTable( lightsCSV13, "header");
  for (TableRow row : table.rows()) {
      color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==27){
  table = loadTable( lightsCSV14, "header");
  for (TableRow row : table.rows()) {
      color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  
  if(mod==28){
  table = loadTable( lightsCSV14, "header");
  for (TableRow row : table.rows()) {
      color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==29){
  table = loadTable( lightsCSV15, "header");
  for (TableRow row : table.rows()) {
     color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==30){
  table = loadTable( lightsCSV15, "header");
  for (TableRow row : table.rows()) {
    color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==31){
  table = loadTable( lightsCSV16, "header");
  for (TableRow row : table.rows()) {
     color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==32){
  table = loadTable( lightsCSV16, "header");
  for (TableRow row : table.rows()) {
     color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==33){
  table = loadTable( lightsCSV17, "header");
  for (TableRow row : table.rows()) {
      color c = color(255,0,0);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  
  if(mod==34){
  table = loadTable( lightsCSV17, "header");
  for (TableRow row : table.rows()) {
      color c = color(255 ,255,255);
      int x = row.getInt("x")/2;
      int y = row.getInt("y")/2;
      int value = row.getInt("value");
      
      
      
      if(value==1){
        fill(c);
        ellipse(x,y,10,10);
      }
      
  }
  }
  i++;
}

void readMessage(){
  
  message = dataPort.readStringUntil('\n');
  if(message != null){
  println(message);
  
 // lights.drawLights();
  //lights2.drawLights();
  //sendToPDS();
   //lights2.drawMap(); 
   start= false;
  }
}

void turnLEDOff(){
  lights.clearLightsReset();
}


void sendToPDS() {

  Color[][][] pdsCols = lights.getPDSColors();



  for (int i = 0; i < ipPDSs.length; i++) {
    // print("pds: ", i);
    // println(", lines: ", pdsCap[i]);
    for(int j=0; j < pdsCap[i]; j++){
      // println("l: ", pdsCols[i][j].length);
      PDS.sendLightConfig(pdsCols[i][j], ipPDSs[i], j + 1);
    }
  }

}

void drawText(){
  textFont(f,16);
  fill(255);
  if(start){
    text("Lights: ON",30, 230);
  }else{
    text("Lights: OFF",30, 230);
  }
  text("|",130, 230);
  if(dance){
    text("Music: ON",150, 230);
  }else{
    text("Music: OFF",150, 230);
  }
  text("|",250, 230);
  text("Line No: " + scanLineIndex,270, 230);
  text("|",370, 230);
  if(singleSensorMode){
    // text("S Sen: ON [" + (sensorID + 1) + "]",390, 230);
    // text("Last data: S: " + (lastSensorActivity.id + 1) + ", C: " + lastSensorActivity.count
    //  + ", A: " + lastSensorActivity.activity + ", X: " + lastSensrX + ", Y: " + lastSensrY,520, 230);
  }else{
    text("S Sen: OFF",390, 230);
  }


  // if(singleSensorMode){


  // }

}

class Animation {
  
  int r;
  static int rows;
  static int columns;
  Light[][] lights;
  int red, green, blue;
  Table table;
  
  Animation(String aData){
    
    table = loadTable( lightsCSV17, "header");
    
    row = table.getRowCount();
    columns = table.getColumnCount();
    
    
  }
  
  
  
  
  
  
}
