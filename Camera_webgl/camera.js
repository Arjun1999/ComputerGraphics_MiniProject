export default class Camera{
    constructor(gl)
    {
        this.gl = gl;
        this.cameraRotation = [0.0, 0.0, 0.0]
        this.eye = [0.0, 6.0, 0.0]
        this.center = [0.0, 0.0, 0.0]
        this.up = [0.0, 0.0, 1.0]
        this.fieldOfView = 45 * Math.PI / 180;   // in radians
        this.aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        this.zNear = 0.1;
        this.zFar = 100.0;
        this.ViewMatrix = mat4.create()
        this.projectionMatrix = mat4.create();
        this.t = 0.1;
        this.v = 0.1;
        this.setPerspective();
    }

    setPerspective()
    {
        mat4.perspective(this.projectionMatrix,this.fieldOfView,this.aspect,this.zNear,this.zFar);
    }

    getPerspective()
    {
        return this.projectionMatrix;
    }

    getViewMatrix()
    {
        return this.ViewMatrix;
    }

    droneView()
    {
        this.ViewMatrix = mat4.create();
        mat4.lookAt(this.ViewMatrix, this.eye, this.center, this.up);
        //mat4.invert(this.ViewMatrix, this.ViewMatrix)
    }

    speed(sign)
    {
        this.t = this.t + sign*this.v
        if(this.t<0.1)
        {
            this.t = 0.1;
        }
        if(this.t>0.7)
        {
            this.t = 0.7;
        }
        //console.log(this.t);
    }

    translate(idx,sign)
    {
        this.eye[idx] = this.eye[idx] + sign*this.t;
        this.center[idx] = this.center[idx] + sign*this.t;
    }

    avatarView()
    {
        this.ViewMatrix = mat4.create()
        mat4.translate(this.ViewMatrix, this.ViewMatrix, [-3.0, -3.0, 16.0])
        mat4.invert(this.ViewMatrix, this.ViewMatrix)
    }

    defaultViewMatrix()
    {
        this.ViewMatrix = mat4.create()   
        //mat4.rotate(this.ViewMatrix, this.ViewMatrix, this.cameraRotation[0], [1, 0, 0])
        //mat4.rotate(this.ViewMatrix, this.ViewMatrix, this.cameraRotation[1], [0, 1, 0])
        //mat4.rotate(this.ViewMatrix, this.ViewMatrix, this.cameraRotation[2], [0, 0, 1])
        mat4.translate(this.ViewMatrix, this.ViewMatrix, [3.0, 3.0, 16.0])
        mat4.invert(this.ViewMatrix, this.ViewMatrix)
    }

    setCameraRotation(idx, val)
    {
        this.cameraRotation[idx]-=val;
    }
}