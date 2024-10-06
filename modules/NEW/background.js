class BG{
  constructor(bgSrc){
    this.bgSrc = bgSrc;
    background.src = this.bgSrc;
    this.bgX=0;
    this.bgY=0;
  }
  set newBG(newSrc){
    this.bgSrc = newSrc;
    background.src = this.bgSrc;
  }
  drawBG(canvas,ctx){
    //default full image
    ctx.drawImage(background, 0,0, canvas.width, canvas.height);
    
  }

}


class BGLocked extends BG{
  constructor(bgSrc){
      super(bgSrc);
  }
  drawUpdate(ctx){
      ctx.drawImage(background,0,0,background.width,background.height,-this.bgX,-this.bgY,1024,631);
    }
    moveBG(canvas, avatarInst){
      if (rightPressed) {
        //avatarX = Math.min(avatarX + speed, canvas.width - avatarWidth);//move 7 units right
        this.bgX = Math.min(this.bgX + avatarInst.speed, background.width-canvas.width/2 - avatarInst.w);
      } else if (leftPressed) {
        //avatarX = Math.max(avatarX - avatarInst.speed, 0);
        this.bgX = Math.max(this.bgX - avatarInst.speed, 0-(0.5*canvas.width));
      } else if(upPressed){
        //avatarY = Math.max(avatarY - avatarInst.speed, 0);
        this.bgY = Math.max(this.bgY - avatarInst.speed, 0-(0.5*canvas.height));
      } else if(downPressed){
        //avatarY = Math.min(avatarY + avatarInst.speed, canvas.height - avatarHeight);
        this.bgY = Math.min(this.bgY + avatarInst.speed, background.height -(canvas.height/2) - avatarInst.h);
      }
      // avatarInst.avatarX = canvas.width/2;
      // avatarInst.avatarY = canvas.height/2;
    }
    drawPattern(ctx,tile){
      
      
      ctx.fillStyle =  ctx.createPattern(tile, "repeat");
      ctx.beginPath();
      ctx.rect(-this.bgX,-this.bgY,1024,631);
      ctx.translate(-this.bgX,-this.bgY);
      ctx.fill();
      ctx.translate(this.bgX,this.bgY);//undo translate so it doesnt smear
      ctx.closePath();
      
    }
    drawGradient(ctx){
      //vignette effect
      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      const grad2 = ctx.createRadialGradient(260, 200, 50, 260, 200, 250);
      grad2.addColorStop(0,"#3e4e57");//#524f46 #524f46
     
      grad2.addColorStop(0.9,"#0c0529");
      ctx.fillStyle = grad2;
      ctx.fillRect(-this.bgX,-this.bgY,1024,631);
      ctx.closePath();

      //simple gradient background
      ctx.beginPath();
      const grad = ctx.createLinearGradient(0,0,0,631);
      grad.addColorStop(0,"darkgray");
      grad.addColorStop(1,"lightblue");
      ctx.fillStyle = grad;
      ctx.fillRect(-this.bgX,-this.bgY,1024,631);
      ctx.closePath();
      //end
      
      
      ctx.restore();
    }
}

// function changeBgY(bgInst,value){
//   bgInst.bgY  = value;
// };
// function changeBgX(bgInst,value){
//   bgInst.bgX = value;
// }

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