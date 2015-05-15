function MyClockHand(scene) 
{
    CGFobject.call(this,scene);
    this.quad= new MyQuad(this.scene,0,1,0,1);
    this.quad.initBuffers();
};

var degToRad = Math.PI / 180.0;
this.angle = 0;

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.setAngle=function(nangle)
{
  this.scene.rotate(-degToRad*nangle,0,0,1);
};

MyClockHand.prototype.display=function()
{
  this.scene.pushMatrix();    
      this.scene.materialD.apply();
      this.scene.scale(0.2, 1, 1);
      this.scene.translate(0,0.5,0); 
      this.quad.display();
  this.scene.popMatrix();
};
  
      