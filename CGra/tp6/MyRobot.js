
//Global Vars
var step_size = 0.1;
var ang_rot = 45;
var degToRad = Math.PI / 180.0;
function MyRobot(scene) {
	
	CGFobject.call(this,scene);
	this.pos_x=0;
	this.pos_z=0;
	this.pos_ang=0;
	this.initBuffers();

	this.cilindro= new MyCylinder(this.scene,12,1);
	this.tampa=new MyCircle(this.scene,12);
	this.cilindro.initBuffers();
	this.tampa.initBuffers();
	this.cabeça=new MyLamp(this.scene,16,3);

	this.materialW = new CGFappearance(scene);
	this.materialW.setAmbient(0.54,0.27,0.07,1);
	this.materialW.setDiffuse(0.54,0.27,0.07,1);
	this.materialW.setSpecular(0.54,0.27,0.07,1);	
	this.materialW.setShininess(120);
	
	this.materialL = new CGFappearance(scene);
	this.materialL.setAmbient(0.74,0.78,0.8,1);
	this.materialL.setDiffuse(0.74,0.78,0.8,1);
	this.materialL.setSpecular(1,1,1,1);
	
};

var degToRad = Math.PI / 180.0;

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor=MyRobot;


MyRobot.prototype.roda_dir = function () 
{
	this.pos_ang-=ang_rot*degToRad;
};
MyRobot.prototype.anda_frente=function()
{
	this.pos_x+=step_size*Math.cos(this.pos_ang*degToRad);
	this.pos_z-=step_size*Math.sin(this.pos_ang*degToRad);
};
MyRobot.prototype.roda_esq=function()
{
	this.pos_ang+=ang_rot*degToRad;
}
MyRobot.prototype.anda_tras=function()
{
	this.pos_x-=step_size*(Math.cos(this.pos_ang*degToRad));
	this.pos_z+=step_size*(Math.sin(this.pos_ang*degToRad));
}



MyRobot.prototype.display=function(){

	this.materialL.apply();
	//TRONCO
	this.scene.pushMatrix();	
	this.scene.translate(0,0.5,0);
	this.scene.rotate(-90*degToRad,1,0,0);	//Tronco
	this.scene.scale(0.9,0.9,2.5);
	this.cilindro.display();
	this.scene.popMatrix();
	//TAMPA
	this.scene.pushMatrix();
	this.scene.translate(0,0.5,0);
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.scale(0.9,0.9,2.5);
	this.tampa.display();
	this.scene.popMatrix();
	//RODA1
	this.scene.pushMatrix();
	this.scene.translate(0,0.5,0.8);
	this.scene.scale(0.5,0.5,0.5);
	this.cilindro.display();
	this.scene.popMatrix();
	//RODA2
	this.scene.pushMatrix();
	this.scene.translate(0,0.5,-1.4);
	this.scene.scale(0.5,0.5,0.5);
	this.cilindro.display();
	this.scene.popMatrix();
	//BRAÇO1
	this.scene.pushMatrix();
	this.scene.translate(0,3,1); //x -> -z;   y->-y;   z->+x  
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.scale(0.2,0.2,1.5);
	this.cilindro.display();
	this.scene.popMatrix();
	//BRAÇO2
	this.scene.pushMatrix();
	this.scene.translate(0,3,-1); //x -> -z;   y->-y;   z->+x  
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.scale(0.2,0.2,1.5);
	this.cilindro.display();
	this.scene.popMatrix();
	//JANTE RODA1 FORA
	this.scene.pushMatrix();
	this.scene.translate(0,0.5,1.3);
	this.scene.scale(0.5,0.5,0.5);
	this.tampa.display();
	this.scene.popMatrix();
	//JANTE RODA1 DENTRO
	this.scene.pushMatrix();
	this.scene.translate(0,0.5,0.8);
	this.scene.rotate(180*degToRad,1,0,0);
	this.scene.scale(0.5,0.5,0.5);
	this.tampa.display();
	this.scene.popMatrix();
	//JANTE RODA2 FORA
	this.scene.pushMatrix();
	this.scene.translate(0,0.5,-0.9);
	this.scene.scale(0.5,0.5,0.5);
	this.tampa.display();
	this.scene.popMatrix();
	//JANTE RODA2 DENTRO
	this.scene.pushMatrix();
	this.scene.translate(0,0.5,-1.4);
	this.scene.rotate(180*degToRad,1,0,0);
	this.scene.scale(0.5,0.5,0.5);
	this.tampa.display();
	this.scene.popMatrix();
	//CABEÇA
	this.scene.pushMatrix();
	this.scene.translate(0,3,0);
	this.scene.rotate(-90*degToRad,1,0,0);
	this.scene.scale(0.9,0.9,1);
	this.cabeça.display();
	this.scene.popMatrix();
	//OMBRO BRAÇO1
	this.scene.pushMatrix();
	this.scene.translate(0,3,1);
	this.scene.rotate(-90*degToRad,1,0,0);
	this.scene.scale(0.2,0.2,0.2);
	this.cabeça.display();
	this.scene.popMatrix();
	//OMBRO BRAÇO2
	this.scene.pushMatrix();
	this.scene.translate(0,3,-1);
	this.scene.rotate(-90*degToRad,1,0,0);
	this.scene.scale(0.2,0.2,0.2);
	this.cabeça.display();
	this.scene.popMatrix();
	//PUNHO BRAÇO1
	this.scene.pushMatrix();
	this.scene.translate(0,1.5,1);
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.scale(0.2,0.2,0.2);
	this.cabeça.display();
	this.scene.popMatrix();
	//PUNHO BRAÇO2
	this.scene.pushMatrix();
	this.scene.translate(0,1.5,-1);
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.scale(0.2,0.2,0.2);
	this.cabeça.display();
	this.scene.popMatrix();

};