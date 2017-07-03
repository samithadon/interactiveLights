class LightIntensity {

  float intensity, max = 1.0, intensityFactor;
  PVector loc;
  boolean type;
  // PVector[] forces;

  LightIntensity(PVector loc, float intensity, boolean type){
    this.loc = loc;
    this.intensity = this.intensityFactor = intensity;
    this.type = type;
    this.max = max;
  }

  LightIntensity(PVector loc, float intensity, boolean type, float max){
    this.loc = loc;
    this.intensity = this.intensityFactor = intensity;
    this.type = type;
    this.max = max;
  }

}