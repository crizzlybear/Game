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
      if (rightPressed) {
        this.bgX = Math.min(this.bgX + avatarInst.speed, this.bgW-canvas.width/2 - avatarInst.w);
      } else if (leftPressed) {
        this.bgX = Math.max(this.bgX - avatarInst.speed, 0-(0.5*canvas.width));
      } else if(upPressed){
        this.bgY = Math.max(this.bgY - avatarInst.speed, 0-(0.5*canvas.height));
      } else if(downPressed){
        this.bgY = Math.min(this.bgY + avatarInst.speed, this.bgH -(canvas.height/2) - avatarInst.h);
      }
    }
    drawPattern(ctx,tile){
      
      
      ctx.fillStyle =  ctx.createPattern(tile, "repeat");
      ctx.beginPath();
      ctx.rect(-this.bgX,-this.bgY,this.bgW,this.bgH);
      ctx.translate(-this.bgX,-this.bgY);
      ctx.fill();
      ctx.translate(this.bgX,this.bgY);//undo translate so it doesnt smear
      ctx.closePath();
      
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

    drawGradientVignette(ctx){
      //vignette effect
      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      const grad2 = ctx.createRadialGradient(260, 200, 50, 260, 200, 250);
      grad2.addColorStop(0,"#3e4e57");//#524f46 #524f46
     
      grad2.addColorStop(0.9,"#0c0529");
      ctx.fillStyle = grad2;
      ctx.fillRect(-this.bgX,-this.bgY,this.bgW,this.bgH);
      ctx.closePath();

      //simple gradient background
      ctx.beginPath();
      const grad = ctx.createLinearGradient(0,0,0,631);
      grad.addColorStop(0,"darkgray");
      grad.addColorStop(1,"BurlyWood");
      ctx.fillStyle = grad;
      ctx.fillRect(-this.bgX,-this.bgY,this.bgW,this.bgH);
      ctx.closePath();
      //end
      
      
      ctx.restore();
    }


    drawGroundRandom(ctx){
      ctx.beginPath();
      ctx.rect(10-this.bgX,10-this.bgY,25,50);
      ctx.rect(50-this.bgX,40-this.bgY,30,30);
      ctx.rect(155-this.bgX,320-this.bgY,25,20);
      ctx.rect(230-this.bgX,140-this.bgY,40,25);
     ctx.fillStyle = "rgba(194,183,155,0.4)";
      ctx.fill();
      // ctx.translate(this.bgX,this.bgY);//undo translate so it doesnt smear
      ctx.closePath();
      
    }
}

function convertBGYtoAvatar(bgY){
  //avatarRelative position
  var translated=bgY+160; 
  return translated;
}

function convertBGXtoAvatar(bgX){
   //avatarRelative position
  var translated=bgX+240; 
  return translated;
}