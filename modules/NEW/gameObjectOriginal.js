class GameObject{
    //constructor
    constructor(ctx,x,y,w,h){
      this.x=x;
      this.y=y;
      this.w=w;
      this.h=h;
      this.color="#FFFFFF";
      this.ctx = ctx;
      this.pickedUp=false;
    } 
    
    //methods
    drawObj(){
      this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.w, this.h);
      //this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.ctx.closePath();
    }
    
    //wrappers
    createObj(){
      this.drawObj();
      this.collisionObj();
    }
}//end class