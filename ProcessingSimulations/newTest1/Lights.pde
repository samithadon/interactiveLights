import java.awt.Color;
import java.util.Collections;
import org.json.*;
import java.util.Map;

class Lights {
  PVector [] [] strandsXY;
  Table table;
  Light[][] lights;
  int[] lightLenghts;
  int nn=0;
  
  int modTemp =0;
  int modTemp1=0;

  int testIndex = 0;

  Color[][][] pdsColors;
//println(numOfLines);
  Lights (String pointData, int fps1) {
    
    fps = fps1;
    //println(numOfLines);
     //println(numOfPos);
    lights = new Light[21][21];
    // lightLenghts = new int[numOfLines];
    table = loadTable(pointData, "header");
    //int y = 0;
    //n=22
    for (TableRow row : table.rows()) {
      //int pds = row.getInt("pds");
      // println(pds);
      
       int x = row.getInt("x");
      int y = row.getInt("y");
       PVector pLoc = new PVector(x,y);
       
       int i = row.getInt("i");
       int j = row.getInt("j");
       
      // Light light = new Light(pLoc, pds, lightStrand, y);
      // x = (x-5)/11;
       //println("X =" + x);
       //y = (y-5)/22;
       //println("Y =" + y);
      int pds = floor(i/8); // uncomment this line for real simulations
        //println("pds =" + pds);
       int lightStrand = i%8; // uncomment this line for real simulation
        //println("lightStarnd =" + lightStrand);
        //int pds =0;
        //int lightStrand = floor(i/2);
        
       // println("lightStrand=" +lightStrand);
        //if((i%2)==0){
          
        Light light = new Light(pLoc, pds, lightStrand, j);
       lights[i][j] = light;
        //}else{
          
          // Light light = new Light(pLoc, pds, lightStrand, j+22);
       //lights[i][21-j] = light;
          
       // }
        
        
       //modTemp = x%2;
       //modTemp1 = y%2;
       //if(modTemp==1 || modTemp1==1){
        // println("pds =" + lights[x][y].pdsID);
         // println("lightStarnd =" + lights[x][y]);
          
       //}
       
     /* for(int x=0; x< numOfPos; x++){
        PVector pLoc = new PVector(x * dx + (dx * (y % 2) / 2 ) + xOffset, y * dy + yOffset);
        Light light = new Light(pLoc, pds, row.getInt("strand"), x, row.getInt("l" + x));
        // println(pds, ", ", y, ", ", x, ", ", row.getInt("l" + x));
        lights[y][x] = light;
      }*/
      //y++;
    }

    // println("10, 5: ", lights[10][5].pdsID, ", ", lights[10][5].strandID, ", ", lights[10][5].positionID);


    pdsColors = new Color[numPDS][numOfLines][numOfPos];
    for(int i=0; i< numPDS; i++){
      for(int j=0; j< numOfLines; j++){
        for(int k=0; k< numOfPos; k++){
          pdsColors[i][j][k] = new Color(0, 0, 0);
        }
      }
    }
  }

  int size() {
    return lights.length;
  }

  void clearLights() {
    for(int i=0; i< lights.length; i++){
      for(int j=0; j < lights[i].length; j++){
        
        
        // modTemp = j%2;
         //modTemp1 = i%2;
         //if(modTemp==0 && modTemp1 == 0){
         lights[i][j].clearRGB();
         //}
        // lights[i][j].clearRGBReset();
      }
    }
  }

  void drawMap() {
    for(int i=0; i< lights.length; i++){
      for(int j=0; j < lights[i].length; j++){
        
        // lights[i][j].intensity = intensityRatio[lights[i][j]] + 0.4;
       /* if(lights[i][j].district > 0){
          lights[i][j].intensity = intensityRatio[lights[i][j].district - 1] + 0.4;
          lights[i][j].addRGBColor(true, 1.0);
        }*/
      }
    }
  }

  void highlightMap() {
    for(int i=0; i< lights.length; i++){
      for(int j=0; j < lights[i].length; j++){
        //if(lights[i][j].district > 0){
          lights[i][j].intensity = 3.0;
          lights[i][j].addRGBColor(true, 3.0);
        //}
      }
    }
  }

  /*void drawDistrcit(int dist, float inten) {
    for(int i=0; i< lights.length; i++){
      for(int j=0; j < lights[i].length; j++){
        if(lights[i][j].district == dist){
          lights[i][j].intensity = inten;
          lights[i][j].addRGBColor(false, 1.0);
        }
      }
    }
  }*/

  void drawLight(int x, int y, float inten) {
    lights[y][x].intensity = inten;
    lights[y][x].addRGBColor(false, 1.0);
  }

  void clearLightsReset() {
    for(int i=0; i< lights.length; i++){
      for(int j=0; j < lights[i].length; j++){
        lights[i][j].clearRGBReset();
      }
    }
  }

  void animateBackground(){
    for(int i=0; i< lights.length; i++){
      for(int j=0; j < lights[i].length; j++){
        //if(lights[i][j].district == 0){
          //println("i" + i);
         //println("j" + j);
        modTemp = j%2;
         modTemp1 = i%2;
         //if(modTemp==0 && modTemp1 == 0){
           // println("j" +lights[i][j] );
         lights[i][j].intensity = random(0.4);
          lights[i][j].addRGBColor(false, 1.0);
         //}
      }
    }
  }


  void makeScanLine(){
    clearLights();
    for(int i=0; i< lights.length; i++){
      if(testIndex < lights[i].length){
        lights[i][testIndex].intensity = 1.0;
        lights[i][testIndex].addRGBColor(false, 1.0);
      }
    }
    testIndex++;
    testIndex = testIndex % 150;
  }

  void makeScanLineIndex(int indx){
    clearLights();
    for(int i=0; i< lights.length; i++){
      if(indx < lights[i].length){
        lights[i][indx].intensity = 1.0;
        lights[i][indx].addRGBColor(false, 1.0);
      }
    }
  }

  void makeVerticalLineIndex(int indx){
    clearLights();
    if(indx < lights.length){
      for(int i=0; i < lights[indx].length; i++){
        lights[indx][i].intensity = 1.0;
        lights[indx][i].addRGBColor(false, 1.0);
      }
    }
  }


  Color [][][] getPDSColors() {
    for(int i=0; i< lights.length; i++){
      for(int j=0; j < lights[i].length; j++){
        // if(lights[i][j].pdsID == 1){
          //println(j);
          //println(i);
          pdsColors[lights[i][j].pdsID][lights[i][j].strandID][lights[i][j].positionID] = lights[i][j].getLEDColor();
          // println(x, ", ", y);
           //println(j);
          //println(i);
        // }else{
          // pdsColors[lights[i][j].pdsID][lights[i][j].strandID][lights[i][j].positionID] = lights[i][j].getLEDColor();
        // }
      }
    }
    return pdsColors;
  }

  //Draw Lights
  void drawLights() {
    for(int i=0; i< lights.length; i++){
      for(int j=0; j < lights[i].length; j++){
        
        // modTemp = j%2;
         //modTemp1 = i%2;
         //if(modTemp==0 && modTemp1 == 0){
        lights[i][j].draw();
         //}
      }
    }
  }

}
