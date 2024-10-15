//Classes for a 2d topdown game with fixed size background for level 1
class GameObject{
  //constructor
  constructor(ctx,x,y,w,h, rgb){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.color="#FFFFFF";
    this.ctx = ctx;
    this.rgb = rgb;
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
      //if(avatarInst.x+20+5>this.x && avatarY+20+5>this.y && avatarY<(this.y+this.h+5) && avatarInst.avatarX<(this.x+this.w+5))
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


class GameObjectLocked extends GameObject{
  constructor(ctx,x,y,w,h,objColor,rgb){
    super(ctx,x,y,w,h);
    this.color=objColor;
    this.ctx = ctx;//fix extends
    this.rgb = rgb;
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

  collisionObj(bgInst, avatarInst){
    //custom collision detection
    let rightBorder=this.x+this.w;
    let leftBorder=this.x;
    let topBorder=this.y;
    let botBorder=this.y+this.h;
    if((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h)){
      console.log("inside");
      let collide = [Math.abs((rightBorder-bgInst.bgX)-avatarInst.x),Math.abs((botBorder-bgInst.bgY)-avatarInst.y),Math.abs((leftBorder-bgInst.bgX)-(avatarInst.x+ avatarInst.w)), Math.abs((topBorder-bgInst.bgY)-(avatarInst.y+ avatarInst.h))];
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
  constructor(ctx,x,y,w,h,rgb){
    super(ctx,x,y,w,h,rgb);
    this.ctx = ctx;
    this.col="#ffffff";
    this.rgb = rgb;
  }
  pickup(bgInst, avatarInst){
    //set pickup area
    //should make this into a function or something
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;
    if((pickup) && ((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){
      console.log("pickedup");
      this.col = "#71ffff";
    }else{
      this.col = "#ffffff";
    }
  }
  pickupItem(bgInst, avatarInst,inventory,item){
    //set pickup area
    //should make this into a function or something
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;
    if((pickup) && ((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){
      console.log("pickedup");
      // this.col = "#71ffff";
      console.log(item);
      if(!this.pickedUp){
        inventory.push(item);
        this.pickedUp=true;
      }
    }else{
      // this.col = "#ffffff";
    }
  }
  getEnergy(bgInst, avatarInst){
    //set pickup area
    //should make this into a function or something
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;
    if((pickup) && ((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){
      energy=1000;
      //this.col = "#808080";
      this.col = "#71ffff";
    }else{
      this.col = "#ffffff";
    }
  }
  

}


class Stairs extends GameObject{
  constructor(ctx,x,y,w,h,objColor){
    super(ctx,x,y,w,h);
    this.color=objColor;
    this.ctx = ctx;//fix extends
    //this.direction = direction;//starting from bottom: NE,NW,N,S
    //Test norteast stairs
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

  collisionObj(bgInst, avatarInst){
    //custom collision detection
    let rightBorder=this.x+this.w;
    let leftBorder=this.x;
    let topBorder=this.y;
    let botBorder=this.y+this.h;
    if((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h)){
      console.log("inside");
      
      
      
          if(leftPressed){
            bgInst.bgX = bgInst.bgX-1;
            bgInst.bgY = bgInst.bgY-0.5;
          }else if(rightPressed){
            bgInst.bgX = bgInst.bgX+1;
            bgInst.bgY = bgInst.bgY+0.5;
          }
          
       
    
    }else{//console.log("outside");
    }

   
  }//end colision
}










function setShadow(ctx){
    ctx.shadowColor = "grey";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 10;
}

