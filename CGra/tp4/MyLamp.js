/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

	this.vertices = [];
	this.indices = [];
	this.normals= [];
	this.alfa=360/slices;
	this.angle=0;
 	

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a MyLamp with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a MyLamp with varying number of slices and stacks?
 	*/

	var x;
	var y;
	var z=0;
	var beta=0;
	var radius = 1;
	

	var latitudeBands = this.stacks;
	var longitudeBands = this.slices;
    
    for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
      var theta = latNumber * Math.PI / latitudeBands;
      var sinTheta = Math.sin(theta);
      var cosTheta = Math.cos(theta);

      for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
        var phi = longNumber * 2 * Math.PI / longitudeBands;
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);

        var x = cosPhi * sinTheta;
        var y = cosTheta;
        var z = sinPhi * sinTheta;
      

        this.normals.push(x);
        this.normals.push(y);
        this.normals.push(z);
        
        this.vertices.push(radius * x);
        this.vertices.push(radius * y);
        this.vertices.push(radius * z);
      }
    }

	for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
      for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
        var first = (latNumber * (longitudeBands + 1)) + longNumber;
        var second = first + longitudeBands + 1;
        this.indices.push(first);
        this.indices.push(second);
        this.indices.push(first + 1);

        this.indices.push(second);
        this.indices.push(second + 1);
        this.indices.push(first + 1);
      }
    }

	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
