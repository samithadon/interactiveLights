import CK.*;
import java.awt.Color;
import processing.serial.*;
P5_KiNET PDS;

int i, mod;
//int mod1, mod2;
PFont f;
String frameCSV = "fireworks/frames.csv";
String frameCSV1 = "fireflies/frames.csv";
String frameCSV2 = "rays/frames.csv";
//String grid = "fireflies/grid2.csv";
 String grid1 = "positions.csv";
 String grid2 = "positions1.csv";
 String grid3 = "positions2.csv";
 String grid4 = "positions3.csv";
String image = "a.jpg";
String heart = "heart.jpg";

//PImage img;

//String lightsCSV = "fireworks/0.csv";
//String lightsCSV1 = "fireworks/1.csv";
//String lightsCSV2 = "fireworks/2.csv";
//String lightsCSV3 = "fireworks/3.csv";
//String lightsCSV4 = "fireworks/4.csv";
//String lightsCSV5 = "fireworks/5.csv";
//String lightsCSV6 = "fireworks/6.csv";
//String lightsCSV7 = "fireworks/7.csv";
//String lightsCSV8 = "fireworks/8.csv";
//String lightsCSV9 = "fireworks/9.csv";
//String lightsCSV10 = "fireworks/10.csv";
//String lightsCSV11 = "fireworks/11.csv";
//String lightsCSV12 = "fireworks/12.csv";
//String lightsCSV13 = "fireworks/13.csv";
//String lightsCSV14 = "fireworks/14.csv";
//String lightsCSV15 = "fireworks/15.csv";
//String lightsCSV16 = "fireworks/16.csv";
//String lightsCSV17 = "fireworks/17.csv";
float xyScale = 0.05;
float xOffset = 50;
float yOffset = 50;
float dx = 30;//30
float dy = 12; //12
float r = 5;
Lights lights;
Lights lights2;
Animation animation;
drawImage newimage;

int numOfDistricts = 28;
int disIndx = 0;
int[][] districtCenters;
float[] intensityRatio = new float[numOfDistricts];


//Variables
int fps;
int radius = 5;   // LED Rad
int radiusR = 50;   //45 number of LEDs per animal (use pi*r*r)
float factorK = 2.0;  // speed
int sensorRadius = 10;

// light stripes
int numPDS = 3;
int numOfLines = 24;
int numOfPos = 30;
//int numOfLines = 7;
//int numOfPos = 44;
// test
int testBG = 0;
float kickSize, snareSize, hatSize;
int sensorID = 0;
boolean singleSensorMode = false;
ServerEvent lastSensorActivity;
int lastSensrX = 0, lastSensrY = 0;
int countWave=0;


String[] ipPDSs = {"10.0.39.108","10.0.39.109","10.0.39.110"};
int[] pdsCap = { 8,8,8};
// String ipPDS2 = "10.3.100.101";

// socket handler for server communication
SocketHandle serverHandler;

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
  lights = new Lights(grid1,100);
  //newimage = new drawImage(image,20);
   animation = new Animation(grid1, grid1, grid1, grid1, 100);
  //animation = new Animation(frameCSV1, 10);
//animation = new Animation(frameCSV1,10);
//animation = new Animation(frameCSV2,15);
 // lights = new Lights(grid,10);

  frameRate(fps);
  size(int(600) ,600);
  //img = loadImage("a.jpg");
  // JSONObject ligtLoc;
  
   //dataPort = new Serial(this, Serial.list()[2], 9600);
   //dataPort = new Serial(this, Serial.list()[2], 115200);
  //dataPort.bufferUntil('\n');

//animation = new Animation(frameCSV, 12);
//animation = new Animation(frameCSV1);
//animation = new Animation(frameCSV2);

  //lights2= new Lights(lightsCSV2, xOffset, yOffset, xyScale);
 // wave = new Wave();
  // sw = new SoundWave();
  // fishes = new Fishes();
  // particles = new Particles();

  serverHandler = new SocketHandle();

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
  lights.clearLights();
  //newimage.imageDraw();
  //newimage.render(lights);
//animation.drawAnimation();
 //lights.animateBackground();
 
 animation.render(lights);
 
 //animation.drawAnimation();
 
 lights.drawLights();
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
  sendToPDS();
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




class  drawImage{
  
  PImage img;
   Light[][] lights;
 
    int mod1, mod2,n;
    int dev1, dev2;
drawImage(String aData, int fps1){
   img = loadImage(aData);
   println(img.height);
   println(img.width);
  loadPixels();
  img.loadPixels();
}
  //println("pixel length :" + img.pixels.length);
  
 // println(img.height);
   //println(img.width);
 void imageDraw(){
   n=0;
  for (int y = 0; y < img.height; y++) {
    mod2 = y % 55;
    for (int x = 0; x < img.width; x++) {
      int loc = x + y*img.width;
      mod1 = x % 25;
      // The functions red(), green(), and blue() pull out the 3 color components from a pixel.
      float r = red(img.pixels[loc]);
      float g = green(img.pixels[loc]);
      float b = blue(img.pixels[loc]);
      
      // Image Processing would go here 
      // If we were to change the RGB values, we would do it here, 
      // before setting the pixel in the display window.
      
      // Set the display pixel to the image pixel
      if(mod1 ==0 && mod2 ==0){
        
        println(r);
      pixels[n] =  color(r,g,b); 
     n++ ;
      }      
    }
  }
  
  println(pixels.length);
  updatePixels();
  
}

void render(Lights l){
  
    n=0;
  for (int y = 0; y < img.height; y++) {
    mod2 = y % 55;
    dev2 = floor(y/55);
    for (int x = 0; x < img.width; x++) {
      int loc = x + y*img.width;
      mod1 = x % 25;
      dev1 = floor(x/25);
      // The functions red(), green(), and blue() pull out the 3 color components from a pixel.
      float r = red(img.pixels[loc]);
      float g = green(img.pixels[loc]);
      float b = blue(img.pixels[loc]);
      
      // Image Processing would go here 
      // If we were to change the RGB values, we would do it here, 
      // before setting the pixel in the display window.
      
      // Set the display pixel to the image pixel
      if(mod1 ==0 && mod2 ==0){
        pixels[n] =  color(r,g,b); 
        if(r !=255.0){
            l.lights[dev2][dev1].intensity = 1.0;
              //l.lights[dev2][dev1].addRGBColor(true, 1.0);
          
        }else{
           l.lights[dev2][dev1].intensity = random(0.4);
              //l.lights[dev2][dev1].addRGBColor(false, 1.0);
        }
      
     n++ ;
      }      
    }
  }
  
}



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
  int test;
   int rows;
   int columns;
   int interaction=0;
  Light[][] lights;
  int red, green, blue;
  Table table, table1,table2, table3, table4;
  int count=3;
  int mod =0;
  int shift=0;
  
  Animation(String aData, String bData, String cData, String dData, int fps1){
    
    fps= fps1;
    table1 = loadTable( aData, "header");
     table2 = loadTable( bData, "header");
      table3 = loadTable( cData, "header");
       table4 = loadTable( dData, "header");
    //rows = table.getRowCount();
    //columns = table.getColumnCount();
    //println(columns);
     // println(rows);
    
    
  }
  

  void drawAnimation(){
    
   // int shift = (int)random(200);
   // println(shift);
    if(count> columns-5){
      count=3;
      interaction++;
      if(interaction==3){
        interaction =0;
      }
      //shift = 22;
    }
    
    if(interaction ==0){
      table = table1;
      
      rows = table.getRowCount();
    columns = table.getColumnCount();
      
    }else if(interaction ==1){
      table = table2;
      
      rows = table.getRowCount();
    columns = table.getColumnCount();
      
    }else if(interaction ==2){
      table = table3;
      
      rows = table.getRowCount();
    columns = table.getColumnCount();
      
    }else if(interaction ==3){
      table = table4;
      
      rows = table.getRowCount();
    columns = table.getColumnCount();
      
    }
    
    for(int i =0; i<=count ; i++){
    //println("count =" + count);
    //println("i =" + i);
    for (TableRow row : table.rows()) {
     // if(count=3){
      //color c = color(0 ,0,0);
     // }else{
       // color c = color(0 ,0,0);
     // }
      int x = row.getInt("x");
      int y = row.getInt("y");
     String numberA = String.valueOf(i*100);
     //int value=0;
      //println(i);
      //if(i*100 < columns){
        test = i*100;
       if (test>((columns-5)*20)){
         numberA = String.valueOf((columns-5)*20);
         break;
       }
        
        //if (test <rows){
      int value = row.getInt(numberA);
       // }
      //}
      
      if(value==1){
        
        color c = color(255,0,0);
        fill(c);
        //if(value==0){
        //ellipse(x,y,5,5);
        //}else{
          ellipse(x,y,5,5);
        //}
        
      }else{
        
        color c = color(255,255,255);
        fill(c);
        //if(value==0){
        ellipse(x,y,5,5);
        //}else{
          //ellipse(x+shift,y+shift,5,5);
        //}
      }
      
  }
  }
  count++;
    
  }
  
  void render(Lights l){
    
       // println(shift);
    if(count> columns-5){
      count=3;
       interaction++;
      if(interaction==3){
        interaction =0;
      }
      shift = 0;
     // println("shift" + shift);
    }
    if(interaction ==0){
      table = table1;
      
      rows = table.getRowCount();
    columns = table.getColumnCount();
      
    }else if(interaction ==1){
      table = table2;
      
      rows = table.getRowCount();
    columns = table.getColumnCount();
      
    }else if(interaction ==2){
      table = table3;
      
      rows = table.getRowCount();
    columns = table.getColumnCount();
      
    }else if(interaction ==3){
      table = table4;
      
      rows = table.getRowCount();
    columns = table.getColumnCount();
      
    }
    
    for(int i =0; i<=count ; i++){
    println("count =" + count);
    println("i =" + i);
    for (TableRow row : table.rows()) {
     // if(count=3){
      //color c = color(0 ,0,0);
     // }else{
       // color c = color(0 ,0,0);
     // }
      int x = row.getInt("x");
      int y = row.getInt("y");
      
       int m = row.getInt("i");
       int n = row.getInt("j");
      //println(i);
      String numberA = String.valueOf(i*100);
     //int value=0;
      //println(i);
      //if(i*100 < columns){
        test = i*100;
       if (test>((columns-5)*20)){
         numberA = String.valueOf((columns-5)*20);
         break;
       }
        
        //if (test <rows){
      String hexValue = row.getString(numberA);
      int value  = unhex(hexValue);
       int r = (int)red(value);
      int g = (int)green(value);
      int b = (int)blue(value);
  
      if(value !=0){
        
        //color c = color(255,0,100);
        //fill(c);
        //if(value==0){
        //ellipse(x,y,5,5);
        //}else{
          //ellipse(x+shift,y,5,5);
          if(m+shift < 30 && n+shift < 30 && m+shift > 0 && n+shift >0 ){
              l.lights[m+shift][n+shift].intensity = 1.0;
              l.lights[m+shift][n+shift].addrgbColor(r,g,b, 1.0);
          }else{
             
                l.lights[m][n].intensity =1.0;
              l.lights[m][n].addrgbColor(r,g,b, 1.0);
            
          }
        //}
        
      }else{
        
        //color c = color(255,255,255);
       // fill(c);
        //if(value==0){
        //ellipse(x,y,5,5);
         if(m+shift < 30 && n+shift < 30 && m+shift > 0 && n+shift >0 ){
         l.lights[m+shift][n+shift].intensity = random(0.4);
           l.lights[m+shift][n+shift].addRGBColor(false, 1.0);
         }else{
            
             l.lights[m][n].intensity = random(0.4) ;
              l.lights[m][n].addRGBColor(false, 1.0);
            
         }
        //}else{
          //ellipse(x+shift,y+shift,5,5);
        //}
      }
      
  }
  }
  count++;
    
    
    
    
    
    
    
    
    
  }
  
  
  
  
  
  
}
