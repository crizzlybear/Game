//Classes for a 2d topdown game with fixed size background for level 1
class GameObjectLocked extends GameObject{
  constructor(ctx,x,y,w,h,objColor){
    super(ctx,x,y,w,h);
    this.color=objColor;
    this.ctx = ctx;//fix extends
    this.visible = false;
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
      // console.log("inside");
      let collide = [Math.abs((rightBorder-bgInst.bgX)-avatarInst.x),Math.abs((botBorder-bgInst.bgY)-avatarInst.y),Math.abs((leftBorder-bgInst.bgX)-(avatarInst.x+ avatarInst.w)), Math.abs((topBorder-bgInst.bgY)-(avatarInst.y+ avatarInst.h))];
      let n=collide.indexOf(Math.min(...collide));
      // console.log(collide);
      // console.log("X:"+bgInst.bgX +" Y:"+bgInst.bgY);
      switch(n){
        case n=0:
          // console.log("from right");
          bgInst.bgX = bgInst.bgX+avatarInst.speed;
          break;
        case n=1:
          // console.log("from bottom"); 
          bgInst.bgY = bgInst.bgY+avatarInst.speed;
          break;
        case n=2:
          // console.log("from left");
          bgInst.bgX=bgInst.bgX-avatarInst.speed;
          break;
        case n=3:
          // console.log("from top"); 
          bgInst.bgY = bgInst.bgY-avatarInst.speed;
          break;
        default:
          // console.log("nothing...");
          break;
      } //end switch
    }else{//console.log("outside");
    }

   
  }//end colision

  drawWallDecor(ctx,ctxui, bgInst,gateList,gateImgInst){
    ctx.beginPath();
    // ctx.shadowColor="transparent";
    ctx.rect(this.x+20-bgInst.bgX,this.y-bgInst.bgY,2,this.h);
    ctx.rect(this.x+600-20-bgInst.bgX,this.y-bgInst.bgY,2,this.h);
    
   
    //ctx.rect(gateList[0].x-bgInst.bgX,gateList[0].y-bgInst.bgY-40,gateList[0].w,40);
    // ctx.rect(gateList[1].x-bgInst.bgX,gateList[1].y-bgInst.bgY-40,gateList[1].w,40);
    // ctx.rect(gateList[2].x-bgInst.bgX,gateList[2].y-bgInst.bgY-40,gateList[2].w,40);

    ctx.drawImage(gateImgInst,gateList[0].x-bgInst.bgX,gateList[0].y-bgInst.bgY-55,gateList[0].w,58);
    ctx.drawImage(gateImgInst,gateList[1].x-bgInst.bgX,gateList[1].y-bgInst.bgY-55,gateList[1].w,58);
    ctx.drawImage(gateImgInst,gateList[2].x-bgInst.bgX,gateList[2].y-bgInst.bgY-55,gateList[2].w,58);
    ctxui.beginPath();
    drawText(ctxui,this.x+25-bgInst.bgX,this.y+50-bgInst.bgY,50,"darkgray","01");
    ctxui.fillStyle="rgb(47,44,56)";
    ctxui.fill();
    ctxui.closePath();
    //ctx.fillStyle="rgb(0,0,0)";
    ctx.fillStyle="rgb(47,44,56)";
    ctx.fill();
    ctx.closePath();
    // setShadow(ctx);
  }

}