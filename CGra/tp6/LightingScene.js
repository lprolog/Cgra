var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.option1=true;
	this.option2=false;
	this.speed=3;
	this.pause=false;

	this.light1 = true;
	this.light2 = true;
	this.light3 = true;
	this.light4 = true;

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);
	this.enableTextures(true);


	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.75, -0.5, 2, 1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, -0.5, -0.5, 1, 1);
	this.prism = new MyPrism(this, 8, 20);
	this.cylinder=new MyCylinder(this,8,20);
	this.lamp=new MyLamp(this,16,3);
	this.clock=new MyClock(this,12,1);
	this.floorQuad=new MyQuad(this,0,10,0,12);
	this.wallQuad=new MyQuad(this,-0.5, 1.5, -0.5, 1.5);
	this.mostrador=new MyCircle(this,12);
	this.robot=new MyRobot(this);
	

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	//this.materialA.setSpecular(0.2,0.2,0.2,1);
	this.materialA.setSpecular(0,0.2,0.8,1);	
	//this.materialA.setShininess(10);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);
	
	this.materialC = new CGFappearance(this);
	this.materialC.setAmbient(1,1,1,1);
	this.materialC.setDiffuse(0,0,1,1);
	this.materialC.setSpecular(1,1,1,1);
	this.materialC.setShininess(100);

	this.materialD = new CGFappearance(this);
	this.materialD.setDiffuse(1,1,0,1);
	this.materialD.setAmbient(1,1,0,1);
	this.materialD.setSpecular(1,1,0,1);
	this.materialD.setShininess(10);

	//textures
	this.tableAppearance=new CGFappearance(this);
	this.tableAppearance.setShininess(50);
	this.tableAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.tableAppearance.setSpecular(0.2,0.2,0.2,1);
	this.tableAppearance.loadTexture("/resources/images/table.png");

	this.floorAppearance=new CGFappearance(this);
	this.floorAppearance.setShininess(50);
	this.floorAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.floorAppearance.setSpecular(0.2,0.2,0.2,1);
	this.floorAppearance.setTextureWrap("REPEAT","REPEAT");
	this.floorAppearance.loadTexture("/resources/images/floor.png");

	this.windowAppearance=new CGFappearance(this);
	this.windowAppearance.setShininess(50);
	this.windowAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.windowAppearance.setSpecular(0.2,0.2,0.2,1);
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
	this.windowAppearance.loadTexture("/resources/images/window.png");

	this.slidesAppearance=new CGFappearance(this);
	this.slidesAppearance.setShininess(10);
	this.slidesAppearance.setDiffuse(2,2,2,1);
	this.slidesAppearance.setSpecular(0.2,0.2,0.2,1);
	this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
	this.slidesAppearance.loadTexture("/resources/images/slides.png");

	this.boardAppearance=new CGFappearance(this);
	this.boardAppearance.setShininess(80);
	this.boardAppearance.setDiffuse(0.2,0.2,0.2,1);
	this.boardAppearance.setSpecular(0.5,0.5,0.5,1);
	this.boardAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
	this.boardAppearance.loadTexture("/resources/images/board.png");

	this.clockAppearance=new CGFappearance(this);
	this.clockAppearance.setShininess(80);
	this.clockAppearance.setDiffuse(0.2,0.2,0.2,1);
	this.clockAppearance.setSpecular(0.5,0.5,0.5,1);
	this.clockAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
	this.clockAppearance.loadTexture("/resources/images/clock.png");
	
	this.setUpdatePeriod(1000);

};


LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};


LightingScene.prototype.update = function(currTime) {
this.clock.update(currTime);
};


LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	this.setGlobalAmbientLight(0,0,0, 1.0);
	this.shader.bind();
	
	// Positions for four lights
	this.lights[0].setPosition(0.5, 4, 7.5, 1);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);

	this.lights[0].setAmbient(0.5, 0.5, 0.5, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1,1,0,1.0);
	this.lights[0].setVisible(true);
	this.lights[0].enable();
	

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setVisible(true);
	this.lights[1].enable();
	
	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1,1,1,1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].setVisible(true);
	this.lights[2].enable();

	this.lights[3].setAmbient(1, 0.5, 0.5, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1,1,1,1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1);
	this.lights[3].setVisible(true);
	this.lights[3].enable();

	this.shader.unbind();
};


LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();

		if (this.light1)
		{
			this.lights[0].enable();
			}
		else 
		{
			this.lights[0].disable();
			}


		if (this.light2)
		{
			this.lights[1].enable();
			}
		else 
		{
			this.lights[1].disable();
			}


		if (this.light3)
		{
			this.lights[2].enable();
			}
		else 
		{
			this.lights[2].disable();
			}


			if (this.light4)
		{
			this.lights[3].enable();
			}
		else 
		{
			this.lights[3].disable();
			}

};


LightingScene.prototype.display = function() {
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();
		
	// Floor
	/*this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.tableAppearance.apply();
		//this.materialD.apply();
		this.wall.display();
	this.popMatrix();*/

	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		//this.materialD.apply();
		this.floorQuad.display();
	this.popMatrix();
	
	// Left Wall
																			/*this.pushMatrix();
																				this.translate(0, 4, 7.5);
																				this.rotate(90 * degToRad, 0, 1, 0);
																				this.scale(15, 8, 0.2);
																				this.materialC.apply();
																				this.wall.display();
																			this.popMatrix();*/
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		//this.materialC.apply();
		this.windowAppearance.apply();
		this.wallQuad.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialDefault.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.tableAppearance.apply();
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.tableAppearance.apply();
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);		
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();
	
	//Prism
	this.pushMatrix();
		this.rotate(-90*degToRad,1,0,0);
		//this.prism.display();
	this.popMatrix();
	
	//Cylinder
	this.pushMatrix();
		this.translate(15,0,0);
		this.rotate(-90*degToRad,1,0,0);
		this.cylinder.display();
	this.popMatrix();


	//Lamp
	this.pushMatrix();
		this.translate(7.5,7.5,8);
		this.rotate(-90*degToRad,1,0,0);
		this.lamp.display();
	this.popMatrix();	


	//clock
	this.pushMatrix();
		this.translate(7.5,7.5,-0.5);
		this.clock.display();
	this.popMatrix();

	//mostrador
	this.pushMatrix();
		this.translate(7.5,7.5,0.5);
		this.clockAppearance.apply();
		this.mostrador.display();
	this.popMatrix();
	

	//robot
	this.pushMatrix();
		this.translate(7.5+this.robot.pos_x, 0, 3+this.robot.pos_z); 
		this.rotate (((this.robot.pos_ang))*degToRad, 0, 1, 0);	   
		this.robot.display();
	this.popMatrix();

	this.shader.unbind();
};

LightingScene.prototype.pause = function ()
{ 
	if(this.pause == true) 
		this.pause = false;
	else 
		this.pause = true;
};

LightingScene.prototype.update = function (time) 
{
	if(this.pause == false)
		this.clock.update(time);
};

LightingScene.prototype.roda_dir = function ()
{ 
	this.robot.roda_dir();
};
LightingScene.prototype.roda_esq = function ()
{ 
	this.robot.roda_esq();
};
LightingScene.prototype.anda_frente = function ()
{ 
	this.robot.anda_frente();
};
LightingScene.prototype.anda_tras = function ()
{ 
	this.robot.anda_tras();
};