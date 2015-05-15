/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
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

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a MyCylinder with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a MyCylinder with varying number of slices and stacks?
 	*/
	var x;
	var y;
	var z=0;
	var beta=0;
	for(var j=0;j<this.stacks;j++)
	{
		//vertices
		for(var i=0;i<this.slices;i++)
		{
			x=Math.cos(this.angle*degToRad);
			y=Math.sin(this.angle*degToRad);
			//z=0;
			this.vertices.push(x,y,z);		
			//z=1;
			this.vertices.push(x,y,z+1);	
			this.angle += this.alfa;
		}
		z++;

	
		//indices
		var offset = 2*this.slices*j;
		var t=0;
		for(var i=0;i<this.slices-1;i++)
		{
			this.indices.push(t+offset);
			this.indices.push(t+3+offset);
			this.indices.push(t+1+offset);

			this.indices.push(t+offset)
			this.indices.push(t+2+offset);
			this.indices.push(t+3+offset);
			t += 2;
		}
			//ultima slice
			this.indices.push(offset);
			this.indices.push(1+offset);
			this.indices.push(t+offset);

			this.indices.push(1+offset)
			this.indices.push(1+t+offset);
			this.indices.push(t+offset);

	
		beta=i*this.alfa+this.alfa;
		//normais
		for(var k=0; k<this.vertices.length/3;k++)
		{
			this.normals.push(Math.cos(beta*degToRad),Math.sin(beta*degToRad),0);
		}
	}
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
