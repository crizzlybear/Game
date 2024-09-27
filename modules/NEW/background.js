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