class BG{
  constructor(bgSrc){
    this.bgSrc = bgSrc;
    background.src = this.bgSrc;
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
      ctx.drawImage(background,0,0,background.width,background.height,-bgX,-bgY,1024,631);
    }
    moveBG(canvas){
      if (rightPressed) {
        //avatarX = Math.min(avatarX + speed, canvas.width - avatarWidth);//move 7 units right
        bgX = Math.min(bgX + speed, background.width-canvas.width/2 -avatarWidth);
      } else if (leftPressed) {
        //avatarX = Math.max(avatarX - speed, 0);
        bgX = Math.max(bgX - speed, 0-(0.5*canvas.width));
      } else if(upPressed){
        //avatarY = Math.max(avatarY -speed, 0);
        bgY = Math.max(bgY -speed, 0-(0.5*canvas.height));
      } else if(downPressed){
        //avatarY = Math.min(avatarY +speed, canvas.height - avatarHeight);
        bgY = Math.min(bgY +speed, background.height -(canvas.height/2) - avatarHeight);
      }
      avatarX = canvas.width/2;
      avatarY = canvas.height/2;
    }
    drawPattern(ctx,tile){
      ctx.beginPath();
      ctx.fillStyle =  ctx.createPattern(tile, "repeat");
      // ctx.fillRect(-bgX, -bgY, 1024,631);
      // ctx.save();
      
      ctx.fillRect(-bgX, -bgY, 1024,631);
     
      //ctx.fillRect(bgX,bgY, 1024, 631);
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
      ctx.fillRect(-bgX,-bgY,1024,631);
      ctx.closePath();

      //simple gradient background
      ctx.beginPath();
      const grad = ctx.createLinearGradient(0,0,0,631);
      grad.addColorStop(0,"darkgray");
      grad.addColorStop(1,"lightblue");
      ctx.fillStyle = grad;
      ctx.fillRect(-bgX,-bgY,1024,631);
      ctx.closePath();
      //end
      
      
      ctx.restore();
    }
}

function changeBgY(value){
  bgY  = value;
};
function changeBgX(value){
  bgX = value;
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