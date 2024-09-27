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
}