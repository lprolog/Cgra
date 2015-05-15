var degToRad = Math.PI / 180.0;

function MyLamp(scene, slices, stacks)
{
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.vertices = [];
    this.indices = [];
    this.normals = [];

    this.alfa = 90 * degToRad / (stacks);
    this.beta = 180 * degToRad / (slices);

    this.initBuffers();
};

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function ()
{
    //vertices
    for (var i = 0; i <= this.stacks; i++)
    {
        for (var j = 0; j < this.slices; j++)
        {
            this.vertices.push(Math.sin(2 * j * this.beta - 90) * Math.sin(i * this.alfa));
            this.vertices.push(Math.cos(2 * j * this.beta - 90) * Math.sin(i * this.alfa));
            this.vertices.push(Math.cos(i * this.alfa));
        }
    }
    //normals
    this.normals = this.vertices;
    //indices
    for (var i = 1; i <= this.stacks; i++)
    {
        this.indices.push(i * this.slices + this.slices - 1);
        this.indices.push((i * this.slices - this.slices) + this.slices - 1);
        this.indices.push((i * this.slices - this.slices) + 0);

        this.indices.push(i * this.slices + this.slices - 1);
        this.indices.push((i * this.slices - this.slices) + 0);
        this.indices.push(i * this.slices + 0);

        for (var j = 1; j < this.slices; j++)
        {
            this.indices.push(i * this.slices + j - 1);
            this.indices.push((i * this.slices - this.slices) + j - 1);
            this.indices.push((i * this.slices - this.slices) + j - 0);

            this.indices.push(i * this.slices + j - 1);
            this.indices.push((i * this.slices - this.slices) + j - 0);
            this.indices.push(i * this.slices + j - 0);
        }
    }
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};