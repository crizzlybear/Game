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
    //getters
    get pos(){
      console.log(this.x,",",this.y);
    }
    set col(c){
      this.color = c;
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
  
  
class GameObjectInteractable extends GameObject{
constructor(ctx){
    super();
    this.ctx = ctx;
}
pickupObj(avatarInst){
    //custom collision detection
    //has to be above draw()
    if(avatarInst.x+avatarInst.w>this.x && avatarInst.y+avatarInst.h>this.y && avatarInst.y<(this.y+this.h) && avatarInst.x<(this.x+this.w))
        {
            if(pickup){
            console.log("pickedup");
            this.setCol = "#808080";
            }
        }//end if
    }//end colision


createInteractable(){//var cannot be onst
    this.pickupObj();
    this.drawObj();
    this.collisionObj();
}


}