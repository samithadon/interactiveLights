import java.awt.Color;
import java.util.Comparator;

class Light {
  PVector pLoc, rLoc;
  int pdsID;
  int strandID;
  int positionID;
  float intensity;
  int district;

  int red;
  int green;
  int blue;

  Light(PVector pLoc, int pdsID, int strandID, int positionID, int district) {
    this.pLoc = pLoc;
    this.pdsID = pdsID;
    this.strandID = strandID;
    this.positionID = positionID;
    this.district = district;
    this.intensity = 0.01;
    this.addRGBColor(true, 1.0);
  }

  Light(TableRow row) {
    this.pLoc = new PVector(row.getInt("x") * dx + xOffset, row.getInt("y") * dy + yOffset);
    this.rLoc = new PVector(row.getInt("lx"), row.getInt("ly"), row.getInt("lz"));
    this.pdsID = row.getInt("pds");
    this.strandID = row.getInt("strand");
    this.positionID = row.getInt("pos");
    this.intensity = row.getInt("y");
    this.addRGBColor(false, 8.0);
  }

  String printRGB() {
    return ("R" + str(red) + " G" + str(green) + " B" + str(blue));
  }

  //Converts intensity to color
  void addRGBColor (boolean isPrey, float maxIntensity) {
    float hue, sat, bright;

    intensity = map (intensity, 0.0, maxIntensity, 0.05, 1.0);
    intensity = exponentialEasing (intensity, 0.4);

    if (isPrey == false) {
      hue = map (intensity, 0.0, 1.0, 1.0, 0.5);
      // sat = map (intensity, 0.0, 1.0, 1.0, 1.0);
      sat = 1.0;
      bright = map (intensity, 0.0, 1.0, 0.1, 1.0);
    }
    else {
      hue = map (intensity, 0.0, 1.0, 0, 0);
      // hue = 0.0;
      // sat = 1.0;
      sat = map (intensity, 0.0, 1.0, 0.5, 1.0);
      bright = map (intensity, 0.0, 1.0, 0.1, 1.0);
    }

    intensity = 0;
    Color hsbColor = Color.getHSBColor(hue, sat, bright);

    red = constrain(hsbColor.getRed(), 0, 255);
    green = constrain(hsbColor.getGreen(), 0, 255);
    blue = constrain(hsbColor.getBlue(), 0, 255);
  }

  void setColor(LightIntensity li){
    // red = 0;
    // green = 0;
    // blue = 0;
    // this.intensity = max(li.intensity, 0.1);
    this.intensity = li.intensity;
    this.addRGBColor(li.type, li.max);
  }

  //Shaping Function
  float exponentialEasing (float x, float a) {
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = max(min_param_a, min(max_param_a, a));

    if (a < 0.5) {
      // emphasis
      a = 2.0*(a);
      float y = pow(x, a);
      return y;
    }
    else {
      // de-emphasis
      a = 2.0*(a-0.5);
      float y = pow(x, 1.0/(1-a));
      return y;
    }
  }

  void clearRGB() {
    red = 0;
    green = 0;
    blue = 0;
    intensity = 0.02;
    addRGBColor(true, 1.0);
  }

  void clearRGBReset() {
    red = 0;
    green = 0;
    blue = 0;
  }

  Color getLEDColor() {
    return new Color(red, green, blue);
  }

  color getProcessingColor() {
    return color (red, green, blue);
  }

  void draw(){
    noStroke();
    fill (this.getProcessingColor());
    ellipse(this.pLoc.x, this.pLoc.y, r, r);
  }

}