//Classes for a 2d topdown game with fixed size background for level 1
class GameObject{
  //constructor
  constructor(ctx,x,y,w,h){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.color="#FFFFFF";
    this.ctx = ctx;
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

  drawImg(){
    this.ctx.drawImage(ob, this.x, this.y, this.w, this.h);
  }

  collisionObj(){
    //custom collision detection
    if(avatarX+avatarWidth>this.x && avatarY+avatarHeight>this.y && avatarY<(this.y+this.h) && avatarX<(this.x+this.w))
        {
          let collide = [Math.abs(this.x-(avatarX+avatarWidth)), Math.abs((this.x+this.w)-(avatarX)), Math.abs(this.y-(avatarY+avatarHeight)), Math.abs(avatarY-(this.y+this.h))];
          let n=collide.indexOf(Math.min(...collide));
          switch(n){
            case n=0:
              console.log("from left");
              avatarX=this.x-avatarWidth;
              break;
            case n=1:
              console.log("from right");
              avatarX=this.x+this.w;
              break;
            case n=2:
              console.log("from top");
              avatarY=this.y-avatarHeight;
              
              console.log("TOP HIT");
              break;
            case n=3:
              console.log("from bottom");
              avatarY=this.y+this.h;
          
              break;
            default:
              console.log("nothing...");
              break;
          } //end switch
        }//end if
  }//end colision
  
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
  pickupObj(){
      //custom collision detection
      //has to be above draw()
      if(avatarX+20+5>this.x && avatarY+20+5>this.y && avatarY<(this.y+this.h+5) && avatarX<(this.x+this.w+5))
          {
            if(pickup){
              console.log("pickedup");
              this.col = "#808080";
            }
          }//end if
    }//end colision

  
  createInteractable(){//var cannot be onst
    this.pickupObj();
    this.drawObj();
    this.collisionObj();
  }

 
}

