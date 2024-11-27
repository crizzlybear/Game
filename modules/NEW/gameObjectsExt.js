class Box extends GameObjectLocked{
  constructor(ctx,x,y,w,h,rgb,key){
    super(ctx,x,y,w,h,"#ffffff");
    this.ctx = ctx;
    this.rgb = rgb;
    this.key = key;
    this.visible=true;
  }
  setNewRGBandColor(){
    let rgbList = [[255,0,0],[0,255,0],[0,0,255],[0,0,0]];
    let colorList = ["red","green","blue","black"];
    let index = Math.floor(Math.random()*4);
    this.rgb = rgbList[index];
    this.key=colorList[index];
  }
  
  pickupBox(bgInst, avatarInst,inventory,enemyInst,enemyAudio, boxAudio){
    //set pickup area
    //should make this into a function or something
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;
    if((pickup) && ((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){
      // console.log("pickedup");
      boxAudio.volume = 0.85;
      boxAudio.play();
      // console.log(item);
      if(!this.pickedUp && inventory.length==0){
        if(this.key=="black"){
          enemyInst.pickedUp=true;
          enemyInst.health=200;
          enemyInst.x = this.x;
          enemyInst.y=this.y;
          enemyAudio.volume = 0.3;
          enemyAudio.play();
          
          this.pickedUp=true;
        }else{
          inventory.push(this.key);
          this.pickedUp=true;
        }
        
      }
    }else{
      this.col=this.key;//COLOR DEBUGGING
      
    }
  }
  
  animateLPath(rate,startX,startY,repeatW,repeatH){
    if(rate==1){ 
      if(this.x >repeatW-this.w- Math.pow(boxSpeed,1.02)){
        this.y=(this.y+boxSpeed);
        this.x+=0;
        if(this.y>repeatH){this.x=startX;this.y=startY;
          this.setNewRGBandColor();
          this.visible=true;
        }
      }else{
        this.x = (this.x+boxSpeed);
      }
      }
      if(this.pickedUp){
        //this.x =startX;
        //this.y=startY;
        this.pickedUp = false;
        this.visible=false;
        this.rbg=[255,255,255];
        //push next color
      }
  }

  animateLPathReverse(rate,startX,startY,repeatW,repeatH){
    if(rate==1){

      if(this.x <repeatW-this.w+ Math.pow(boxSpeed,1.015)){
        this.y=(this.y-boxSpeed);
        this.x+=0;
        if(this.y<repeatH){this.x=startX;this.y=startY;
          this.setNewRGBandColor();
          this.visible=true;
        }
      }else{
        this.x = (this.x-boxSpeed);
      }
      }
      if(this.pickedUp){
      //  this.x =startX;
      //  this.y=startY;
        this.pickedUp = false;
        this.visible=false;
        this.rbg=[255,255,255];
        //push next color
      }
  }
  
}
  

class Item extends GameObjectLocked{
  constructor(ctx,x,y,w,h){
    super(ctx,x,y,w,h,"#ffffff");
    this.ctx = ctx;
    this.visible=true;
    this.frameW=0;
    this.energy=500;
    this.prevX;
  }
  
  getEnergy(bgInst, avatarInst, soundInst){
    //set pickup area
    //should make this into a function or something
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;
    let randomPositions = [[20,90],[400,80],[380,220],[200,510],[300,550]];
    if((pickup) && ((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){
      this.energy = Math.max(this.energy-250,0);
      this.frameW=120;
      
      if(this.energy==0){
        avatarInst.energy = Math.min(avatarInst.energy+250,1000);
        soundInst.volume = 0.1;
        soundInst.play();
        this.prevX = this.x;
        let coord = Math.round(Math.random()*(randomPositions.length-1));
        this.x = randomPositions[coord][0];
        while(this.x==this.prevX){
          coord = Math.round(Math.random()*(randomPositions.length-1));
          this.x = randomPositions[coord][0];
        }
        this.y=randomPositions[coord][1];
        this.energy=500;
      }
      
    }else{
      // this.frameW=30;
      this.frameW=0;
      // this.col = "#ffffff";
    }
  }
    
    
  drawItemImg(ctx,imgName,bgInst,frameW,frameH){
    //height layer  
    //console.log("drawn", bgInst.bgX,bgInst.bgY);
    // this.frameW=30;
    let imgW = this.w;
    let imgH = this.h;
    let imgX = this.x-bgInst.bgX;
    let imgY = this.y-bgInst.bgY;
    if(this.frameW!=0){
      // imgX = imgX - (this.energy/450)*frameW;
      // imgY = imgY - (this.energy/450)*frameH;
      imgW=  Math.max(this.w*(((this.energy/200))), this.w*1.3);
      imgH = Math.max(this.h*(((this.energy/200))), this.h*1.3);
      
    }
    ctx.drawImage(imgName,0+this.frameW,0,frameW,frameH, imgX, imgY, imgW, imgH);
    
  }
  
}
class Gate extends GameObjectLocked{
  constructor(ctx,x,y,w,h,gateKeyReq){
      super(ctx,x,y,w,h,gateKeyReq);
      this.locked = true;
      this.gateKeyReq = gateKeyReq;
      this.keyTaken = false;
      this.score = 0;
  }

  unlock(bgInst,avatarInst,inventory,unlockSound){
    let rightBorder=this.x+this.w + 10;
    let leftBorder=this.x -10;
    let topBorder=this.y - 10;
    let botBorder=this.y+this.h + 10;

    if(((rightBorder-bgInst.bgX>avatarInst.x)&&(botBorder-bgInst.bgY>avatarInst.y)&&(leftBorder-bgInst.bgX<avatarInst.x+ avatarInst.w)&&(topBorder-bgInst.bgY<avatarInst.y+ avatarInst.h))){
      if(!this.locked){
        this.y = Math.max(this.y-2,10);
      }

      if( (inventory.length==1)&& (this.gateKeyReq == inventory[0]) && pickup ){
        inventory.pop();
        this.score++;
        unlockSound.volume = 0.6;
        unlockSound.play();
        // console.log("@",this.gateKeyReq,":",this.score);
      }
    }
  }


}
  
  
  