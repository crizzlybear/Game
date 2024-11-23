class BG{
  constructor(bgW,bgH){
    this.bgX=0;
    this.bgY=0;
    this.bgW=bgW;
    this.bgH=bgH;
  }
 
  drawBG(canvas,ctx,bgImg){
    //default full image
    ctx.drawImage(bgImg, 0,0, canvas.width, canvas.height);
    
  }

}


class BGLocked extends BG{
  constructor(bgW,bgH){
      super(bgW,bgH);
  }
  drawUpdate(ctx,bgImg){
      ctx.drawImage(bgImg,0,0,bgImg.width,bgImg.height,-this.bgX,-this.bgY,this.bgW,this.bgH);
    }
    moveBG(canvas, avatarInst){
      if(!gameOver){
        if (rightPressed) {
          this.bgX = Math.min(this.bgX + avatarInst.speed, this.bgW-canvas.width/2 - avatarInst.w);
        } else if (leftPressed) {
          this.bgX = Math.max(this.bgX - avatarInst.speed, 0-(0.5*canvas.width));
        } else if(upPressed){
          this.bgY = Math.max(this.bgY - avatarInst.speed, 0-(0.5*canvas.height));
        } else if(downPressed){
          this.bgY = Math.min(this.bgY + avatarInst.speed, this.bgH -(canvas.height/2) - avatarInst.h+20);
        }
      }
      
    }
   
    drawGradient(ctx){
      //simple gradient background, gradient follows player but it looks cool
      ctx.beginPath();
      const grad = ctx.createLinearGradient(0,0,0,631);
      grad.addColorStop(0,"rgb(106, 100, 117)");
      grad.addColorStop(1,"BurlyWood");
      ctx.fillStyle = grad;
      ctx.fillRect(-this.bgX,-this.bgY,this.bgW,this.bgH);
      ctx.closePath();
      //end
    }

    drawFloorDecor(ctx){
      ctx.shadowColor="transparent";
      ctx.drawImage(floorImg,0,0,32,30,50-this.bgX,500-this.bgY,80,60);
      ctx.drawImage(floorImg,32,15,32,30,400-this.bgX,300-this.bgY,80,90);
      ctx.drawImage(floorImg,32,0,32,30,400-this.bgX,215-this.bgY,80,60);
      ctx.drawImage(floorImg,64,0,32,30,20-this.bgX,20-this.bgY,30,60);
      ctx.drawImage(floorImg,64,0,32,30,235-this.bgX,150-this.bgY,60,80);
      ctx.drawImage(floorImg,64,0,32,30,520-this.bgX,550-this.bgY,60,80);
      ctx.shadowColor = "rgb(59, 55, 71)";
    }
}

