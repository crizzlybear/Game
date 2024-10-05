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
      //if(avatarX+20+5>this.x && avatarY+20+5>this.y && avatarY<(this.y+this.h+5) && avatarX<(this.x+this.w+5))
      if(avatarX+avatarWidth>this.x && avatarY+avatarHeight>this.y && avatarY<(this.y+this.h) && avatarX<(this.x+this.w))
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


class GameObjectLocked extends GameObject{
  constructor(ctx,x,y,w,h,objColor){
    super(ctx,x,y,w,h);
    this.color=objColor;
    this.ctx = ctx;//fix extends
  }
  drawObj_BGFixed(bgInst){//newX,newY = bgX,bgY
    //console.log("drawn object:", -newX,-newY, this.w, this.h);
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.rect(this.x-bgInst.bgX,this.y-bgInst.bgY, this.w, this.h);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    
  } 

  drawObjImgLayer(ctx,imgName,bgInst, leftOffset, topOffset, extendX, extendY){
    //height layer  
    //console.log("drawn", bgInst.bgX,bgInst.bgY);
    ctx.drawImage(imgName, this.x-bgInst.bgX+leftOffset, this.y-bgInst.bgY-topOffset, this.w+extendX, this.h+extendY);
  }

  collisionObj(bgInst){
    //custom collision detection
    let rightBorder=this.x+this.w;
    let leftBorder=this.x;
    let topBorder=this.y;
    let botBorder=this.y+this.h;
    if((rightBorder-bgInst.bgX>avatarX)&&(botBorder-bgInst.bgY>avatarY)&&(leftBorder-bgInst.bgX<avatarX+avatarWidth)&&(topBorder-bgInst.bgY<avatarY+avatarHeight)){
      console.log("inside");
      let collide = [Math.abs((rightBorder-bgInst.bgX)-avatarX),Math.abs((botBorder-bgInst.bgY)-avatarY),Math.abs((leftBorder-bgInst.bgX)-(avatarX+avatarWidth)), Math.abs((topBorder-bgInst.bgY)-(avatarY+avatarHeight))];
      let n=collide.indexOf(Math.min(...collide));
      console.log(collide);
      console.log("X:"+bgInst.bgX +" Y:"+bgInst.bgY);
      switch(n){
        case n=0:
          console.log("from right");
          bgInst.bgX = bgInst.bgX+10;
          break;
        case n=1:
          console.log("from bottom"); 
          bgInst.bgY = bgInst.bgY+10;
          break;
        case n=2:
          console.log("from left");
          bgInst.bgX=bgInst.bgX-10;
          break;
        case n=3:
          console.log("from top"); 
          bgInst.bgY = bgInst.bgY-10;
          break;
        default:
          console.log("nothing...");
          break;
      } //end switch
    }else{//console.log("outside");
    }

   
  }//end colision

  animateThis(rate){
    var w2 = this.w;
    if(rate==1){
     
     (this.x+=5)%200;
    }
    
      let ctx = this.ctx;
     ctx.beginPath();
     ctx.rect((this.x)%260,this.y, w2, this.h);
     ctx.fillStyle = this.color;
     ctx.fill();
     ctx.closePath();
  }
  
}



class GameObjectInteractableLocked extends GameObjectLocked{
  constructor(ctx,x,y,w,h){
    super(ctx,x,y,w,h);
    this.ctx = ctx;
    this.col="#ffffff";
  }
  pickup(bgInst){
    //set pickup area
    //should make this into a function or something
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;
    if((pickup) && ((rightBorder-bgInst.bgX>avatarX)&&(botBorder-bgInst.bgY>avatarY)&&(leftBorder-bgInst.bgX<avatarX+avatarWidth)&&(topBorder-bgInst.bgY<avatarY+avatarHeight))){
      console.log("pickedup");
      this.col = "#71ffff";
    }else{
      this.col = "#ffffff";
    }
  }
  getEnergy(bgInst){
    //set pickup area
    //should make this into a function or something
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;
    if((pickup) && ((rightBorder-bgInst.bgX>avatarX)&&(botBorder-bgInst.bgY>avatarY)&&(leftBorder-bgInst.bgX<avatarX+avatarWidth)&&(topBorder-bgInst.bgY<avatarY+avatarHeight))){
      energy=1000;
      //this.col = "#808080";
      this.col = "#71ffff";
    }else{
      this.col = "#ffffff";
    }
  }
  

}

function setShadow(ctx){
    ctx.shadowColor = "grey";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 10;
}

