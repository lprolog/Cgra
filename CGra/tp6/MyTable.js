function MyTable(scene) {
	CGFobject.call(this,scene);
	this.unitcube= new MyUnitCubeQuad(this.scene);
	this.unitcube.initBuffers();

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

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;



MyTable.prototype.display=function(){
	
	this.scene.pushMatrix();		//tampo
	this.scene.translate (0,3.5,0); 
	this.scene.scale(5,0.3,3);
	//this.materialW.apply();	
	//this.tableAppearance.apply();
	this.unitcube.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();		//perna 1
	this.scene.translate(-2.35,1.6,-1.35);
	this.scene.scale(0.3,3.5,0.3);
	this.materialL.apply();
	this.unitcube.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();		//perna 2
	this.scene.translate(2.35,1.6,-1.35);
	this.scene.scale(0.3,3.5,0.3);
	this.unitcube.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();		//perna 3
	this.scene.translate(-2.35,1.6,1.35);
	this.scene.scale(0.3,3.5,0.3);
	this.unitcube.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();		//perna 4
	this.scene.translate(2.35,1.6,1.35);
	this.scene.scale(0.3,3.5,0.3);
	this.unitcube.display();
	this.scene.popMatrix();
};
