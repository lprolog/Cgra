var angle_H = 0;
var angle_M = 0;
var angle_S = 0;

function MyClock(scene, slices, stacks) {
CGFobject.call(this,scene);

this.ponteiroH = new MyClockHand(this.scene);
this.ponteiroM = new MyClockHand(this.scene);
this.ponteiroS = new MyClockHand(this.scene);
this.corpo = new MyCylinder(this.scene,slices,stacks);

this.slices=slices;
this.stacks=stacks;


this.initBuffers();
  
MyClock.prototype.update=function(currTime){

var time = (currTime/1000)*6;
//console.log(time);    
angle_H = time/3600;
angle_M = time/60;
angle_S = time;
};

};



MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display=function(){

//corpo
this.scene.pushMatrix();
this.corpo.display();
this.scene.popMatrix();
//ponteiro_horas
this.scene.pushMatrix();
this.ponteiroH.setAngle(angle_H);
this.scene.scale(0.4,0.4,1);
this.scene.translate(0, 0, 1.1);
this.ponteiroH.display();
this.scene.popMatrix();
//ponteiro_minutos
this.scene.pushMatrix();
this.ponteiroM.setAngle(angle_M);
this.scene.scale(0.3,0.6,1);
this.scene.translate(0,0,1.1);
this.ponteiroM.display();
this.scene.popMatrix();
//ponteiro_segundos
this.scene.pushMatrix();
this.ponteiroS.setAngle(angle_S);
this.scene.scale(0.1,0.8,1);
this.scene.translate(0,0,1.1);
this.ponteiroS.display();
this.scene.popMatrix();
};